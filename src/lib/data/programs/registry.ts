import { cbumSplit } from './cbum-split'
import { fullBody3 } from './full-body-3'
import { gzclp } from './gzclp'
import { nippardPpl } from './nippard-ppl'
import { nsuns5Day } from './nsuns-5day'
import { phul } from './phul'
import { strongCurves } from './strong-curves'
import type { ProgramTemplate } from './types'
import { upperLower4 } from './upper-lower-4'
import { womensUpperLower } from './womens-upper-lower'
import { wooahPpl } from './wooah-ppl'

export const PROGRAM_TEMPLATES: ProgramTemplate[] = [
  wooahPpl,
  upperLower4,
  fullBody3,
  cbumSplit,
  nippardPpl,
  gzclp,
  nsuns5Day,
  phul,
  strongCurves,
  womensUpperLower,
]

export function getTemplate(id: string): ProgramTemplate | undefined {
  return PROGRAM_TEMPLATES.find((t) => t.meta.id === id)
}

export function getTemplateOrDefault(id: string): ProgramTemplate {
  return getTemplate(id) ?? wooahPpl
}
