import { getEffectiveProgram } from '@/lib/store/use-workout-store'

export const SUPERSET_TRANSITION_SEC = 15
export const SUPERSET_REST_SEC = 90

export function getSupersetPartner(
  dayIdx: number,
  exIdx: number
): number | null {
  const day = getEffectiveProgram(dayIdx)
  const ex = day.exercises[exIdx]
  if (!ex?.superset) return null
  const partnerIdx = ex.superset - 1
  const partner = day.exercises[partnerIdx]
  if (!partner?.superset) return null
  return partnerIdx
}

export function isSupersetExercise(dayIdx: number, exIdx: number): boolean {
  return getEffectiveProgram(dayIdx).exercises[exIdx]?.superset != null
}
