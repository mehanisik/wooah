'use client'

import type { LucideIcon } from 'lucide-react'
import { BarChart3, Calendar, Camera, Dumbbell } from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  workout: Dumbbell,
  calendar: Calendar,
  stats: BarChart3,
  photos: Camera,
}

interface EmptyStateProps {
  type: keyof typeof icons
  title: string
  message: string
}

export function EmptyState({ type, title, message }: EmptyStateProps) {
  const Icon = icons[type] || Dumbbell

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground/50" />
      </div>
      <h3 className="mb-1 font-display text-sm tracking-wider">{title}</h3>
      <p className="max-w-[220px] font-body text-[11px] text-muted-foreground">
        {message}
      </p>
    </div>
  )
}
