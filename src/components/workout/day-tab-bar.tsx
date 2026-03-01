'use client'

import { useQuery } from 'convex/react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth-context'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { getTodayDayIdx, getWeekDates } from '@/lib/workout/helpers'
import { api } from '../../../convex/_generated/api'

function useDateKey() {
  const [key, setKey] = useState(() => new Date().toDateString())
  useEffect(() => {
    const update = () => setKey(new Date().toDateString())
    const onVisible = () => {
      if (document.visibilityState === 'visible') update()
    }
    document.addEventListener('visibilitychange', onVisible)
    const timer = setInterval(update, 60_000)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      clearInterval(timer)
    }
  }, [])
  return key
}

const TYPE_COLORS: Record<string, string> = {
  push: 'bg-push',
  pull: 'bg-pull',
  legs: 'bg-legs',
  rest: 'bg-rest',
  upper: 'bg-upper',
  lower: 'bg-lower',
  full: 'bg-full',
  chest: 'bg-chest',
  back: 'bg-back',
  shoulders: 'bg-shoulders',
  arms: 'bg-arms',
  power_upper: 'bg-upper',
  power_lower: 'bg-lower',
}

const TYPE_CHECK_COLORS: Record<string, string> = {
  push: 'text-push',
  pull: 'text-pull',
  legs: 'text-legs',
  upper: 'text-upper',
  lower: 'text-lower',
  full: 'text-full',
  chest: 'text-chest',
  back: 'text-back',
  shoulders: 'text-shoulders',
  arms: 'text-arms',
  power_upper: 'text-upper',
  power_lower: 'text-lower',
}

export function DayTabBar({ activeDayIdx }: { activeDayIdx: number }) {
  const t = useT()
  const WEEKDAY_LABELS = [
    t('navMon'),
    t('navTue'),
    t('navWed'),
    t('navThu'),
    t('navFri'),
    t('navSat'),
    t('navSun'),
  ]

  const _dateKey = useDateKey()
  const dates = getWeekDates()
  const { isAuthenticated } = useAuth()

  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')
  const currentWeek = useCurrentWeek()
  const weekSessions = useQuery(
    api.sessions.getByWeek,
    isAuthenticated ? { week: currentWeek } : 'skip'
  )

  const trainingDays = prefs?.trainingDays ?? [0, 1, 2, 3, 4, 5]
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = getTemplateOrDefault(activeProgramId)

  const finishedDays = new Set<number>()
  if (weekSessions) {
    for (const s of weekSessions) {
      if (s.finishedAt != null) finishedDays.add(s.dayIndex)
    }
  }

  const todayIdx = getTodayDayIdx(trainingDays)
  const sortedTrainingDays = [...trainingDays].sort((a, b) => a - b)

  return (
    <div className="scrollbar-none -mx-4 mb-4 flex overflow-x-auto border-border border-b">
      {sortedTrainingDays.map((weekday, programDayIdx) => {
        const day = template.days[programDayIdx]
        if (!day) return null
        const href = `/workout/${programDayIdx}`
        const isActive = programDayIdx === activeDayIdx
        const isToday = programDayIdx === todayIdx
        const finished = finishedDays.has(programDayIdx)

        return (
          <Link
            key={weekday}
            href={href}
            className={cn(
              'relative flex min-w-[44px] flex-1 flex-col items-center py-2.5 transition-colors',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="font-body font-semibold text-[10px] uppercase tracking-wider">
              {WEEKDAY_LABELS[weekday]}
            </span>
            <span
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full',
                !finished && 'font-mono text-xs tabular-nums',
                isToday && 'font-semibold text-white',
                isToday && (TYPE_COLORS[day.type] || 'bg-primary')
              )}
            >
              {finished ? (
                <Check
                  className={cn(
                    'h-3.5 w-3.5',
                    isToday
                      ? 'text-white'
                      : TYPE_CHECK_COLORS[day.type] || 'text-success'
                  )}
                  strokeWidth={3}
                />
              ) : (
                dates[weekday]
              )}
            </span>
            {isActive && (
              <span
                className={cn(
                  'absolute right-1/4 bottom-0 left-1/4 h-0.5 rounded-full',
                  TYPE_COLORS[day.type] || 'bg-primary'
                )}
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}
