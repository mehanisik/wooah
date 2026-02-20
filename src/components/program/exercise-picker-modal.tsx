'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { MUSCLE_GROUPS, MUSCLE_MAP } from '@/lib/data/muscles'

interface ExercisePickerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (name: string) => void
}

export function ExercisePickerModal({
  open,
  onOpenChange,
  onSelect,
}: ExercisePickerModalProps) {
  const grouped: Record<string, string[]> = {}
  for (const group of MUSCLE_GROUPS) grouped[group] = []
  for (const name of Object.keys(MUSCLE_MAP)) {
    const primary = MUSCLE_MAP[name].primary[0]
    if (primary && grouped[primary]) grouped[primary].push(name)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search exercises to add..." />
      <CommandList>
        <CommandEmpty>No exercises found.</CommandEmpty>
        {MUSCLE_GROUPS.map((group) => {
          const exercises = grouped[group]
          if (!exercises.length) return null
          return (
            <CommandGroup key={group} heading={group}>
              {exercises.map((name) => (
                <CommandItem key={name} onSelect={() => onSelect(name)}>
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}
