'use client'

import { useQuery } from 'convex/react'
import { Coffee, Dumbbell, Trophy } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { MesoBanner } from '@/components/mesocycle/meso-banner'
import { useAuth } from '@/hooks/auth-context'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { formatDateFull } from '@/lib/format'
import { useLocale, useRestQuotes, useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { getTodayDayIdx } from '@/lib/workout/helpers'
import { api } from '../../../convex/_generated/api'

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

const TYPE_DOT_COLORS: Record<string, string> = {
  push: 'border-push',
  pull: 'border-pull',
  legs: 'border-legs',
  upper: 'border-upper',
  lower: 'border-lower',
  full: 'border-full',
  chest: 'border-chest',
  back: 'border-back',
  shoulders: 'border-shoulders',
  arms: 'border-arms',
  power_upper: 'border-upper',
  power_lower: 'border-lower',
}

const TYPE_FILL_COLORS: Record<string, string> = {
  push: 'bg-push',
  pull: 'bg-pull',
  legs: 'bg-legs',
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

export function DashboardPage() {
  const t = useT()
  const locale = useLocale()
  const restQuotes = useRestQuotes()
  const { isAuthenticated } = useAuth()
  const currentWeek = useCurrentWeek()

  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')
  const weekSessions = useQuery(
    api.sessions.getByWeek,
    isAuthenticated ? { week: currentWeek } : 'skip'
  )
  const allPRs = useQuery(
    api.personalRecords.getAll,
    isAuthenticated ? {} : 'skip'
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

  const finishedDays = useMemo(() => {
    const set = new Set<number>()
    if (weekSessions) {
      for (const s of weekSessions) {
        if (s.finishedAt != null) set.add(s.dayIndex)
      }
    }
    return set
  }, [weekSessions])

  const todayFinished = todayIdx !== null && finishedDays.has(todayIdx)
  const todayWorkout =
    todayIdx !== null ? (template.days[todayIdx] ?? null) : null
  const isRestDay = todayIdx === null

  const hour = new Date().getHours()
  let timeGreeting: string
  if (hour < 6) timeGreeting = t('greetingLateNight')
  else if (hour < 12) timeGreeting = t('greetingMorning')
  else if (hour < 17) timeGreeting = t('greetingAfternoon')
  else if (hour < 21) timeGreeting = t('greetingEvening')
  else timeGreeting = t('greetingLateNight')

  const dateStr = formatDateFull(new Date(), locale)

  const recentPRs = useMemo(() => {
    if (!allPRs || allPRs.length === 0) return []
    return [...allPRs]
      .sort(
        (a, b) =>
          new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime()
      )
      .slice(0, 3)
  }, [allPRs])

  const [restQuote] = useState(
    () => restQuotes[Math.floor(Math.random() * restQuotes.length)]
  )

  return (
    <div className="space-y-4 pb-4">
      {/* Greeting */}
      <div className="rounded-lg border border-border bg-card px-4 py-3">
        <div className="font-display text-lg tracking-wider">
          {timeGreeting}
        </div>
        <div className="mt-0.5 font-body text-muted-foreground text-sm">
          {dateStr}
        </div>
      </div>

      {/* Today's workout OR Rest day */}
      {isRestDay && (
        <div className="rounded-lg border border-border bg-card px-4 py-4 text-center">
          <Coffee className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-2 font-display text-lg tracking-wider">
            {t('restDay')}
          </h3>
          <p className="mt-1 font-body text-muted-foreground text-xs italic">
            &ldquo;{restQuote}&rdquo;
          </p>
          <div className="mt-3 font-mono text-2xl text-primary">
            {completedThisWeek}
            <span className="ml-1 font-body text-muted-foreground text-sm">
              {t('thisWeek', { total: dayCount })}
            </span>
          </div>
        </div>
      )}

      {!isRestDay && todayWorkout && (
        <div className="rounded-lg border border-border bg-card px-4 py-4">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'rounded-md px-2 py-0.5 font-display text-[10px] text-white uppercase tracking-wider',
                TYPE_COLORS[todayWorkout.type] || 'bg-primary'
              )}
            >
              {todayWorkout.type}
            </span>
            <span className="font-display text-sm tracking-wider">
              {t('todayWorkout')}
            </span>
            {todayFinished && (
              <span className="ml-auto rounded-md bg-success/10 px-2 py-0.5 font-body text-[10px] text-success">
                {t('workoutCompleted')}
              </span>
            )}
          </div>
          <h3 className="mt-2 font-body font-semibold">{todayWorkout.name}</h3>
          <p className="font-body text-muted-foreground text-xs">
            {todayWorkout.focus}
          </p>
          <div className="mt-2 font-body text-muted-foreground text-xs">
            {todayWorkout.exercises
              .slice(0, 4)
              .map((e) => e.name)
              .join(' · ')}
            {todayWorkout.exercises.length > 4 && ' …'}
          </div>
          <div className="mt-1 flex gap-3 font-body text-[10px] text-muted-foreground">
            <span>
              {t('exercisesCount', {
                count: todayWorkout.exercises.length,
              })}
            </span>
            <span>
              {t('estDuration', {
                minutes: todayWorkout.exercises.length * 4,
              })}
            </span>
          </div>
          {!todayFinished && (
            <Link
              href={`/workout/${todayIdx}`}
              className={cn(
                'mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 font-display text-sm text-white tracking-wider transition-colors',
                TYPE_COLORS[todayWorkout.type] || 'bg-primary'
              )}
            >
              <Dumbbell className="h-4 w-4" />
              {t('startWorkout')}
            </Link>
          )}
        </div>
      )}

      {/* This week */}
      <div className="rounded-lg border border-border bg-card px-4 py-3">
        <h3 className="font-display text-xs tracking-wider">
          {t('thisWeekProgress')}
        </h3>
        <div className="mt-2 flex items-center justify-center gap-2">
          {template.days.map((day, i) => {
            const finished = finishedDays.has(i)
            const isTodayDot = i === todayIdx
            return (
              <div
                key={day.day}
                className={cn(
                  'h-3.5 w-3.5 rounded-full border-2 transition-colors',
                  finished
                    ? TYPE_FILL_COLORS[day.type] || 'bg-primary'
                    : TYPE_DOT_COLORS[day.type] || 'border-muted-foreground/30',
                  finished && 'border-transparent',
                  isTodayDot && !finished && 'ring-1 ring-foreground/20'
                )}
              />
            )
          })}
        </div>
        <div className="mt-2 text-center font-body text-muted-foreground text-xs">
          {completedThisWeek} / {dayCount}
        </div>
      </div>

      {/* Recent PRs */}
      {recentPRs.length > 0 && (
        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <h3 className="font-display text-xs tracking-wider">
            {t('recentPRs')}
          </h3>
          <div className="mt-2 space-y-2">
            {recentPRs.map((pr) => (
              <div
                key={`${pr.dayIndex}-${pr.exerciseIndex}`}
                className="flex items-center gap-2"
              >
                <Trophy className="h-3.5 w-3.5 text-success" />
                <span className="flex-1 truncate font-body text-xs">
                  {pr.exerciseName}
                </span>
                <span className="font-mono text-muted-foreground text-xs">
                  {pr.bestWeight != null && pr.bestReps != null
                    ? `${pr.bestWeight}×${pr.bestReps}`
                    : `${pr.bestVolume} vol`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meso banner */}
      <MesoBanner />
    </div>
  )
}
