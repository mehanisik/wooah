'use client'

import { ChevronDown, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { useExerciseGif } from '@/hooks/use-exercise-gif'
import type { MuscleGroup } from '@/lib/data/muscles'
import { MUSCLE_MAP } from '@/lib/data/muscles'
import type { Exercise } from '@/lib/data/program'
import { getMuscleMapping } from '@/lib/exercise-db'
import { useT } from '@/lib/i18n'
import {
  selectExtraSets,
  selectLog,
  useDisplayName,
} from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { formatRest } from '@/lib/workout/helpers'
import { getSupersetPartner, isSupersetExercise } from '@/lib/workout/superset'
import { SetRow } from './set-row'

const MUSCLE_COLORS: Record<MuscleGroup, string> = {
  Chest: 'bg-red-500/15 text-red-600 dark:text-red-400',
  Back: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  Quads: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  Hamstrings: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
  Glutes: 'bg-pink-500/15 text-pink-600 dark:text-pink-400',
  'Side Delts': 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  'Rear Delts': 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  'Front Delts': 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
  Biceps: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  Triceps: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  Calves: 'bg-lime-500/15 text-lime-600 dark:text-lime-400',
  Abs: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
  Traps: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
}

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
  const t = useT()
  const [open, setOpen] = useState(false)
  const [showGif, setShowGif] = useState(false)
  const displayName = useDisplayName(dayIdx, exIdx)
  const gifUrl = useExerciseGif(displayName)
  const muscles = MUSCLE_MAP[displayName] ?? getMuscleMapping(displayName)
  const extraSets = useWorkoutStore((s) => selectExtraSets(s, dayIdx, exIdx))
  const addExtraSet = useWorkoutStore((s) => s.addExtraSet)
  const totalSets = exercise.sets + extraSets
  const isSuperset = isSupersetExercise(dayIdx, exIdx)
  const partnerIdx = isSuperset ? getSupersetPartner(dayIdx, exIdx) : null
  const partnerName = useDisplayName(dayIdx, partnerIdx ?? exIdx)

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
          // biome-ignore lint/a11y/useSemanticElements: can't nest <button> inside <button>
          <div
            role="button"
            tabIndex={0}
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
            className="relative h-9 w-9 flex-shrink-0 cursor-pointer overflow-hidden rounded-full"
            aria-label={t('showExerciseDemo')}
          >
            <Image
              src={gifUrl}
              alt=""
              className="h-full w-full object-cover"
              width={36}
              height={36}
              unoptimized
            />
            <span
              className={cn(
                'absolute inset-0 rounded-full ring-2 ring-inset',
                allDone ? 'ring-success' : 'ring-border'
              )}
            />
          </div>
        ) : (
          <span
            className={cn(
              'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold font-mono text-xs',
              allDone
                ? 'bg-success-dim text-success'
                : 'bg-muted text-muted-foreground'
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
              <>
                <Badge
                  variant="outline"
                  className="border-warning px-1 py-0 text-[9px] text-warning"
                >
                  {t('supersetBadge')}
                </Badge>
                {partnerIdx !== null && (
                  <span className="truncate text-[9px] text-warning">
                    {t('supersetWith', { name: partnerName })}
                  </span>
                )}
              </>
            )}
          </div>
          {muscles && muscles.primary.length > 0 && (
            <div className="flex gap-1">
              {muscles.primary.slice(0, 2).map((m) => (
                <span
                  key={m}
                  className={cn(
                    'rounded-full px-1.5 py-px font-semibold text-[8px] leading-tight',
                    MUSCLE_COLORS[m]
                  )}
                >
                  {m}
                </span>
              ))}
            </div>
          )}
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
        <div className="relative mx-3 mb-2 overflow-hidden rounded-md bg-black/90 dark:bg-white/5">
          <div className="flex items-center justify-center p-3">
            <Image
              src={gifUrl}
              alt={`${displayName} demonstration`}
              className="h-auto max-h-64 w-auto object-contain"
              width={320}
              height={256}
              unoptimized
            />
          </div>
          {muscles &&
            (muscles.primary.length > 0 || muscles.secondary.length > 0) && (
              <div className="flex flex-wrap gap-1.5 border-white/10 border-t px-3 py-2">
                {muscles.primary.map((m) => (
                  <span
                    key={m}
                    className={cn(
                      'rounded-full px-2 py-0.5 font-semibold text-[10px]',
                      MUSCLE_COLORS[m]
                    )}
                  >
                    {m}
                  </span>
                ))}
                {muscles.secondary.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}
          <button
            type="button"
            onClick={() => setShowGif(false)}
            className="absolute top-1.5 right-1.5 rounded-full bg-black/50 p-1.5 backdrop-blur-sm"
            aria-label={t('closeDemo')}
          >
            <X className="h-3.5 w-3.5 text-white/70" />
          </button>
        </div>
      )}

      {open && (
        <div className="space-y-1.5 px-3 pb-3">
          <div className="grid grid-cols-[2rem_1fr_1fr_2.75rem] gap-1.5 px-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            <span>{t('setLabel')}</span>
            <span>{t('kgLabel')}</span>
            <span>{t('repsLabel')}</span>
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
              {t('addSet')}
            </button>
            {isCustom && onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="ml-auto flex items-center gap-1 font-body text-[10px] text-destructive transition-colors hover:text-destructive/80"
              >
                <Trash2 className="h-3 w-3" />
                {t('remove')}
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
