'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'
import { ChartCard } from './chart-card'
import { ChartLegend } from './chart-legend'
import {
  AXIS_STYLE,
  CHART_COLORS,
  GRID_STYLE,
  TOOLTIP_STYLE,
} from './chart-theme'

export function VolumeChart() {
  const t = useT()
  const currentWeek = useCurrentWeek()
  const prefs = useQuery(api.preferences.get)
  const historyEntries = useQuery(api.history.getAll)

  const unit = prefs?.plateSettings?.unit ?? 'kg'
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = getTemplateOrDefault(activeProgramId)
  const dayCount = template.days.length

  const historyMap = useMemo(() => {
    if (!historyEntries)
      return {} as Record<string, NonNullable<typeof historyEntries>>
    const map: Record<string, NonNullable<typeof historyEntries>> = {}
    for (const e of historyEntries) {
      const key = `d${e.dayIndex}-e${e.exerciseIndex}`
      if (!map[key]) map[key] = []
      map[key].push(e)
    }
    return map
  }, [historyEntries])

  const weeks = useMemo(() => {
    const result: {
      label: string
      push: number
      pull: number
      legs: number
    }[] = []
    const startWeek = Math.max(1, currentWeek - 7)

    for (let w = startWeek; w <= currentWeek; w++) {
      const row = { label: `W${w}`, push: 0, pull: 0, legs: 0 }
      for (let d = 0; d < dayCount; d++) {
        const day = template.days[d]
        const type = day?.type as 'push' | 'pull' | 'legs'
        if (!day) continue
        day.exercises.forEach((_, eIdx) => {
          const entries = historyMap[`d${d}-e${eIdx}`] || []
          const weekEntries = entries.filter((e) => e.week === w)
          for (const e of weekEntries) {
            const vol = e.detailedSets
              ? e.detailedSets.reduce(
                  (s: number, x: { weight: number; reps: number }) =>
                    s + x.weight * x.reps,
                  0
                )
              : e.weight * e.reps
            if (type in row) row[type] += vol
          }
        })
      }
      result.push(row)
    }
    return result
  }, [currentWeek, dayCount, template, historyMap])

  const thisWeek = weeks[weeks.length - 1]
  const prevWeek = weeks[weeks.length - 2]
  const thisTotal = thisWeek ? thisWeek.push + thisWeek.pull + thisWeek.legs : 0
  const prevTotal = prevWeek ? prevWeek.push + prevWeek.pull + prevWeek.legs : 0
  const change = prevTotal > 0 ? Math.round(thisTotal - prevTotal) : 0
  const headlineStr =
    thisTotal >= 1000
      ? `${(thisTotal / 1000).toFixed(1)}t`
      : `${thisTotal}${unit}`

  const hasData = weeks.some((w) => w.push + w.pull + w.legs > 0)

  return (
    <ChartCard
      title={t('weeklyVolume')}
      headline={headlineStr}
      change={change}
      changeLabel={unit}
      empty={!hasData}
      footer={
        <ChartLegend
          items={[
            { color: CHART_COLORS.push, label: t('push') },
            { color: CHART_COLORS.pull, label: t('pull') },
            { color: CHART_COLORS.legs, label: t('legs') },
          ]}
        />
      }
    >
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={weeks} barCategoryGap="20%">
          <CartesianGrid vertical={false} {...GRID_STYLE} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            {...AXIS_STYLE}
          />
          <YAxis hide />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(val: number) =>
              val >= 1000 ? `${(val / 1000).toFixed(1)}t` : `${val}${unit}`
            }
          />
          <Bar
            dataKey="push"
            stackId="vol"
            fill={CHART_COLORS.push}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="pull"
            stackId="vol"
            fill={CHART_COLORS.pull}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="legs"
            stackId="vol"
            fill={CHART_COLORS.legs}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
