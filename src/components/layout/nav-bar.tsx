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
import { PROGRAM } from '@/lib/data/program'
import { useT } from '@/lib/i18n'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { getTodayDayIdx, getWeekDates } from '@/lib/workout/helpers'

const TYPE_COLORS: Record<string, string> = {
  push: 'bg-push',
  pull: 'bg-pull',
  legs: 'bg-legs',
  rest: 'bg-rest',
}

const TYPE_CHECK_COLORS: Record<string, string> = {
  push: 'text-push',
  pull: 'text-pull',
  legs: 'text-legs',
}

export function NavBar() {
  const t = useT()
  const DAY_LABELS = [
    t('navMon'),
    t('navTue'),
    t('navWed'),
    t('navThu'),
    t('navFri'),
    t('navSat'),
  ]

  const UTILITY_TABS = [
    { href: '/rest', label: t('navSun'), icon: Coffee },
    { href: '/info', label: t('navInfo'), icon: Info },
    { href: '/stats', label: t('navStats'), icon: BarChart3 },
    { href: '/calendar', label: t('navCal'), icon: CalendarDays },
    { href: '/photos', label: t('navPics'), icon: Camera },
  ]

  const pathname = usePathname()
  const dates = getWeekDates()
  const todayIdx = getTodayDayIdx()
  const finishedDays = useWorkoutStore((s) => s.finishedDays)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)

  return (
    <nav className="safe-area-pb fixed right-0 bottom-0 left-0 z-40 border-border border-t bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg">
        <div className="scrollbar-none flex overflow-x-auto">
          {DAY_LABELS.map((label, i) => {
            const day = PROGRAM[i]
            const href = `/workout/${i}`
            const isActive = pathname === href
            const isToday = i === todayIdx
            const finished = !!finishedDays[`w${currentWeek}-d${i}`]

            return (
              <Link
                key={i}
                href={href}
                className={cn(
                  'relative flex min-w-[44px] flex-1 flex-col items-center py-2.5 transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="font-body font-semibold text-[10px] uppercase tracking-wider">
                  {label}
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
                    {dates[i]}
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
            const isSundayToday = href === '/rest' && todayIdx === 6
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
