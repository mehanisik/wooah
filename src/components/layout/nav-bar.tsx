'use client'

import {
  BarChart3,
  CalendarDays,
  Camera,
  Check,
  Coffee,
  Info,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { getTodayDayIdx, getWeekDates } from '@/lib/workout/helpers'

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
}

export function NavBar() {
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

  const UTILITY_TABS = [
    { href: '/rest', label: t('navSun'), icon: Coffee },
    { href: '/info', label: t('navInfo'), icon: Info },
    { href: '/stats', label: t('navStats'), icon: BarChart3 },
    { href: '/calendar', label: t('navCal'), icon: CalendarDays },
    { href: '/photos', label: t('navPics'), icon: Camera },
  ]

  const pathname = usePathname()
  const _dateKey = useDateKey()
  const dates = getWeekDates()
  const trainingDays = useWorkoutStore((s) => s.trainingDays)
  const activeProgramId = useWorkoutStore((s) => s.activeProgramId)
  const todayIdx = getTodayDayIdx(trainingDays)
  const finishedDays = useWorkoutStore((s) => s.finishedDays)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const template = getTemplateOrDefault(activeProgramId)
  const sortedTrainingDays = [...trainingDays].sort((a, b) => a - b)

  return (
    <nav className="safe-area-pb fixed right-0 bottom-0 left-0 z-40 border-border border-t bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg">
        <div className="scrollbar-none flex overflow-x-auto">
          {sortedTrainingDays.map((weekday, programDayIdx) => {
            const day = template.days[programDayIdx]
            if (!day) return null
            const href = `/workout/${programDayIdx}`
            const isActive = pathname === href
            const isToday = programDayIdx === todayIdx
            const finished = !!finishedDays[`w${currentWeek}-d${programDayIdx}`]

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
                {finished ? (
                  <Check
                    className={cn(
                      'h-3.5 w-3.5',
                      TYPE_CHECK_COLORS[day.type] || 'text-success'
                    )}
                    strokeWidth={3}
                  />
                ) : (
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full font-mono text-xs tabular-nums',
                      isToday &&
                        cn(
                          'font-semibold text-white',
                          TYPE_COLORS[day.type] || 'bg-primary'
                        )
                    )}
                  >
                    {dates[weekday]}
                  </span>
                )}
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

          <div className="my-2 w-px flex-shrink-0 bg-border" />

          {UTILITY_TABS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            const isSundayToday = href === '/rest' && todayIdx === null
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative flex min-w-[44px] flex-1 flex-col items-center py-2.5 transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full',
                    isSundayToday && 'bg-rest text-white'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="mt-0.5 font-body font-semibold text-[10px] uppercase tracking-wider">
                  {label}
                </span>
                {isActive && (
                  <span className="absolute right-1/4 bottom-0 left-1/4 h-0.5 rounded-full bg-rest" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
