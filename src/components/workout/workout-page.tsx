'use client'

import { Plus, Trophy } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRestTimer } from '@/hooks/use-rest-timer'
import { syncToSupabase } from '@/lib/supabase/sync'
import { useWakeLock } from '@/hooks/use-wake-lock'
import { useWorkoutClock } from '@/hooks/use-workout-clock'
import { PROGRAM } from '@/lib/data/program'
import { selectIsDayFinished } from '@/lib/store/selectors'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
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
  const day = getEffectiveProgram(dayIdx)
  const baseDay = PROGRAM[dayIdx]
  const finishDay = useWorkoutStore((s) => s.finishDay)
  const finished = useWorkoutStore((s) => selectIsDayFinished(s, dayIdx))
  const programOverrides = useWorkoutStore((s) => s.programOverrides[dayIdx])
  const removeExerciseFromDay = useWorkoutStore((s) => s.removeExerciseFromDay)
  const elapsed = useWorkoutClock(dayIdx)
  const restTimer = useRestTimer()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [celebrationOpen, setCelebrationOpen] = useState(false)

  useWakeLock(!finished)

  // Timer is started by SetRow on first set completion, not on page load

  function handleFinish() {
    finishDay(dayIdx)
    setCelebrationOpen(true)
    syncToSupabase(dayIdx).catch(() => {})
  }

  return (
    <div className="space-y-4 py-4">
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

      {day.exercises.map((ex, exIdx) => {
        const isCustom = programOverrides?.[exIdx]?.custom === true
        return (
          <ExerciseCard
            key={`${dayIdx}-${exIdx}`}
            dayIdx={dayIdx}
            exIdx={exIdx}
            exercise={ex}
            isCustom={isCustom}
            onRemove={
              isCustom ? () => removeExerciseFromDay(dayIdx, exIdx) : undefined
            }
            onStartRest={(sec, label) => restTimer.start(sec, label)}
          />
        )
      })}

      {!finished && (
        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-border border-dashed py-3 font-body text-muted-foreground text-sm transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          ADD EXERCISE
        </button>
      )}

      {baseDay.cardio && baseDay.cardio.length > 0 && (
        <CardioSection dayIdx={dayIdx} items={baseDay.cardio} />
      )}

      {!finished && (
        <Button className="w-full gap-2" size="lg" onClick={handleFinish}>
          <Trophy className="h-4 w-4" />
          FINISH WORKOUT
        </Button>
      )}

      <RestTimerBar timer={restTimer} />

      <ExerciseAddModal
        dayIdx={dayIdx}
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
      />

      <CelebrationModal
        dayIdx={dayIdx}
        open={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
      />
    </div>
  )
}
