'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { getTodayDayIdx } from '@/lib/workout/helpers'

export default function Home() {
  const router = useRouter()
  const trainingDays = useWorkoutStore((s) => s.trainingDays)

  useEffect(() => {
    const idx = getTodayDayIdx(trainingDays)
    if (idx === null) {
      router.replace('/rest')
    } else {
      router.replace(`/workout/${idx}`)
    }
  }, [router, trainingDays])

  return (
    <div className="flex items-center justify-center py-16">
      <p className="animate-pulse font-body text-muted-foreground text-sm">
        Redirecting…
      </p>
    </div>
  )
}
