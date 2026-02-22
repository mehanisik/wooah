import { describe, expect, it } from 'vitest'
import {
  formatDuration,
  formatRest,
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
