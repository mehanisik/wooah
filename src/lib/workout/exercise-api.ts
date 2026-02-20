const API_BASE = 'https://exercisedb-api.vercel.app/api/v1/exercises'
const cache = new Map<string, string | null>()

const NAME_MAP: Record<string, string> = {
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
  'Standing Barbell OHP': 'barbell overhead press',
  'DB Lateral Raise': 'dumbbell lateral raise',
  'Cable Lateral Raise': 'cable lateral raise',
  'Rope Pushdown': 'cable pushdown',
  'V-Bar Pushdown': 'cable pushdown',
  'Overhead Tricep Extension': 'cable overhead triceps extension',
  'Barbell Row': 'barbell bent over row',
  'Seated Cable Row': 'cable seated row',
  'Lat Pulldown': 'cable lat pulldown',
  'Pull-Up': 'pull up',
  'Chin-Up': 'chin up',
  'Barbell Curl': 'barbell curl',
  'DB Curl': 'dumbbell bicep curl',
  'Hammer Curl': 'dumbbell hammer curl',
  'Face Pull': 'cable face pull',
  'Rear Delt Fly': 'dumbbell rear delt fly',
  'Barbell Squat': 'barbell squat',
  'Leg Press': 'leg press',
  'Leg Extension': 'leg extension machine',
  'Romanian Deadlift': 'barbell romanian deadlift',
  'Leg Curl': 'leg curl machine',
  'Calf Raise': 'calf raise machine',
  'Bulgarian Split Squat': 'dumbbell bulgarian split squat',
  'Hip Thrust': 'barbell hip thrust',
}

function normalize(name: string): string {
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
    const exercises = data.data?.exercises || data.exercises || []
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
