const API_BASE = 'https://exercisedb-api.vercel.app/api/v1/exercises'
const cache = new Map<string, string | null>()

const NAME_MAP: Record<string, string> = {
  // Push A
  'Flat Barbell Bench Press': 'barbell bench press',
  'DB Bench Press': 'dumbbell bench press',
  'Machine Chest Press': 'chest press machine',
  'Floor Press': 'barbell floor press',
  'Incline Dumbbell Press': 'dumbbell incline bench press',
  'Incline Barbell Press': 'barbell incline bench press',
  'Low-to-High Cable Fly': 'cable low fly',
  'Cable Chest Fly': 'cable fly',
  'Pec Deck': 'pec deck fly',
  'DB Fly': 'dumbbell fly',
  'Incline DB Press': 'dumbbell incline bench press',
  'Seated Dumbbell OHP': 'dumbbell shoulder press',
  'Machine Shoulder Press': 'leverage shoulder press',
  'Arnold Press': 'dumbbell arnold press',
  'Tricep Pushdown': 'cable pushdown',
  'Rope Pushdown': 'cable pushdown',
  'V-Bar Pushdown': 'cable pushdown',
  'Lateral Raises': 'dumbbell lateral raise',
  'DB Lateral Raise': 'dumbbell lateral raise',
  'Cable Lateral Raise': 'cable lateral raise',
  'Cable Lateral Raise (1-arm)': 'cable lateral raise',
  // Pull A
  'Conventional Deadlift': 'barbell deadlift',
  'Lat Pulldown (wide)': 'cable lat pulldown',
  'Lat Pulldown': 'cable lat pulldown',
  'Seated Cable Row': 'cable seated row',
  'Face Pulls': 'cable face pull',
  'Face Pull': 'cable face pull',
  'Barbell Curl (EZ/straight)': 'barbell curl',
  'Barbell Curl': 'barbell curl',
  'DB Curl': 'dumbbell bicep curl',
  'Hammer Curl': 'dumbbell hammer curl',
  // Legs A
  'Barbell Back Squat': 'barbell squat',
  'Barbell Squat': 'barbell squat',
  'Romanian Deadlift': 'barbell romanian deadlift',
  'Leg Press': 'leg press',
  'Leg Curl (lying/seated)': 'seated leg curl',
  'Leg Curl': 'leg curl machine',
  'Leg Extension': 'leg extension machine',
  'Standing Calf Raise': 'standing calf raise',
  'Calf Raise': 'calf raise machine',
  // Push B
  'Standing Barbell OHP': 'barbell overhead press',
  'Dips (weighted if possible)': 'chest dip',
  'Incline Cable/DB Fly': 'cable incline fly',
  'Overhead Tricep Extension': 'cable overhead triceps extension',
  'Reverse Pec Deck': 'reverse machine fly',
  'Rear Delt Fly': 'dumbbell rear delt fly',
  // Pull B
  'Pull-ups (weighted if possible)': 'pull up',
  'Pull-Up': 'pull up',
  'Chin-Up': 'chin up',
  'Barbell Bent-over Row': 'barbell bent over row',
  'Barbell Row': 'barbell bent over row',
  'Cable Pullover': 'cable pullover',
  'Incline Dumbbell Curl': 'dumbbell incline curl',
  'Reverse Curl (EZ/cable)': 'barbell reverse curl',
  // Legs B
  'Front Squat / Hack Squat': 'barbell front squat',
  'Sumo/Conv. Deadlift (lighter)': 'barbell sumo deadlift',
  'Bulgarian Split Squat': 'dumbbell bulgarian split squat',
  'Nordic Ham Curl / GHR': 'nordic hamstring curl',
  'Barbell Hip Thrust': 'barbell hip thrust',
  'Hip Thrust': 'barbell hip thrust',
  'Seated Calf Raise': 'seated calf raise',
}

export function normalize(name: string): string {
  return NAME_MAP[name] || name.toLowerCase().replace(/[^a-z0-9 ]/g, '')
}

export async function getExerciseGif(
  exerciseName: string
): Promise<string | null> {
  const key = exerciseName.toLowerCase()
  if (cache.has(key)) return cache.get(key) ?? null

  const searchTerm = normalize(exerciseName)

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
    const encoded = encodeURIComponent(searchTerm)
    const resp = await fetch(`${API_BASE}?search=${encoded}&limit=1&offset=0`, {
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!resp.ok) {
      cache.set(key, null)
      return null
    }

    const data = await resp.json()
    const exercises = Array.isArray(data.data)
      ? data.data
      : (data.data?.exercises || data.exercises || [])
    const match = exercises[0]

    if (match?.gifUrl) {
      cache.set(key, match.gifUrl)
      return match.gifUrl
    }

    cache.set(key, null)
    return null
  } catch {
    cache.set(key, null)
    return null
  }
}
