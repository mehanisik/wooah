'use client'

import { useMutation, useQuery } from 'convex/react'
import { Dumbbell, Plus, Trophy, Zap } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useRestTimer } from '@/hooks/use-rest-timer'
import { useWakeLock } from '@/hooks/use-wake-lock'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'
import { CelebrationModal } from './celebration-modal'
import { ExerciseAddModal } from './exercise-add-modal'
import { FreestyleExerciseCard } from './freestyle-exercise-card'
import { RestTimerBar } from './rest-timer-bar'
import { WorkoutClock } from './workout-clock'

export function FreestyleWorkoutPage() {
  const t = useT()
  const week = useCurrentWeek()

  const [sessionId, setSessionId] = useState<Id<'sessions'> | null>(null)
  const [dayIndex, setDayIndex] = useState<number | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [celebrationOpen, setCelebrationOpen] = useState(false)
  const [finished, setFinished] = useState(false)
  const [error, setError] = useState(false)
  const creatingRef = useRef(false)

  const createSession = useMutation(api.freestyle.createSession)
  const addExerciseMut = useMutation(api.freestyle.addExercise)
  const removeExerciseMut = useMutation(api.freestyle.removeExercise)
  const finishByIdMut = useMutation(api.sessions.finishById)

  // Create session immediately on mount
  useEffect(() => {
    if (sessionId || creatingRef.current) return
    creatingRef.current = true
    createSession({ week })
      .then((result) => {
        setSessionId(result.sessionId)
        setDayIndex(result.dayIndex)
      })
      .catch(() => {
        creatingRef.current = false
        setError(true)
      })
  }, [sessionId, createSession, week])

  const exercises = useQuery(
    api.freestyle.getExercises,
    sessionId ? { sessionId } : 'skip'
  )

  // Use the actual negative dayIndex for the workout clock (skip query until known)
  const elapsed = useWorkoutClockBySession(dayIndex)
  const restTimer = useRestTimer()
  useWakeLock(!finished)

  const handleAddExercise = useCallback(
    async (entry: {
      custom: boolean
      name: string
      equipment: string
      sets: number
      reps: string
      rest: number
      rir: string
    }) => {
      if (!sessionId) return
      await addExerciseMut({
        sessionId,
        name: entry.name,
        equipment: entry.equipment,
        targetSets: entry.sets,
        targetReps: entry.reps,
        rest: entry.rest,
      })
    },
    [sessionId, addExerciseMut]
  )

  const handleRemoveExercise = useCallback(
    async (exerciseId: Id<'freestyleExercises'>) => {
      await removeExerciseMut({ exerciseId })
    },
    [removeExerciseMut]
  )

  const handleFinish = useCallback(async () => {
    if (!sessionId) return
    await finishByIdMut({ sessionId })
    setFinished(true)
    setCelebrationOpen(true)
  }, [sessionId, finishByIdMut])

  if (error) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('somethingWentWrong')}
      </div>
    )
  }

  if (!sessionId || dayIndex === null) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('loading')}
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl tracking-wider">
            {t('freestyleTitle')}
          </h2>
        </div>
        <WorkoutClock elapsed={elapsed} finished={finished} />
      </div>

      {/* Exercises */}
      {exercises && exercises.length > 0 ? (
        exercises.map((ex) => (
          <FreestyleExerciseCard
            key={ex._id}
            dayIdx={dayIndex}
            exerciseIndex={ex.exerciseIndex}
            name={ex.name}
            equipment={ex.equipment}
            targetSets={ex.targetSets}
            onRemove={() => handleRemoveExercise(ex._id)}
            onStartRest={(sec, label) => restTimer.start(sec, label)}
          />
        ))
      ) : (
        <div className="rounded-lg border border-border border-dashed bg-card px-4 py-12 text-center">
          <Dumbbell className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 font-body text-muted-foreground text-sm">
            {t('noExercisesYet')}
          </p>
        </div>
      )}

      {/* Add exercise button */}
      {!finished && (
        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-border border-dashed py-3 font-body text-muted-foreground text-sm transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          {exercises && exercises.length > 0
            ? t('addExercise')
            : t('addFirstExercise')}
        </button>
      )}

      {/* Finish button */}
      {!finished && exercises && exercises.length > 0 && (
        <Button className="w-full gap-2" size="lg" onClick={handleFinish}>
          <Trophy className="h-4 w-4" />
          {t('finishWorkout')}
        </Button>
      )}

      <RestTimerBar timer={restTimer} />

      <ExerciseAddModal
        dayIdx={dayIndex}
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAddExercise={handleAddExercise}
      />

      <CelebrationModal
        dayIdx={dayIndex}
        open={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
        activeProgramId=""
        sessionType="freestyle"
      />
    </div>
  )
}

// Hook that uses the actual dayIndex for the workout clock, skips query until dayIndex is known
function useWorkoutClockBySession(dayIdx: number | null) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const week = useCurrentWeek()
  const session = useQuery(
    api.sessions.getByWeekAndDay,
    dayIdx !== null ? { week, dayIndex: dayIdx } : 'skip'
  )

  const startedAt = session?.startedAt ?? null
  const finishedAt = session?.finishedAt ?? null
  const isRunning = !!startedAt && !finishedAt

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    const update = () => {
      if (startedAt && !finishedAt) {
        const diff = Math.round(
          (Date.now() - new Date(startedAt).getTime()) / 1000
        )
        setElapsed(diff)
      } else if (startedAt && finishedAt) {
        const duration = Math.round(
          (new Date(finishedAt).getTime() - new Date(startedAt).getTime()) /
            1000
        )
        setElapsed(duration)
      } else {
        setElapsed(0)
      }
    }

    if (isRunning) {
      update()
      intervalRef.current = setInterval(update, 1000)
    } else {
      update()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, startedAt, finishedAt])

  return elapsed
}
