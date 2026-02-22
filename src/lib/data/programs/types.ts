import type { Day } from '@/lib/data/program'

export type Gender = 'male' | 'female' | 'unisex'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ProgramMeta {
  id: string
  name: string
  author?: string
  gender: Gender
  difficulty: Difficulty
  daysPerWeek: number
  description: string
  tags: string[]
}

export interface ProgramTemplate {
  meta: ProgramMeta
  days: Day[]
  defaultRestDays: number[]
}
