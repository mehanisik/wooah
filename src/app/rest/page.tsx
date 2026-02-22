import type { Metadata } from 'next'
import { RestPageClient } from './client'

export const metadata: Metadata = {
  title: 'Rest Day — Wooah!',
}

export default function RestPage() {
  return <RestPageClient />
}
