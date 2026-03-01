'use client'

import { useMutation, useQuery } from 'convex/react'
import { useEffect } from 'react'
import { LoginPage } from '@/components/auth/login-page'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useAuth } from '@/hooks/auth-context'
import { loadExerciseDb } from '@/lib/exercise-db'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'
import { Header } from './header'
import { NavBar } from './nav-bar'
import { UpdatePrompt } from './update-prompt'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const t = useT()
  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')
  const upsertPrefs = useMutation(api.preferences.upsert)

  useEffect(() => {
    if (!isAuthenticated) return
    if (prefs === undefined) return
    if (prefs === null) {
      upsertPrefs({
        startDate: new Date().toISOString().split('T')[0],
      })
    }
    loadExerciseDb().catch(() => undefined)
  }, [isAuthenticated, prefs, upsertPrefs])

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

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background">
        <LoginPage />
      </div>
    )
  }

  if (prefs === undefined) {
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
      <main className="safe-area-mb mx-auto w-full max-w-lg flex-1 px-4 pt-4 pb-[4.5rem]">
        {children}
      </main>
      <NavBar />
      <UpdatePrompt />
    </div>
  )
}
