'use client'

import { Trophy } from 'lucide-react'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'

export function PersonalRecordsList() {
  const records = useWorkoutStore((s) => s.personalRecords)

  const nameMap: Record<string, string> = {}
  for (let d = 0; d < 6; d++) {
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

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card px-4 py-3 text-center">
        <p className="text-muted-foreground text-xs">No personal records yet</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <h3 className="mb-2 font-display text-sm tracking-wider">
        PERSONAL RECORDS
      </h3>
      <div className="space-y-1">
        {entries.slice(0, 15).map((pr, i) => (
          <div key={i} className="flex items-center gap-2 py-0.5">
            <Trophy className="h-3 w-3 flex-shrink-0 text-warning" />
            <span className="flex-1 truncate font-body text-xs">{pr.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {pr.volume.toLocaleString()}kg
            </span>
            <span className="text-[9px] text-muted-foreground">
              {new Date(pr.date).toLocaleDateString('en-GB', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
