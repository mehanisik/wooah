'use client'

import { useQuery } from 'convex/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { DayTabBar } from '@/components/workout/day-tab-bar'
import { WorkoutPage } from '@/components/workout/workout-page'
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation'
import { useTemplate } from '@/hooks/use-template'
import { useT } from '@/lib/i18n'
import { api } from '../../../../convex/_generated/api'

function WorkoutContent({ dayIdx }: { dayIdx: number }) {
  useSwipeNavigation()
  const t = useT()
  const searchParams = useSearchParams()
  const prefs = useQuery(api.preferences.get)

  const programDayParam = searchParams.get('programDay')
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = useTemplate(activeProgramId)

  if (prefs === undefined || !template) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('loading')}
      </div>
    )
  }

  const dayCount = template.days.length

  if (dayIdx < 0 || dayIdx >= dayCount) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('invalidDay')}
      </div>
    )
  }

  const parsed =
    programDayParam != null ? Number.parseInt(programDayParam, 10) : Number.NaN
  const programDayIdx = !Number.isNaN(parsed)
    ? Math.max(0, Math.min(parsed, dayCount - 1))
    : dayIdx

  return (
    <>
      <DayTabBar activeDayIdx={dayIdx} />
      <WorkoutPage dayIdx={dayIdx} programDayIdx={programDayIdx} />
    </>
  )
}

export function WorkoutPageClient({ dayIdx }: { dayIdx: number }) {
  return (
    <Suspense
      fallback={
        <div className="py-8 text-center text-muted-foreground">&hellip;</div>
      }
    >
      <WorkoutContent dayIdx={dayIdx} />
    </Suspense>
  )
}
