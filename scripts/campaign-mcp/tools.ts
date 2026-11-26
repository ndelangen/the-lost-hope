import { z } from 'zod'

import type { LibraryKind } from '#/definitions/kind'
import type { LibrarySearchOptions } from '#/lib/library-knowledge'
import { LIBRARY_SEARCH_TYPES } from '#/lib/library-search-types'

/**
 * The campaign knowledge tools: names, descriptions and input schemas only. The server registers
 * these without loading campaign data; the worker answers them from a fresh load of the data.
 */

const kinds = [
  'pc',
  'npc',
  'beast',
  'location',
  'event',
  'session',
  'quest',
  'organization',
  'item',
  'effect',
  'arc',
  'scene',
  'creature',
] as const

const record = z
  .string()
  .describe(
    'A record: `refs.npcs.the_father`, `npc:the_father`, a slug, or a name such as "The Father".',
  )

const visibility = z
  .enum(['all', 'player-known', 'dm-only'])
  .default('all')
  .describe('player-known: the party has met it. dm-only: hidden from players.')

export const TOOLS = {
  overview: {
    title: 'Where the campaign stands',
    description:
      'Start here for any story work. Current campaign day, latest session, where the party is, the party, the last events, lasting effects in force, open arcs and quests, and the scenes prepared for next session.',
    input: {},
  },
  get: {
    title: 'Read a record',
    description:
      'Read one campaign record (PC, NPC, beast, location, event, session, quest, organization, item, effect, arc, scene, creature) with every field, DM-only fields labelled, whether the party has met it, and the played events involving it. Library entries it points at (a campaign item that is a Bag of Holding, the spells in a stat block) follow in short.',
    input: {
      record,
      includeDm: z
        .boolean()
        .default(true)
        .describe('Include DM-only fields (background, motivations, secrets).'),
    },
  },
  links: {
    title: 'Follow references',
    description:
      'Everything a record references and everything that references it (backlinks), grouped by kind, with the field each link sits in and whether it is DM-only.',
    input: {
      record,
      direction: z.enum(['both', 'incoming', 'outgoing']).default('both'),
    },
  },
  search: {
    title: 'Search canon',
    description:
      'Full-text search over every record, DM-only fields included. All words must match. Returns refs with a snippet and visibility.',
    input: {
      query: z.string().min(1),
      kinds: z.array(z.enum(kinds)).optional().describe('Only these kinds.'),
      visibility,
    },
  },
  list: {
    title: 'List records of a kind',
    description:
      'Every record of one kind, filterable by visibility. Use visibility "dm-only" to find NPCs and places the party has not met yet.',
    input: { kind: z.enum(kinds), visibility },
  },
  timeline: {
    title: 'What has happened',
    description:
      'Played events in play order, grouped by session, with campaign day and location. Filter by day range, session number, or a record involved. Set detail for the full event notes and DM background.',
    input: {
      fromDay: z.number().int().positive().optional(),
      toDay: z.number().int().positive().optional(),
      session: z.number().int().positive().optional(),
      involving: record.optional().describe('Only events that reference this record.'),
      detail: z.boolean().default(false),
      limit: z
        .number()
        .int()
        .positive()
        .default(40)
        .describe('Show at most this many, latest kept.'),
      includeOffscreen: z
        .boolean()
        .default(false)
        .describe('Also list DM-only events no session lists.'),
    },
  },
  motives: {
    title: 'Established motives and secrets',
    description:
      'Motivations, DM-only background, secret memberships and last appearance of an NPC, or of every NPC around a record (an arc, scene, location, organization or event). Use before suggesting what an NPC does.',
    input: { record },
  },
  met: {
    title: 'Who has met a character',
    description:
      'Every PC, NPC and beast named in the same played events as a record, with how many events they shared and the first and latest. Use for "who knows Jim" questions, such as who rolls a check about him.',
    input: { record },
  },
  arc: {
    title: 'Arcs and plots',
    description:
      'Without a record: every arc with open plot counts. With an arc: its direction, notes, crossings with other arcs, and every plot with hook, notes, scene, NPCs and the events played so far.',
    input: { record: record.optional() },
  },
  check_idea: {
    title: 'Check an idea against canon',
    description:
      'Before suggesting an event, scene, session or arc, pass the idea here. It finds every record the idea names (plus any you list in involves) and returns the canon to check it against: visibility, motivations, secrets, recent events, effects, open plots, open questions, and warnings such as a PC who is retired, an NPC who died, or a record the party has not met. Library entries the idea names in capitals (a Shambling Mound, Fireball), lists in involves, or its records point at follow with their numbers. You make the judgement.',
    input: {
      idea: z.string().min(1).describe('The proposed idea in plain words.'),
      involves: z
        .array(z.string())
        .default([])
        .describe('Extra records to check, as refs or names. Library entries count too.'),
    },
  },
  open_questions: {
    title: 'Open canon questions',
    description:
      'Unresolved campaign questions from QUESTIONS.md. Treat these as unknown: do not invent an answer as fact.',
    input: { filter: z.string().optional().describe('Only questions mentioning this text.') },
  },
} as const

export type ToolName = keyof typeof TOOLS

const libraryEntry = z
  .string()
  .describe(
    'An entry: its id from `library_search` (`monsters/aboleth`, `spells/fireball`), a typed ref (`refs.monsters.aboleth`, `magicItem:bag_of_holding`), or an exact name.',
  )

/**
 * The published library tools: rules reference, not campaign canon. A separate worker answers
 * them, so the campaign tools do not load the library.
 */
export const LIBRARY_TOOLS = {
  library_search: {
    title: 'Search the library',
    description:
      'Search the published library behind /library: creatures, items (magic items and equipment), playable species, NPCs, rules, encounter ideas, and spells. All words must match, in names or printed text. Filter by type, group (a creature type such as Undead, an item group), challenge rating, spell level or item rarity. Library entries are rules reference, not campaign canon: the party has met none of them unless a campaign record says so.',
    input: {
      query: z.string().describe('Words to match; empty to browse by filters alone.'),
      type: z.enum(LIBRARY_SEARCH_TYPES).optional(),
      group: z
        .string()
        .optional()
        .describe('Exact group, e.g. `Undead`, `Dragon`, `Wondrous Item`.'),
      crMin: z.string().optional().describe('Lowest challenge rating, e.g. `1/4` or `5`.'),
      crMax: z.string().optional().describe('Highest challenge rating.'),
      spellLevel: z.number().int().min(0).max(9).optional().describe('0 for cantrips.'),
      rarity: z
        .enum(['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact', 'varies'])
        .optional(),
      limit: z.number().int().positive().max(200).default(25),
    },
  },
  library_get: {
    title: 'Read a library entry',
    description:
      'One library entry in full: a stat block with derived numbers (HP, to-hit, save DCs), a spell, a magic item, equipment, or a catalog entry’s printed text, with every printing listed. DM-only text is labelled.',
    input: {
      entry: libraryEntry,
      printing: z.string().optional().describe('A printing id from the entry, to read that one.'),
    },
  },
} as const

export type LibraryToolName = keyof typeof LIBRARY_TOOLS

type Pointers = readonly { ref: LibraryKind; key: string }[]

/** What the library worker answers: its own tools, and the library side of `get` and `check_idea`. */
export type LibraryRequest =
  | { name: 'library_search'; args: { query: string } & LibrarySearchOptions }
  | { name: 'library_get'; args: { entry: string; printing?: string } }
  | { name: 'sheets'; args: { pointers: Pointers } }
  | { name: 'check'; args: { idea: string; pointers: Pointers; queries: readonly string[] } }

/** What the campaign worker hands on for the library worker to add to `get` and `check_idea`. */
export type LibraryFollowUp =
  | { name: 'sheets'; args: { pointers: Pointers } }
  | { name: 'check'; args: { idea: string; pointers: Pointers; queries: readonly string[] } }
