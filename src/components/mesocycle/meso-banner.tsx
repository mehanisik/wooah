'use client'

import { BatteryCharging, TrendingUp } from 'lucide-react'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { getMesoWeek, getRIR, isDeloadWeek } from '@/lib/workout/mesocycle'

export function MesoBanner() {
  const config = useWorkoutStore((s) => s.mesocycleConfig)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)

  const week = getMesoWeek(config, currentWeek)
  if (week === null) return null

  const cycleLen = config.length + config.deloadLength
  const rir = getRIR(config, currentWeek)
  const deload = isDeloadWeek(config, currentWeek)

  if (deload) {
    return (
      <div className="rounded-lg border border-warning/30 bg-warning-dim/20 px-3 py-2">
        <div className="flex items-center gap-2 font-body font-semibold text-sm text-warning">
          <BatteryCharging className="h-4 w-4" />
          DELOAD WEEK
        </div>
        <p className="mt-0.5 font-body text-[10px] text-muted-foreground">
          Reduce volume to 60%, focus on recovery. RIR {rir}
        </p>
      </div>
    )
  }

  const pct = (week / cycleLen) * 100

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className="flex items-center gap-2 font-body font-semibold text-sm">
        <TrendingUp className="h-4 w-4 text-brand" />
        MESO WEEK {week}/{config.length}
      </div>
      <p className="mt-0.5 font-body text-[10px] text-muted-foreground">
        Target RIR: {rir} · Ramp +{config.rampRate} sets/muscle
      </p>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
