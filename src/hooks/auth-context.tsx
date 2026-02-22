'use client'

import type { User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { pullFromSupabase, syncAllToSupabase } from '@/lib/supabase/sync'

interface AuthState {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthState>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
        // Run sync outside the auth state change callback to avoid lock contention.
        // onAuthStateChange holds the navigator.locks auth lock — calling getUser()
        // inside sync would deadlock.
        setTimeout(async () => {
          try {
            await pullFromSupabase()
            await syncAllToSupabase()
          } catch {
            // sync failure is non-fatal
          }
        }, 0)
      }
    })

    return () => {
      cancelled = true
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
