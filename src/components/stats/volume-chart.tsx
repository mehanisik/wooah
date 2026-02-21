'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { ChartCard } from './chart-card'
import { ChartLegend } from './chart-legend'
import {
  AXIS_STYLE,
  CHART_COLORS,
  GRID_STYLE,
  TOOLTIP_STYLE,
} from './chart-theme'

export function VolumeChart() {
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const history = useWorkoutStore((s) => s.history)

  const weeks: { label: string; push: number; pull: number; legs: number }[] =
    []
  const startWeek = Math.max(1, currentWeek - 7)

  for (let w = startWeek; w <= currentWeek; w++) {
    const row = { label: `W${w}`, push: 0, pull: 0, legs: 0 }
    for (let d = 0; d < 6; d++) {
      const prog = getEffectiveProgram(d)
      const type = prog.type as 'push' | 'pull' | 'legs'
      prog.exercises.forEach((_, eIdx) => {
        const entries = history[`d${d}-e${eIdx}`] || []
        const weekEntries = entries.filter((e) => e.week === w)
        for (const e of weekEntries) {
          const vol = e.sets
            ? e.sets.reduce((s, x) => s + x.weight * x.reps, 0)
            : e.weight * e.reps
          if (type in row) row[type] += vol
        }
      })
    }
    weeks.push(row)
  }

  const thisWeek = weeks[weeks.length - 1]
  const prevWeek = weeks[weeks.length - 2]
  const thisTotal = thisWeek ? thisWeek.push + thisWeek.pull + thisWeek.legs : 0
  const prevTotal = prevWeek ? prevWeek.push + prevWeek.pull + prevWeek.legs : 0
  const change = prevTotal > 0 ? Math.round(thisTotal - prevTotal) : 0
  const headlineStr =
    thisTotal >= 1000 ? `${(thisTotal / 1000).toFixed(1)}t` : `${thisTotal}kg`

  const hasData = weeks.some((w) => w.push + w.pull + w.legs > 0)

  return (
    <ChartCard
      title="WEEKLY VOLUME"
      headline={headlineStr}
      change={change}
      changeLabel="kg"
      empty={!hasData}
      footer={
        <ChartLegend
          items={[
            { color: CHART_COLORS.push, label: 'Push' },
            { color: CHART_COLORS.pull, label: 'Pull' },
            { color: CHART_COLORS.legs, label: 'Legs' },
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
              val >= 1000 ? `${(val / 1000).toFixed(1)}t` : `${val}kg`
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
