import { describe, expect, it } from 'vitest'
import { calcOneRM } from '../one-rm'

describe('calcOneRM', () => {
  it('returns weight for 1 rep', () => {
    expect(calcOneRM(100, 1)).toBe(100)
  })

  it('calculates Epley for 5 reps', () => {
    expect(calcOneRM(100, 5)).toBeCloseTo(116.7, 0)
  })

  it('calculates Epley for 10 reps', () => {
    expect(calcOneRM(80, 10)).toBeCloseTo(106.7, 0)
  })

  it('returns 0 for 0 weight', () => {
    expect(calcOneRM(0, 5)).toBe(0)
  })

  it('returns 0 for 0 reps', () => {
    expect(calcOneRM(100, 0)).toBe(0)
  })
})
