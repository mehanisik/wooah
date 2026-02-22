'use client'

import { useState } from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useT } from '@/lib/i18n'
import {
  getActiveDayCount,
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { ChartCard } from './chart-card'
import { AXIS_STYLE, CHART_COLORS, TOOLTIP_STYLE } from './chart-theme'

export function WeightProgression() {
  const t = useT()
  const history = useWorkoutStore((s) => s.history)
  const dayCount = useWorkoutStore((s) => getActiveDayCount(s))

  const exerciseOptions: { key: string; name: string }[] = []
  for (let d = 0; d < dayCount; d++) {
    const prog = getEffectiveProgram(d)
    prog.exercises.forEach((ex, eIdx) => {
      const hKey = `d${d}-e${eIdx}`
      if (history[hKey]?.length) {
        exerciseOptions.push({ key: hKey, name: ex.name })
      }
    })
  }

  const [selected, setSelected] = useState(exerciseOptions[0]?.key || '')
  const entries = history[selected] || []
  const last10 = entries.slice(-10)

  const data = last10.map((e, i) => ({
    idx: i + 1,
    weight: e.weight,
  }))

  const latest = last10[last10.length - 1]
  const prev = last10[last10.length - 2]
  const change = latest && prev ? latest.weight - prev.weight : 0

  return (
    <ChartCard
      title={t('progression')}
      headline={latest ? `${latest.weight}kg` : '—'}
      change={change}
      changeLabel="kg"
      action={
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="h-7 w-40 text-[10px]">
            <SelectValue placeholder={t('exercise')} />
          </SelectTrigger>
          <SelectContent>
            {exerciseOptions.map((o) => (
              <SelectItem key={o.key} value={o.key} className="text-xs">
                {o.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
      empty={last10.length === 0}
    >
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={data} barCategoryGap="15%">
          <XAxis
            dataKey="idx"
            tickLine={false}
            axisLine={false}
            {...AXIS_STYLE}
          />
          <YAxis hide />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(val: number) => [`${val}kg`, 'Weight']}
            labelFormatter={() => ''}
          />
          <Bar
            dataKey="weight"
            fill={CHART_COLORS.primary}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
