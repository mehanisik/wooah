'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDuration } from '@/lib/workout/helpers'

interface RestTimerBarProps {
  timer: {
    remaining: number
    total: number
    label: string
    active: boolean
    stop: () => void
  }
}

export function RestTimerBar({ timer }: RestTimerBarProps) {
  if (!timer.active && timer.remaining <= 0) return null

  const pct = timer.total > 0 ? (timer.remaining / timer.total) * 100 : 0
  const isWarning = timer.remaining <= 10 && timer.remaining > 0
  const isDone = timer.remaining <= 0

  return (
    <div className="safe-area-pb fixed right-0 bottom-14 left-0 z-30 px-3 pb-2">
      <div className="mx-auto max-w-lg">
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg border px-3 py-2 backdrop-blur-sm',
            isDone
              ? 'border-success bg-success-dim/80'
              : 'border-border bg-card/95'
          )}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
                {timer.label}
              </span>
              <span
                className={cn(
                  'font-bold font-mono text-lg tabular-nums',
                  isDone && 'text-success',
                  !isDone && isWarning && 'text-warning',
                  !(isDone || isWarning) && 'text-foreground'
                )}
              >
                {isDone ? 'GO!' : formatDuration(timer.remaining)}
              </span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-2">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  isDone && 'bg-success',
                  !isDone && isWarning && 'bg-warning',
                  !(isDone || isWarning) && 'bg-brand'
                )}
                style={{ width: `${isDone ? 100 : 100 - pct}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={timer.stop}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss timer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
