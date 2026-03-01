'use client'

import { useQuery } from 'convex/react'
import { useMemo, useState } from 'react'
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
import { useTemplate } from '@/hooks/use-template'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'
import { ChartCard } from './chart-card'
import { AXIS_STYLE, CHART_COLORS, TOOLTIP_STYLE } from './chart-theme'

export function WeightProgression() {
  const t = useT()
  const prefs = useQuery(api.preferences.get)
  const historyEntries = useQuery(api.history.getAll)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = useTemplate(activeProgramId)
  const dayCount = template?.days.length ?? 0

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

  const exerciseOptions = useMemo(() => {
    const opts: { key: string; name: string }[] = []
    for (let d = 0; d < dayCount; d++) {
      const day = template?.days[d]
      if (!day) continue
      day.exercises.forEach((ex, eIdx) => {
        const hKey = `d${d}-e${eIdx}`
        if (historyMap[hKey]?.length) {
          opts.push({ key: hKey, name: ex.name })
        }
      })
    }
    return opts
  }, [dayCount, template, historyMap])

  const [selected, setSelected] = useState(exerciseOptions[0]?.key || '')
  const entries = historyMap[selected] || []
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
