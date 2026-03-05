'use client'

import { FreestyleWorkoutPage } from '@/components/workout/freestyle-workout-page'
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation'

export function FreestylePageClient() {
  useSwipeNavigation()
  return <FreestyleWorkoutPage />
}
