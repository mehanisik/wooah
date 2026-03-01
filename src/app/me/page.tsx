import type { Metadata } from 'next'
import { MePage } from '@/components/me/me-page'

export const metadata: Metadata = {
  title: 'Me — Wooah!',
}

export default function Me() {
  return <MePage />
}
