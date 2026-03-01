import type { Metadata } from 'next'
import { DashboardPage } from '@/components/dashboard/dashboard-page'

export const metadata: Metadata = {
  title: 'Wooah!',
}

export default function Home() {
  return <DashboardPage />
}
