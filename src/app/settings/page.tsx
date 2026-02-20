import type { Metadata } from 'next'
import { SettingsPageClient } from './client'

export const metadata: Metadata = {
  title: 'Settings — IRON PPL',
}

export default function SettingsPage() {
  return <SettingsPageClient />
}
