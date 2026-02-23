'use client'

import { useMutation, useQuery } from 'convex/react'
import { Check } from 'lucide-react'
import { useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useHaptic } from '@/hooks/use-haptic'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'

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
  const t = useT()
  const week = useCurrentWeek()
  const haptic = useHaptic()

  const sets = useQuery(api.sets.getByWeekAndDay, { week, dayIndex: dayIdx })
  const history = useQuery(api.history.getByDayAndExercise, {
    dayIndex: dayIdx,
    exerciseIndex: exIdx,
  })

  const upsertSet = useMutation(api.sets.upsert)
  const startTimer = useMutation(api.sessions.startTimer)

  const log = useMemo(() => {
    if (!sets) return { weight: '', reps: '', done: false }
    const found = sets.find(
      (s: { exerciseIndex: number; setIndex: number }) =>
        s.exerciseIndex === exIdx && s.setIndex === setIdx
    )
    return found
      ? {
          weight: String(found.weight ?? ''),
          reps: String(found.reps ?? ''),
          done: !!found.done,
        }
      : { weight: '', reps: '', done: false }
  }, [sets, exIdx, setIdx])

  const lastSession = useMemo(() => {
    if (!history || history.length === 0) return null
    return history[history.length - 1]
  }, [history])

  const previousSet = lastSession?.detailedSets?.[setIdx]

  if (sets === undefined) {
    return (
      <div className="grid grid-cols-[2rem_1fr_1fr_2.75rem] items-center gap-1.5">
        <span className="text-center font-mono text-muted-foreground text-xs">
          {isAmrap ? 'A' : setIdx + 1}
        </span>
        <div className="h-8 animate-pulse rounded bg-muted" />
        <div className="h-8 animate-pulse rounded bg-muted" />
        <div className="h-9 w-9 animate-pulse rounded-md bg-muted" />
      </div>
    )
  }

  const handleChange = (field: 'weight' | 'reps', value: string) => {
    upsertSet({
      week,
      dayIndex: dayIdx,
      exerciseIndex: exIdx,
      setIndex: setIdx,
      weight: field === 'weight' ? value : log.weight,
      reps: field === 'reps' ? value : log.reps,
      done: log.done,
    })
  }

  const toggleDone = () => {
    haptic()
    let newWeight = log.weight
    let newReps = log.reps

    if (!(log.done || log.weight) && previousSet) {
      newWeight = String(previousSet.weight)
      newReps = String(previousSet.reps)
    }

    const newDone = !log.done

    upsertSet({
      week,
      dayIndex: dayIdx,
      exerciseIndex: exIdx,
      setIndex: setIdx,
      weight: newWeight,
      reps: newReps,
      done: newDone,
    })

    if (newDone) {
      startTimer({ week, dayIndex: dayIdx })
      onStartRest(restSeconds, exerciseName)
    }
  }

  return (
    <div className="grid grid-cols-[2rem_1fr_1fr_2.75rem] items-center gap-1.5">
      <span
        className={cn(
          'text-center font-mono text-xs',
          isAmrap ? 'font-bold text-primary' : 'text-muted-foreground'
        )}
      >
        {isAmrap ? 'A' : setIdx + 1}
      </span>

      <Input
        type="number"
        inputMode="decimal"
        placeholder={
          previousSet ? String(previousSet.weight) : t('kgPlaceholder')
        }
        value={log.weight}
        onChange={(e) => handleChange('weight', e.target.value)}
        className="h-8 px-1 text-center font-mono text-sm placeholder:text-muted-foreground/50 placeholder:italic"
        disabled={log.done}
      />

      <Input
        type="number"
        inputMode="numeric"
        placeholder={
          previousSet ? String(previousSet.reps) : t('repsPlaceholder')
        }
        value={log.reps}
        onChange={(e) => handleChange('reps', e.target.value)}
        className="h-8 px-1 text-center font-mono text-sm placeholder:text-muted-foreground/50 placeholder:italic"
        disabled={log.done}
      />

      <button
        type="button"
        onClick={toggleDone}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-md border transition-all active:scale-95',
          log.done
            ? 'border-success bg-success-dim text-success'
            : 'border-border text-muted-foreground hover:border-foreground'
        )}
        aria-label={log.done ? t('undoSet') : t('completeSet')}
      >
        <Check className="h-4 w-4" />
      </button>
    </div>
  )
}
