-- IRON PPL Database Schema for Supabase (Multi-User)
-- This is applied automatically via migration. Kept here for documentation.

-- 1. Workout sessions table
CREATE TABLE sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  week int NOT NULL,
  day_index int NOT NULL,
  day_name text NOT NULL,
  workout_type text NOT NULL,
  started_at timestamptz,
  finished_at timestamptz DEFAULT now(),
  duration_sec int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2. Individual set logs
CREATE TABLE sets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  exercise_index int NOT NULL,
  exercise_name text NOT NULL,
  set_index int NOT NULL,
  weight numeric NOT NULL DEFAULT 0,
  reps int NOT NULL DEFAULT 0,
  is_amrap boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Personal records (unique per user + exercise slot)
CREATE TABLE personal_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  day_index int NOT NULL,
  exercise_index int NOT NULL,
  exercise_name text NOT NULL,
  best_weight numeric NOT NULL DEFAULT 0,
  best_reps int NOT NULL DEFAULT 0,
  best_volume numeric NOT NULL DEFAULT 0,
  achieved_at timestamptz DEFAULT now(),
  UNIQUE(user_id, day_index, exercise_index)
);

-- 4. Photo metadata
CREATE TABLE photo_metadata (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  key text UNIQUE NOT NULL,
  week int NOT NULL,
  day_idx int NOT NULL,
  timestamp bigint NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 5. Indexes
CREATE INDEX idx_sessions_week ON sessions(week);
CREATE INDEX idx_sets_session ON sets(session_id);
CREATE INDEX idx_sets_exercise ON sets(exercise_name);
CREATE INDEX idx_photo_metadata_week ON photo_metadata(week);

-- 6. Migration RPC (claims orphaned rows on first sign-in)
CREATE OR REPLACE FUNCTION migrate_orphaned_data(p_user_id uuid) RETURNS void AS $$
BEGIN
  UPDATE sessions SET user_id = p_user_id WHERE user_id IS NULL;
  UPDATE sets SET user_id = p_user_id WHERE user_id IS NULL;
  UPDATE personal_records SET user_id = p_user_id WHERE user_id IS NULL;
  UPDATE photo_metadata SET user_id = p_user_id WHERE user_id IS NULL;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Conditional PR upsert function (per-user)
CREATE OR REPLACE FUNCTION upsert_pr(
  p_user_id uuid,
  p_day_index int,
  p_exercise_index int,
  p_exercise_name text,
  p_best_weight numeric,
  p_best_reps int,
  p_best_volume numeric,
  p_achieved_at timestamptz
) RETURNS void AS $$
BEGIN
  INSERT INTO personal_records (user_id, day_index, exercise_index, exercise_name, best_weight, best_reps, best_volume, achieved_at)
  VALUES (p_user_id, p_day_index, p_exercise_index, p_exercise_name, p_best_weight, p_best_reps, p_best_volume, p_achieved_at)
  ON CONFLICT (user_id, day_index, exercise_index)
  DO UPDATE SET
    best_weight = EXCLUDED.best_weight,
    best_reps = EXCLUDED.best_reps,
    best_volume = EXCLUDED.best_volume,
    achieved_at = EXCLUDED.achieved_at
  WHERE EXCLUDED.best_volume > personal_records.best_volume;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. RLS policies (authenticated, user-scoped)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_sessions" ON sessions FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_sets" ON sets FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_prs" ON personal_records FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_photos" ON photo_metadata FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 9. Storage bucket (created via Supabase dashboard or MCP)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', false);

-- 10. Storage policies (user-scoped folder: {userId}/...)
CREATE POLICY "user_upload" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "user_select" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "user_delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- 11. Analysis views
CREATE OR REPLACE VIEW exercise_progression AS
SELECT
  s.week,
  s.day_name,
  s.finished_at,
  st.exercise_name,
  st.exercise_index,
  MAX(st.weight) as max_weight,
  MAX(st.reps) FILTER (WHERE st.is_amrap) as amrap_reps,
  SUM(st.weight * st.reps) as total_volume,
  COUNT(st.id) as total_sets
FROM sessions s
JOIN sets st ON st.session_id = s.id
GROUP BY s.id, s.week, s.day_name, s.finished_at, st.exercise_name, st.exercise_index
ORDER BY s.finished_at DESC;

CREATE OR REPLACE VIEW weekly_volume AS
SELECT
  s.week,
  s.workout_type,
  COUNT(DISTINCT s.id) as sessions_count,
  SUM(st.weight * st.reps) as total_volume,
  COUNT(st.id) as total_sets
FROM sessions s
JOIN sets st ON st.session_id = s.id
GROUP BY s.week, s.workout_type
ORDER BY s.week DESC;
