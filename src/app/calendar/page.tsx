import type { Metadata } from 'next'
import { CalendarPage as CalendarContent } from '@/components/calendar/calendar-page'

export const metadata: Metadata = {
  title: 'Calendar — Wooah!',
}

export default function CalendarPage() {
  return <CalendarContent />
}
