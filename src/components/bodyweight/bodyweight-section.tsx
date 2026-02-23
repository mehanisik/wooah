'use client'

import { useMutation, useQuery } from 'convex/react'
import { Scale } from 'lucide-react'
import { useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '@/components/stats/chart-card'
import {
  AXIS_STYLE,
  CHART_COLORS,
  TOOLTIP_STYLE,
} from '@/components/stats/chart-theme'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDateCompact } from '@/lib/format'
import { useLocale, useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'

export function BodyweightSection() {
  const t = useT()
  const locale = useLocale()
  const entries = useQuery(api.bodyweight.getAll) ?? []
  const addBodyweightMut = useMutation(api.bodyweight.add)
  const [value, setValue] = useState('')

  const latest = entries[entries.length - 1]
  const first = entries[0]
  const change =
    latest && first ? +(latest.weight - first.weight).toFixed(1) : 0

  const last14 = entries.slice(-14)
  const data = last14.map((e, i) => ({
    label: i % 3 === 0 ? formatDateCompact(new Date(e.date), locale) : '',
    weight: e.weight,
  }))

  const handleSave = () => {
    const w = Number.parseFloat(value)
    if (w >= 30 && w <= 300) {
      addBodyweightMut({ weight: w })
      setValue('')
    }
  }

  return (
    <ChartCard
      title={t('bodyweight')}
      headline={latest ? `${latest.weight}kg` : '—'}
      change={change}
      changeLabel="kg"
    >
      <div className="mb-3 flex gap-2">
        <Input
          type="number"
          min={30}
          max={300}
          step={0.1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={latest ? `${latest.weight}` : 'kg'}
          className="h-8 flex-1 font-mono text-xs"
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
        <Button size="sm" className="h-8 text-xs" onClick={handleSave}>
          <Scale className="mr-1 h-3 w-3" /> {t('save')}
        </Button>
      </div>

      {last14.length > 1 && (
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="bwGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              {...AXIS_STYLE}
              interval={0}
            />
            <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip
              {...TOOLTIP_STYLE}
              formatter={(val: number) => [`${val}kg`, 'Weight']}
              labelFormatter={() => ''}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              fill="url(#bwGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  )
}
