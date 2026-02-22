'use client'

import { Trophy } from 'lucide-react'
import { formatDateShort } from '@/lib/format'
import { useLocale, useT } from '@/lib/i18n'
import {
  getActiveDayCount,
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { ChartCard } from './chart-card'

const TROPHY_STYLES = [
  'text-yellow-400 dark:drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]',
  'text-zinc-400 dark:drop-shadow-[0_0_4px_rgba(161,161,170,0.5)]',
  'text-amber-600 dark:drop-shadow-[0_0_4px_rgba(217,119,6,0.5)]',
] as const

export function PersonalRecordsList() {
  const t = useT()
  const locale = useLocale()
  const records = useWorkoutStore((s) => s.personalRecords)

  const dayCount = useWorkoutStore((s) => getActiveDayCount(s))

  const nameMap: Record<string, string> = {}
  for (let d = 0; d < dayCount; d++) {
    const prog = getEffectiveProgram(d)
    prog.exercises.forEach((ex, eIdx) => {
      nameMap[`d${d}-e${eIdx}`] = ex.name
    })
  }

  const entries = Object.entries(records)
    .map(([key, pr]) => ({
      name: nameMap[key] || key,
      volume: pr.volume,
      date: pr.date,
    }))
    .sort((a, b) => b.volume - a.volume)

  return (
    <ChartCard title={t('personalRecords')} empty={entries.length === 0}>
      <div className="space-y-1">
        {entries.slice(0, 15).map((pr, i) => (
          <div key={i} className="flex items-center gap-2 py-0.5">
            <Trophy
              className={`h-3 w-3 flex-shrink-0 ${
                i < 3 ? TROPHY_STYLES[i] : 'text-warning'
              }`}
            />
            <span className="flex-1 truncate font-body text-xs">{pr.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {pr.volume.toLocaleString()}kg
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
