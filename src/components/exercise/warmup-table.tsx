'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { useT } from '@/lib/i18n'
import { calcPlates } from '@/lib/workout/plate-calc'
import { generateWarmupSets } from '@/lib/workout/warmup-calc'
import { api } from '../../../convex/_generated/api'

interface WarmupTableProps {
  dayIdx: number
  exIdx: number
  exerciseName: string
}

export function WarmupTable({ dayIdx, exIdx, exerciseName }: WarmupTableProps) {
  const t = useT()
  const prefs = useQuery(api.preferences.get)
  const unit = prefs?.plateSettings?.unit ?? 'kg'
  const history = useQuery(api.history.getByDayAndExercise, {
    dayIndex: dayIdx,
    exerciseIndex: exIdx,
  })

  const lastSession = useMemo(() => {
    if (!history || history.length === 0) return null
    return history[history.length - 1]
  }, [history])

  if (!lastSession?.detailedSets?.length) return null

  const workingWeight = Math.max(
    ...lastSession.detailedSets.map((s: { weight?: number }) => s.weight || 0)
  )
  if (workingWeight <= 0) return null

  const warmupSets = generateWarmupSets(workingWeight, exerciseName)
  if (warmupSets.length === 0) return null

  return (
    <div className="mt-2 space-y-1">
      <div className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
        {t('warmupBased', { weight: workingWeight })}
      </div>
      <table className="w-full font-mono text-[10px]">
        <thead>
          <tr className="text-muted-foreground">
            <th className="w-6 text-left">#</th>
            <th className="text-left">{t('kgLabel')}</th>
            <th className="text-left">{t('repsLabel')}</th>
            <th className="text-left">{t('warmupPercent')}</th>
            <th className="text-left">{t('warmupPlates')}</th>
          </tr>
        </thead>
        <tbody>
          {warmupSets.map((s, i) => {
            const plates = calcPlates(s.weight, exerciseName)
            const plateStr = plates?.plates.length
              ? plates.plates.join('+')
              : t('warmupBar')
            return (
              <tr key={i} className="text-foreground/80">
                <td>{i + 1}</td>
                <td>
                  {s.weight}
                  {unit}
                </td>
                <td>x{s.reps}</td>
                <td>{s.pct ? `${s.pct}%` : t('warmupBarLabel')}</td>
                <td className="text-muted-foreground">{plateStr}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="font-body text-[9px] text-muted-foreground">
        {t('warmupRest')}
      </div>
    </div>
  )
}
