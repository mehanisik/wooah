export const DATE_LOCALE = 'en-GB' as const

function toDate(d: Date | string): Date {
  return typeof d === 'string' ? new Date(d) : d
}

export function formatDate(
  d: Date | string,
  opts?: Intl.DateTimeFormatOptions
): string {
  return toDate(d).toLocaleDateString(DATE_LOCALE, opts)
}

export function formatDateShort(d: Date | string): string {
  return formatDate(d, { day: 'numeric', month: 'short' })
}

export function formatDateFull(d: Date | string): string {
  return formatDate(d, { weekday: 'long', day: 'numeric', month: 'short' })
}

export function formatMonthYear(d: Date | string): string {
  return formatDate(d, { month: 'long', year: 'numeric' })
}

export function formatDateCompact(d: Date | string): string {
  return formatDate(d, { day: '2-digit', month: '2-digit' })
}

export function formatTimeShort(iso: string): string {
  return toDate(iso).toLocaleTimeString(DATE_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}
