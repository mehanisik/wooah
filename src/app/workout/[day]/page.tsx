import type { Metadata } from 'next'
import { PROGRAM } from '@/lib/data/program'
import { WorkoutPageClient } from './client'

export function generateStaticParams() {
  return Array.from({ length: 7 }, (_, i) => ({ day: String(i) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>
}): Promise<Metadata> {
  const { day } = await params
  const idx = Number(day)
  const dayData = PROGRAM[idx]
  const title = dayData ? `${dayData.name} — Wooah!` : 'Workout — Wooah!'
  return { title }
}

export default async function WorkoutDayPage({
  params,
}: {
  params: Promise<{ day: string }>
}) {
  const { day } = await params
  return <WorkoutPageClient dayIdx={Number(day)} />
}
