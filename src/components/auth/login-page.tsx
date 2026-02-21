'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
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
        return { error: e instanceof Error ? e.message : 'Failed to send code' }
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
        return { error: e instanceof Error ? e.message : 'Invalid code' }
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
          error: e instanceof Error ? e.message : 'Google sign-in failed',
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
      <h1 className="mb-1 font-display text-4xl tracking-wider">IRON PPL</h1>
      <p className="mb-8 font-body text-muted-foreground text-xs">
        Push Pull Legs Tracker
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
                placeholder="Email address"
                className="h-10 text-sm"
              />
              <SubmitButton disabled={!email || cooldown > 0}>
                {(() => {
                  if (sendPending) return 'SENDING...'
                  if (cooldown > 0) return `WAIT ${cooldown}s`
                  return 'SEND CODE'
                })()}
              </SubmitButton>
            </div>
          </form>
        ) : (
          <form action={verifyAction}>
            <div className="space-y-3">
              <p className="text-center text-muted-foreground text-xs">
                Code sent to {email}
              </p>
              <Input
                type="text"
                name="token"
                inputMode="numeric"
                maxLength={8}
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter code"
                className="h-10 text-center font-mono text-sm tracking-widest"
              />
              <SubmitButton disabled={token.length < 6}>
                {verifyPending ? 'VERIFYING...' : 'VERIFY'}
              </SubmitButton>
              <button
                type="button"
                className="w-full text-center text-[10px] text-muted-foreground underline"
                onClick={() => {
                  setOtpSent(false)
                  setToken('')
                }}
              >
                Use different email
              </button>
            </div>
          </form>
        )}

        {error && (
          <p className="text-center text-destructive text-xs">{error}</p>
        )}

        <div className="my-2 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-[10px] text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <form action={googleAction}>
          <Button
            variant="outline"
            className="w-full text-xs"
            type="submit"
            disabled={loading}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </form>
      </div>
    </div>
  )
}
