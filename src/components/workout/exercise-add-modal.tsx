'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useExerciseDb } from '@/hooks/use-exercise-db'
import { useTemplate } from '@/hooks/use-template'
import {
  DAY_TYPE_MUSCLES,
  type ExerciseDbEntry,
  mapApiEquipment,
  mapApiMuscle,
} from '@/lib/exercise-db'

import { useT } from '@/lib/i18n'

interface ExerciseAddModalProps {
  dayIdx: number
  activeProgramId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddExercise: (entry: {
    custom: boolean
    name: string
    equipment: string
    sets: number
    reps: string
    rest: number
    rir: string
  }) => void
}

export function ExerciseAddModal({
  dayIdx,
  activeProgramId,
  open,
  onOpenChange,
  onAddExercise,
}: ExerciseAddModalProps) {
  const t = useT()
  const { exercises, loading } = useExerciseDb()
  const [search, setSearch] = useState('')

  const template = useTemplate(activeProgramId ?? 'wooah-ppl')
  const day =
    template && dayIdx >= 0 && dayIdx < template.days.length
      ? template.days[dayIdx]
      : null
  const isFreestyle = dayIdx < 0
  const dayType = day?.type ?? 'push'
  const relevantMuscles = isFreestyle ? [] : (DAY_TYPE_MUSCLES[dayType] ?? [])

  const filtered = useMemo(() => {
    let list: ExerciseDbEntry[]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = exercises.filter((e) => e.name.toLowerCase().includes(q))
    } else {
      list =
        relevantMuscles.length > 0
          ? exercises.filter((e) => {
              const allMuscles = [...e.targetMuscles, ...e.secondaryMuscles]
              return allMuscles.some((m) => {
                const group = mapApiMuscle(m)
                return group && relevantMuscles.includes(group)
              })
            })
          : exercises
    }

    return list.slice(0, 50)
  }, [exercises, search, relevantMuscles])

  function handleSelect(entry: ExerciseDbEntry) {
    const equipment = entry.equipments[0]
      ? mapApiEquipment(entry.equipments[0])
      : 'machine'

    onAddExercise({
      custom: true,
      name: entry.name,
      equipment,
      sets: 3,
      reps: '10-12',
      rest: 90,
      rir: '1-2',
    })

    setSearch('')
    onOpenChange(false)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('addExerciseTitle')}
      description={t('searchToAdd')}
      showCloseButton={false}
    >
      <CommandInput
        placeholder={t('searchExercises')}
        value={search}
        onValueChange={setSearch}
      />
      <CommandList className="max-h-[70vh]">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <CommandEmpty>{t('noExercisesFound')}</CommandEmpty>
            <CommandGroup>
              {filtered.map((entry) => (
                <CommandItem
                  key={entry.exerciseId}
                  value={entry.name}
                  onSelect={() => handleSelect(entry)}
                  className="flex items-center gap-3 py-2"
                >
                  {entry.gifUrl ? (
                    <Image
                      src={entry.gifUrl}
                      alt=""
                      className="h-10 w-10 flex-shrink-0 rounded bg-muted object-cover"
                      width={40}
                      height={40}
                      loading="lazy"
                      unoptimized
                    />
                  ) : (
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-muted" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-body text-sm capitalize">
                      {entry.name}
                    </div>
                    <div className="mt-0.5 flex gap-1">
                      {entry.equipments.slice(0, 1).map((eq) => (
                        <Badge
                          key={eq}
                          variant="outline"
                          className="px-1 py-0 text-[9px]"
                        >
                          {eq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
