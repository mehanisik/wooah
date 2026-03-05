'use client'

import { useMutation, useQuery } from 'convex/react'
import { Dumbbell, Pencil, Plus, Trophy, X, Zap } from 'lucide-react'
import Link from 'next/link'
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
  const [error, setError] = useState(false)
  const creatingRef = useRef(false)

  const createSession = useMutation(api.freestyle.createSession)
  const addExerciseMut = useMutation(api.freestyle.addExercise)
  const removeExerciseMut = useMutation(api.freestyle.removeExercise)
  const finishByIdMut = useMutation(api.sessions.finishById)
  const reopenSessionMut = useMutation(api.sessions.reopenSession)

  // Check for an active (non-finished) freestyle session first
  const activeSession = useQuery(api.freestyle.getActiveSession, { week })

  // Resume active session instead of creating a new one
  useEffect(() => {
    if (sessionId || creatingRef.current) return
    if (activeSession === undefined) return // still loading

    if (activeSession) {
      // Resume existing active session
      setSessionId(activeSession._id)
      setDayIndex(activeSession.dayIndex)
      return
    }

    // No active session — create a new one
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
  }, [sessionId, activeSession, createSession, week])

  const exercises = useQuery(
    api.freestyle.getExercises,
    sessionId ? { sessionId } : 'skip'
  )
  const isLoadingExercises = exercises === undefined && sessionId !== null

  // Query session to derive finished state from server
  const session = useQuery(
    api.sessions.getByWeekAndDay,
    dayIndex !== null ? { week, dayIndex } : 'skip'
  )
  const finished = !!session?.finishedAt

  const elapsed = useWorkoutClockBySession(dayIndex, week)
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
    if (!sessionId || finished) return
    try {
      await finishByIdMut({ sessionId })
      setCelebrationOpen(true)
    } catch {
      setError(true)
    }
  }, [sessionId, finished, finishByIdMut])

  const handleReopen = useCallback(() => {
    if (dayIndex === null) return
    reopenSessionMut({ week, dayIndex })
  }, [dayIndex, week, reopenSessionMut])

  if (error) {
    return (
      <div className="space-y-4 py-8 text-center text-muted-foreground">
        <p>{t('somethingWentWrong')}</p>
        <Link href="/" className="inline-block text-primary text-sm underline">
          {t('backToWorkout')}
        </Link>
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
          <Link
            href="/"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t('backToWorkout')}
          >
            <X className="h-4 w-4" />
          </Link>
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl tracking-wider">
            {t('freestyleTitle')}
          </h2>
        </div>
        <WorkoutClock elapsed={elapsed} finished={finished} />
      </div>

      {/* Exercises */}
      {isLoadingExercises && (
        <div className="py-8 text-center text-muted-foreground">
          {t('loading')}
        </div>
      )}
      {!isLoadingExercises &&
        exercises &&
        exercises.length > 0 &&
        exercises.map((ex) => (
          <FreestyleExerciseCard
            key={ex._id}
            dayIdx={dayIndex}
            exerciseIndex={ex.exerciseIndex}
            name={ex.name}
            equipment={ex.equipment}
            targetSets={ex.targetSets}
            rest={ex.rest}
            onRemove={() => handleRemoveExercise(ex._id)}
            onStartRest={(sec, label) => restTimer.start(sec, label)}
          />
        ))}
      {!isLoadingExercises && (!exercises || exercises.length === 0) && (
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

      {/* Edit (reopen) button when finished */}
      {finished && (
        <Button
          variant="outline"
          className="w-full gap-2"
          size="lg"
          onClick={handleReopen}
        >
          <Pencil className="h-4 w-4" />
          {t('editCompletedWorkout')}
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
function useWorkoutClockBySession(dayIdx: number | null, week: number) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const session = useQuery(
    api.sessions.getByWeekAndDay,
    dayIdx !== null ? { week, dayIndex: dayIdx } : 'skip'
  )

  const startedAt = session?.startedAt ?? null
  const finishedAt = session?.finishedAt ?? null
  const pausedSec =
    (session as { pausedDurationSec?: number } | null)?.pausedDurationSec ?? 0
  const isRunning = !!startedAt && !finishedAt

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    const update = () => {
      if (startedAt && !finishedAt) {
        const activeSec = Math.round(
          (Date.now() - new Date(startedAt).getTime()) / 1000
        )
        setElapsed(pausedSec + activeSec)
      } else if (startedAt && finishedAt) {
        const activeSec = Math.round(
          (new Date(finishedAt).getTime() - new Date(startedAt).getTime()) /
            1000
        )
        setElapsed(pausedSec + activeSec)
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
  }, [isRunning, startedAt, finishedAt, pausedSec])

  return elapsed
}
