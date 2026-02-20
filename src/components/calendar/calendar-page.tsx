'use client'

import { Flame } from 'lucide-react'
import { useState } from 'react'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { CalendarDetail } from './calendar-detail'
import { CalendarMonth } from './calendar-month'

function getMonthsToShow(): Date[] {
  const now = new Date()
  const months: Date[] = []
  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(d)
  }
  return months
}

function getStreaks(
  finishedDays: Record<string, boolean>,
  currentWeek: number
) {
  let current = 0
  let longest = 0
  let streak = 0

  for (let w = 1; w <= currentWeek; w++) {
    for (let d = 0; d < 6; d++) {
      if (finishedDays[`w${w}-d${d}`]) {
        streak++
        if (streak > longest) longest = streak
      } else {
        streak = 0
      }
    }
  }

  streak = 0
  for (let w = currentWeek; w >= 1; w--) {
    for (let d = 5; d >= 0; d--) {
      if (finishedDays[`w${w}-d${d}`]) {
        streak++
      } else if (streak > 0) {
        current = streak
        return { current, longest }
      }
    }
  }
  current = streak
  return { current, longest }
}

export function CalendarPage() {
  const finishedDays = useWorkoutStore((s) => s.finishedDays)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const months = getMonthsToShow()
  const { current, longest } = getStreaks(finishedDays, currentWeek)

  return (
    <div className="space-y-3 pb-4">
      <div className="flex justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-warning" />
          <div>
            <div className="font-mono font-semibold text-sm">{current}</div>
            <div className="text-[9px] text-muted-foreground">CURRENT</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-destructive" />
          <div>
            <div className="font-mono font-semibold text-sm">{longest}</div>
            <div className="text-[9px] text-muted-foreground">LONGEST</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 text-[9px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-[var(--push-color)]" />{' '}
          Push
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-[var(--pull-color)]" />{' '}
          Pull
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-[var(--legs-color)]" />{' '}
          Legs
        </span>
      </div>

      {months.map((month) => (
        <CalendarMonth
          key={month.toISOString()}
          month={month}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      ))}

      {selectedDate && (
        <CalendarDetail
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}
