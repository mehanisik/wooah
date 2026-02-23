'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { formatMonthYear } from '@/lib/format'
import { useLocale, useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { calcWeekNumber } from '@/lib/workout/helpers'
import { api } from '../../../convex/_generated/api'

interface CalendarMonthProps {
  month: Date
  onSelectDate: (date: string) => void
  selectedDate: string | null
}

const typeColors: Record<string, string> = {
  push: 'bg-[var(--push-color)]',
  pull: 'bg-[var(--pull-color)]',
  legs: 'bg-[var(--legs-color)]',
  upper: 'bg-[var(--upper-color)]',
  lower: 'bg-[var(--lower-color)]',
  full: 'bg-[var(--full-color)]',
  chest: 'bg-[var(--chest-color)]',
  back: 'bg-[var(--back-color)]',
  shoulders: 'bg-[var(--shoulders-color)]',
  arms: 'bg-[var(--arms-color)]',
}

export function CalendarMonth({
  month,
  onSelectDate,
  selectedDate,
}: CalendarMonthProps) {
  const t = useT()
  const locale = useLocale()
  const prefs = useQuery(api.preferences.get)
  const sessions = useQuery(api.sessions.getAll)

  const startDate = prefs?.startDate ?? null
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const trainingDays = prefs?.trainingDays ?? [0, 1, 2, 3, 4, 5]
  const template = getTemplateOrDefault(activeProgramId)
  const sortedTrainingDays = [...trainingDays].sort((a, b) => a - b)

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

  const DAY_HEADERS = [
    t('navMon'),
    t('navTue'),
    t('navWed'),
    t('navThu'),
    t('navFri'),
    t('navSat'),
    t('calSun'),
  ]

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
    const weekdayIdx = dow === 0 ? 6 : dow - 1
    const dayIdx = sortedTrainingDays.indexOf(weekdayIdx)
    if (dayIdx === -1) return null

    const week = calcWeekNumber(startDate, date)
    if (week < 1) return null
    const key = `w${week}-d${dayIdx}`
    if (!finishedDays[key]) return null

    return { type: template.days[dayIdx]?.type ?? 'rest', dayIdx, week, key }
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < startCol; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div>
      <div className="mb-2 px-1 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
        {formatMonthYear(month, locale)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={i}
            className="text-center font-mono text-[9px] text-muted-foreground/40"
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const info = getWorkoutInfo(day)
          const dateStr = `${year}-${String(mo + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const selected = selectedDate === dateStr
          return (
            <button
              key={i}
              type="button"
              onClick={() => info && onSelectDate(dateStr)}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-md font-mono text-[11px] transition-colors',
                info
                  ? 'cursor-pointer font-medium'
                  : 'cursor-default text-muted-foreground/30',
                isToday(day) && 'ring-2 ring-primary ring-inset',
                selected && info && 'ring-2 ring-foreground ring-inset'
              )}
            >
              {info && (
                <span
                  className={cn(
                    'absolute inset-0 rounded-md',
                    typeColors[info.type],
                    selected ? 'opacity-30' : 'opacity-15'
                  )}
                />
              )}
              <span className="relative">{day}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
