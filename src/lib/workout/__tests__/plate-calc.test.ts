import { describe, expect, it } from 'vitest'
import { calcPlates, isBarbell } from '../plate-calc'

describe('calcPlates', () => {
  it('returns empty plates for bar weight only', () => {
    const result = calcPlates(20, 'Barbell Bench Press', 20)
    expect(result).not.toBeNull()
    expect(result!.plates).toEqual([])
  })

  it('calculates plates for 60kg', () => {
    const result = calcPlates(60, 'Barbell Bench Press', 20)
    expect(result).not.toBeNull()
    expect(result!.plates.length).toBeGreaterThan(0)
  })

  it('calculates plates for 100kg', () => {
    const result = calcPlates(100, 'Barbell Bench Press', 20)
    expect(result).not.toBeNull()
    expect(result!.plates.some((p) => p === 25)).toBe(true)
  })

  it('returns null for 0 weight', () => {
    const result = calcPlates(0, 'Bench', 20)
    expect(result).toBeNull()
  })

  it('uses 10kg bar for curls', () => {
    const result = calcPlates(30, 'EZ curl', 20)
    expect(result).not.toBeNull()
    expect(result!.barWeight).toBe(10)
  })
})

describe('isBarbell', () => {
  it('recognizes barbell exercises', () => {
    expect(isBarbell('Flat Barbell Bench Press')).toBe(true)
    expect(isBarbell('Barbell Squat')).toBe(true)
  })

  it('rejects non-barbell exercises', () => {
    expect(isBarbell('DB Lateral Raise')).toBe(false)
    expect(isBarbell('Cable Fly')).toBe(false)
  })
})
