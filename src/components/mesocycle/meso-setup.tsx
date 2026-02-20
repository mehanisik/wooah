'use client'

import { Button } from '@/components/ui/button'
import { useWorkoutStore } from '@/lib/store/use-workout-store'

export function MesoSetup() {
  const config = useWorkoutStore((s) => s.mesocycleConfig)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)

  if (config.startWeek) return null

  const startMesocycle = () => {
    useWorkoutStore.setState((s) => ({
      mesocycleConfig: { ...s.mesocycleConfig, startWeek: currentWeek },
    }))
  }

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 text-center">
      <div className="font-body font-semibold text-sm">MESOCYCLE</div>
      <p className="mt-0.5 font-body text-[10px] text-muted-foreground">
        Start a {config.length}+{config.deloadLength} mesocycle for progressive
        overload
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-2 text-xs"
        onClick={startMesocycle}
      >
        START MESOCYCLE
      </Button>
    </div>
  )
}
