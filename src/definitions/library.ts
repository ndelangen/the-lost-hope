import { z } from 'zod'

import { Content } from './content'
import { entityRefOf } from './kind'
import { PrintedStatBlock } from './stat-block'

/** The rules a publication is written for; it decides how its stat blocks read. */
export const RULESETS = ['5e-2014', '5e-2024'] as const

export type Ruleset = (typeof RULESETS)[number]

/** A book or document the library draws from. Printings name it instead of repeating it. */
export const Publication = z.strictObject({
  name: z.string().trim().min(1).describe('As printed on the cover, e.g. `Monster Manual`'),
  publisher: z.string().trim().min(1).optional().describe('Left out when the source does not say'),
  year: z.number().int().min(1974).optional().describe('Left out when the source does not say'),
  ruleset: z.enum(RULESETS),
  pdf: z
    .string()
    .regex(/\.pdf$/)
    .optional()
    .describe('Path of the source PDF under the DND Books output folder, for checking the print'),
})

export type Publication = z.infer<typeof Publication>

const PublicationRef = entityRefOf('publication')

/**
 * One publication's printing of a monster. The monster itself is every printing that shares its
 * key; identical reprints are listed in `reprintedIn` instead of being copied.
 */
export const MonsterPrinting = z.strictObject({
  name: z.string().trim().min(1).describe('The name this publication prints'),
  page: z.number().int().positive().optional(),
  reprintedIn: z
    .array(PublicationRef)
    .min(1)
    .optional()
    .describe('Publications that print this stat block unchanged'),
  tags: z.array(z.string().trim().min(1)).min(1).optional().describe('e.g. `Dinosaur`'),
  alignment: z.string().trim().min(1).optional().describe('As printed, e.g. `unaligned`'),
  languages: z
    .array(z.string().trim().min(1))
    .default([])
    .describe('Empty when it has none; a rule such as telepathy is written out'),
  habitats: z.array(z.string().trim().min(1)).min(1).optional(),
  appearance: Content.optional().describe('What the party sees, for describing it at the table'),
  lore: Content.optional().describe('Background the publication gives, for the DM'),
  tableNotes: Content.optional().describe(
    'Rulings and running advice the library adds; not printed in the publication',
  ),
  stats: PrintedStatBlock,
})

export type MonsterPrinting = z.infer<typeof MonsterPrinting>

/** Every monster one publication prints, by monster key. */
export const PublicationMonsters = z.strictObject({
  publication: PublicationRef,
  monsters: z.record(z.string().regex(/^[a-z][a-z0-9_]*$/), MonsterPrinting),
})

export const createPublicationMonsters = (input: z.input<typeof PublicationMonsters>) =>
  PublicationMonsters.parse(input)

/** Every publication the library draws from, by publication key. */
export const createPublications = (input: Record<string, z.input<typeof Publication>>) =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, Publication.parse(value)]),
  ) as Record<string, Publication>
