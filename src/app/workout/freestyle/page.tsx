import type { Metadata } from 'next'
import { FreestylePageClient } from './client'

export function generateMetadata(): Metadata {
  return { title: 'Freestyle Workout — Wooah!' }
}

export default function FreestylePage() {
  return <FreestylePageClient />
}
