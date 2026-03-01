'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useTemplate } from '@/hooks/use-template'
import { MUSCLE_GROUPS, MUSCLE_MAP } from '@/lib/data/muscles'
import { useT } from '@/lib/i18n'

interface ExerciseSwapModalProps {
  dayIdx: number
  exIdx: number
  open: boolean
  onOpenChange: (open: boolean) => void
  activeProgramId: string
  currentSwapName: string | null
  onSwap: (name: string | null) => void
}

export function ExerciseSwapModal({
  dayIdx,
  exIdx,
  open,
  onOpenChange,
  activeProgramId,
  currentSwapName,
  onSwap,
}: ExerciseSwapModalProps) {
  const template = useTemplate(activeProgramId)
  const t = useT()

  if (!template) return null

  const ex = template.days[dayIdx]?.exercises[exIdx]
  const currentName = currentSwapName || ex?.name

  if (!ex) return null

  const grouped: Record<string, string[]> = {}
  for (const group of MUSCLE_GROUPS) grouped[group] = []
  for (const name of Object.keys(MUSCLE_MAP)) {
    const primary = MUSCLE_MAP[name].primary[0]
    if (primary && grouped[primary]) grouped[primary].push(name)
  }

  const handleSelect = (name: string) => {
    if (name === ex.name) onSwap(null)
    else onSwap(name)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t('searchExercises')} />
      <CommandList>
        <CommandEmpty>{t('noExercisesFound')}</CommandEmpty>
        {MUSCLE_GROUPS.map((group) => {
          const exercises = grouped[group]
          if (!exercises.length) return null
          return (
            <CommandGroup key={group} heading={group}>
              {exercises.map((name) => (
                <CommandItem
                  key={name}
                  onSelect={() => handleSelect(name)}
                  className={name === currentName ? 'bg-accent' : ''}
                >
                  <span className="flex-1">{name}</span>
                  {name === ex.name && (
                    <span className="text-[10px] text-muted-foreground">
                      {t('defaultLabel')}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}
