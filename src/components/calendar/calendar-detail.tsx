'use client'

import { Trophy, X } from 'lucide-react'
import { formatDate, parseLocalDate } from '@/lib/format'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'

interface CalendarDetailProps {
  date: string
  onClose: () => void
}

export function CalendarDetail({ date, onClose }: CalendarDetailProps) {
  const history = useWorkoutStore((s) => s.history)
  const personalRecords = useWorkoutStore((s) => s.personalRecords)
  const startDate = useWorkoutStore((s) => s.startDate)
  const timers = useWorkoutStore((s) => s.workoutTimers)

  const d = parseLocalDate(date)
  const dow = d.getDay()
  const dayIdx = dow === 0 ? 6 : dow - 1
  if (dayIdx >= 6 || !startDate) return null

  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const startMonday = new Date(startDate)
  startMonday.setDate(startMonday.getDate() - ((startMonday.getDay() + 6) % 7))
  const dateMonday = new Date(d)
  dateMonday.setDate(dateMonday.getDate() - ((dateMonday.getDay() + 6) % 7))
  const week = Math.max(
    1,
    Math.floor(
      (dateMonday.getTime() - startMonday.getTime()) / msPerWeek
    ) + 1
  )

  const prog = getEffectiveProgram(dayIdx)
  const timerKey = `w${week}-d${dayIdx}`
  const timer = timers[timerKey]

  const exercises = prog.exercises.map((ex, eIdx) => {
    const entries = history[`d${dayIdx}-e${eIdx}`] || []
    const weekEntry = entries.find((e) => e.week === week)
    const hasPR = !!personalRecords[`d${dayIdx}-e${eIdx}`]
    return { name: ex.name, entry: weekEntry, hasPR }
  })

  const totalVolume = exercises.reduce((vol, ex) => {
    if (!ex.entry) return vol
    if (ex.entry.sets) {
      return vol + ex.entry.sets.reduce((s, x) => s + x.weight * x.reps, 0)
    }
    return vol + ex.entry.weight * ex.entry.reps
  }, 0)

  const dateLabel = formatDate(d, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="font-mono text-xs font-semibold tracking-wide">
            {prog.day} — {prog.name}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{dateLabel}</span>
            {timer && timer.duration > 0 && (
              <span>{Math.round(timer.duration / 60)}min</span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 transition-colors hover:bg-muted"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-0.5">
        {exercises.map((ex, i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <span className="flex-1 truncate text-xs">{ex.name}</span>
            {ex.entry ? (
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                {ex.entry.weight}kg × {ex.entry.reps}
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground/30">—</span>
            )}
            {ex.hasPR && <Trophy className="h-3 w-3 text-warning" />}
          </div>
        ))}
      </div>

      {totalVolume > 0 && (
        <div className="mt-2 border-t border-border/50 pt-2 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
          {totalVolume.toLocaleString()}kg total
        </div>
      )}
    </div>
  )
}
