import { describe, expect, it } from 'vitest'
import { getAltEquipment, getAltName, getEquipLabel } from '../program'

describe('getAltName', () => {
  it('returns string as-is', () => {
    expect(getAltName('Bench Press')).toBe('Bench Press')
  })

  it('returns name from Alternative object', () => {
    expect(
      getAltName({ name: 'Incline DB Press', equipment: 'dumbbell' })
    ).toBe('Incline DB Press')
  })
})

describe('getAltEquipment', () => {
  it('returns null for string alt', () => {
    expect(getAltEquipment('Bench Press')).toBeNull()
  })

  it('returns equipment from Alternative object', () => {
    expect(
      getAltEquipment({ name: 'Incline DB Press', equipment: 'dumbbell' })
    ).toBe('dumbbell')
  })
})

describe('getEquipLabel', () => {
  it('returns label for known equipment', () => {
    expect(getEquipLabel('barbell')).toBe('BB')
    expect(getEquipLabel('dumbbell')).toBe('DB')
    expect(getEquipLabel('cable')).toBe('CABLE')
    expect(getEquipLabel('bodyweight')).toBe('BW')
    expect(getEquipLabel('ez_bar')).toBe('EZ')
    expect(getEquipLabel('smith')).toBe('SMITH')
    expect(getEquipLabel('machine')).toBe('MACH')
  })

  it('returns empty string for undefined', () => {
    expect(getEquipLabel(undefined)).toBe('')
  })

  it('uppercases unknown equipment', () => {
    expect(getEquipLabel('kettlebell')).toBe('KETTLEBELL')
  })
})
