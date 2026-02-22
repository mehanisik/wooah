'use client'

import { selectLog } from '@/lib/store/selectors'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { calcOneRM } from '@/lib/workout/one-rm'

interface OneRmDisplayProps {
  dayIdx: number
  exIdx: number
}

export function OneRmDisplay({ dayIdx, exIdx }: OneRmDisplayProps) {
  const ex = getEffectiveProgram(dayIdx).exercises[exIdx]
  const amrapSetIdx = ex ? ex.sets - 1 : 0
  const log = useWorkoutStore((s) => selectLog(s, dayIdx, exIdx, amrapSetIdx))

  if (!(ex?.compound && ex.amrap)) return null

  const w = Number.parseFloat(log.weight) || 0
  const r = Number.parseInt(log.reps, 10) || 0
  if (w <= 0 || r <= 0 || !log.done) return null

  const oneRM = calcOneRM(w, r)

  return (
    <div className="font-mono text-[10px] text-primary">
      Est. 1RM: <strong>{oneRM} kg</strong>
    </div>
  )
}
