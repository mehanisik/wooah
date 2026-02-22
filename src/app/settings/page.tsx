import type { Metadata } from 'next'
import { SettingsPageClient } from './client'

export const metadata: Metadata = {
  title: 'Settings — Wooah!',
}

export default function SettingsPage() {
  return <SettingsPageClient />
}
