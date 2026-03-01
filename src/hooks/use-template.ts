'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from '@/lib/data/programs/types'
import { api } from '../../convex/_generated/api'

type ProgramDoc = NonNullable<
  ReturnType<typeof useQuery<typeof api.programs.getByProgramId>>
>

export type ConvexProgramTemplate = ProgramTemplate & {
  isGlobal: boolean
  forkedFrom?: string
}

function toTemplate(doc: ProgramDoc): ConvexProgramTemplate {
  return {
    meta: {
      id: doc.programId,
      name: doc.name,
      author: doc.author,
      gender: doc.gender as ProgramTemplate['meta']['gender'],
      difficulty: doc.difficulty as ProgramTemplate['meta']['difficulty'],
      daysPerWeek: doc.daysPerWeek,
      description: doc.description,
      tags: doc.tags,
    },
    days: doc.days as Day[],
    defaultRestDays: doc.defaultRestDays,
    isGlobal: doc.isGlobal,
    forkedFrom: doc.forkedFrom,
  }
}

export function useTemplate(
  programId: string | undefined
): ProgramTemplate | undefined {
  const doc = useQuery(
    api.programs.getByProgramId,
    programId ? { programId } : 'skip'
  )
  return useMemo(() => (doc ? toTemplate(doc) : undefined), [doc])
}

export function useAllTemplates(): ConvexProgramTemplate[] | undefined {
  const docs = useQuery(api.programs.list)
  return useMemo(() => docs?.map(toTemplate), [docs])
}
