'use client'

import { selectLastSession } from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { calcPlates } from '@/lib/workout/plate-calc'
import { generateWarmupSets } from '@/lib/workout/warmup-calc'

interface WarmupTableProps {
  dayIdx: number
  exIdx: number
  exerciseName: string
}

export function WarmupTable({ dayIdx, exIdx, exerciseName }: WarmupTableProps) {
  const lastSession = useWorkoutStore((s) =>
    selectLastSession(s, dayIdx, exIdx)
  )

  if (!lastSession?.sets?.length) return null

  const workingWeight = Math.max(...lastSession.sets.map((s) => s.weight || 0))
  if (workingWeight <= 0) return null

  const warmupSets = generateWarmupSets(workingWeight, exerciseName)
  if (warmupSets.length === 0) return null

  return (
    <div className="mt-2 space-y-1">
      <div className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
        Warm-up (based on {workingWeight}kg)
      </div>
      <table className="w-full font-mono text-[10px]">
        <thead>
          <tr className="text-muted-foreground">
            <th className="w-6 text-left">#</th>
            <th className="text-left">KG</th>
            <th className="text-left">REPS</th>
            <th className="text-left">%</th>
            <th className="text-left">PLATES</th>
          </tr>
        </thead>
        <tbody>
          {warmupSets.map((s, i) => {
            const plates = calcPlates(s.weight, exerciseName)
            const plateStr = plates?.plates.length
              ? plates.plates.join('+')
              : 'bar'
            return (
              <tr key={i} className="text-foreground/80">
                <td>{i + 1}</td>
                <td>{s.weight}kg</td>
                <td>x{s.reps}</td>
                <td>{s.pct ? `${s.pct}%` : 'Bar'}</td>
                <td className="text-muted-foreground">{plateStr}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="font-body text-[9px] text-muted-foreground">
        Rest 45s between warmup sets
      </div>
    </div>
  )
}
