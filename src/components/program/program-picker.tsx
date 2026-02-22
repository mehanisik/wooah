'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { PROGRAM_TEMPLATES } from '@/lib/data/programs/registry'
import type { Difficulty, ProgramTemplate } from '@/lib/data/programs/types'
import { useT } from '@/lib/i18n'
import { DayPicker } from './day-picker'

type Filter = 'all' | Difficulty | 'womens'

function matchesFilter(t: ProgramTemplate, f: Filter): boolean {
  if (f === 'all') return true
  if (f === 'womens') return t.meta.gender === 'female'
  return t.meta.difficulty === f
}

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner:
    'bg-green-600/20 text-green-600 dark:bg-green-500/20 dark:text-green-400',
  intermediate:
    'bg-yellow-600/20 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
  advanced: 'bg-red-600/20 text-red-600 dark:bg-red-500/20 dark:text-red-400',
}

export function ProgramPicker({
  open,
  onOpenChange,
  currentProgramId,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentProgramId: string
  onSelect: (programId: string, trainingDays: number[]) => void
}) {
  const t = useT()
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedTemplate, setSelectedTemplate] =
    useState<ProgramTemplate | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(
    () => PROGRAM_TEMPLATES.filter((tpl) => matchesFilter(tpl, filter)),
    [filter]
  )

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('allFilter') },
    { key: 'beginner', label: t('beginnerFilter') },
    { key: 'intermediate', label: t('intermediateFilter') },
    { key: 'advanced', label: t('advancedFilter') },
    { key: 'womens', label: t('womensFilter') },
  ]

  const handleClose = () => {
    setSelectedTemplate(null)
    setExpandedId(null)
    setFilter('all')
    onOpenChange(false)
  }

  if (selectedTemplate) {
    return (
      <DayPicker
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            setSelectedTemplate(null)
          }
          onOpenChange(v)
        }}
        template={selectedTemplate}
        onConfirm={(days) => {
          onSelect(selectedTemplate.meta.id, days)
          handleClose()
        }}
        onBack={() => setSelectedTemplate(null)}
      />
    )
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[85dvh] rounded-t-2xl"
      >
        <SheetHeader className="pb-0">
          <SheetTitle className="font-display text-sm tracking-wider">
            {t('selectProgram')}
          </SheetTitle>
        </SheetHeader>

        <div className="flex gap-1.5 overflow-x-auto px-4 pb-2">
          {filters.map((f) => (
            <button
              type="button"
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 rounded-full px-3 py-1 font-body text-xs transition-colors ${
                filter === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
          {filtered.map((tpl) => {
            const isCurrent = tpl.meta.id === currentProgramId
            const isExpanded = expandedId === tpl.meta.id

            return (
              <div
                key={tpl.meta.id}
                className={`rounded-lg border p-3 transition-colors ${
                  isCurrent
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-border bg-card'
                }`}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => setExpandedId(isExpanded ? null : tpl.meta.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs tracking-wider">
                          {tpl.meta.name}
                        </span>
                        {isCurrent && (
                          <span className="shrink-0 text-[10px] text-primary">
                            ●
                          </span>
                        )}
                      </div>
                      {tpl.meta.author && (
                        <p className="mt-0.5 font-body text-[10px] text-muted-foreground">
                          {tpl.meta.author}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="border-0 px-1.5 py-0 font-body text-[10px]"
                      >
                        {t('daysPerWeek', { count: tpl.meta.daysPerWeek })}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`border-0 px-1.5 py-0 font-body text-[10px] ${DIFFICULTY_COLORS[tpl.meta.difficulty]}`}
                      >
                        {tpl.meta.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-1 font-body text-[11px] text-muted-foreground leading-snug">
                    {tpl.meta.description}
                  </p>
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2 border-border border-t pt-3">
                    <div className="space-y-1">
                      {tpl.days.map((day, i) => (
                        <div
                          key={day.name}
                          className="flex items-baseline justify-between font-body text-[11px]"
                        >
                          <span className="text-foreground">
                            {t('dayPreview', { n: i + 1, name: day.name })}
                          </span>
                          <span className="text-muted-foreground">
                            {day.exercises.length} exercises
                          </span>
                        </div>
                      ))}
                    </div>
                    {!isCurrent && (
                      <Button
                        size="sm"
                        className="w-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedTemplate(tpl)
                        }}
                      >
                        {t('selectProgram')}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
