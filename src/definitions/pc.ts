import { z } from 'zod'

import { ABILITY_KEYS } from '#/lib/rules'

import { Background, Content } from './content'
import { makeCreate } from './create'
import { entityRefOf } from './kind'
import { DEFAULT_AVATAR, MediaUrl, Portrait } from './media'
import { Membership } from './organization'
import { deriveSlug } from './slug'
import { PcStatBlock } from './stat-block'

const PC_STATUSES = ['active', 'retired', 'occasional'] as const

const PreviousPortrait = Portrait.extend({
  until: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      'Last campaign day this portrait showed the character. Event marks on or before that day use it.',
    ),
})

export type PreviousPortrait = z.infer<typeof PreviousPortrait>

const AbilityId = z.enum(ABILITY_KEYS)

/**
 * A level-scaled creature a PC keeps or summons (a ranger's beast, an artificer's steel defender,
 * a familiar): the library's stat block, worked out from the PC's level and numbers.
 */
export const Companion = z.strictObject({
  creature: entityRefOf('monster').describe(
    'The library creature, e.g. `refs.monsters.steel_defender`',
  ),
  publication: entityRefOf('publication').describe('Which printing of it the PC uses'),
  name: z.string().trim().min(1).optional().describe('What the PC calls it, e.g. `Bolt`'),
  options: z
    .array(z.string().min(1))
    .optional()
    .describe('Keys of the options or form it has, e.g. `land` for a Beast of the Land'),
  level: z
    .number()
    .int()
    .min(1)
    .max(20)
    .optional()
    .describe(
      'The spell slot it is summoned with, or the class level when that differs from the character level',
    ),
  castingAbility: AbilityId.optional().describe(
    "The PC's spellcasting ability for its spell attack and save DC, when the class doesn't say",
  ),
})

export type Companion = z.infer<typeof Companion>

export const PC = deriveSlug(
  z.strictObject({
    name: z.string().describe('The character name of the PC'),
    player: z.string().describe('The player name of the PC'),
    url: z.string().optional().default('').describe('The URL of the character sheet'),
    avatar: MediaUrl.default(DEFAULT_AVATAR).describe('The avatar of the PC'),
    previousPortraits: z
      .array(PreviousPortrait)
      .optional()
      .describe('Earlier portraits, ordered from newest to oldest'),
    status: z.enum(PC_STATUSES).describe('The status of the PC'),
    // Mechanical facts (source of truth) — never restated in prose; stat line derives from these.
    species: z.string().optional().describe('Species/ancestry, e.g. "Human"'),
    class: z.string().optional().describe('Class, e.g. "Warlock"'),
    subclass: z.string().optional().describe('Subclass / archetype, e.g. "Great Old One Patron"'),
    level: z.number().int().positive().optional().describe('Character level'),
    languages: z
      .array(z.string())
      .optional()
      .describe("Languages the character speaks, e.g. ['Common', 'Elvish']"),
    notes: Content.optional().describe('Short narrative flavor — NOT the stat line'),
    memberships: z.array(Membership).optional(),
    secretMemberships: z
      .array(Membership)
      .optional()
      .describe('DM only: memberships the party has not discovered'),
    companions: z
      .array(Companion)
      .min(1)
      .optional()
      .describe(
        'DM only: creatures the character keeps or summons whose numbers follow theirs, e.g. a steel defender',
      ),
    stats: PcStatBlock.optional().describe(
      'DM only: the character sheet as a stat block, so the encounter runs the PC like any creature',
    ),
    background: Background,
  }),
)

export const create = makeCreate(PC)

export type PC = z.infer<typeof PC>
