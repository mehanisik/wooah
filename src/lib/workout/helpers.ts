export function parseRepRange(reps: string): { low: number; high: number } {
  const clean = reps.replace(/[^0-9-]/g, '')
  const parts = clean.split('-').map(Number)
  return {
    low: parts[0] || 0,
    high: parts[parts.length - 1] || parts[0] || 0,
  }
}

export function getTodayDayIdx(): number {
  const jsDay = new Date().getDay()
  return jsDay === 0 ? 6 : jsDay - 1
}

export function getWeekDates(): number[] {
  const today = new Date()
  const todayIdx = getTodayDayIdx()
  const monday = new Date(today)
  monday.setDate(today.getDate() - todayIdx)
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

export function haptic(ms = 10) {
  navigator.vibrate?.(ms)
}
