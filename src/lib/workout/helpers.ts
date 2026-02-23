export function parseRepRange(reps: string): { low: number; high: number } {
  const clean = reps.replace(/[^0-9-]/g, '')
  const parts = clean.split('-').map(Number)
  return {
    low: parts[0] || 0,
    high: parts[parts.length - 1] || parts[0] || 0,
  }
}

export function getTodayWeekdayIdx(): number {
  const jsDay = new Date().getDay()
  return jsDay === 0 ? 6 : jsDay - 1
}

export function getTodayDayIdx(trainingDays: number[]): number | null {
  const weekday = getTodayWeekdayIdx()
  const sorted = [...trainingDays].sort((a, b) => a - b)
  const idx = sorted.indexOf(weekday)
  return idx === -1 ? null : idx
}

export function getWeekDates(): number[] {
  const today = new Date()
  const weekdayIdx = getTodayWeekdayIdx()
  const monday = new Date(today)
  monday.setDate(today.getDate() - weekdayIdx)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d.getDate()
  })
}

export function formatRest(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m <= 0) return `${sec}s`
  if (s > 0) return `${m}m ${s}s`
  return `${m} min`
}

export function formatDuration(totalSec: number): string {
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0)
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function getMonday(d: Date): Date {
  const m = new Date(d)
  m.setHours(0, 0, 0, 0)
  const day = m.getDay()
  m.setDate(m.getDate() - (day === 0 ? 6 : day - 1))
  return m
}

export function calcWeekNumber(startDateStr: string, target: Date): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const [y, mo, d] = startDateStr.split('-').map(Number)
  const startMonday = getMonday(new Date(y, mo - 1, d))
  const targetMonday = getMonday(target)
  return (
    Math.max(
      0,
      Math.floor((targetMonday.getTime() - startMonday.getTime()) / msPerWeek)
    ) + 1
  )
}

export function haptic(ms = 10) {
  navigator.vibrate?.(ms)
}
