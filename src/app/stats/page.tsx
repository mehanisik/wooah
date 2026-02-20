import type { Metadata } from 'next'
import { StatsPage as StatsContent } from '@/components/stats/stats-page'

export const metadata: Metadata = {
  title: 'Stats — IRON PPL',
}

export default function StatsPage() {
  return <StatsContent />
}
