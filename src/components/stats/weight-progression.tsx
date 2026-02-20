'use client'

import { useState } from 'react'
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

export function WeightProgression() {
  const history = useWorkoutStore((s) => s.history)

  const exerciseOptions: { key: string; name: string }[] = []
  for (let d = 0; d < 6; d++) {
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
  const maxWeight = Math.max(...last10.map((e) => e.weight), 1)

  const latest = last10[last10.length - 1]
  const prev = last10[last10.length - 2]
  const change = latest && prev ? latest.weight - prev.weight : 0

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider">PROGRESSION</h3>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="h-7 w-40 text-[10px]">
            <SelectValue placeholder="Exercise" />
          </SelectTrigger>
          <SelectContent>
            {exerciseOptions.map((o) => (
              <SelectItem key={o.key} value={o.key} className="text-xs">
                {o.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {last10.length === 0 ? (
        <p className="py-4 text-center text-muted-foreground text-xs">
          No data yet
        </p>
      ) : (
        <>
          <div className="flex h-24 items-end gap-1">
            {last10.map((entry, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <span className="mb-0.5 font-mono text-[8px] text-muted-foreground">
                  {entry.weight}
                </span>
                <div
                  className="min-h-[2px] w-full rounded-t-sm bg-primary"
                  style={{ height: `${(entry.weight / maxWeight) * 80}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>Max: {latest?.weight || 0}kg</span>
            {latest?.sets?.[0] && (
              <span>
                Best: {latest.sets[0].weight}×{latest.sets[0].reps}
              </span>
            )}
            {change !== 0 && (
              <span
                className={change > 0 ? 'text-success' : 'text-destructive'}
              >
                {change > 0 ? '+' : ''}
                {change}kg
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
