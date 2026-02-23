'use client'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useMutation, useQuery } from 'convex/react'
import { Plus, Save, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import type { ProgramOverrideEntry } from '@/lib/store/types'
import { api } from '../../../convex/_generated/api'
import { ExerciseEditCard } from './exercise-edit-card'
import { ExercisePickerModal } from './exercise-picker-modal'

interface ProgramEditorProps {
  dayIdx: number
  onClose: () => void
}

export function ProgramEditor({ dayIdx, onClose }: ProgramEditorProps) {
  const t = useT()
  const prefs = useQuery(api.preferences.get)
  const upsertPrefs = useMutation(api.preferences.upsert)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const programOverrides = (prefs?.programOverrides ?? {}) as Record<
    number,
    ProgramOverrideEntry[]
  >
  const base = getTemplateOrDefault(activeProgramId).days[dayIdx]
  const existingOverrides = programOverrides[dayIdx]
  const [pickerOpen, setPickerOpen] = useState(false)

  const [items, setItems] = useState<ProgramOverrideEntry[]>(() => {
    if (existingOverrides) return [...existingOverrides]
    return base.exercises.map((_, i) => ({ originalIdx: i }))
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((_, i) => `item-${i}` === active.id)
    const newIndex = items.findIndex((_, i) => `item-${i}` === over.id)
    setItems(arrayMove(items, oldIndex, newIndex))
  }

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx))
  }

  const addCustomExercise = (name: string) => {
    setItems([
      ...items,
      { custom: true, name, sets: 3, reps: '10-12', rest: 90, rir: '1-2' },
    ])
    setPickerOpen(false)
  }

  const save = () => {
    const updated = { ...programOverrides, [dayIdx]: items }
    upsertPrefs({ programOverrides: updated })
    onClose()
  }

  const reset = () => {
    const updated = { ...programOverrides }
    delete updated[dayIdx]
    upsertPrefs({ programOverrides: updated })
    onClose()
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg tracking-wider">
          {t('editDayTitle', { day: base.day, name: base.name })}
        </h3>
        <button type="button" onClick={onClose} className="p-1">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((_, i) => `item-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, i) => {
            const exercise = item.custom
              ? {
                  name: item.name || 'Custom',
                  sets: item.sets || 3,
                  reps: item.reps || '10-12',
                  rest: item.rest || 90,
                }
              : base.exercises[item.originalIdx!]

            return (
              <ExerciseEditCard
                key={`item-${i}`}
                id={`item-${i}`}
                name={exercise?.name || 'Unknown'}
                sets={exercise?.sets || 3}
                reps={exercise?.reps || '10-12'}
                rest={exercise?.rest || 90}
                onRemove={() => removeItem(i)}
                onUpdateSets={(sets) => {
                  const updated = [...items]
                  updated[i] = { ...updated[i], sets }
                  setItems(updated)
                }}
                onUpdateReps={(reps) => {
                  const updated = [...items]
                  updated[i] = { ...updated[i], reps }
                  setItems(updated)
                }}
                onUpdateRest={(rest) => {
                  const updated = [...items]
                  updated[i] = { ...updated[i], rest }
                  setItems(updated)
                }}
              />
            )
          })}
        </SortableContext>
      </DndContext>

      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={() => setPickerOpen(true)}
      >
        <Plus className="mr-1 h-3 w-3" />
        {t('addExercise')}
      </Button>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1 text-xs" onClick={save}>
          <Save className="mr-1 h-3 w-3" />
          {t('save')}
        </Button>
        <Button variant="outline" size="sm" className="text-xs" onClick={reset}>
          {t('resetLabel')}
        </Button>
      </div>

      <ExercisePickerModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={addCustomExercise}
      />
    </div>
  )
}
