'use client'

import { ChevronDown, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { useExerciseGif } from '@/hooks/use-exercise-gif'
import type { Exercise } from '@/lib/data/program'
import {
  selectExtraSets,
  selectLog,
  useDisplayName,
} from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { formatRest } from '@/lib/workout/helpers'
import { isSupersetExercise } from '@/lib/workout/superset'
import { SetRow } from './set-row'

interface ExerciseCardProps {
  dayIdx: number
  exIdx: number
  exercise: Exercise
  isCustom?: boolean
  onRemove?: () => void
  onStartRest: (sec: number, label: string) => void
}

export function ExerciseCard({
  dayIdx,
  exIdx,
  exercise,
  isCustom,
  onRemove,
  onStartRest,
}: ExerciseCardProps) {
  const [open, setOpen] = useState(false)
  const [showGif, setShowGif] = useState(false)
  const displayName = useDisplayName(dayIdx, exIdx)
  const gifUrl = useExerciseGif(displayName)
  const extraSets = useWorkoutStore((s) => selectExtraSets(s, dayIdx, exIdx))
  const addExtraSet = useWorkoutStore((s) => s.addExtraSet)
  const totalSets = exercise.sets + extraSets
  const isSuperset = isSupersetExercise(dayIdx, exIdx)

  const allDone = useWorkoutStore((s) =>
    Array.from(
      { length: exercise.sets + selectExtraSets(s, dayIdx, exIdx) },
      (_, i) => selectLog(s, dayIdx, exIdx, i)
    ).every((l) => l.done)
  )

  const completedCount = useWorkoutStore(
    (s) =>
      Array.from(
        { length: exercise.sets + selectExtraSets(s, dayIdx, exIdx) },
        (_, i) => selectLog(s, dayIdx, exIdx, i)
      ).filter((l) => l.done).length
  )

  return (
    <div
      className={cn(
        'rounded-md border transition-colors',
        allDone ? 'border-success bg-success-dim/30' : 'border-border bg-card'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
        aria-expanded={open}
      >
        {gifUrl ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowGif(!showGif)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation()
                e.preventDefault()
                setShowGif(!showGif)
              }
            }}
            className="relative h-7 w-7 flex-shrink-0 cursor-pointer overflow-hidden rounded-full"
            aria-label="Show exercise demo"
          >
            <Image
              src={gifUrl}
              alt=""
              className="h-full w-full object-cover"
              width={28}
              height={28}
              unoptimized
            />
            <span
              className={cn(
                'absolute inset-0 rounded-full ring-2 ring-inset',
                allDone ? 'ring-success' : 'ring-surface-2'
              )}
            />
          </button>
        ) : (
          <span
            className={cn(
              'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-bold font-mono text-xs',
              allDone
                ? 'bg-success-dim text-success'
                : 'bg-surface-2 text-muted-foreground'
            )}
          >
            {exIdx + 1}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-body font-semibold text-sm">
              {displayName}
            </span>
            {isSuperset && (
              <Badge
                variant="outline"
                className="border-warning px-1 py-0 text-[9px] text-warning"
              >
                SS
              </Badge>
            )}
          </div>
          <span className="font-body text-[11px] text-muted-foreground">
            {exercise.sets}×{exercise.reps} · RIR {exercise.rir} ·{' '}
            {formatRest(exercise.rest)}
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          {completedCount}/{totalSets}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {showGif && gifUrl && (
        <div className="relative mx-3 mb-2 overflow-hidden rounded-md bg-surface">
          <Image
            src={gifUrl}
            alt={`${displayName} demonstration`}
            className="mx-auto h-auto max-h-48 w-auto object-contain"
            width={320}
            height={192}
            unoptimized
          />
          <button
            type="button"
            onClick={() => setShowGif(false)}
            className="absolute top-1.5 right-1.5 rounded-full bg-background/80 p-1 backdrop-blur-sm"
            aria-label="Close demo"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      )}

      {open && (
        <div className="space-y-1.5 px-3 pb-3">
          <div className="grid grid-cols-[2rem_1fr_1fr_2.5rem] gap-1.5 px-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            <span>SET</span>
            <span>KG</span>
            <span>REPS</span>
            <span />
          </div>

          {Array.from({ length: totalSets }, (_, setIdx) => (
            <SetRow
              key={setIdx}
              dayIdx={dayIdx}
              exIdx={exIdx}
              setIdx={setIdx}
              isAmrap={!!exercise.amrap && setIdx === exercise.sets - 1}
              restSeconds={exercise.rest}
              exerciseName={displayName}
              onStartRest={onStartRest}
            />
          ))}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => addExtraSet(dayIdx, exIdx)}
              className="flex items-center gap-1 font-body text-[10px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="h-3 w-3" />
              ADD SET
            </button>
            {isCustom && onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="ml-auto flex items-center gap-1 font-body text-[10px] text-destructive transition-colors hover:text-destructive/80"
              >
                <Trash2 className="h-3 w-3" />
                REMOVE
              </button>
            )}
          </div>

          {exercise.notes && (
            <p className="mt-1 px-1 font-body text-[10px] text-muted-foreground italic">
              {exercise.notes}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
