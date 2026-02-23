'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { formatDate, parseLocalDate } from '@/lib/format'
import { useLocale, useT } from '@/lib/i18n'
import { formatDuration } from '@/lib/workout/helpers'
import { api } from '../../../convex/_generated/api'
import { ChartCard } from './chart-card'

export function JourneySummary() {
  const t = useT()
  const locale = useLocale()
  const currentWeek = useCurrentWeek()
  const prefs = useQuery(api.preferences.get)
  const sessions = useQuery(api.sessions.getAll)
  const totalSessionCount = useQuery(api.sessions.count)
  const personalRecords = useQuery(api.personalRecords.getAll)
  const historyEntries = useQuery(api.history.getAll)

  const totalSessions = totalSessionCount ?? 0
  const startDate = prefs?.startDate ?? null
  const prCount = personalRecords?.length ?? 0

  const avgDuration = useMemo(() => {
    if (!sessions) return 0
    const durations = sessions
      .filter((s) => s.finishedAt && s.durationSec && s.durationSec > 0)
      .map((s) => s.durationSec!)
    if (durations.length === 0) return 0
    return Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
  }, [sessions])

  const totalVolume = useMemo(() => {
    if (!historyEntries) return 0
    let vol = 0
    for (const e of historyEntries) {
      if (e.detailedSets) {
        for (const set of e.detailedSets) vol += set.weight * set.reps
      } else {
        vol += e.weight * e.reps
      }
    }
    return vol
  }, [historyEntries])

  const stats = [
    { label: t('sessionsLabel'), value: totalSessions },
    { label: t('weekLabel'), value: currentWeek },
    { label: t('prs'), value: prCount },
    {
      label: t('volumeLabel'),
      value:
        totalVolume >= 1000
          ? `${(totalVolume / 1000).toFixed(1)}t`
          : `${totalVolume}kg`,
    },
    {
      label: t('avgTime'),
      value: avgDuration > 0 ? formatDuration(avgDuration) : '—',
    },
    {
      label: t('sinceLabel'),
      value: startDate
        ? formatDate(
            parseLocalDate(startDate),
            { month: 'short', year: '2-digit' },
            locale
          )
        : '—',
    },
  ]

  return (
    <ChartCard title={t('journey')}>
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
