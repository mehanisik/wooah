'use client'

import { useMutation, useQuery } from 'convex/react'
import { ArrowLeft, Check, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth-context'
import { PROGRAM_TEMPLATES } from '@/lib/data/programs/registry'
import type { Difficulty, ProgramTemplate } from '@/lib/data/programs/types'
import type { MessageKey } from '@/lib/i18n'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'

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

const WEEKDAY_KEYS: MessageKey[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const SHORT_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function ProgramBrowser() {
  const t = useT()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')
  const upsertPrefs = useMutation(api.preferences.upsert)

  const currentProgramId = prefs?.activeProgramId ?? 'wooah-ppl'

  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [pickingDaysFor, setPickingDaysFor] = useState<ProgramTemplate | null>(
    null
  )
  const [selectedDays, setSelectedDays] = useState<number[]>([])

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

  const startDayPick = useCallback((tpl: ProgramTemplate) => {
    const restSet = new Set(tpl.defaultRestDays)
    const defaults = Array.from({ length: 7 }, (_, i) => i).filter(
      (i) => !restSet.has(i)
    )
    setPickingDaysFor(tpl)
    setSelectedDays(defaults)
  }, [])

  const toggleDay = useCallback(
    (day: number) => {
      if (!pickingDaysFor) return
      const required = pickingDaysFor.meta.daysPerWeek
      setSelectedDays((prev) => {
        if (prev.includes(day)) return prev.filter((d) => d !== day)
        if (prev.length >= required) return prev
        return [...prev, day]
      })
    },
    [pickingDaysFor]
  )

  const sortedDays = useMemo(
    () => [...selectedDays].sort((a, b) => a - b),
    [selectedDays]
  )

  const handleConfirm = useCallback(() => {
    if (!pickingDaysFor) return
    upsertPrefs({
      activeProgramId: pickingDaysFor.meta.id,
      trainingDays: sortedDays,
    })
    setPickingDaysFor(null)
    setExpandedId(null)
    router.push('/')
  }, [pickingDaysFor, sortedDays, upsertPrefs, router])

  if (pickingDaysFor) {
    const required = pickingDaysFor.meta.daysPerWeek
    const isValid = selectedDays.length === required

    return (
      <div className="space-y-4 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPickingDaysFor(null)}
            className="rounded-md p-1.5 transition-colors hover:bg-accent"
            aria-label={t('cancel')}
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <h2 className="font-display text-lg tracking-wider">
            {t('selectTrainingDays')}
          </h2>
        </div>

        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <p className="font-display text-xs tracking-wider">
            {pickingDaysFor.meta.name}
          </p>
          <p className="mt-1 font-body text-[11px] text-muted-foreground">
            {t('trainingDaysHelper', { count: required })}
          </p>
        </div>

        <p className="text-center font-body text-muted-foreground text-xs">
          {t('daysSelected', {
            selected: selectedDays.length,
            required,
          })}
        </p>

        <div className="grid grid-cols-7 gap-1.5">
          {WEEKDAY_KEYS.map((key, i) => {
            const active = selectedDays.includes(i)
            return (
              <button
                type="button"
                key={key}
                onClick={() => toggleDay(i)}
                className={`flex flex-col items-center rounded-lg py-3 transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                <span className="font-display text-xs">{SHORT_LABELS[i]}</span>
                <span className="mt-0.5 font-body text-[9px]">
                  {t(key).slice(0, 3)}
                </span>
              </button>
            )
          })}
        </div>

        {isValid && (
          <div className="space-y-1 rounded-lg border border-border bg-card px-4 py-3">
            {sortedDays.map((weekday, i) => (
              <div
                key={weekday}
                className="flex items-baseline justify-between font-body text-[11px]"
              >
                <span className="text-muted-foreground">
                  {t(WEEKDAY_KEYS[weekday])}
                </span>
                <span className="text-foreground">
                  {pickingDaysFor.days[i]?.name ?? '\u2014'}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setPickingDaysFor(null)}
          >
            {t('cancel')}
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs"
            disabled={!isValid}
            onClick={handleConfirm}
          >
            {t('confirmSwitch')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-md p-1.5 transition-colors hover:bg-accent"
          aria-label={t('backToWorkout')}
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Link>
        <h2 className="font-display text-lg tracking-wider">{t('programs')}</h2>
      </div>

      <div className="scrollbar-none flex gap-1.5 overflow-x-auto">
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

      <div className="space-y-2">
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
                        <Check className="h-3 w-3 shrink-0 text-primary" />
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
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
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
                          {t('nExercises', {
                            count: day.exercises.length,
                          })}
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
                        startDayPick(tpl)
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
    </div>
  )
}
