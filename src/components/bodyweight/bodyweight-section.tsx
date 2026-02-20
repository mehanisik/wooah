'use client'

import { Scale } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useWorkoutStore } from '@/lib/store/use-workout-store'

export function BodyweightSection() {
  const entries = useWorkoutStore((s) => s.bodyweight)
  const addBodyweight = useWorkoutStore((s) => s.addBodyweight)
  const [value, setValue] = useState('')

  const latest = entries[entries.length - 1]
  const first = entries[0]
  const change =
    latest && first ? +(latest.weight - first.weight).toFixed(1) : 0
  const last14 = entries.slice(-14)
  const maxW = Math.max(...last14.map((e) => e.weight), 1)
  const minW = Math.min(...last14.map((e) => e.weight), maxW)
  const range = maxW - minW || 1

  const handleSave = () => {
    const w = Number.parseFloat(value)
    if (w >= 30 && w <= 300) {
      addBodyweight(w)
      setValue('')
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <h3 className="mb-2 font-display text-sm tracking-wider">BODYWEIGHT</h3>
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
          <Scale className="mr-1 h-3 w-3" /> SAVE
        </Button>
      </div>

      {latest && (
        <div className="mb-3 flex gap-4 text-[10px]">
          <span className="text-muted-foreground">
            Current:{' '}
            <span className="font-mono text-foreground">{latest.weight}kg</span>
          </span>
          {change !== 0 && (
            <span className={change > 0 ? 'text-success' : 'text-destructive'}>
              {change > 0 ? '+' : ''}
              {change}kg
            </span>
          )}
        </div>
      )}

      {last14.length > 1 && (
        <div className="flex h-16 items-end gap-1">
          {last14.map((entry, i) => (
            <div
              key={i}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <div
                className="min-h-[2px] w-full rounded-t-sm bg-primary/60"
                style={{
                  height: `${15 + ((entry.weight - minW) / range) * 80}%`,
                }}
              />
              {i % 3 === 0 && (
                <span className="mt-0.5 font-mono text-[7px] text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString('en-GB', {
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
