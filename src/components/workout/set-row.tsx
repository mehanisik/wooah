'use client'

import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useHaptic } from '@/hooks/use-haptic'
import { selectLastSession, selectLog } from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'

interface SetRowProps {
  dayIdx: number
  exIdx: number
  setIdx: number
  isAmrap: boolean
  restSeconds: number
  exerciseName: string
  onStartRest: (sec: number, label: string) => void
}

export function SetRow({
  dayIdx,
  exIdx,
  setIdx,
  isAmrap,
  restSeconds,
  exerciseName,
  onStartRest,
}: SetRowProps) {
  const log = useWorkoutStore((s) => selectLog(s, dayIdx, exIdx, setIdx))
  const setLog = useWorkoutStore((s) => s.setLog)
  const lastSession = useWorkoutStore((s) =>
    selectLastSession(s, dayIdx, exIdx)
  )
  const haptic = useHaptic()

  const previousSet = lastSession?.sets?.[setIdx]

  const startWorkoutTimer = useWorkoutStore((s) => s.startWorkoutTimer)

  const toggleDone = () => {
    haptic()
    const newData = { ...log, done: !log.done }

    if (!(log.done || log.weight) && previousSet) {
      newData.weight = String(previousSet.weight)
      newData.reps = String(previousSet.reps)
    }

    setLog(dayIdx, exIdx, setIdx, newData)

    if (newData.done) {
      startWorkoutTimer(dayIdx)
      onStartRest(restSeconds, exerciseName)
    }
  }

  return (
    <div className="grid grid-cols-[2rem_1fr_1fr_2.5rem] items-center gap-1.5">
      <span
        className={cn(
          'text-center font-mono text-xs',
          isAmrap ? 'font-bold text-brand' : 'text-muted-foreground'
        )}
      >
        {isAmrap ? 'A' : setIdx + 1}
      </span>

      <Input
        type="number"
        inputMode="decimal"
        placeholder={previousSet ? String(previousSet.weight) : 'kg'}
        value={log.weight}
        onChange={(e) =>
          setLog(dayIdx, exIdx, setIdx, { ...log, weight: e.target.value })
        }
        className="h-8 px-1 text-center font-mono text-sm"
        disabled={log.done}
      />

      <Input
        type="number"
        inputMode="numeric"
        placeholder={previousSet ? String(previousSet.reps) : 'reps'}
        value={log.reps}
        onChange={(e) =>
          setLog(dayIdx, exIdx, setIdx, { ...log, reps: e.target.value })
        }
        className="h-8 px-1 text-center font-mono text-sm"
        disabled={log.done}
      />

      <button
        type="button"
        onClick={toggleDone}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md border transition-all active:scale-95',
          log.done
            ? 'border-success bg-success-dim text-success'
            : 'border-border text-muted-foreground hover:border-foreground'
        )}
        aria-label={log.done ? 'Undo set' : 'Complete set'}
      >
        <Check className="h-4 w-4" />
      </button>
    </div>
  )
}
