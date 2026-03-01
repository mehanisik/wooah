import type { Day } from '@/lib/data/program'

export const SUPERSET_TRANSITION_SEC = 15
export const SUPERSET_REST_SEC = 90

export function getSupersetPartner(day: Day, exIdx: number): number | null {
  const ex = day.exercises[exIdx]
  if (!ex?.superset) return null
  const partnerIdx = ex.superset - 1
  const partner = day.exercises[partnerIdx]
  if (!partner?.superset) return null
  return partnerIdx
}

export function isSupersetExercise(day: Day, exIdx: number): boolean {
  return day.exercises[exIdx]?.superset != null
}
