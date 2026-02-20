import type { Metadata } from 'next'
import { CalendarPage as CalendarContent } from '@/components/calendar/calendar-page'

export const metadata: Metadata = {
  title: 'Calendar — IRON PPL',
}

export default function CalendarPage() {
  return <CalendarContent />
}
