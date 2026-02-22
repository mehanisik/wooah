import type { Locale } from '@/lib/i18n/types'

const LOCALE_MAP: Record<Locale, string> = {
  en: 'en-GB',
  pl: 'pl-PL',
}

function toDate(d: Date | string): Date {
  return typeof d === 'string' ? new Date(d) : d
}

export function formatDate(
  d: Date | string,
  opts?: Intl.DateTimeFormatOptions,
  locale: Locale = 'en'
): string {
  return toDate(d).toLocaleDateString(LOCALE_MAP[locale], opts)
}

export function formatDateShort(d: Date | string, locale?: Locale): string {
  return formatDate(d, { day: 'numeric', month: 'short' }, locale)
}

export function formatDateFull(d: Date | string, locale?: Locale): string {
  return formatDate(
    d,
    { weekday: 'long', day: 'numeric', month: 'short' },
    locale
  )
}

export function formatMonthYear(d: Date | string, locale?: Locale): string {
  return formatDate(d, { month: 'long', year: 'numeric' }, locale)
}

export function formatDateCompact(d: Date | string, locale?: Locale): string {
  return formatDate(d, { day: '2-digit', month: '2-digit' }, locale)
}

export function formatTimeShort(iso: string, locale: Locale = 'en'): string {
  return toDate(iso).toLocaleTimeString(LOCALE_MAP[locale], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}
