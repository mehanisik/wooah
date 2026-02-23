'use client'

import { useQuery } from 'convex/react'
import { Trophy } from 'lucide-react'
import { useMemo } from 'react'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { formatDateShort } from '@/lib/format'
import { useLocale, useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'
import { ChartCard } from './chart-card'

const TROPHY_STYLES = [
  'text-yellow-400 dark:drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]',
  'text-zinc-400 dark:drop-shadow-[0_0_4px_rgba(161,161,170,0.5)]',
  'text-amber-600 dark:drop-shadow-[0_0_4px_rgba(217,119,6,0.5)]',
] as const

export function PersonalRecordsList() {
  const t = useT()
  const locale = useLocale()
  const prefs = useQuery(api.preferences.get)
  const records = useQuery(api.personalRecords.getAll)

  const unit = prefs?.plateSettings?.unit ?? 'kg'
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = getTemplateOrDefault(activeProgramId)
  const dayCount = template.days.length

  const nameMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (let d = 0; d < dayCount; d++) {
      const day = template.days[d]
      if (!day) continue
      day.exercises.forEach((ex, eIdx) => {
        map[`d${d}-e${eIdx}`] = ex.name
      })
    }
    return map
  }, [dayCount, template])

  const entries = useMemo(() => {
    if (!records) return []
    return records
      .map((pr) => ({
        name:
          nameMap[`d${pr.dayIndex}-e${pr.exerciseIndex}`] ||
          pr.exerciseName ||
          `d${pr.dayIndex}-e${pr.exerciseIndex}`,
        volume: pr.bestVolume,
        date: pr.achievedAt,
      }))
      .sort((a, b) => b.volume - a.volume)
  }, [records, nameMap])

  return (
    <ChartCard title={t('personalRecords')} empty={entries.length === 0}>
      <div className="space-y-1">
        {entries.slice(0, 15).map((pr, i) => (
          <div
            key={`${pr.name}-${pr.date}`}
            className="flex items-center gap-2 py-0.5"
          >
            <Trophy
              className={`h-3 w-3 flex-shrink-0 ${
                i < 3 ? TROPHY_STYLES[i] : 'text-warning'
              }`}
            />
            <span className="flex-1 truncate font-body text-xs">{pr.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {pr.volume.toLocaleString()}
              {unit}
            </span>
            <span className="text-[9px] text-muted-foreground">
              {formatDateShort(new Date(pr.date), locale)}
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
