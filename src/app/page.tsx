'use client'

import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useT } from '@/lib/i18n'
import { getTodayDayIdx } from '@/lib/workout/helpers'
import { api } from '../../convex/_generated/api'

export default function Home() {
  const t = useT()
  const router = useRouter()
  const prefs = useQuery(api.preferences.get)
  const trainingDays = prefs?.trainingDays ?? [0, 1, 2, 3, 4, 5]

  useEffect(() => {
    if (prefs === undefined) return
    const idx = getTodayDayIdx(trainingDays)
    if (idx === null) {
      router.replace('/rest')
    } else {
      router.replace(`/workout/${idx}`)
    }
  }, [router, trainingDays, prefs])

  return (
    <div className="flex items-center justify-center py-16">
      <p className="animate-pulse font-body text-muted-foreground text-sm">
        {t('redirecting')}
      </p>
    </div>
  )
}
