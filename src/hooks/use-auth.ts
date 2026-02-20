'use client'

import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { pullFromSupabase, syncAllToSupabase } from '@/lib/supabase/sync'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabaseClient()
    let cancelled = false

    const timeout = setTimeout(() => {
      if (!cancelled) setLoading(false)
    }, 5000)

    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return
      setUser(data.user)
      setLoading(false)
      clearTimeout(timeout)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (cancelled) return
      const u = session?.user ?? null
      setUser(u)
      setLoading(false)
      clearTimeout(timeout)

      if (u && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        try {
          await pullFromSupabase()
          await syncAllToSupabase()
        } catch {
          // sync failure is non-fatal
        }
      }
    })

    return () => {
      cancelled = true
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
