'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { checkDeloadSignals } from '@/lib/workout/deload-detect'

export function DeloadBanner() {
  const state = useWorkoutStore.getState()
  const signal = checkDeloadSignals(state)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)

  if (!signal) return null

  const acceptDeload = () => {
    useWorkoutStore.setState((s) => ({
      mesocycleConfig: {
        ...s.mesocycleConfig,
        startWeek: s.currentWeek - s.mesocycleConfig.length,
      },
    }))
  }

  const dismiss = () => {
    useWorkoutStore.setState({ deloadDismissed: currentWeek })
  }

  return (
    <div
      className={cn(
        'rounded-lg border px-3 py-2',
        signal.level === 'red'
          ? 'border-destructive/30 bg-destructive/5'
          : 'border-warning/30 bg-warning-dim/20'
      )}
    >
      <div className="flex items-start gap-2">
        <AlertTriangle
          className={cn(
            'mt-0.5 h-4 w-4 flex-shrink-0',
            signal.level === 'red' ? 'text-destructive' : 'text-warning'
          )}
        />
        <p className="flex-1 font-body text-foreground text-xs">
          {signal.reason}
        </p>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={acceptDeload}
        >
          DELOAD
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={dismiss}
        >
          DISMISS
        </Button>
      </div>
    </div>
  )
}
