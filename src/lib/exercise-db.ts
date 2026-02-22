import type { MuscleGroup, MuscleMapping } from '@/lib/data/muscles'
import { MUSCLE_MAP } from '@/lib/data/muscles'
import type { Equipment, Exercise } from '@/lib/data/program'

export interface ExerciseDbEntry {
  exerciseId: string
  name: string
  gifUrl: string
  targetMuscles: string[]
  bodyParts: string[]
  equipments: string[]
  secondaryMuscles: string[]
}

const API_BASE = '/api/exercises'
const GIF_PROXY = '/api/gif?url='
const CACHE_KEY = 'exercisedb_cache'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days

const API_MUSCLE_TO_GROUP: Record<string, MuscleGroup> = {
  'pectoralis major sternal head': 'Chest',
  'pectoralis major clavicular head': 'Chest',
  'pectoralis major': 'Chest',
  chest: 'Chest',
  'latissimus dorsi': 'Back',
  'trapezius middle fibers': 'Traps',
  'trapezius upper fibers': 'Traps',
  'trapezius lower fibers': 'Traps',
  trapezius: 'Traps',
  'erector spinae': 'Back',
  infraspinatus: 'Back',
  'teres major': 'Back',
  'teres minor': 'Back',
  rhomboids: 'Back',
  'levator scapulae': 'Back',
  quadriceps: 'Quads',
  'rectus femoris': 'Quads',
  'vastus lateralis': 'Quads',
  'vastus medialis': 'Quads',
  'vastus intermedius': 'Quads',
  hamstrings: 'Hamstrings',
  'biceps femoris': 'Hamstrings',
  semitendinosus: 'Hamstrings',
  semimembranosus: 'Hamstrings',
  'gluteus maximus': 'Glutes',
  'gluteus medius': 'Glutes',
  'gluteus minimus': 'Glutes',
  glutes: 'Glutes',
  'deltoid lateral': 'Side Delts',
  'deltoid posterior': 'Rear Delts',
  'deltoid anterior': 'Front Delts',
  delts: 'Side Delts',
  'biceps brachii': 'Biceps',
  biceps: 'Biceps',
  brachialis: 'Biceps',
  brachioradialis: 'Biceps',
  'triceps brachii': 'Triceps',
  triceps: 'Triceps',
  gastrocnemius: 'Calves',
  soleus: 'Calves',
  calves: 'Calves',
  'rectus abdominis': 'Abs',
  obliques: 'Abs',
  'transverse abdominis': 'Abs',
  abs: 'Abs',
  'serratus anterior': 'Chest',
}

const API_EQUIP_TO_LOCAL: Record<string, Equipment> = {
  barbell: 'barbell',
  dumbbell: 'dumbbell',
  machine: 'machine',
  cable: 'cable',
  'body weight': 'bodyweight',
  bodyweight: 'bodyweight',
  'e-z curl bar': 'ez_bar',
  'ez barbell': 'ez_bar',
  'smith machine': 'smith',
  band: 'bodyweight',
  kettlebell: 'dumbbell',
  'medicine ball': 'dumbbell',
  stability_ball: 'bodyweight',
  leverage_machine: 'machine',
  leverage: 'machine',
  weighted: 'bodyweight',
  assisted: 'machine',
}

interface CacheData {
  timestamp: number
  entries: ExerciseDbEntry[]
}

function proxyGif(url: string): string {
  if (url.startsWith('https://static.exercisedb.dev/')) {
    return GIF_PROXY + encodeURIComponent(url)
  }
  return url
}

function readCache(): CacheData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as CacheData
    for (const e of data.entries) {
      e.gifUrl = proxyGif(e.gifUrl)
    }
    return data
  } catch {
    return null
  }
}

function writeCache(entries: ExerciseDbEntry[]) {
  try {
    const data: CacheData = { timestamp: Date.now(), entries }
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // storage full — silently fail
  }
}

async function fetchAllExercises(): Promise<ExerciseDbEntry[]> {
  const all: ExerciseDbEntry[] = []
  let offset = 0
  const limit = 100

  while (true) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const resp = await fetch(`${API_BASE}?limit=${limit}&offset=${offset}`, {
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!resp.ok) break

    const json = await resp.json()
    const exercises = Array.isArray(json.data)
      ? json.data
      : (json.data?.exercises ?? json.exercises ?? [])
    if (!exercises.length) break

    for (const ex of exercises) {
      const rawGif: string = ex.gifUrl ?? ''
      const gifUrl = rawGif.startsWith('https://static.exercisedb.dev/')
        ? GIF_PROXY + encodeURIComponent(rawGif)
        : rawGif
      all.push({
        exerciseId: ex.exerciseId ?? ex.id ?? '',
        name: ex.name ?? '',
        gifUrl,
        targetMuscles: ex.targetMuscles ?? (ex.target ? [ex.target] : []),
        bodyParts: ex.bodyParts ?? (ex.bodyPart ? [ex.bodyPart] : []),
        equipments: ex.equipments ?? (ex.equipment ? [ex.equipment] : []),
        secondaryMuscles: ex.secondaryMuscles ?? [],
      })
    }

    if (exercises.length < limit) break
    offset += limit
  }

  return all
}

function fallbackExercises(): ExerciseDbEntry[] {
  return Object.keys(MUSCLE_MAP).map((name) => {
    const mapping = MUSCLE_MAP[name]
    return {
      exerciseId: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      gifUrl: '',
      targetMuscles: mapping.primary as unknown as string[],
      bodyParts: [],
      equipments: [],
      secondaryMuscles: mapping.secondary as unknown as string[],
    }
  })
}

export async function loadExerciseDb(): Promise<ExerciseDbEntry[]> {
  const cached = readCache()

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.entries
  }

  // stale cache: return immediately, refresh in background
  if (cached) {
    fetchAllExercises()
      .then((entries) => {
        if (entries.length) writeCache(entries)
      })
      .catch(() => {
        // ignore — background refresh failure is non-critical
      })
    return cached.entries
  }

  // no cache: try fetching
  try {
    const entries = await fetchAllExercises()
    if (entries.length) {
      writeCache(entries)
      return entries
    }
  } catch {
    // offline
  }

  return fallbackExercises()
}

export function mapApiMuscle(apiMuscle: string): MuscleGroup | null {
  const lower = apiMuscle.toLowerCase().trim()
  return API_MUSCLE_TO_GROUP[lower] ?? null
}

export function mapApiEquipment(apiEquip: string): Equipment {
  const lower = apiEquip.toLowerCase().trim()
  return API_EQUIP_TO_LOCAL[lower] ?? 'machine'
}

export function mapToExercise(
  entry: ExerciseDbEntry
): Exercise & { gifUrl: string } {
  const equipment = entry.equipments[0]
    ? mapApiEquipment(entry.equipments[0])
    : 'machine'

  return {
    name: entry.name,
    equipment,
    sets: 3,
    reps: '10-12',
    rest: 90,
    rir: '1-2',
    gifUrl: entry.gifUrl,
  }
}

export function getMuscleMapping(name: string): MuscleMapping | null {
  if (MUSCLE_MAP[name]) return MUSCLE_MAP[name]

  const cached = readCache()
  if (!cached) return null

  const entry = cached.entries.find(
    (e) => e.name.toLowerCase() === name.toLowerCase()
  )
  if (!entry) return null

  const primary: MuscleGroup[] = []
  const secondary: MuscleGroup[] = []

  for (const m of entry.targetMuscles) {
    const group = mapApiMuscle(m)
    if (group && !primary.includes(group)) primary.push(group)
  }
  for (const m of entry.secondaryMuscles) {
    const group = mapApiMuscle(m)
    if (group && !secondary.includes(group) && !primary.includes(group)) {
      secondary.push(group)
    }
  }

  if (!primary.length) return null
  return { primary, secondary }
}

export function searchExercises(
  query: string,
  entries: ExerciseDbEntry[]
): ExerciseDbEntry[] {
  if (!query.trim()) return entries
  const lower = query.toLowerCase()
  return entries.filter((e) => e.name.toLowerCase().includes(lower))
}

export function filterByMuscle(
  muscle: MuscleGroup,
  entries: ExerciseDbEntry[]
): ExerciseDbEntry[] {
  return entries.filter((e) => {
    const allMuscles = [...e.targetMuscles, ...e.secondaryMuscles]
    return allMuscles.some((m) => mapApiMuscle(m) === muscle)
  })
}

export function filterByEquipment(
  equip: Equipment,
  entries: ExerciseDbEntry[]
): ExerciseDbEntry[] {
  return entries.filter((e) =>
    e.equipments.some((eq) => mapApiEquipment(eq) === equip)
  )
}

export const DAY_TYPE_MUSCLES: Record<string, MuscleGroup[]> = {
  push: ['Chest', 'Front Delts', 'Side Delts', 'Triceps'],
  pull: ['Back', 'Rear Delts', 'Biceps', 'Traps'],
  legs: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
  upper: [
    'Chest',
    'Back',
    'Front Delts',
    'Side Delts',
    'Rear Delts',
    'Biceps',
    'Triceps',
    'Traps',
  ],
  lower: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
  full: [
    'Chest',
    'Back',
    'Quads',
    'Hamstrings',
    'Glutes',
    'Front Delts',
    'Side Delts',
    'Rear Delts',
    'Biceps',
    'Triceps',
    'Calves',
  ],
  chest: ['Chest', 'Front Delts', 'Triceps'],
  back: ['Back', 'Rear Delts', 'Biceps', 'Traps'],
  shoulders: ['Front Delts', 'Side Delts', 'Rear Delts', 'Traps'],
  arms: ['Biceps', 'Triceps'],
}
