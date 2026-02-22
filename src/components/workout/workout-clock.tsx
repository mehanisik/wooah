'use client'

import { Timer } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDuration } from '@/lib/workout/helpers'

interface WorkoutClockProps {
  elapsed: number
  finished: boolean
}

export function WorkoutClock({ elapsed, finished }: WorkoutClockProps) {
  if (elapsed <= 0) return null

  return (
    <div
      className={cn(
        'flex items-center gap-1 font-mono text-xs tabular-nums',
        finished ? 'text-success' : 'text-primary'
      )}
    >
      <Timer className="h-3 w-3" />
      {formatDuration(elapsed)}
    </div>
  )
}
