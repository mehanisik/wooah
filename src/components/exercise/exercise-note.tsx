'use client'

import { useMutation, useQuery } from 'convex/react'
import { Pin, StickyNote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'

interface ExerciseNoteProps {
  dayIdx: number
  exIdx: number
}

export function ExerciseNote({ dayIdx, exIdx }: ExerciseNoteProps) {
  const t = useT()
  const week = useCurrentWeek()
  const [editing, setEditing] = useState(false)

  const noteDoc = useQuery(api.notes.getExerciseNote, {
    week,
    dayIndex: dayIdx,
    exerciseIndex: exIdx,
  })
  const pinnedDoc = useQuery(api.notes.getPinnedNote, {
    dayIndex: dayIdx,
    exerciseIndex: exIdx,
  })

  const setExerciseNote = useMutation(api.notes.setExerciseNote)
  const setPinnedNoteMut = useMutation(api.notes.setPinnedNote)

  const note = noteDoc?.note ?? ''
  const pinnedNote = pinnedDoc?.note ?? ''

  const [draft, setDraft] = useState(note)

  useEffect(() => {
    if (!editing) setDraft(note)
  }, [note, editing])

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
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('addANote')}
            className="h-7 text-xs"
            onBlur={() => {
              if (draft !== note) {
                setExerciseNote({
                  week,
                  dayIndex: dayIdx,
                  exerciseIndex: exIdx,
                  note: draft,
                })
              }
              setEditing(false)
            }}
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              if (draft)
                setPinnedNoteMut({
                  dayIndex: dayIdx,
                  exerciseIndex: exIdx,
                  note: draft,
                })
            }}
            className={cn(
              'rounded p-1',
              pinnedNote
                ? 'text-warning'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title={t('pinNote')}
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
          {note || t('addNote')}
        </button>
      )}
    </div>
  )
}
