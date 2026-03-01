import type { Metadata } from 'next'
import { WorkoutPageClient } from './client'

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ day: String(i) }))
}

export function generateMetadata(): Metadata {
  return { title: 'Workout — Wooah!' }
}

export default async function WorkoutDayPage({
  params,
}: {
  params: Promise<{ day: string }>
}) {
  const { day } = await params
  return <WorkoutPageClient dayIdx={Number(day)} />
}
