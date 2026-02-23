'use client'

import { useQuery } from 'convex/react'
import { useMemo, useState } from 'react'
import { useAuth } from '@/hooks/auth-context'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { formatDateFull } from '@/lib/format'
import { useLocale, useMotivational, useT } from '@/lib/i18n'
import { getTodayDayIdx } from '@/lib/workout/helpers'
import { api } from '../../../convex/_generated/api'

export function Greeting() {
  const t = useT()
  const locale = useLocale()
  const motivational = useMotivational()
  const { isAuthenticated } = useAuth()
  const currentWeek = useCurrentWeek()

  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')
  const weekSessions = useQuery(
    api.sessions.getByWeek,
    isAuthenticated ? { week: currentWeek } : 'skip'
  )

  const trainingDays = prefs?.trainingDays ?? [0, 1, 2, 3, 4, 5]
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = getTemplateOrDefault(activeProgramId)
  const dayCount = template.days.length
  const todayIdx = getTodayDayIdx(trainingDays)

  const completedThisWeek = useMemo(() => {
    if (!weekSessions) return 0
    return weekSessions.filter((s) => s.finishedAt != null).length
  }, [weekSessions])

  const todayFinished = useMemo(() => {
    if (todayIdx === null || !weekSessions) return false
    return weekSessions.some(
      (s) => s.dayIndex === todayIdx && s.finishedAt != null
    )
  }, [weekSessions, todayIdx])

  const todayWorkout =
    todayIdx !== null ? (template.days[todayIdx] ?? null) : null

  const hour = new Date().getHours()
  let timeGreeting: string
  if (hour < 6) timeGreeting = t('greetingLateNight')
  else if (hour < 12) timeGreeting = t('greetingMorning')
  else if (hour < 17) timeGreeting = t('greetingAfternoon')
  else if (hour < 21) timeGreeting = t('greetingEvening')
  else timeGreeting = t('greetingLateNight')

  const dateStr = formatDateFull(new Date(), locale)

  const [quote] = useState(
    () => motivational[Math.floor(Math.random() * motivational.length)]
  )

  let todayMsg: string
  if (!todayWorkout || todayWorkout.type === 'rest') {
    todayMsg = t('greetingRestDay', {
      completed: completedThisWeek,
      total: dayCount,
    })
  } else if (todayFinished) {
    todayMsg = t('greetingDone', {
      name: todayWorkout.name,
      completed: completedThisWeek,
      total: dayCount,
    })
  } else {
    todayMsg = t('greetingToday', {
      name: todayWorkout.name,
      focus: todayWorkout.focus,
    })
  }

  return (
    <div className="px-1 py-2">
      <div className="font-body text-muted-foreground text-xs">
        {timeGreeting} — {dateStr}
      </div>
      <div className="mt-0.5 font-body text-[11px]">{todayMsg}</div>
      <div className="mt-1 font-body text-[11px] text-muted-foreground italic">
        &ldquo;{quote}&rdquo;
      </div>
    </div>
  )
}
