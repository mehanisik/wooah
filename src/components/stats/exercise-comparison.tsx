'use client'

import { useState } from 'react'
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
  const dataB = filterByRange(oneRmHistory[exB] || [])
  const maxVal = Math.max(
    ...dataA.map((e) => e.value),
    ...dataB.map((e) => e.value),
    1
  )

  const ranges: Range[] = ['all', '6m', '3m', '1m']

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <h3 className="mb-2 font-display text-sm tracking-wider">1RM COMPARE</h3>
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
      <div className="mb-3 flex justify-center gap-1">
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
      {dataA.length === 0 && dataB.length === 0 ? (
        <p className="py-4 text-center text-muted-foreground text-xs">
          No 1RM data yet
        </p>
      ) : (
        <div className="flex h-28 gap-2">
          <div className="flex-1">
            <div className="mb-1 truncate text-center text-[9px] text-muted-foreground">
              {nameMap[exA] || '—'}
            </div>
            <div className="flex h-20 items-end gap-0.5">
              {dataA.slice(-10).map((e, i) => (
                <div
                  key={i}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div
                    className="min-h-[2px] w-full rounded-t-sm bg-primary"
                    style={{ height: `${(e.value / maxVal) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-px bg-border" />
          <div className="flex-1">
            <div className="mb-1 truncate text-center text-[9px] text-muted-foreground">
              {nameMap[exB] || '—'}
            </div>
            <div className="flex h-20 items-end gap-0.5">
              {dataB.slice(-10).map((e, i) => (
                <div
                  key={i}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div
                    className="min-h-[2px] w-full rounded-t-sm bg-secondary-foreground/50"
                    style={{ height: `${(e.value / maxVal) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
