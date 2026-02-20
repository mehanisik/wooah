const DEFAULT_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25]

export const PLATE_COLORS: Record<number, string> = {
  25: '#c0392b',
  20: '#2980b9',
  15: '#f1c40f',
  10: '#27ae60',
  5: '#ecf0f1',
  2.5: '#2c3e50',
  1.25: '#95a5a6',
}

export interface PlateResult {
  barWeight: number
  plates: number[]
  remainder: number
}

function detectBarWeight(
  exerciseName: string,
  defaultBarWeight: number
): number {
  const name = exerciseName.toLowerCase()
  if (name.includes('curl') || name.includes('ez')) return 10
  return defaultBarWeight
}

export function isBarbell(exerciseName: string): boolean {
  const name = exerciseName.toLowerCase()
  const barbellTerms = [
    'barbell',
    'bench press',
    'squat',
    'deadlift',
    'ohp',
    'row',
    'hip thrust',
    'front squat',
    'rdl',
    'romanian',
    'good morning',
    'rack pull',
    'floor press',
    'sumo',
    'deficit',
    'block pull',
    'pendlay',
    'curl (ez',
  ]
  return barbellTerms.some((t) => name.includes(t))
}

export function calcPlates(
  targetWeight: number,
  exerciseName: string,
  barWeight = 20,
  availablePlates = DEFAULT_PLATES
): PlateResult | null {
  if (!targetWeight || targetWeight <= 0) return null
  const bar = detectBarWeight(exerciseName, barWeight)
  if (targetWeight <= bar) return { barWeight: bar, plates: [], remainder: 0 }

  const perSide = (targetWeight - bar) / 2
  const sorted = [...availablePlates].sort((a, b) => b - a)
  const plates: number[] = []
  let remaining = perSide

  for (const plate of sorted) {
    const count = Math.floor(remaining / plate)
    for (let i = 0; i < count; i++) plates.push(plate)
    remaining -= plate * count
    remaining = Math.round(remaining * 100) / 100
  }

  return { barWeight: bar, plates, remainder: remaining }
}
