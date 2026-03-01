'use client'

import { useMutation, useQuery } from 'convex/react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth-context'
import {
  type ConvexProgramTemplate,
  useAllTemplates,
} from '@/hooks/use-template'
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
  const forkMut = useMutation(api.programs.fork)
  const removeMut = useMutation(api.programs.remove)

  const allTemplates = useAllTemplates()
  const currentProgramId = prefs?.activeProgramId ?? 'wooah-ppl'

  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [pickingDaysFor, setPickingDaysFor] = useState<ProgramTemplate | null>(
    null
  )
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [forkingId, setForkingId] = useState<string | null>(null)
  const [forkName, setForkName] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { globals, userPrograms } = useMemo(() => {
    if (!allTemplates) return { globals: [], userPrograms: [] }
    const g: ConvexProgramTemplate[] = []
    const u: ConvexProgramTemplate[] = []
    for (const tpl of allTemplates) {
      if (tpl.isGlobal) {
        g.push(tpl)
      } else {
        u.push(tpl)
      }
    }
    return { globals: g, userPrograms: u }
  }, [allTemplates])

  const filteredGlobals = useMemo(
    () => globals.filter((tpl) => matchesFilter(tpl, filter)),
    [globals, filter]
  )

  const filteredUser = useMemo(
    () => userPrograms.filter((tpl) => matchesFilter(tpl, filter)),
    [userPrograms, filter]
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

  const handleFork = useCallback(
    async (sourceId: string) => {
      const name = forkName.trim()
      if (!name) return
      const newId = `${sourceId}-${Date.now()}`
      await forkMut({
        sourceProgramId: sourceId,
        newProgramId: newId,
        newName: name,
      })
      setForkingId(null)
      setForkName('')
      upsertPrefs({ activeProgramId: newId })
    },
    [forkMut, forkName, upsertPrefs]
  )

  const handleDelete = useCallback(
    async (programId: string) => {
      await removeMut({ programId })
      setDeletingId(null)
      if (currentProgramId === programId) {
        upsertPrefs({ activeProgramId: 'wooah-ppl' })
      }
    },
    [removeMut, currentProgramId, upsertPrefs]
  )

  if (!allTemplates) {
    return (
      <div className="space-y-4 pb-4">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="h-20 animate-pulse rounded bg-muted" />
        <div className="h-20 animate-pulse rounded bg-muted" />
      </div>
    )
  }

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

  const renderCard = (tpl: ProgramTemplate, isUserProgram: boolean) => {
    const isCurrent = tpl.meta.id === currentProgramId
    const isExpanded = expandedId === tpl.meta.id

    return (
      <div
        key={tpl.meta.id}
        className={`rounded-lg border p-3 transition-colors ${
          isCurrent ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'
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

            <div className="flex gap-2">
              {!isCurrent && (
                <Button
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    startDayPick(tpl)
                  }}
                >
                  {t('selectProgram')}
                </Button>
              )}

              {!isUserProgram && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    setForkingId(tpl.meta.id)
                    setForkName(`${tpl.meta.name} (copy)`)
                  }}
                >
                  <Copy className="h-3 w-3" />
                  {t('forkProgram')}
                </Button>
              )}

              {isUserProgram && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      setForkingId(tpl.meta.id)
                      setForkName(`${tpl.meta.name} (copy)`)
                    }}
                  >
                    <Copy className="h-3 w-3" />
                    {t('forkProgram')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive text-xs hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeletingId(tpl.meta.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                    {t('deleteProgram')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {forkingId === tpl.meta.id && (
          <div className="mt-2 space-y-2 border-border border-t pt-2">
            <input
              type="text"
              value={forkName}
              onChange={(e) => setForkName(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-1.5 font-body text-xs"
              placeholder={t('forkNamePlaceholder')}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setForkingId(null)}
              >
                {t('cancel')}
              </Button>
              <Button
                size="sm"
                className="flex-1 text-xs"
                disabled={!forkName.trim()}
                onClick={() => handleFork(tpl.meta.id)}
              >
                {t('confirmSwitch')}
              </Button>
            </div>
          </div>
        )}

        {deletingId === tpl.meta.id && (
          <div className="mt-2 space-y-2 border-destructive/30 border-t pt-2">
            <p className="font-body text-[11px] text-destructive">
              {t('confirmDeleteProgram')}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setDeletingId(null)}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleDelete(tpl.meta.id)}
              >
                {t('deleteProgram')}
              </Button>
            </div>
          </div>
        )}
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

      {filteredUser.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-display text-[11px] text-muted-foreground uppercase tracking-wider">
            {t('myPrograms')}
          </h3>
          {filteredUser.map((tpl) => renderCard(tpl, true))}
        </div>
      )}

      <div className="space-y-2">
        {filteredUser.length > 0 && (
          <h3 className="font-display text-[11px] text-muted-foreground uppercase tracking-wider">
            {t('templates')}
          </h3>
        )}
        {filteredGlobals.map((tpl) => renderCard(tpl, false))}
      </div>
    </div>
  )
}
