import type { Day } from '@/lib/data/program'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'

export const SUPERSET_TRANSITION_SEC = 15
export const SUPERSET_REST_SEC = 90

function resolveDay(dayOrIdx: Day | number, programId?: string): Day | null {
  if (typeof dayOrIdx === 'object') return dayOrIdx
  const days = getTemplateOrDefault(programId ?? 'wooah-ppl').days
  if (dayOrIdx < 0 || dayOrIdx >= days.length) return null
  return days[dayOrIdx]
}

export function getSupersetPartner(
  dayOrIdx: Day | number,
  exIdx: number,
  programId?: string
): number | null {
  const day = resolveDay(dayOrIdx, programId)
  if (!day) return null
  const ex = day.exercises[exIdx]
  if (!ex?.superset) return null
  const partnerIdx = ex.superset - 1
  const partner = day.exercises[partnerIdx]
  if (!partner?.superset) return null
  return partnerIdx
}

export function isSupersetExercise(
  dayOrIdx: Day | number,
  exIdx: number,
  programId?: string
): boolean {
  const day = resolveDay(dayOrIdx, programId)
  if (!day) return false
  return day.exercises[exIdx]?.superset != null
}
