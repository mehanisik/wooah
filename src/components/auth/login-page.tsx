'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { signInWithGoogle, signInWithOtp, verifyOtp } from '@/lib/supabase/auth'

const OTP_COOLDOWN_SEC = 60

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  const handleSendOtp = useCallback(async () => {
    if (!email || cooldown > 0) return
    setLoading(true)
    setError('')
    try {
      await signInWithOtp(email)
      setOtpSent(true)
      setCooldown(OTP_COOLDOWN_SEC)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send code')
    } finally {
      setLoading(false)
    }
  }, [email, cooldown])

  const handleVerify = async () => {
    if (!token) return
    setLoading(true)
    setError('')
    try {
      await verifyOtp(email, token)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid code')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      await signInWithGoogle()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="mb-1 font-display text-4xl tracking-wider">IRON PPL</h1>
      <p className="mb-8 font-body text-muted-foreground text-xs">
        Push Pull Legs Tracker
      </p>

      <div className="w-full max-w-xs space-y-3">
        {!otpSent ? (
          <>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="h-10 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
            />
            <Button
              className="w-full text-xs"
              onClick={handleSendOtp}
              disabled={loading || !email || cooldown > 0}
            >
              {(() => {
                if (loading) return 'SENDING...'
                if (cooldown > 0) return `WAIT ${cooldown}s`
                return 'SEND CODE'
              })()}
            </Button>
          </>
        ) : (
          <>
            <p className="text-center text-muted-foreground text-xs">
              Code sent to {email}
            </p>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={8}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter code"
              className="h-10 text-center font-mono text-sm tracking-widest"
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
            <Button
              className="w-full text-xs"
              onClick={handleVerify}
              disabled={loading || token.length < 6}
            >
              {loading ? 'VERIFYING...' : 'VERIFY'}
            </Button>
            <button
              type="button"
              className="w-full text-center text-[10px] text-muted-foreground underline"
              onClick={() => {
                setOtpSent(false)
                setToken('')
                setError('')
              }}
            >
              Use different email
            </button>
          </>
        )}

        {error && (
          <p className="text-center text-destructive text-xs">{error}</p>
        )}

        <div className="my-2 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-[10px] text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          className="w-full text-xs"
          onClick={handleGoogle}
          disabled={loading}
        >
          SIGN IN WITH GOOGLE
        </Button>
      </div>
    </div>
  )
}
