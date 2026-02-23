import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import type {
  MesocycleConfig,
  OneRmEntry,
  SessionNotes,
} from '@/lib/store/types'
import { getMesoWeek, isDeloadWeek } from './mesocycle'

export interface DeloadSignal {
  level: 'red' | 'yellow'
  reason: string
}

export interface DeloadCheckParams {
  mesocycleConfig: MesocycleConfig
  currentWeek: number
  deloadDismissed: number | null
  activeProgramId: string
  oneRmHistory?: Record<string, OneRmEntry[]>
  sessionNotes?: Record<string, SessionNotes>
}

function getRecentOneRMDrops(
  oneRmHistory: Record<string, OneRmEntry[]>
): number {
  let drops = 0
  for (const entries of Object.values(oneRmHistory)) {
    if (entries.length < 3) continue
    const recent = entries.slice(-3)
    const peak = Math.max(...recent.map((e) => e.value))
    const latest = recent[recent.length - 1].value
    if (latest < peak * 0.95) drops++
  }
  return drops
}

function getWeeksSinceDeload(
  config: MesocycleConfig,
  currentWeek: number
): number {
  if (!config.startWeek) return currentWeek
  const week = getMesoWeek(config, currentWeek)
  if (week === null) return currentWeek
  return week
}

function getRecentFatigue(
  sessionNotes: Record<string, SessionNotes>,
  currentWeek: number,
  dayCount: number
): number {
  let fatigueCount = 0
  for (let offset = 0; offset < 3; offset++) {
    for (let d = 0; d < dayCount; d++) {
      const key = `w${currentWeek - offset}-d${d}`
      const notes = sessionNotes[key]
      if (!notes) continue
      if (notes.energy === 'Low' && notes.soreness === 'Very Sore')
        fatigueCount++
    }
  }
  return fatigueCount
}

export function checkDeloadSignals(
  params: DeloadCheckParams
): DeloadSignal | null {
  const {
    mesocycleConfig,
    currentWeek,
    deloadDismissed,
    activeProgramId,
    oneRmHistory = {},
    sessionNotes = {},
  } = params

  if (isDeloadWeek(mesocycleConfig, currentWeek)) return null
  if (deloadDismissed === currentWeek) return null

  const dayCount = getTemplateOrDefault(activeProgramId).days.length

  const oneRMDrops = getRecentOneRMDrops(oneRmHistory)
  const weeksSinceDeload = getWeeksSinceDeload(mesocycleConfig, currentWeek)
  const fatigueCount = getRecentFatigue(sessionNotes, currentWeek, dayCount)

  if (oneRMDrops >= 2) {
    return {
      level: 'red',
      reason: `1RM dropped on ${oneRMDrops} exercises -- performance declining`,
    }
  }

  if (weeksSinceDeload >= 5) {
    return {
      level: 'yellow',
      reason: `${weeksSinceDeload} weeks without deload -- proactive recovery suggested`,
    }
  }

  if (fatigueCount >= 2) {
    return {
      level: 'yellow',
      reason: 'Multiple sessions with low energy + high soreness',
    }
  }

  return null
}
