export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'ez_bar'
  | 'smith'

export interface Alternative {
  name: string
  equipment: Equipment
}

export interface CardioItem {
  name: string
  duration: string
}

export interface Exercise {
  name: string
  equipment: Equipment
  sets: number
  reps: string
  rest: number
  rir: string
  amrap?: boolean
  compound?: boolean
  superset?: number
  notes?: string
  alternatives?: Alternative[]
}

export type DayType =
  | 'push'
  | 'pull'
  | 'legs'
  | 'upper'
  | 'lower'
  | 'full'
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'rest'

export interface Day {
  day: string
  name: string
  type: DayType
  focus: string
  warmup?: string
  cardio?: CardioItem[]
  exercises: Exercise[]
}

import { wooahPpl } from './programs/wooah-ppl'

export const PROGRAM: Day[] = wooahPpl.days

export function getAltName(alt: Alternative | string): string {
  return typeof alt === 'string' ? alt : alt.name
}

export function getAltEquipment(alt: Alternative | string): Equipment | null {
  return typeof alt === 'string' ? null : alt.equipment
}

const EQUIP_LABELS: Record<Equipment, string> = {
  barbell: 'BB',
  dumbbell: 'DB',
  machine: 'MACH',
  cable: 'CABLE',
  bodyweight: 'BW',
  ez_bar: 'EZ',
  smith: 'SMITH',
}

export function getEquipLabel(eq: Equipment | string | undefined): string {
  if (!eq) return ''
  return EQUIP_LABELS[eq as Equipment] || eq.toUpperCase()
}

export const MOTIVATIONAL = [
  "The iron never lies. You either lift it or you don't.",
  'Discipline is choosing between what you want now and what you want most.',
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  'Suffer the pain of discipline or suffer the pain of regret.',
  "You don't have to be extreme, just consistent.",
  'The hard days are what make you stronger.',
  "Success isn't always about greatness. It's about consistency.",
  'Fall in love with the process and the results will come.',
  'The resistance that you fight physically in the gym strengthens you elsewhere.',
  "Today's pain is tomorrow's power.",
  'The difference between try and triumph is a little umph.',
  'Push yourself because no one else is going to do it for you.',
  'Strength does not come from winning. It comes from struggles.',
  'The body achieves what the mind believes.',
]

export const REST_QUOTES = [
  "Muscles grow during rest, not during training. You've earned this.",
  "Recovery is not laziness. It's where adaptation happens.",
  'The strongest athletes know when to push and when to rest.',
  'Sleep is the most anabolic thing you can do today.',
  'Trust the process. Your muscles are rebuilding right now.',
]
