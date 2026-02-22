'use client'

import { formatDate } from '@/lib/format'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { formatDuration } from '@/lib/workout/helpers'
import { ChartCard } from './chart-card'

export function JourneySummary() {
  const totalSessions = useWorkoutStore((s) => s.totalSessions)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const startDate = useWorkoutStore((s) => s.startDate)
  const prCount = useWorkoutStore((s) => Object.keys(s.personalRecords).length)
  const timers = useWorkoutStore((s) => s.workoutTimers)

  const durations = Object.values(timers)
    .filter((t) => t.duration > 0)
    .map((t) => t.duration)
  const avgDuration =
    durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0

  const totalVolume = useWorkoutStore((s) => {
    let vol = 0
    for (const entries of Object.values(s.history)) {
      for (const e of entries) {
        if (e.sets) {
          for (const set of e.sets) vol += set.weight * set.reps
        } else {
          vol += e.weight * e.reps
        }
      }
    }
    return vol
  })

  const stats = [
    { label: 'SESSIONS', value: totalSessions },
    { label: 'WEEK', value: currentWeek },
    { label: 'PRs', value: prCount },
    {
      label: 'VOLUME',
      value:
        totalVolume >= 1000
          ? `${(totalVolume / 1000).toFixed(1)}t`
          : `${totalVolume}kg`,
    },
    {
      label: 'AVG TIME',
      value: avgDuration > 0 ? formatDuration(avgDuration) : '—',
    },
    {
      label: 'SINCE',
      value: startDate
        ? formatDate(new Date(startDate), { month: 'short', year: '2-digit' })
        : '—',
    },
  ]

  return (
    <ChartCard title="JOURNEY">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-md bg-muted/50 px-2 py-1.5 text-center dark:bg-white/[0.03]"
          >
            <div className="font-mono font-semibold text-lg">{s.value}</div>
            <div className="text-[10px] text-muted-foreground tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
