import { useCallback } from 'react'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import type { Messages } from './en'
import en, { MOTIVATIONAL_EN, REST_QUOTES_EN } from './en'
import pl, { MOTIVATIONAL_PL, REST_QUOTES_PL } from './pl'
import type { Locale } from './types'

export type { Locale }
export type MessageKey = keyof Messages

const dictionaries: Record<Locale, Messages> = { en, pl }

function interpolate(
  str: string,
  params: Record<string, string | number>
): string {
  let result = str
  for (const [key, val] of Object.entries(params)) {
    result = result.replaceAll(`{${key}}`, String(val))
  }
  return result
}

export function useT() {
  const locale = useWorkoutStore((s) => s.locale)

  return useCallback(
    (key: MessageKey, params?: Record<string, string | number>): string => {
      const msg = dictionaries[locale]?.[key] ?? en[key] ?? key
      return params ? interpolate(msg, params) : msg
    },
    [locale]
  )
}

export function useLocale(): Locale {
  return useWorkoutStore((s) => s.locale)
}

export function useMotivational(): string[] {
  const locale = useWorkoutStore((s) => s.locale)
  return locale === 'pl' ? MOTIVATIONAL_PL : MOTIVATIONAL_EN
}

export function useRestQuotes(): string[] {
  const locale = useWorkoutStore((s) => s.locale)
  return locale === 'pl' ? REST_QUOTES_PL : REST_QUOTES_EN
}

export function getDateLocale(locale: Locale): string {
  return locale === 'pl' ? 'pl-PL' : 'en-GB'
}
