'use client'

import { useQuery } from 'convex/react'
import { Trophy, X } from 'lucide-react'
import { useMemo } from 'react'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { formatDate, parseLocalDate } from '@/lib/format'
import { useLocale, useT } from '@/lib/i18n'
import { calcWeekNumber } from '@/lib/workout/helpers'
import { api } from '../../../convex/_generated/api'

interface CalendarDetailProps {
  date: string
  onClose: () => void
}

export function CalendarDetail({ date, onClose }: CalendarDetailProps) {
  const t = useT()
  const locale = useLocale()
  const prefs = useQuery(api.preferences.get)
  const historyEntries = useQuery(api.history.getAll)
  const personalRecords = useQuery(api.personalRecords.getAll)
  const sessions = useQuery(api.sessions.getAll)

  const startDate = prefs?.startDate ?? null
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const trainingDays = prefs?.trainingDays ?? [0, 1, 2, 3, 4, 5]

  const d = parseLocalDate(date)
  const dow = d.getDay()
  const weekdayIdx = dow === 0 ? 6 : dow - 1
  const sortedTrainingDays = [...trainingDays].sort((a, b) => a - b)
  const dayIdx = sortedTrainingDays.indexOf(weekdayIdx)

  const week = startDate ? calcWeekNumber(startDate, d) : 0
  const template = getTemplateOrDefault(activeProgramId)
  const prog = dayIdx >= 0 ? template.days[dayIdx] : undefined

  const historyMap = useMemo(() => {
    if (!historyEntries)
      return {} as Record<string, NonNullable<typeof historyEntries>>
    const map: Record<string, NonNullable<typeof historyEntries>> = {}
    for (const e of historyEntries) {
      const key = `d${e.dayIndex}-e${e.exerciseIndex}`
      if (!map[key]) map[key] = []
      map[key].push(e)
    }
    return map
  }, [historyEntries])

  const prMap = useMemo(() => {
    if (!personalRecords) return {} as Record<string, boolean>
    const map: Record<string, boolean> = {}
    for (const pr of personalRecords) {
      map[`d${pr.dayIndex}-e${pr.exerciseIndex}`] = true
    }
    return map
  }, [personalRecords])

  const workoutTimers = useMemo(() => {
    if (!sessions)
      return {} as Record<
        string,
        { startedAt: string; finishedAt: string | null; duration: number }
      >
    const map: Record<
      string,
      { startedAt: string; finishedAt: string | null; duration: number }
    > = {}
    for (const s of sessions) {
      map[`w${s.week}-d${s.dayIndex}`] = {
        startedAt: s.startedAt ?? '',
        finishedAt: s.finishedAt ?? null,
        duration: s.durationSec ?? 0,
      }
    }
    return map
  }, [sessions])

  if (dayIdx === -1 || !startDate || !prog) return null

  const timerKey = `w${week}-d${dayIdx}`
  const timer = workoutTimers[timerKey]

  const exercises = prog.exercises.map((ex, eIdx) => {
    const entries = historyMap[`d${dayIdx}-e${eIdx}`] || []
    const weekEntry = entries.find((e) => e.week === week)
    const hasPR = !!prMap[`d${dayIdx}-e${eIdx}`]
    return { name: ex.name, entry: weekEntry, hasPR }
  })

  const totalVolume = exercises.reduce((vol, ex) => {
    if (!ex.entry) return vol
    if (ex.entry.detailedSets) {
      return (
        vol + ex.entry.detailedSets.reduce((s, x) => s + x.weight * x.reps, 0)
      )
    }
    return vol + ex.entry.weight * ex.entry.reps
  }, 0)

  const dateLabel = formatDate(
    d,
    {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    },
    locale
  )

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="font-mono font-semibold text-xs tracking-wide">
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
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
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
        <div className="mt-2 border-border/50 border-t pt-2 text-right font-mono text-[10px] text-muted-foreground tabular-nums">
          {totalVolume.toLocaleString()}kg {t('total')}
        </div>
      )}
    </div>
  )
}
