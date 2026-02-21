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
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { ChartCard } from './chart-card'
import { CHART_COLORS, TOOLTIP_STYLE } from './chart-theme'

type Range = 'all' | '6m' | '3m' | '1m'

export function ExerciseComparison() {
  const oneRmHistory = useWorkoutStore((s) => s.oneRmHistory)

  const keys = Object.keys(oneRmHistory).filter(
    (k) => oneRmHistory[k].length > 0
  )
  const [exA, setExA] = useState(keys[0] || '')
  const [exB, setExB] = useState(keys[1] || '')
  const [range, setRange] = useState<Range>('all')

  const nameMap: Record<string, string> = {}
  for (let d = 0; d < 6; d++) {
    const prog = getEffectiveProgram(d)
    prog.exercises.forEach((ex, eIdx) => {
      nameMap[`d${d}-e${eIdx}`] = ex.name
    })
  }

  const filterByRange = (entries: { date: string; value: number }[]) => {
    if (range === 'all') return entries
    const now = Date.now()
    let ms: number
    if (range === '6m') ms = 180
    else if (range === '3m') ms = 90
    else ms = 30
    const cutoff = now - ms * 24 * 60 * 60 * 1000
    return entries.filter((e) => new Date(e.date).getTime() >= cutoff)
  }

  const dataA = filterByRange(oneRmHistory[exA] || [])
    .slice(-10)
    .map((e, i) => ({ idx: i + 1, value: e.value }))
  const dataB = filterByRange(oneRmHistory[exB] || [])
    .slice(-10)
    .map((e, i) => ({ idx: i + 1, value: e.value }))

  const ranges: Range[] = ['all', '6m', '3m', '1m']
  const empty = dataA.length === 0 && dataB.length === 0

  return (
    <ChartCard
      title="1RM COMPARE"
      action={
        <div className="flex gap-1">
          {ranges.map((r) => (
            <Button
              key={r}
              variant={range === r ? 'default' : 'outline'}
              size="sm"
              className="h-6 px-2 text-[10px]"
              onClick={() => setRange(r)}
            >
              {r.toUpperCase()}
            </Button>
          ))}
        </div>
      }
      empty={empty}
    >
      <div className="mb-2 flex gap-2">
        <Select value={exA} onValueChange={setExA}>
          <SelectTrigger className="h-7 flex-1 text-[10px]">
            <SelectValue placeholder="Exercise A" />
          </SelectTrigger>
          <SelectContent>
            {keys.map((k) => (
              <SelectItem key={k} value={k} className="text-xs">
                {nameMap[k] || k}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={exB} onValueChange={setExB}>
          <SelectTrigger className="h-7 flex-1 text-[10px]">
            <SelectValue placeholder="Exercise B" />
          </SelectTrigger>
          <SelectContent>
            {keys.map((k) => (
              <SelectItem key={k} value={k} className="text-xs">
                {nameMap[k] || k}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="mb-1 truncate text-center text-[9px] text-muted-foreground">
            {nameMap[exA] || '—'}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={dataA} barCategoryGap="15%">
              <XAxis hide />
              <YAxis hide />
              <Tooltip
                {...TOOLTIP_STYLE}
                formatter={(val: number) => [`${val}kg`, '1RM']}
                labelFormatter={() => ''}
              />
              <Bar
                dataKey="value"
                fill={CHART_COLORS.primary}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1">
          <div className="mb-1 truncate text-center text-[9px] text-muted-foreground">
            {nameMap[exB] || '—'}
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={dataB} barCategoryGap="15%">
              <XAxis hide />
              <YAxis hide />
              <Tooltip
                {...TOOLTIP_STYLE}
                formatter={(val: number) => [`${val}kg`, '1RM']}
                labelFormatter={() => ''}
              />
              <Bar
                dataKey="value"
                fill={CHART_COLORS.muted}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  )
}
