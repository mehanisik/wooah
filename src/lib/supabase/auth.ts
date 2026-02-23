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

export async function signInWithGoogle() {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  })
  if (error) throw error
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
