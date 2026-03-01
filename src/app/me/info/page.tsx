import type { Metadata } from 'next'
import { InfoPage } from '@/components/info/info-page'

export const metadata: Metadata = {
  title: 'Training Info — Wooah!',
}

export default function MeInfoPage() {
  return <InfoPage />
}
