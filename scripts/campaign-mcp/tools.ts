import { z } from 'zod'

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
      'Read one campaign record (PC, NPC, beast, location, event, session, quest, organization, item, effect, arc, scene, creature) with every field, DM-only fields labelled, whether the party has met it, and the played events involving it.',
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
  arc: {
    title: 'Arcs and plots',
    description:
      'Without a record: every arc with open plot counts. With an arc: its direction, notes, crossings with other arcs, and every plot with hook, notes, scene, NPCs and the events played so far.',
    input: { record: record.optional() },
  },
  check_idea: {
    title: 'Check an idea against canon',
    description:
      'Before suggesting an event, scene, session or arc, pass the idea here. It finds every record the idea names (plus any you list in involves) and returns the canon to check it against: visibility, motivations, secrets, recent events, effects, open plots, open questions, and warnings such as a PC who is retired, an NPC who died, or a record the party has not met. You make the judgement.',
    input: {
      idea: z.string().min(1).describe('The proposed idea in plain words.'),
      involves: z
        .array(z.string())
        .default([])
        .describe('Extra records to check, as refs or names.'),
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
