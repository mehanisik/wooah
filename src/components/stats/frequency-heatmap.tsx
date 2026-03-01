'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useTemplate } from '@/hooks/use-template'
import { MUSCLE_GROUPS, MUSCLE_MAP, VOLUME_LANDMARKS } from '@/lib/data/muscles'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'
import { ChartCard } from './chart-card'

export function FrequencyHeatmap() {
  const t = useT()
  const currentWeek = useCurrentWeek()
  const prefs = useQuery(api.preferences.get)
  const setsData = useQuery(api.sets.getByUser)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const trainingDays = prefs?.trainingDays ?? [0, 1, 2, 3, 4, 5]
  const template = useTemplate(activeProgramId)
  const dayCount = template?.days.length ?? 0

  const logsMap = useMemo(() => {
    if (!setsData) return {} as Record<string, { done: boolean }>
    const map: Record<string, { done: boolean }> = {}
    for (const s of setsData) {
      const key = `w${s.week}-d${s.dayIndex}-e${s.exerciseIndex}-s${s.setIndex}`
      map[key] = { done: s.done }
    }
    return map
  }, [setsData])

  const grid = useMemo(() => {
    const g: Record<string, Record<number, number>> = {}
    for (const group of MUSCLE_GROUPS) {
      g[group] = {}
      for (let d = 0; d < dayCount; d++) g[group][d] = 0
    }

    for (let d = 0; d < dayCount; d++) {
      const day = template?.days[d]
      if (!day) continue
      day.exercises.forEach((ex, eIdx) => {
        let doneSets = 0
        for (let s = 0; s < ex.sets + 4; s++) {
          const key = `w${currentWeek}-d${d}-e${eIdx}-s${s}`
          if (logsMap[key]?.done) doneSets++
        }
        if (doneSets > 0) {
          const mapping = MUSCLE_MAP[ex.name]
          if (mapping) {
            for (const m of mapping.primary) g[m][d] = (g[m][d] || 0) + doneSets
            for (const m of mapping.secondary)
              g[m][d] = (g[m][d] || 0) + Math.round(doneSets * 0.5)
          }
        }
      })
    }
    return g
  }, [currentWeek, dayCount, template, logsMap])

  if (prefs === undefined || setsData === undefined) {
    return (
      <ChartCard title={t('frequency')}>
        <div className="h-32 animate-pulse rounded bg-muted" />
      </ChartCard>
    )
  }

  const ALL_DAY_LABELS = [
    t('navMon'),
    t('navTue'),
    t('navWed'),
    t('navThu'),
    t('navFri'),
    t('navSat'),
    t('calSun'),
  ]
  const sortedDays = [...trainingDays].sort((a, b) => a - b)
  const days = sortedDays.map((d) => ALL_DAY_LABELS[d])
  const maxCell = Math.max(
    ...MUSCLE_GROUPS.flatMap((g) => Object.values(grid[g])),
    1
  )

  return (
    <ChartCard title={t('frequency')}>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr>
              <th className="w-16 text-left font-body text-muted-foreground" />
              {days.map((d, i) => (
                <th
                  key={i}
                  className="w-8 text-center font-mono text-muted-foreground"
                >
                  {d}
                </th>
              ))}
              <th className="w-10 text-center font-mono text-muted-foreground">
                {t('tot')}
              </th>
            </tr>
          </thead>
          <tbody>
            {MUSCLE_GROUPS.map((group) => {
              const total = Object.values(grid[group]).reduce(
                (a, b) => a + b,
                0
              )
              const lm = VOLUME_LANDMARKS[group]
              let zoneClass: string
              if (total < lm.mev) zoneClass = ''
              else if (total <= lm.mav) zoneClass = 'text-success'
              else if (total <= lm.mrv) zoneClass = 'text-warning'
              else zoneClass = 'text-destructive'

              return (
                <tr key={group} className="border-border/50 border-t">
                  <td className="truncate py-0.5 font-body text-muted-foreground">
                    {group}
                  </td>
                  {days.map((_, i) => {
                    const val = grid[group][i] || 0
                    const intensity = val > 0 ? Math.min(val / maxCell, 1) : 0
                    return (
                      <td key={i} className="text-center font-mono">
                        {val > 0 ? (
                          <span
                            className="inline-block h-5 w-5 rounded-sm text-foreground leading-5"
                            style={{
                              backgroundColor: `hsl(var(--primary) / ${0.1 + intensity * 0.35})`,
                              boxShadow:
                                intensity > 0.3
                                  ? `0 0 ${4 + intensity * 4}px hsl(var(--primary) / ${intensity * 0.3})`
                                  : undefined,
                            }}
                          >
                            {val}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/40">·</span>
                        )}
                      </td>
                    )
                  })}
                  <td
                    className={cn(
                      'text-center font-mono font-semibold',
                      zoneClass
                    )}
                  >
                    {total}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </ChartCard>
  )
}
