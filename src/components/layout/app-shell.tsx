'use client'

import { useEffect, useState } from 'react'
import { LoginPage } from '@/components/auth/login-page'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useAuth } from '@/hooks/auth-context'
import { loadExerciseDb } from '@/lib/exercise-db'
import { useT } from '@/lib/i18n'
import { migrateFromV2 } from '@/lib/store/migration'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { Header } from './header'
import { NavBar } from './nav-bar'
import { UpdatePrompt } from './update-prompt'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const t = useT()
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
    loadExerciseDb().catch(() => undefined)
  }, [authLoading, user, initWeek, mergeState])

  if (authLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background">
        <div className="text-center">
          <WooahLogo className="text-4xl" />
          <p className="mt-2 font-body text-muted-foreground text-sm">
            {t('loading')}
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
          <WooahLogo className="text-4xl" />
          <p className="mt-2 font-body text-muted-foreground text-sm">
            {t('loading')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="safe-area-mb mx-auto w-full max-w-lg flex-1 px-4 pt-4 pb-[5.5rem]">
        {children}
      </main>
      <NavBar />
      <UpdatePrompt />
    </div>
  )
}
