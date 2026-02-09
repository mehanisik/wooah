-- IRON PPL Database Schema for NeonDB
-- Run this in the Neon SQL Editor (Dashboard > SQL Editor)

-- 1. Workout sessions table
CREATE TABLE sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  week int NOT NULL,
  day_index int NOT NULL,
  day_name text NOT NULL,
  workout_type text NOT NULL,
  finished_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- 2. Individual set logs
CREATE TABLE sets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  exercise_index int NOT NULL,
  exercise_name text NOT NULL,
  set_index int NOT NULL,
  weight numeric NOT NULL DEFAULT 0,
  reps int NOT NULL DEFAULT 0,
  is_amrap boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Personal records
CREATE TABLE personal_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  day_index int NOT NULL,
  exercise_index int NOT NULL,
  exercise_name text NOT NULL,
  best_weight numeric NOT NULL DEFAULT 0,
  best_reps int NOT NULL DEFAULT 0,
  best_volume numeric NOT NULL DEFAULT 0,
  achieved_at timestamptz DEFAULT now(),
  UNIQUE(day_index, exercise_index)
);

-- 4. Indexes for fast queries
CREATE INDEX idx_sessions_week ON sessions(week);
CREATE INDEX idx_sets_session ON sets(session_id);
CREATE INDEX idx_sets_exercise ON sets(exercise_name);

-- 5. Useful analysis views

-- Weight progression per exercise
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

-- Weekly volume summary
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
