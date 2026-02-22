'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useT } from '@/lib/i18n'
import { signInWithGoogle, signInWithOtp, verifyOtp } from '@/lib/supabase/auth'

const OTP_COOLDOWN_SEC = 60

interface ActionResult {
  error: string | null
}

function SubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode
  disabled?: boolean
}) {
  const { pending } = useFormStatus()
  return (
    <Button
      className="w-full text-xs"
      type="submit"
      disabled={pending || disabled}
    >
      {children}
    </Button>
  )
}

export function LoginPage() {
  const t = useT()
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [token, setToken] = useState('')
  const [cooldown, setCooldown] = useState(0)

  const [sendState, sendAction, sendPending] = useActionState<
    ActionResult,
    FormData
  >(
    async () => {
      if (!email || cooldown > 0) return { error: null }
      try {
        await signInWithOtp(email)
        setOtpSent(true)
        setCooldown(OTP_COOLDOWN_SEC)
        return { error: null }
      } catch (e: unknown) {
        return { error: e instanceof Error ? e.message : t('failedSendCode') }
      }
    },
    { error: null }
  )

  const [verifyState, verifyAction, verifyPending] = useActionState<
    ActionResult,
    FormData
  >(
    async () => {
      if (!token) return { error: null }
      try {
        await verifyOtp(email, token)
        return { error: null }
      } catch (e: unknown) {
        return { error: e instanceof Error ? e.message : t('invalidCode') }
      }
    },
    { error: null }
  )

  const [googleState, googleAction, googlePending] = useActionState<
    ActionResult,
    FormData
  >(
    async () => {
      try {
        await signInWithGoogle()
        return { error: null }
      } catch (e: unknown) {
        return {
          error: e instanceof Error ? e.message : t('googleSignInFailed'),
        }
      }
    },
    { error: null }
  )

  const loading = sendPending || verifyPending || googlePending
  const error = sendState.error || verifyState.error || googleState.error

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <WooahLogo className="mb-1 text-4xl" />
      <p className="mb-8 font-body text-muted-foreground text-xs">
        {t('pplTracker')}
      </p>

      <div className="w-full max-w-xs space-y-3">
        {!otpSent ? (
          <form action={sendAction}>
            <div className="space-y-3">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="h-10 text-sm"
              />
              <SubmitButton disabled={!email || cooldown > 0}>
                {(() => {
                  if (sendPending) return t('sending')
                  if (cooldown > 0)
                    return t('waitSeconds', { seconds: cooldown })
                  return t('sendCode')
                })()}
              </SubmitButton>
            </div>
          </form>
        ) : (
          <form action={verifyAction}>
            <div className="space-y-3">
              <p className="text-center text-muted-foreground text-xs">
                {t('codeSentTo', { email })}
              </p>
              <Input
                type="text"
                name="token"
                inputMode="numeric"
                maxLength={8}
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                placeholder={t('enterCode')}
                className="h-10 text-center font-mono text-sm tracking-widest"
              />
              <SubmitButton disabled={token.length < 6}>
                {verifyPending ? t('verifying') : t('verify')}
              </SubmitButton>
              <button
                type="button"
                className="w-full text-center text-[10px] text-muted-foreground underline"
                onClick={() => {
                  setOtpSent(false)
                  setToken('')
                }}
              >
                {t('useDifferentEmail')}
              </button>
            </div>
          </form>
        )}

        {error && (
          <p className="text-center text-destructive text-xs">{error}</p>
        )}

        <div className="my-2 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-[10px] text-muted-foreground">{t('or')}</span>
          <Separator className="flex-1" />
        </div>

        <form action={googleAction}>
          <Button
            variant="outline"
            className="w-full text-xs"
            type="submit"
            disabled={loading}
          >
            {t('signInWithGoogle')}
          </Button>
        </form>
      </div>
    </div>
  )
}
