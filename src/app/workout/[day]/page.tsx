import type { Metadata } from 'next'
import { PROGRAM } from '@/lib/data/program'
import { WorkoutPageClient } from './client'

export function generateStaticParams() {
  return [
    { day: '0' },
    { day: '1' },
    { day: '2' },
    { day: '3' },
    { day: '4' },
    { day: '5' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>
}): Promise<Metadata> {
  const { day } = await params
  const idx = Number(day)
  const dayData = PROGRAM[idx]
  const title = dayData ? `${dayData.name} — IRON PPL` : 'Workout — IRON PPL'
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
