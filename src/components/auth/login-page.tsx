'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useT } from '@/lib/i18n'

export function LoginPage() {
  const t = useT()
  const { signIn } = useAuthActions()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await signIn('google', { redirectTo: window.location.origin })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('googleSignInFailed'))
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <WooahLogo className="mb-1 text-4xl" />
      <p className="mb-8 font-body text-muted-foreground text-xs">
        {t('pplTracker')}
      </p>

      <div className="w-full max-w-xs space-y-3">
        <Button
          className="w-full text-xs"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? t('loading') : t('signInWithGoogle')}
        </Button>

        {error && (
          <p className="text-center text-destructive text-xs">{error}</p>
        )}
      </div>
    </div>
  )
}
