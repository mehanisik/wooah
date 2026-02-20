export interface WarmupSet {
  pct: number
  weight: number
  reps: number
}

function roundTo2_5(n: number): number {
  return Math.round(n / 2.5) * 2.5
}

function detectBarWeight(exerciseName: string): number {
  const name = exerciseName.toLowerCase()
  if (name.includes('curl') || name.includes('ez')) return 10
  return 20
}

export function generateWarmupSets(
  workingWeight: number,
  exerciseName: string
): WarmupSet[] {
  if (!workingWeight || workingWeight <= 0) return []
  const bar = detectBarWeight(exerciseName)
  const sets: WarmupSet[] = []

  if (workingWeight <= 60) {
    sets.push({ pct: 0, weight: bar, reps: 10 })
    sets.push({
      pct: 60,
      weight: roundTo2_5(workingWeight * 0.6),
      reps: 8,
    })
  } else if (workingWeight <= 100) {
    sets.push({ pct: 0, weight: bar, reps: 10 })
    sets.push({
      pct: 50,
      weight: roundTo2_5(workingWeight * 0.5),
      reps: 8,
    })
    sets.push({
      pct: 75,
      weight: roundTo2_5(workingWeight * 0.75),
      reps: 5,
    })
  } else {
    sets.push({ pct: 0, weight: bar, reps: 10 })
    sets.push({
      pct: 50,
      weight: roundTo2_5(workingWeight * 0.5),
      reps: 8,
    })
    sets.push({
      pct: 65,
      weight: roundTo2_5(workingWeight * 0.65),
      reps: 5,
    })
    sets.push({
      pct: 80,
      weight: roundTo2_5(workingWeight * 0.8),
      reps: 3,
    })
    if (workingWeight > 140) {
      sets.push({
        pct: 90,
        weight: roundTo2_5(workingWeight * 0.9),
        reps: 1,
      })
    }
  }

  return sets.filter((s) => s.weight >= bar)
}
