'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface ExerciseEditCardProps {
  id: string
  name: string
  sets: number
  reps: string
  rest: number
  onRemove: () => void
  onUpdateSets: (sets: number) => void
  onUpdateReps: (reps: string) => void
  onUpdateRest: (rest: number) => void
}

export function ExerciseEditCard({
  id,
  name,
  sets,
  reps,
  rest,
  onRemove,
  onUpdateSets,
  onUpdateReps,
  onUpdateRest,
}: ExerciseEditCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-1.5 flex items-center gap-2 rounded-md border border-border bg-card px-2 py-2"
    >
      <button
        type="button"
        className="cursor-grab touch-none p-0.5 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      <span className="min-w-0 flex-1 truncate font-body font-semibold text-xs">
        {name}
      </span>

      <div className="flex items-center gap-1">
        <Input
          type="number"
          value={sets}
          onChange={(e) => onUpdateSets(Number(e.target.value) || 3)}
          className="h-6 w-10 px-0.5 text-center font-mono text-[10px]"
          aria-label="Sets"
        />
        <span className="text-[10px] text-muted-foreground">x</span>
        <Input
          value={reps}
          onChange={(e) => onUpdateReps(e.target.value)}
          className="h-6 w-14 px-0.5 text-center font-mono text-[10px]"
          aria-label="Reps"
        />
        <Input
          type="number"
          value={rest}
          onChange={(e) => onUpdateRest(Number(e.target.value) || 90)}
          className="h-6 w-12 px-0.5 text-center font-mono text-[10px]"
          aria-label="Rest"
        />
        <span className="text-[9px] text-muted-foreground">s</span>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="p-1 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
