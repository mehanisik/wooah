'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import { calcOneRM } from '@/lib/workout/one-rm'
import { api } from '../../../convex/_generated/api'

interface OneRmDisplayProps {
  dayIdx: number
  exIdx: number
  activeProgramId: string
}

export function OneRmDisplay({
  dayIdx,
  exIdx,
  activeProgramId,
}: OneRmDisplayProps) {
  const t = useT()
  const week = useCurrentWeek()
  const ex =
    getTemplateOrDefault(activeProgramId).days[dayIdx]?.exercises[exIdx]
  const amrapSetIdx = ex ? ex.sets - 1 : 0

  const sets = useQuery(api.sets.getByWeekAndDay, { week, dayIndex: dayIdx })

  const log = useMemo(() => {
    if (!sets) return { weight: '', reps: '', done: false }
    const found = sets.find(
      (s: { exerciseIndex: number; setIndex: number }) =>
        s.exerciseIndex === exIdx && s.setIndex === amrapSetIdx
    )
    return found
      ? {
          weight: String(found.weight ?? ''),
          reps: String(found.reps ?? ''),
          done: !!found.done,
        }
      : { weight: '', reps: '', done: false }
  }, [sets, exIdx, amrapSetIdx])

  if (!(ex?.compound && ex.amrap)) return null

  const w = Number.parseFloat(log.weight) || 0
  const r = Number.parseInt(log.reps, 10) || 0
  if (w <= 0 || r <= 0 || !log.done) return null

  const oneRM = calcOneRM(w, r)

  return (
    <div className="font-mono text-[10px] text-primary">
      {t('est1rm')} <strong>{oneRM} kg</strong>
    </div>
  )
}
