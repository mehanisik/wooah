'use client'

import {
  MUSCLE_GROUPS,
  MUSCLE_MAP,
  type MuscleGroup,
  VOLUME_LANDMARKS,
} from '@/lib/data/muscles'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { ChartCard } from './chart-card'
import { ChartLegend } from './chart-legend'

const ZONE_CONFIG: Record<
  string,
  { bg: string; color: string; glowColor: string }
> = {
  under: { bg: 'bg-muted-foreground/30', color: '', glowColor: '' },
  optimal: {
    bg: 'bg-success',
    color: 'var(--green)',
    glowColor: 'var(--green)',
  },
  pushing: {
    bg: 'bg-warning',
    color: 'var(--yellow)',
    glowColor: 'var(--yellow)',
  },
  over: {
    bg: 'bg-destructive',
    color: 'hsl(var(--destructive))',
    glowColor: 'hsl(var(--destructive))',
  },
}

function getZone(sets: number, group: MuscleGroup) {
  const lm = VOLUME_LANDMARKS[group]
  if (sets < lm.mev) return ZONE_CONFIG.under
  if (sets <= lm.mav) return ZONE_CONFIG.optimal
  if (sets <= lm.mrv) return ZONE_CONFIG.pushing
  return ZONE_CONFIG.over
}

export function MuscleVolumeChart() {
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const logs = useWorkoutStore((s) => s.logs)

  const weeklyVolume: Record<string, number> = {}
  for (const group of MUSCLE_GROUPS) weeklyVolume[group] = 0

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
            weeklyVolume[m] = (weeklyVolume[m] || 0) + doneSets
          for (const m of mapping.secondary)
            weeklyVolume[m] = (weeklyVolume[m] || 0) + doneSets * 0.5
        }
      }
    })
  }

  const maxMRV = Math.max(...MUSCLE_GROUPS.map((g) => VOLUME_LANDMARKS[g].mrv))

  return (
    <ChartCard
      title="MUSCLE VOLUME"
      footer={
        <ChartLegend
          items={[
            { color: 'hsl(var(--muted-foreground) / 0.3)', label: 'Under' },
            { color: 'var(--green)', label: 'Optimal' },
            { color: 'var(--yellow)', label: 'Pushing' },
            { color: 'hsl(var(--destructive))', label: 'Over' },
          ]}
        />
      }
    >
      <div className="space-y-1.5">
        {MUSCLE_GROUPS.map((group) => {
          const sets = Math.round(weeklyVolume[group] || 0)
          const lm = VOLUME_LANDMARKS[group]
          const pct = Math.min(100, (sets / maxMRV) * 100)
          const zone = getZone(sets, group)

          return (
            <div key={group} className="flex items-center gap-2">
              <span className="w-16 truncate text-right font-body text-[10px] text-muted-foreground">
                {group}
              </span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-sm bg-muted">
                <div
                  className={cn('h-full rounded-sm transition-all', zone.bg)}
                  style={{
                    width: `${pct}%`,
                    boxShadow:
                      zone.glowColor && sets > 0
                        ? `0 0 6px ${zone.glowColor}`
                        : undefined,
                  }}
                />
                <div
                  className="absolute top-0 h-full w-px bg-foreground/30"
                  style={{ left: `${(lm.mev / maxMRV) * 100}%` }}
                  title={`MEV: ${lm.mev}`}
                />
                <div
                  className="absolute top-0 h-full w-px bg-foreground/30"
                  style={{ left: `${(lm.mrv / maxMRV) * 100}%` }}
                  title={`MRV: ${lm.mrv}`}
                />
              </div>
              <span className="w-6 text-right font-mono text-[10px]">
                {sets}
              </span>
            </div>
          )
        })}
      </div>
    </ChartCard>
  )
}
