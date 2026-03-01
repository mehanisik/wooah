'use client'

import { CalendarPage } from '@/components/calendar/calendar-page'
import { PhotosPage } from '@/components/photos/photos-page'

export function ProgressPage() {
  return (
    <div className="space-y-6 pb-4">
      <CalendarPage />
      <div className="border-border border-t" />
      <PhotosPage />
    </div>
  )
}
