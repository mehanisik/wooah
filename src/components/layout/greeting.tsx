'use client'

import { useMemo } from 'react'
import { MOTIVATIONAL, PROGRAM } from '@/lib/data/program'
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

  const { timeGreeting, dateStr } = useMemo(() => {
    const hour = new Date().getHours()
    let greeting: string
    if (hour < 6) greeting = 'LATE NIGHT GRIND'
    else if (hour < 12) greeting = 'GOOD MORNING'
    else if (hour < 17) greeting = 'GOOD AFTERNOON'
    else if (hour < 21) greeting = 'EVENING SESSION'
    else greeting = 'LATE NIGHT GRIND'
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })
    return { timeGreeting: greeting, dateStr: date }
  }, [])

  const quote = useMemo(
    () => MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)],
    []
  )

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
