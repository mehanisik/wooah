import { describe, expect, it } from 'vitest'
import type { MesocycleConfig } from '@/lib/store/types'
import {
  getMesoWeek,
  getRIR,
  getTargetVolume,
  isDeloadWeek,
} from '../mesocycle'

const defaultConfig: MesocycleConfig = {
  length: 4,
  deloadLength: 1,
  startWeek: 1,
  rampRate: 1,
}

describe('getMesoWeek', () => {
  it('returns week within meso', () => {
    expect(getMesoWeek(defaultConfig, 1)).toBe(1)
    expect(getMesoWeek(defaultConfig, 4)).toBe(4)
    expect(getMesoWeek(defaultConfig, 5)).toBe(5)
  })

  it('returns null if no startWeek', () => {
    expect(getMesoWeek({ ...defaultConfig, startWeek: null }, 3)).toBeNull()
  })

  it('cycles back after full cycle', () => {
    expect(getMesoWeek(defaultConfig, 6)).toBe(1)
  })
})

describe('isDeloadWeek', () => {
  it('identifies deload week', () => {
    expect(isDeloadWeek(defaultConfig, 5)).toBe(true)
  })

  it('identifies training weeks', () => {
    expect(isDeloadWeek(defaultConfig, 1)).toBe(false)
    expect(isDeloadWeek(defaultConfig, 4)).toBe(false)
  })
})

describe('getRIR', () => {
  it('returns decreasing RIR through meso', () => {
    const w1 = getRIR(defaultConfig, 1)
    const w4 = getRIR(defaultConfig, 4)
    expect(w1).toBe('3')
    expect(w4).toBe('1')
  })

  it('returns higher RIR during deload', () => {
    const deload = getRIR(defaultConfig, 5)
    expect(deload).toBe('3-4')
  })
})

describe('getTargetVolume', () => {
  it('returns positive volume', () => {
    const vol = getTargetVolume(10, defaultConfig, 1)
    expect(vol).toBeGreaterThan(0)
  })

  it('increases through meso', () => {
    const v1 = getTargetVolume(10, defaultConfig, 1)
    const v3 = getTargetVolume(10, defaultConfig, 3)
    expect(v3).toBeGreaterThanOrEqual(v1)
  })

  it('drops during deload', () => {
    const v4 = getTargetVolume(10, defaultConfig, 4)
    const vDeload = getTargetVolume(10, defaultConfig, 5)
    expect(vDeload).toBeLessThan(v4)
  })

  it('returns base volume when no config', () => {
    const vol = getTargetVolume(10, { ...defaultConfig, startWeek: null }, 1)
    expect(vol).toBe(10)
  })
})
