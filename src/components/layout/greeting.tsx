'use client'

import { formatDateFull } from '@/lib/format'
import { useLocale, useMotivational, useT } from '@/lib/i18n'
import {
  selectCompletedThisWeek,
  selectIsDayFinished,
} from '@/lib/store/selectors'
import {
  getActiveDayCount,
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { getTodayDayIdx } from '@/lib/workout/helpers'

export function Greeting() {
  const t = useT()
  const locale = useLocale()
  const motivational = useMotivational()
  const trainingDays = useWorkoutStore((s) => s.trainingDays)
  const todayIdx = getTodayDayIdx(trainingDays)
  const dayCount = useWorkoutStore((s) => getActiveDayCount(s))
  const completedThisWeek = useWorkoutStore((s) => selectCompletedThisWeek(s))
  const todayFinished = useWorkoutStore((s) =>
    todayIdx !== null ? selectIsDayFinished(s, todayIdx) : false
  )
  const todayWorkout = todayIdx !== null ? getEffectiveProgram(todayIdx) : null

  const hour = new Date().getHours()
  let timeGreeting: string
  if (hour < 6) timeGreeting = t('greetingLateNight')
  else if (hour < 12) timeGreeting = t('greetingMorning')
  else if (hour < 17) timeGreeting = t('greetingAfternoon')
  else if (hour < 21) timeGreeting = t('greetingEvening')
  else timeGreeting = t('greetingLateNight')

  const dateStr = formatDateFull(new Date(), locale)

  const quote = motivational[Math.floor(Math.random() * motivational.length)]

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
