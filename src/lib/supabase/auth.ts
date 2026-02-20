import type { User } from '@supabase/supabase-js'
import { getSupabaseClient } from './client'

export async function signInWithOtp(email: string) {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error
}

export async function verifyOtp(email: string, token: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })
  if (error) throw error
  return data
}

let gisLoaded = false

function loadGoogleIdentityServices(): Promise<void> {
  if (gisLoaded && typeof google !== 'undefined') return Promise.resolve()
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="gsi/client"]')) {
      gisLoaded = true
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => {
      gisLoaded = true
      resolve()
    }
    script.onerror = () => reject(new Error('Failed to load Google Sign-In'))
    document.head.appendChild(script)
  })
}

export async function signInWithGoogle() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  if (!clientId) throw new Error('Google Sign-In not configured')

  await loadGoogleIdentityServices()
  if (typeof google === 'undefined')
    throw new Error('Google Sign-In not available')

  const supabase = getSupabaseClient()
  const nonce = crypto.getRandomValues(new Uint8Array(32))
  const nonceB64 = btoa(String.fromCharCode(...nonce))
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(nonceB64)
  )
  const nonceHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return new Promise<User | null>((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('Google Sign-In timed out')),
      60_000
    )
    google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: { credential: string }) => {
        clearTimeout(timeout)
        try {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
            nonce: nonceB64,
          })
          if (error) throw error
          resolve(data.user)
        } catch (e) {
          reject(e)
        }
      },
      nonce: nonceHash,
    })
    google.accounts.id.prompt()
  })
}

export async function signOut() {
  const supabase = getSupabaseClient()
  await supabase.auth.signOut()
}

export async function getUser(): Promise<User | null> {
  const supabase = getSupabaseClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}

declare const google: {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string
        callback: (response: { credential: string }) => void
        nonce: string
      }) => void
      prompt: () => void
    }
  }
}
