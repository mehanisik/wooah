import type { Metadata } from 'next'
import { InfoPage as InfoContent } from '@/components/info/info-page'

export const metadata: Metadata = {
  title: 'Info — Wooah!',
}

export default function InfoPage() {
  return <InfoContent />
}
