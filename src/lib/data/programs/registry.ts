import { fiveThreeOneBbb } from './531-bbb'
import { albertoNunezUl } from './alberto-nunez-ul'
import { bullmastiff } from './bullmastiff'
import { cbumSplit } from './cbum-split'
import { fullBody3 } from './full-body-3'
import { gzclp } from './gzclp'
import { lyleMcdonaldGbr } from './lyle-mcdonald-gbr'
import { mapsAnabolic } from './maps-anabolic'
import { naturalHypertrophyGuts } from './natural-hypertrophy-guts'
import { nippardFundamentals } from './nippard-fundamentals'
import { nippardPpl } from './nippard-ppl'
import { nippardUl } from './nippard-ul'
import { nsuns5Day } from './nsuns-5day'
import { phat } from './phat'
import { phul } from './phul'
import { redditPpl } from './reddit-ppl'
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
  nippardUl,
  nippardFundamentals,
  gzclp,
  nsuns5Day,
  phul,
  strongCurves,
  womensUpperLower,
  bullmastiff,
  redditPpl,
  fiveThreeOneBbb,
  albertoNunezUl,
  mapsAnabolic,
  phat,
  naturalHypertrophyGuts,
  lyleMcdonaldGbr,
]

export function getTemplate(id: string): ProgramTemplate | undefined {
  return PROGRAM_TEMPLATES.find((t) => t.meta.id === id)
}

export function getTemplateOrDefault(id: string): ProgramTemplate {
  return getTemplate(id) ?? wooahPpl
}
