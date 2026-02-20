import type { Metadata } from 'next'
import { InfoPage as InfoContent } from '@/components/info/info-page'

export const metadata: Metadata = {
  title: 'Info — IRON PPL',
}

export default function InfoPage() {
  return <InfoContent />
}
