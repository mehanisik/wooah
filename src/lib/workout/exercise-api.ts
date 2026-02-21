const API_BASE = '/api/exercises'
const GIF_PROXY = '/api/gif?url='
const cache = new Map<string, string | null>()

function proxyGif(url: string): string {
  if (url.startsWith('https://static.exercisedb.dev/')) {
    return GIF_PROXY + encodeURIComponent(url)
  }
  return url
}

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
  'Seated Dumbbell OHP': 'dumbbell seated shoulder press',
  'Machine Shoulder Press': 'leverage shoulder press',
  'Arnold Press': 'dumbbell arnold press',
  'Tricep Pushdown': 'cable pushdown',
  'Rope Pushdown': 'cable pushdown (with rope attachment)',
  'V-Bar Pushdown': 'cable triceps pushdown (v-bar)',
  'Lateral Raises': 'dumbbell lateral raise',
  'DB Lateral Raise': 'dumbbell lateral raise',
  'Cable Lateral Raise': 'cable lateral raise',
  'Cable Lateral Raise (1-arm)': 'cable one arm lateral raise',
  // Pull A
  'Conventional Deadlift': 'barbell deadlift',
  'Lat Pulldown (wide)': 'cable wide-grip lat pulldown',
  'Lat Pulldown': 'cable lat pulldown full range of motion',
  'Seated Cable Row': 'cable seated row',
  'Face Pulls': 'cable face pull',
  'Face Pull': 'cable face pull',
  'Barbell Curl (EZ/straight)': 'barbell curl',
  'Barbell Curl': 'barbell curl',
  'DB Curl': 'dumbbell alternate biceps curl',
  'Hammer Curl': 'dumbbell hammer curl',
  // Legs A
  'Barbell Back Squat': 'barbell full squat',
  'Barbell Squat': 'barbell full squat',
  'Romanian Deadlift': 'barbell romanian deadlift',
  'Leg Press': 'sled 45 leg press',
  'Leg Curl (lying/seated)': 'lever seated leg curl',
  'Leg Curl': 'lever seated leg curl',
  'Leg Extension': 'lever leg extension',
  'Standing Calf Raise': 'smith machine calf raise',
  'Calf Raise': 'smith machine calf raise',
  'Cable Pull-Through': 'cable pull through',
  // Push B
  'Standing Barbell OHP': 'dumbbell standing overhead press',
  'Dips (weighted if possible)': 'chest dip',
  'Dips (weighted)': 'chest dip',
  'Incline Cable/DB Fly': 'cable incline fly',
  'Close-Grip Bench Press': 'barbell close-grip bench press',
  'Overhead Tricep Extension': 'cable overhead triceps extension',
  'Reverse Pec Deck': 'reverse machine fly',
  'Rear Delt Fly': 'dumbbell rear delt fly',
  // Pull B
  'Pull-ups (weighted if possible)': 'pull-up',
  'Pull-Up': 'pull-up',
  'Chin-Up': 'chin-up',
  'Barbell Bent-over Row': 'barbell bent over row',
  'Barbell Row': 'barbell bent over row',
  'Cable Pullover': 'cable pullover',
  'Incline Dumbbell Curl': 'dumbbell incline curl',
  'Reverse Curl (EZ/cable)': 'barbell reverse curl',
  'Preacher Curl': 'dumbbell preacher curl',
  // Legs B
  'Front Squat / Hack Squat': 'barbell front squat',
  'Sumo/Conv. Deadlift (lighter)': 'barbell sumo deadlift',
  'Bulgarian Split Squat': 'split squats',
  'Nordic Ham Curl / GHR': 'nordic hamstring curl',
  'Barbell Hip Thrust': 'barbell hip thrust',
  'Hip Thrust': 'barbell hip thrust',
  'Seated Calf Raise': 'seated calf raise',
}

export function normalize(name: string): string {
  return NAME_MAP[name] || name.toLowerCase().replace(/[^a-z0-9 ]/g, '')
}

function isRelevantMatch(resultName: string, searchTerm: string): boolean {
  const lower = resultName.toLowerCase()
  return lower.includes(searchTerm.toLowerCase())
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
    const resp = await fetch(`${API_BASE}?search=${encoded}&limit=5&offset=0`, {
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
      : data.data?.exercises || data.exercises || []

    const exact = exercises.find(
      (e: { name?: string }) => e.name?.toLowerCase() === searchTerm
    )
    if (exact?.gifUrl) {
      const url = proxyGif(exact.gifUrl)
      cache.set(key, url)
      return url
    }

    const relevant = exercises.find(
      (e: { name?: string }) => e.name && isRelevantMatch(e.name, searchTerm)
    )
    if (relevant?.gifUrl) {
      const url = proxyGif(relevant.gifUrl)
      cache.set(key, url)
      return url
    }

    cache.set(key, null)
    return null
  } catch {
    cache.set(key, null)
    return null
  }
}
