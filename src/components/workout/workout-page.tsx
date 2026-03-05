'use client'

import { useMutation, useQuery } from 'convex/react'
import { Dumbbell, Pencil, Plus, Trophy, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { ProgramEditor } from '@/components/program/program-editor'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useRestTimer } from '@/hooks/use-rest-timer'
import { useTemplate } from '@/hooks/use-template'
import { useWakeLock } from '@/hooks/use-wake-lock'
import { useWorkoutClock } from '@/hooks/use-workout-clock'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'
import { CardioSection } from './cardio-section'
import { CelebrationModal } from './celebration-modal'
import { ExerciseAddModal } from './exercise-add-modal'
import { ExerciseCard } from './exercise-card'
import { RestTimerBar } from './rest-timer-bar'
import { WorkoutClock } from './workout-clock'

interface WorkoutPageProps {
  dayIdx: number
  programDayIdx: number
}

export function WorkoutPage({ dayIdx, programDayIdx }: WorkoutPageProps) {
  const t = useT()
  const week = useCurrentWeek()
  const router = useRouter()

  const prefs = useQuery(api.preferences.get)
  const session = useQuery(api.sessions.getByWeekAndDay, {
    week,
    dayIndex: programDayIdx,
  })

  const finishDayMut = useMutation(api.sessions.finishDay)
  const startTimerMut = useMutation(api.sessions.startTimer)
  const cancelSessionMut = useMutation(api.sessions.cancelSession)
  const reopenSessionMut = useMutation(api.sessions.reopenSession)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = useTemplate(activeProgramId)
  const day = template?.days[programDayIdx]
  const originalDay = dayIdx !== programDayIdx ? template?.days[dayIdx] : null
  const finished = !!session?.finishedAt
  const started = !!session?.startedAt
  const isOverride = dayIdx !== programDayIdx

  const elapsed = useWorkoutClock(programDayIdx)
  const restTimer = useRestTimer()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [celebrationOpen, setCelebrationOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)

  useWakeLock(!finished)

  const exerciseDisplayNames = useMemo(() => {
    if (!day) return []
    return day.exercises.map((ex) => ex.name)
  }, [day])

  function handleStart() {
    startTimerMut({ week, dayIndex: programDayIdx })
  }

  function handleDiscard() {
    router.push('/')
  }

  function handleFinish() {
    finishDayMut({ week, dayIndex: programDayIdx })
    setCelebrationOpen(true)
  }

  function handleReopen() {
    reopenSessionMut({ week, dayIndex: programDayIdx })
  }

  async function handleCancelConfirm() {
    await cancelSessionMut({ week, dayIndex: programDayIdx })
    setCancelOpen(false)
    router.push('/')
  }

  function handleAddExercise(_entry: {
    custom: boolean
    name: string
    equipment: string
    sets: number
    reps: string
    rest: number
    rir: string
  }) {
    // Program overrides are managed server-side or by program editor
    // For custom exercise adds, this would call a Convex mutation
    // Currently preserving the UI flow; the actual persistence
    // would need a programOverrides mutation on Convex
  }

  if (!day || prefs === undefined) {
    return (
      <div className="space-y-4 pb-4">
        <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl tracking-wider">
            {day.day} — {day.name}
          </h2>
          <p className="font-body text-muted-foreground text-xs">{day.focus}</p>
        </div>
        <div className="flex items-center gap-2">
          {started && !finished && (
            <button
              type="button"
              onClick={() => setCancelOpen(true)}
              className="rounded-md p-1.5 text-destructive transition-colors hover:text-destructive/80"
              aria-label={t('cancelWorkout')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {!finished && (
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          <Badge
            variant="outline"
            className={cn(
              'font-mono text-xs',
              day.type === 'push' && 'border-push text-push',
              day.type === 'pull' && 'border-pull text-pull',
              day.type === 'legs' && 'border-legs text-legs'
            )}
          >
            {day.type.toUpperCase()}
          </Badge>
          <WorkoutClock elapsed={elapsed} finished={finished} />
        </div>
      </div>

      {isOverride && originalDay && (
        <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-center font-body text-muted-foreground text-xs">
          {t('doingInstead', { original: originalDay.name })}
        </div>
      )}

      {!(started || finished) && (
        <div className="flex gap-2">
          <Button className="flex-1 gap-2" size="lg" onClick={handleStart}>
            <Dumbbell className="h-4 w-4" />
            {t('startWorkout')}
          </Button>
          <Button variant="outline" size="lg" onClick={handleDiscard}>
            {t('discardWorkout')}
          </Button>
        </div>
      )}

      {day.exercises.map((ex, exIdx) => (
        <ExerciseCard
          key={`${programDayIdx}-${exIdx}`}
          day={day}
          dayIdx={programDayIdx}
          exIdx={exIdx}
          exercise={ex}
          displayName={exerciseDisplayNames[exIdx] ?? ex.name}
          onStartRest={(sec, label) => restTimer.start(sec, label)}
        />
      ))}

      {!finished && (
        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-border border-dashed py-3 font-body text-muted-foreground text-sm transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          {t('addExercise')}
        </button>
      )}

      {day.cardio && day.cardio.length > 0 && (
        <CardioSection dayIdx={programDayIdx} items={day.cardio} />
      )}

      {started && !finished && (
        <Button className="w-full gap-2" size="lg" onClick={handleFinish}>
          <Trophy className="h-4 w-4" />
          {t('finishWorkout')}
        </Button>
      )}

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
        dayIdx={programDayIdx}
        activeProgramId={activeProgramId}
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAddExercise={handleAddExercise}
      />

      <CelebrationModal
        dayIdx={programDayIdx}
        open={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
        activeProgramId={activeProgramId}
      />

      {/* Cancel workout confirmation */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="font-display tracking-wider">
              {t('cancelWorkoutTitle')}
            </DialogTitle>
            <DialogDescription>{t('cancelWorkoutDesc')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              {t('cancelWorkoutKeep')}
            </Button>
            <Button variant="destructive" onClick={handleCancelConfirm}>
              {t('cancelWorkoutConfirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto"
          showCloseButton={false}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{t('editProgram')}</SheetTitle>
          </SheetHeader>
          <ProgramEditor
            dayIdx={programDayIdx}
            onClose={() => setEditOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
