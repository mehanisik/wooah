import type { MesocycleConfig } from '@/lib/store/types'

export function getMesoWeek(
  config: MesocycleConfig,
  currentWeek: number
): number | null {
  if (!config.startWeek) return null
  const cycleLen = config.length + config.deloadLength
  const weeksSinceStart = currentWeek - config.startWeek
  if (weeksSinceStart < 0) return null
  return (weeksSinceStart % cycleLen) + 1
}

export function isDeloadWeek(
  config: MesocycleConfig,
  currentWeek: number
): boolean {
  const week = getMesoWeek(config, currentWeek)
  if (week === null) return false
  return week > config.length
}

export function getRIR(
  config: MesocycleConfig,
  currentWeek: number
): string | null {
  const week = getMesoWeek(config, currentWeek)
  if (week === null) return null
  if (isDeloadWeek(config, currentWeek)) return '3-4'
  if (week === 1) return '3'
  if (week === 2) return '2-3'
  if (week === 3) return '2'
  return '1'
}

export function getTargetVolume(
  baseVolume: number,
  config: MesocycleConfig,
  currentWeek: number
): number {
  const week = getMesoWeek(config, currentWeek)
  if (week === null) return baseVolume
  if (isDeloadWeek(config, currentWeek)) return Math.round(baseVolume * 0.6)
  return baseVolume + (week - 1) * config.rampRate
}

export function getMesoSuggestion(
  currentSets: number,
  targetSets: number
): string | null {
  const diff = targetSets - currentSets
  if (diff > 0) return `Add ${diff} set${diff > 1 ? 's' : ''}`
  if (diff < 0) return `Remove ${-diff} set${diff < -1 ? 's' : ''}`
  return null
}
