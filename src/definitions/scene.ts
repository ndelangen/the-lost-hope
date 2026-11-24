import { z } from 'zod'

import { ABILITY_KEYS } from '#/lib/rules'

import { Content, DmContent } from './content'
import { makeCreate } from './create'
import { entityRefOf } from './kind'
import { MediaUrl } from './media'
import { deriveSlug } from './slug'

/** Prep for when a scene turns into a fight, pinned at the top of its encounter in combat focus. */
export const SceneCombatNotes = z.strictObject({
  tactics: DmContent.optional().describe('How the opposition fights'),
  morale: DmContent.optional().describe('When they flee, surrender, or change sides'),
  terrain: DmContent.optional().describe('Cover, hazards, light, and what is on the map'),
  reinforcements: DmContent.optional().describe('Who else arrives, and what triggers them'),
  exits: DmContent.optional().describe('Other ways out for either side'),
})

export type SceneCombatNotes = z.infer<typeof SceneCombatNotes>

/**
 * One "if" in a scene. Follow-ups only come into play when this branch happens, so
 * skipping a branch skips everything nested under it.
 */
export type SceneOutcome = {
  icon: string
  when: DmContent
  response: DmContent
  followUps: SceneOutcome[]
}
type SceneOutcomeInput = {
  icon: string
  when: DmContent
  response: DmContent
  followUps?: SceneOutcomeInput[]
}

export const SceneOutcome: z.ZodType<SceneOutcome, SceneOutcomeInput> = z.lazy(() =>
  z.strictObject({
    icon: z
      .string()
      .describe(
        'Icon-catalog id depicting what the players do in this outcome, e.g. `gi/GiConversation` — see src/lib/outcome-icons.tsx.',
      ),
    when: DmContent.describe('What the party does, or what happens'),
    response: DmContent.describe('How the world answers'),
    followUps: z
      .array(SceneOutcome)
      .default([])
      .describe('Follow-ups that only happen after this one'),
  }),
)

/**
 * One line of a beat, in the order it happens. `say` is spoken at the table: by the character
 * in `speaker`, or by the DM to the players when there is none. `do` is something that happens or
 * that the DM does. `note` is something to keep in mind while it plays.
 */
export const SceneLine = z.union([
  z.strictObject({
    say: DmContent,
    speaker: z.union([entityRefOf('npc'), entityRefOf('pc')]).optional(),
  }),
  z.strictObject({ do: DmContent }),
  z.strictObject({ note: DmContent }),
])

export type SceneLine = z.infer<typeof SceneLine>

const GroupSaveRoller = z.union([entityRefOf('pc'), entityRefOf('npc'), entityRefOf('beast')])

/**
 * A saving throw that several characters make at the same moment, each on their own roll. The DM
 * fills in the rolls at the table and can put the list on the player screen, so `title`, `passed`
 * and `failed` are words the players read. Players roll for their own characters; the DM rolls
 * for the rest, with the save bonus from each stat block. Someone whose outcome is fixed is listed
 * with `always`. Everyone listed appears on the player screen by name and portrait, whether or not
 * the party has met them in a played event, so list only those the players may see.
 */
export const SceneGroupSave = z.strictObject({
  title: Content.describe('Heading over the list on the player screen'),
  ability: z.enum(ABILITY_KEYS).describe('What everyone saves with'),
  dc: z.number().int().positive(),
  reasonBonus: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Added to a roll when a player gives a good reason for that character'),
  rollers: z
    .array(
      z.union([
        GroupSaveRoller,
        z.strictObject({
          who: GroupSaveRoller,
          always: z
            .enum(['passed', 'failed'])
            .describe('The outcome is fixed: nobody rolls for them'),
        }),
      ]),
    )
    .min(1)
    .describe('Everyone on the list, in the order they are listed'),
  passed: z.string().trim().min(1).describe('Shown beside someone who made the save'),
  failed: z.string().trim().min(1).describe('Shown beside someone who failed it'),
})

export type SceneGroupSave = z.infer<typeof SceneGroupSave>

/** A creature that fights when the scene turns into a fight, and how many of it. */
const SceneOpponent = z.strictObject({
  creature: z.union([entityRefOf('npc'), entityRefOf('beast')]),
  count: z.number().int().positive().default(1),
  plan: DmContent.optional().describe(
    'Who this group goes for and how, shown next to them where the fight is run',
  ),
})

export type SceneOpponent = z.infer<typeof SceneOpponent>

/**
 * Where aboard a vessel a fight takes place: a deck, and on it one slice of the hull or one sector
 * of that slice. The slice is counted from the bow, from 1.
 * Without a slice the fight is anywhere on that deck.
 */
export const FightPlace = z
  .strictObject({
    deck: entityRefOf('location').describe('The deck map of the vessel the scene is fought aboard'),
    slice: z.number().int().positive().optional().describe('Slice of the hull, from 1 at the bow'),
    side: z.enum(['port', 'starboard']).optional().describe('One side of that slice only'),
  })
  .refine((place) => place.side === undefined || place.slice !== undefined, {
    message: 'A side needs the slice it is a side of',
  })

export type FightPlace = z.infer<typeof FightPlace>

/**
 * Who joins the fight when a beat is played: the enemies of a room, or help that turns up for the
 * party. The encounter run from the scene lists every beat's fight and brings one in on a click,
 * so nobody is added by hand. How many there are is said here, not in the beat's lines.
 */
export const SceneBeatFight = z
  .strictObject({
    opponents: z.array(SceneOpponent).default([]).describe('Enemies who join the fight'),
    allies: z
      .array(SceneOpponent)
      .default([])
      .describe('Creatures who join on the side of the party'),
    tactics: DmContent.optional().describe('How to play them, shown where the fight is run'),
    where: z
      .array(FightPlace)
      .default([])
      .describe(
        'Aboard a vessel under fire: the rooms the fight is in, so it can be run from the ship. Leave empty for a fight that is not tied to a room',
      ),
  })
  .refine((fight) => fight.opponents.length + fight.allies.length > 0, {
    message: 'A fight needs someone in it',
  })

export type SceneBeatFight = z.infer<typeof SceneBeatFight>

/**
 * One moment of a scene. A scene's beats are its script: the DM plays them top to bottom. A beat
 * with `onlyIf` is optional and is skipped when that does not hold. Its outcomes are the branches
 * that belong to this moment.
 */
export const SceneBeat = z.strictObject({
  title: z.string().trim().min(1),
  onlyIf: DmContent.optional().describe(
    'When this beat is played. Leave out for one always played',
  ),
  lines: z.array(SceneLine).min(1),
  groupSave: SceneGroupSave.optional().describe('A save everyone listed makes during this beat'),
  fight: SceneBeatFight.optional().describe('Who joins the fight when this beat is played'),
  cleared: z
    .array(FightPlace)
    .default([])
    .describe(
      'Aboard a vessel: the rooms the party has already fought through in this beat. The ship shows them as cleared',
    ),
  outcomes: z.array(SceneOutcome).default([]),
})

export type SceneBeat = z.infer<typeof SceneBeat>

export const Scene = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1),
    location: entityRefOf('location'),
    alternateLocations: z.array(entityRefOf('location')).default([]),
    battleMaps: z.array(entityRefOf('location')).default([]),
    illustrations: z.array(MediaUrl).default([]),
    setup: DmContent.describe('The situation the scene opens on, in a paragraph or two'),
    beats: z
      .array(SceneBeat)
      .refine(
        (beats) => {
          const titles = beats.filter((beat) => beat.fight).map((beat) => beat.title)
          return new Set(titles).size === titles.length
        },
        {
          message:
            'Beats that bring a fight need different titles: the encounter tells them apart by title',
        },
      )
      .default([])
      .describe('The script: the moments of the scene in the order they are played'),
    npcs: z.array(entityRefOf('npc')).default([]),
    outcomes: z
      .array(SceneOutcome)
      .default([])
      .describe('Branches that can happen at any moment of the scene'),
    opponents: z
      .array(SceneOpponent)
      .default([])
      .describe(
        'The starting roster of the encounter run from this scene. Whoever joins later belongs to the `fight` of a beat',
      ),
    combat: SceneCombatNotes.optional(),
    aboard: entityRefOf('item')
      .optional()
      .describe('The vessel the scene is fought aboard. Its room board places the fights'),
  }),
)

export const create = makeCreate(Scene)
export type Scene = z.infer<typeof Scene>
