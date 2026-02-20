'use client'

import { Pin, StickyNote } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { selectExerciseNote, selectPinnedNote } from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'

interface ExerciseNoteProps {
  dayIdx: number
  exIdx: number
}

export function ExerciseNote({ dayIdx, exIdx }: ExerciseNoteProps) {
  const [editing, setEditing] = useState(false)
  const note = useWorkoutStore((s) => selectExerciseNote(s, dayIdx, exIdx))
  const setNote = useWorkoutStore((s) => s.setExerciseNote)
  const pinnedNote = useWorkoutStore((s) => selectPinnedNote(s, dayIdx, exIdx))
  const setPinnedNote = useWorkoutStore((s) => s.setPinnedNote)

  return (
    <div className="space-y-1">
      {pinnedNote && (
        <div className="flex items-start gap-1 rounded bg-warning-dim/30 px-2 py-1 font-body text-[10px] text-warning">
          <Pin className="mt-0.5 h-3 w-3 flex-shrink-0" />
          <span>{pinnedNote}</span>
        </div>
      )}

      {editing ? (
        <div className="flex gap-1">
          <Input
            value={note}
            onChange={(e) => setNote(dayIdx, exIdx, e.target.value)}
            placeholder="Add a note..."
            className="h-7 text-xs"
            onBlur={() => setEditing(false)}
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              if (note) setPinnedNote(dayIdx, exIdx, note)
            }}
            className={cn(
              'rounded p-1',
              pinnedNote
                ? 'text-warning'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Pin note"
          >
            <Pin className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex items-center gap-1 font-body text-[10px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <StickyNote className="h-3 w-3" />
          {note || 'Add note'}
        </button>
      )}
    </div>
  )
}
