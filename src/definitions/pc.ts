import { z } from 'zod'

import { Background, Content } from './content'
import { makeCreate } from './create'
import { DEFAULT_AVATAR, MediaUrl, Portrait } from './media'
import { Membership } from './organization'
import { deriveSlug } from './slug'

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

/**
 * DM-only numbers the player shares for running combat. Leave a value out until the player has
 * given it; the tracker shows a gap rather than a guess.
 */
export const PcCombat = z.strictObject({
  ac: z.number().int().nonnegative().optional(),
  maxHp: z.number().int().positive().optional(),
  passivePerception: z.number().int().positive().optional(),
  spellSaveDc: z.number().int().positive().optional(),
})

export type PcCombat = z.infer<typeof PcCombat>

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
    combat: PcCombat.optional().describe('DM only: AC, max HP, and other numbers for combat'),
    background: Background,
  }),
)

export const create = makeCreate(PC)

export type PC = z.infer<typeof PC>
