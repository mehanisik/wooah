'use client'

import type { SyncStatus } from '@/lib/supabase/sync'
import { cn } from '@/lib/utils'

interface SyncIndicatorProps {
  status: SyncStatus
}

export function SyncIndicator({ status }: SyncIndicatorProps) {
  const colors: Record<SyncStatus, string> = {
    idle: 'bg-muted-foreground/40',
    syncing: 'bg-warning animate-pulse',
    success: 'bg-success',
    error: 'bg-destructive',
  }

  const labels: Record<SyncStatus, string> = {
    idle: 'Offline',
    syncing: 'Syncing...',
    success: 'Synced',
    error: 'Sync failed',
  }

  return (
    <span
      className={cn('inline-block h-2 w-2 rounded-full', colors[status])}
      title={labels[status]}
    />
  )
}
