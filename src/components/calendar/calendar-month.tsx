'use client'

import { PROGRAM } from '@/lib/data/program'
import { formatMonthYear } from '@/lib/format'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'

interface CalendarMonthProps {
  month: Date
  onSelectDate: (date: string) => void
  selectedDate: string | null
}

const DAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const typeColors: Record<string, string> = {
  push: 'bg-[var(--push-color)]',
  pull: 'bg-[var(--pull-color)]',
  legs: 'bg-[var(--legs-color)]',
  rest: 'bg-muted-foreground/30',
}

export function CalendarMonth({
  month,
  onSelectDate,
  selectedDate,
}: CalendarMonthProps) {
  const finishedDays = useWorkoutStore((s) => s.finishedDays)
  const startDate = useWorkoutStore((s) => s.startDate)
  const _currentWeek = useWorkoutStore((s) => s.currentWeek)

  const year = month.getFullYear()
  const mo = month.getMonth()
  const daysInMonth = new Date(year, mo + 1, 0).getDate()
  const firstDow = new Date(year, mo, 1).getDay()
  const startCol = firstDow === 0 ? 6 : firstDow - 1

  const today = new Date()
  const isToday = (day: number) =>
    year === today.getFullYear() &&
    mo === today.getMonth() &&
    day === today.getDate()

  const getWorkoutInfo = (day: number) => {
    if (!startDate) return null
    const date = new Date(year, mo, day)
    const dow = date.getDay()
    const dayIdx = dow === 0 ? 6 : dow - 1
    if (dayIdx >= 6) return null

    const msPerWeek = 7 * 24 * 60 * 60 * 1000
    const startMonday = new Date(startDate)
    startMonday.setDate(
      startMonday.getDate() - ((startMonday.getDay() + 6) % 7)
    )
    const dateMonday = new Date(date)
    dateMonday.setDate(dateMonday.getDate() - ((dateMonday.getDay() + 6) % 7))

    const week = Math.max(
      1,
      Math.floor((dateMonday.getTime() - startMonday.getTime()) / msPerWeek) + 1
    )
    const key = `w${week}-d${dayIdx}`
    if (!finishedDays[key]) return null

    return { type: PROGRAM[dayIdx].type, dayIdx, week, key }
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < startCol; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const monthName = formatMonthYear(month)

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className="mb-1.5 text-center font-display text-xs tracking-wider">
        {monthName.toUpperCase()}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={i}
            className="text-center font-mono text-[9px] text-muted-foreground"
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const info = getWorkoutInfo(day)
          const dateStr = `${year}-${String(mo + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          return (
            <button
              key={i}
              type="button"
              onClick={() => info && onSelectDate(dateStr)}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-sm font-mono text-[10px]',
                isToday(day) && 'ring-1 ring-primary',
                selectedDate === dateStr && 'ring-1 ring-foreground',
                info
                  ? 'cursor-pointer'
                  : 'cursor-default text-muted-foreground/60'
              )}
            >
              {day}
              {info && (
                <span
                  className={cn(
                    'absolute bottom-0.5 h-1.5 w-1.5 rounded-full',
                    typeColors[info.type]
                  )}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
