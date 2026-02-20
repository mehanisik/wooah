import type { Metadata } from 'next'
import { RestPageClient } from './client'

export const metadata: Metadata = {
  title: 'Rest Day — IRON PPL',
}

export default function RestPage() {
  return <RestPageClient />
}
