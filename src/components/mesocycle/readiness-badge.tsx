'use client'

import { selectSessionNotes } from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { calcReadiness, getReadinessZone } from '@/lib/workout/readiness'

interface ReadinessBadgeProps {
  dayIdx: number
}

export function ReadinessBadge({ dayIdx }: ReadinessBadgeProps) {
  const notes = useWorkoutStore((s) => selectSessionNotes(s, dayIdx))
  const score = calcReadiness(useWorkoutStore.getState(), notes)

  if (score === null) return null

  const { zone, label } = getReadinessZone(score)

  const zoneStyles: Record<string, string> = {
    rest: 'bg-destructive/15 text-destructive',
    light: 'bg-warning-dim text-warning',
    normal: 'bg-success-dim text-success',
    push: 'bg-info/15 text-info',
  }

  return (
    <span
      className={cn(
        'rounded-full px-1.5 py-0.5 font-mono text-[10px]',
        zoneStyles[zone]
      )}
      title={label}
    >
      {score}
    </span>
  )
}
