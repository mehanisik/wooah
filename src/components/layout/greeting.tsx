'use client'

import { MOTIVATIONAL, PROGRAM } from '@/lib/data/program'
import { formatDateFull } from '@/lib/format'
import {
  selectCompletedThisWeek,
  selectIsDayFinished,
} from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { getTodayDayIdx } from '@/lib/workout/helpers'

export function Greeting() {
  const todayIdx = getTodayDayIdx()
  const completedThisWeek = useWorkoutStore((s) => selectCompletedThisWeek(s))
  const todayFinished = useWorkoutStore((s) => selectIsDayFinished(s, todayIdx))
  const todayWorkout = PROGRAM[todayIdx]

  const hour = new Date().getHours()
  let timeGreeting: string
  if (hour < 6) timeGreeting = 'LATE NIGHT GRIND'
  else if (hour < 12) timeGreeting = 'GOOD MORNING'
  else if (hour < 17) timeGreeting = 'GOOD AFTERNOON'
  else if (hour < 21) timeGreeting = 'EVENING SESSION'
  else timeGreeting = 'LATE NIGHT GRIND'

  const dateStr = formatDateFull(new Date())

  const quote = MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)]

  let todayMsg: string
  if (todayWorkout.type === 'rest') {
    todayMsg = `Rest day. ${completedThisWeek}/6 sessions done this week.`
  } else if (todayFinished) {
    todayMsg = `Today's ${todayWorkout.name} is done. ${completedThisWeek}/6 this week.`
  } else {
    todayMsg = `Today: ${todayWorkout.name} — ${todayWorkout.focus}`
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
