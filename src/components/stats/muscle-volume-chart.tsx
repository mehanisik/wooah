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

function getVolumeZoneColor(sets: number, group: MuscleGroup) {
  const lm = VOLUME_LANDMARKS[group]
  if (sets < lm.mev) return 'bg-muted-foreground/30'
  if (sets <= lm.mav) return 'bg-success'
  if (sets <= lm.mrv) return 'bg-warning'
  return 'bg-destructive'
}

function _getVolumeZoneLabel(sets: number, group: MuscleGroup) {
  const lm = VOLUME_LANDMARKS[group]
  if (sets < lm.mev) return 'Under'
  if (sets <= lm.mav) return 'Optimal'
  if (sets <= lm.mrv) return 'Pushing'
  return 'Over MRV'
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
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <h3 className="mb-3 font-display text-sm tracking-wider">
        WEEKLY VOLUME
      </h3>
      <div className="space-y-1.5">
        {MUSCLE_GROUPS.map((group) => {
          const sets = Math.round(weeklyVolume[group] || 0)
          const lm = VOLUME_LANDMARKS[group]
          const pct = Math.min(100, (sets / maxMRV) * 100)

          return (
            <div key={group} className="flex items-center gap-2">
              <span className="w-16 truncate text-right font-body text-[10px] text-muted-foreground">
                {group}
              </span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-sm bg-muted">
                <div
                  className={cn(
                    'h-full rounded-sm transition-all',
                    getVolumeZoneColor(sets, group)
                  )}
                  style={{ width: `${pct}%` }}
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
      <div className="mt-2 flex justify-center gap-3 text-[9px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-muted-foreground/30" /> Under
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-success" /> Optimal
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-warning" /> Pushing
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-destructive" /> Over
        </span>
      </div>
    </div>
  )
}
