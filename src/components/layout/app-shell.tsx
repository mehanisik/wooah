'use client'

import { useEffect, useState } from 'react'
import { LoginPage } from '@/components/auth/login-page'
import { useAuth } from '@/hooks/use-auth'
import { migrateFromV2 } from '@/lib/store/migration'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { Header } from './header'
import { NavBar } from './nav-bar'
import { UpdatePrompt } from './update-prompt'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const initWeek = useWorkoutStore((s) => s.initWeek)
  const mergeState = useWorkoutStore((s) => s.mergeState)

  useEffect(() => {
    if (authLoading || !user) return
    const v2Data = migrateFromV2()
    if (v2Data) {
      mergeState(v2Data)
    }
    initWeek()
    setReady(true)
  }, [authLoading, user, initWeek, mergeState])

  if (authLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-4xl text-brand tracking-wider">
            IRON PPL
          </h1>
          <p className="mt-2 font-body text-muted-foreground text-sm">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background">
        <LoginPage />
      </div>
    )
  }

  if (!ready) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-4xl text-brand tracking-wider">
            IRON PPL
          </h1>
          <p className="mt-2 font-body text-muted-foreground text-sm">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-20">
        {children}
      </main>
      <NavBar />
      <UpdatePrompt />
    </div>
  )
}
