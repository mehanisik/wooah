'use client'

import { MUSCLE_GROUPS, MUSCLE_MAP, VOLUME_LANDMARKS } from '@/lib/data/muscles'
import { useT } from '@/lib/i18n'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { ChartCard } from './chart-card'

export function FrequencyHeatmap() {
  const t = useT()
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const logs = useWorkoutStore((s) => s.logs)

  const grid: Record<string, Record<number, number>> = {}
  for (const g of MUSCLE_GROUPS) {
    grid[g] = {}
    for (let d = 0; d < 6; d++) grid[g][d] = 0
  }

  for (let d = 0; d < 6; d++) {
    const prog = getEffectiveProgram(d)
    prog.exercises.forEach((ex, eIdx) => {
      let doneSets = 0
      for (let s = 0; s < ex.sets + 4; s++) {
        const key = `w${currentWeek}-d${d}-e${eIdx}-s${s}`
        if (logs[key]?.done) doneSets++
      }
      if (doneSets > 0) {
        const mapping = MUSCLE_MAP[ex.name]
        if (mapping) {
          for (const m of mapping.primary)
            grid[m][d] = (grid[m][d] || 0) + doneSets
          for (const m of mapping.secondary)
            grid[m][d] = (grid[m][d] || 0) + Math.round(doneSets * 0.5)
        }
      }
    })
  }

  const days = [
    t('navMon'),
    t('navTue'),
    t('navWed'),
    t('navThu'),
    t('navFri'),
    t('navSat'),
  ]
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
