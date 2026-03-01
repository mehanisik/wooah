'use client'

import { useQuery } from 'convex/react'
import { useMemo, useState } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useTemplate } from '@/hooks/use-template'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'
import { CalendarDetail } from './calendar-detail'
import { CalendarMonth } from './calendar-month'

function getMonthsToShow(): Date[] {
  const now = new Date()
  const months: Date[] = []
  for (let i = 2; i >= 0; i--) {
    months.push(new Date(now.getFullYear(), now.getMonth() - i, 1))
  }
  return months
}

function getStreaks(
  finishedDays: Record<string, boolean>,
  currentWeek: number,
  dayCount: number
) {
  let current = 0
  let longest = 0
  let streak = 0

  for (let w = 1; w <= currentWeek; w++) {
    for (let d = 0; d < dayCount; d++) {
      if (finishedDays[`w${w}-d${d}`]) {
        streak++
        if (streak > longest) longest = streak
      } else {
        streak = 0
      }
    }
  }

  streak = 0
  outer: for (let w = currentWeek; w >= 1; w--) {
    for (let d = dayCount - 1; d >= 0; d--) {
      if (finishedDays[`w${w}-d${d}`]) {
        streak++
      } else if (streak > 0) {
        break outer
      }
    }
  }
  current = streak
  return { current, longest }
}

export function CalendarPage() {
  const t = useT()
  const currentWeek = useCurrentWeek()
  const prefs = useQuery(api.preferences.get)
  const sessions = useQuery(api.sessions.getAll)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = useTemplate(activeProgramId)

  const finishedDays = useMemo(() => {
    if (!sessions) return {} as Record<string, boolean>
    const map: Record<string, boolean> = {}
    for (const s of sessions) {
      if (s.finishedAt) {
        map[`w${s.week}-d${s.dayIndex}`] = true
      }
    }
    return map
  }, [sessions])

  if (!template) return null

  const dayCount = template.days.length
  const months = getMonthsToShow()
  const { current, longest } = getStreaks(finishedDays, currentWeek, dayCount)

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-baseline justify-center gap-6">
        <div className="text-center">
          <div className="font-bold font-mono text-2xl tabular-nums">
            {current}
          </div>
          <div className="text-[10px] text-muted-foreground tracking-wide">
            {t('streakLabel')}
          </div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div className="text-center">
          <div className="font-bold font-mono text-2xl text-muted-foreground tabular-nums">
            {longest}
          </div>
          <div className="text-[10px] text-muted-foreground tracking-wide">
            {t('best')}
          </div>
        </div>
      </div>

      {months.map((month) => (
        <CalendarMonth
          key={month.toISOString()}
          month={month}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      ))}

      <div className="flex justify-center gap-3 text-[9px] text-muted-foreground/60">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-[3px] bg-[var(--push-color)]" />
          {t('push')}
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-[3px] bg-[var(--pull-color)]" />
          {t('pull')}
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-[3px] bg-[var(--legs-color)]" />
          {t('legs')}
        </span>
      </div>

      {selectedDate && (
        <CalendarDetail
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}
