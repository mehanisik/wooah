import type { Metadata } from 'next'
import { ProgressPage } from '@/components/progress/progress-page'

export const metadata: Metadata = {
  title: 'Progress — Wooah!',
}

export default function Progress() {
  return <ProgressPage />
}
