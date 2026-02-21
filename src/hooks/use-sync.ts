'use client'

import { useState } from 'react'
import { type SyncStatus, syncToSupabase } from '@/lib/supabase/sync'

export function useSync() {
  const [status, setStatus] = useState<SyncStatus>('idle')

  const sync = async (dayIdx: number) => {
    setStatus('syncing')
    try {
      await syncToSupabase(dayIdx)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return { status, sync }
}
