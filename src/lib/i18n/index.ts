import { useQuery } from 'convex/react'
import { useCallback } from 'react'
import { api } from '../../../convex/_generated/api'
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

function usePrefsLocale(): Locale {
  const prefs = useQuery(api.preferences.get)
  return (prefs?.locale as Locale) ?? 'en'
}

export function useT() {
  const locale = usePrefsLocale()

  return useCallback(
    (key: MessageKey, params?: Record<string, string | number>): string => {
      const msg = dictionaries[locale]?.[key] ?? en[key] ?? key
      return params ? interpolate(msg, params) : msg
    },
    [locale]
  )
}

export function useLocale(): Locale {
  return usePrefsLocale()
}

export function useMotivational(): string[] {
  const locale = usePrefsLocale()
  return locale === 'pl' ? MOTIVATIONAL_PL : MOTIVATIONAL_EN
}

export function useRestQuotes(): string[] {
  const locale = usePrefsLocale()
  return locale === 'pl' ? REST_QUOTES_PL : REST_QUOTES_EN
}

export function getDateLocale(locale: Locale): string {
  return locale === 'pl' ? 'pl-PL' : 'en-GB'
}
