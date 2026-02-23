'use client'

import { useMutation, useQuery } from 'convex/react'
import { Pause, Play, SkipBack, SkipForward, X } from 'lucide-react'
import { useCallback } from 'react'
import { type CircuitPhase, useCircuitTimer } from '@/hooks/use-circuit-timer'
import { useCurrentWeek } from '@/hooks/use-current-week'
import type { Day } from '@/lib/data/program'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'

interface CircuitOverlayProps {
  dayIdx: number
  day: Day
  open: boolean
  onClose: () => void
}

const CIRCUMFERENCE = 2 * Math.PI * 54

const phaseColors: Record<CircuitPhase, string> = {
  prepare: 'text-warning',
  work: 'text-success',
  rest: 'text-primary',
  done: 'text-success',
}

const phaseLabels: Record<CircuitPhase, string> = {
  prepare: 'GET READY',
  work: 'WORK',
  rest: 'REST',
  done: 'CIRCUIT COMPLETE',
}

export function CircuitOverlay({
  dayIdx,
  day,
  open,
  onClose,
}: CircuitOverlayProps) {
  const week = useCurrentWeek()
  const setCardioMut = useMutation(api.cardio.set)
  const cardioLogs = useQuery(api.cardio.getByWeekAndDay, {
    week,
    dayIndex: dayIdx,
  })
  const items = day.cardio || []

  const getCardioLog = useCallback(
    (itemIdx: number): boolean => {
      if (!cardioLogs) return false
      return cardioLogs.some((c) => c.itemIndex === itemIdx && c.done)
    },
    [cardioLogs]
  )

  const handleCardioComplete = useCallback(
    (idx: number) => {
      setCardioMut({ week, dayIndex: dayIdx, itemIndex: idx, done: true })
    },
    [setCardioMut, week, dayIdx]
  )

  const { state, start, stop, togglePause, skipNext, skipPrev } =
    useCircuitTimer(items, handleCardioComplete, onClose)

  if (!(open || state)) return null

  if (open && !state) {
    const firstUndone = items.findIndex((_, i) => !getCardioLog(i))
    if (firstUndone >= 0) start(firstUndone)
    else {
      onClose()
      return null
    }
  }

  if (!state) return null

  const progress =
    state.totalTime > 0 ? 1 - state.remaining / state.totalTime : 1
  const current = items[state.currentIdx]
  const next =
    state.currentIdx + 1 < items.length ? items[state.currentIdx + 1] : null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <button
        type="button"
        onClick={() => {
          stop()
          onClose()
        }}
        className="absolute top-4 right-4 p-2"
      >
        <X className="h-5 w-5 text-muted-foreground" />
      </button>

      <div
        className={cn(
          'mb-2 font-display text-lg tracking-widest',
          phaseColors[state.phase]
        )}
      >
        {phaseLabels[state.phase]}
      </div>

      <div className="mb-6 font-body font-semibold text-xl">
        {state.phase === 'done' ? '' : current?.name}
      </div>

      <div className="relative mb-6 h-32 w-32">
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/30"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * progress}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-1000',
              phaseColors[state.phase]
            )}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold font-mono text-4xl">
            {state.phase === 'done' ? '' : state.remaining}
          </span>
        </div>
      </div>

      {next && state.phase !== 'done' && (
        <div className="mb-8 text-muted-foreground text-xs">
          {state.phase === 'rest' ? 'Up next' : 'Next'}: {next.name}
        </div>
      )}
      {!next && state.phase === 'work' && (
        <div className="mb-8 text-muted-foreground text-xs">Last exercise!</div>
      )}

      {state.phase !== 'done' && (
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={skipPrev}
            className="p-2"
            disabled={state.currentIdx <= 0}
          >
            <SkipBack
              className={cn(
                'h-5 w-5',
                state.currentIdx <= 0
                  ? 'text-muted-foreground/30'
                  : 'text-foreground'
              )}
            />
          </button>
          <button
            type="button"
            onClick={togglePause}
            className="rounded-full bg-primary p-3 text-primary-foreground"
          >
            {state.paused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </button>
          <button type="button" onClick={skipNext} className="p-2">
            <SkipForward className="h-5 w-5 text-foreground" />
          </button>
        </div>
      )}
    </div>
  )
}
