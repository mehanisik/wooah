import { describe, expect, it } from 'vitest'
import {
  calcWeekNumber,
  formatDuration,
  formatRest,
  getMonday,
  getTodayDayIdx,
  getTodayWeekdayIdx,
  parseRepRange,
} from '../helpers'

describe('parseRepRange', () => {
  it('parses single number', () => {
    expect(parseRepRange('10')).toEqual({ low: 10, high: 10 })
  })

  it('parses range', () => {
    expect(parseRepRange('8-12')).toEqual({ low: 8, high: 12 })
  })

  it('handles AMRAP', () => {
    const result = parseRepRange('5+')
    expect(result.low).toBe(5)
  })
})

describe('formatRest', () => {
  it('formats seconds with minutes and seconds', () => {
    expect(formatRest(90)).toBe('1m 30s')
  })

  it('formats exact minutes', () => {
    expect(formatRest(120)).toBe('2 min')
  })

  it('formats 60 seconds', () => {
    expect(formatRest(60)).toBe('1 min')
  })

  it('formats pure seconds', () => {
    expect(formatRest(45)).toBe('45s')
  })
})

describe('formatDuration', () => {
  it('formats hours', () => {
    const result = formatDuration(3600)
    expect(result).toBe('1:00:00')
  })

  it('formats short duration', () => {
    const result = formatDuration(300)
    expect(result).toBe('5:00')
  })

  it('formats mixed', () => {
    expect(formatDuration(3661)).toBe('1:01:01')
  })
})

describe('getTodayWeekdayIdx', () => {
  it('returns 0-6', () => {
    const idx = getTodayWeekdayIdx()
    expect(idx).toBeGreaterThanOrEqual(0)
    expect(idx).toBeLessThanOrEqual(6)
  })
})

describe('getTodayDayIdx', () => {
  it('returns program day index or null', () => {
    const allDays = [0, 1, 2, 3, 4, 5]
    const idx = getTodayDayIdx(allDays)
    const weekday = getTodayWeekdayIdx()
    if (weekday === 6) {
      expect(idx).toBeNull()
    } else {
      expect(idx).toBe(weekday)
    }
  })

  it('returns null for non-training day', () => {
    const idx = getTodayDayIdx([])
    expect(idx).toBeNull()
  })
})

describe('getMonday', () => {
  it('returns Monday for a Monday', () => {
    const mon = new Date(2026, 0, 5) // Jan 5, 2026 = Monday
    const result = getMonday(mon)
    expect(result.getDay()).toBe(1)
    expect(result.getDate()).toBe(5)
  })

  it('returns Monday for a Wednesday', () => {
    const wed = new Date(2026, 0, 7) // Jan 7, 2026 = Wednesday
    const result = getMonday(wed)
    expect(result.getDay()).toBe(1)
    expect(result.getDate()).toBe(5)
  })

  it('returns Monday for a Sunday', () => {
    const sun = new Date(2026, 0, 11) // Jan 11, 2026 = Sunday
    const result = getMonday(sun)
    expect(result.getDay()).toBe(1)
    expect(result.getDate()).toBe(5)
  })

  it('normalizes to midnight', () => {
    const d = new Date(2026, 0, 7, 15, 30, 0) // 3:30 PM
    const result = getMonday(d)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
  })
})

describe('calcWeekNumber', () => {
  it('returns 1 for the start week', () => {
    expect(calcWeekNumber('2026-01-05', new Date(2026, 0, 5))).toBe(1)
  })

  it('returns 1 for any day in the start week', () => {
    expect(calcWeekNumber('2026-01-05', new Date(2026, 0, 7))).toBe(1) // Wed
    expect(calcWeekNumber('2026-01-05', new Date(2026, 0, 11))).toBe(1) // Sun
  })

  it('returns 2 for the next week', () => {
    expect(calcWeekNumber('2026-01-05', new Date(2026, 0, 12))).toBe(2) // next Mon
    expect(calcWeekNumber('2026-01-05', new Date(2026, 0, 14))).toBe(2) // next Wed
  })

  it('returns correct week across months', () => {
    expect(calcWeekNumber('2026-01-05', new Date(2026, 1, 2))).toBe(5) // Feb 2
  })

  it('same Monday produces week 1, not 0 or 2', () => {
    // This is the exact bug scenario: startDate is a Monday string,
    // target is the same Monday as a local Date.
    // Before fix: new Date("2026-01-05") = UTC midnight, off by TZ offset,
    // causing week 0 instead of 1.
    const startStr = '2026-01-05' // Monday
    const targetLocal = new Date(2026, 0, 5) // same Monday, local midnight
    expect(calcWeekNumber(startStr, targetLocal)).toBe(1)
  })

  it('consecutive Mondays get consecutive weeks', () => {
    const start = '2026-01-05'
    for (let w = 0; w < 8; w++) {
      const monday = new Date(2026, 0, 5 + w * 7)
      expect(calcWeekNumber(start, monday)).toBe(w + 1)
    }
  })

  it('start date mid-week still anchors to that Monday', () => {
    // Start on Wednesday Jan 7 — Monday of that week is Jan 5
    expect(calcWeekNumber('2026-01-07', new Date(2026, 0, 5))).toBe(1) // Mon
    expect(calcWeekNumber('2026-01-07', new Date(2026, 0, 7))).toBe(1) // Wed
    expect(calcWeekNumber('2026-01-07', new Date(2026, 0, 12))).toBe(2) // next Mon
  })
})
