'use client'

import { useMutation, useQuery } from 'convex/react'
import { Pencil, Plus, Trophy } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProgramEditor } from '@/components/program/program-editor'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useRestTimer } from '@/hooks/use-rest-timer'
import { useWakeLock } from '@/hooks/use-wake-lock'
import { useWorkoutClock } from '@/hooks/use-workout-clock'
import { PROGRAM } from '@/lib/data/program'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
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
}

export function WorkoutPage({ dayIdx }: WorkoutPageProps) {
  const t = useT()
  const week = useCurrentWeek()

  const prefs = useQuery(api.preferences.get)
  const session = useQuery(api.sessions.getByWeekAndDay, {
    week,
    dayIndex: dayIdx,
  })

  const finishDayMut = useMutation(api.sessions.finishDay)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const day = getTemplateOrDefault(activeProgramId).days[dayIdx]
  const baseDay = PROGRAM[dayIdx]
  const finished = !!session?.finishedAt

  const elapsed = useWorkoutClock(dayIdx)
  const restTimer = useRestTimer()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [celebrationOpen, setCelebrationOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  useWakeLock(!finished)

  const exerciseDisplayNames = useMemo(() => {
    if (!day) return []
    return day.exercises.map((ex) => ex.name)
  }, [day])

  function handleFinish() {
    finishDayMut({ week, dayIndex: dayIdx })
    setCelebrationOpen(true)
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
            {baseDay.day} — {baseDay.name}
          </h2>
          <p className="font-body text-muted-foreground text-xs">
            {baseDay.focus}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
              baseDay.type === 'push' && 'border-push text-push',
              baseDay.type === 'pull' && 'border-pull text-pull',
              baseDay.type === 'legs' && 'border-legs text-legs'
            )}
          >
            {baseDay.type.toUpperCase()}
          </Badge>
          <WorkoutClock elapsed={elapsed} finished={finished} />
        </div>
      </div>

      {day.exercises.map((ex, exIdx) => (
        <ExerciseCard
          key={`${dayIdx}-${exIdx}`}
          dayIdx={dayIdx}
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

      {baseDay.cardio && baseDay.cardio.length > 0 && (
        <CardioSection dayIdx={dayIdx} items={baseDay.cardio} />
      )}

      {!finished && (
        <Button className="w-full gap-2" size="lg" onClick={handleFinish}>
          <Trophy className="h-4 w-4" />
          {t('finishWorkout')}
        </Button>
      )}

      <RestTimerBar timer={restTimer} />

      <ExerciseAddModal
        dayIdx={dayIdx}
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAddExercise={handleAddExercise}
      />

      <CelebrationModal
        dayIdx={dayIdx}
        open={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
        activeProgramId={activeProgramId}
      />

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto"
          showCloseButton={false}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{t('editProgram')}</SheetTitle>
          </SheetHeader>
          <ProgramEditor dayIdx={dayIdx} onClose={() => setEditOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
