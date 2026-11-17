import { z } from 'zod'

import { DmContent } from './content'
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
export type SceneOutcome = { when: DmContent; response: DmContent; followUps: SceneOutcome[] }
type SceneOutcomeInput = { when: DmContent; response: DmContent; followUps?: SceneOutcomeInput[] }

export const SceneOutcome: z.ZodType<SceneOutcome, SceneOutcomeInput> = z.lazy(() =>
  z.strictObject({
    when: DmContent.describe('What the party does, or what happens'),
    response: DmContent.describe('How the world answers'),
    followUps: z
      .array(SceneOutcome)
      .default([])
      .describe('Follow-ups that only happen after this one'),
  }),
)

/**
 * One line of a beat, in the order it happens. `say` is spoken at the table: by the NPC in
 * `speaker`, or by the DM to the players when there is none. `do` is something that happens or
 * that the DM does. `note` is something to keep in mind while it plays.
 */
export const SceneLine = z.union([
  z.strictObject({ say: DmContent, speaker: entityRefOf('npc').optional() }),
  z.strictObject({ do: DmContent }),
  z.strictObject({ note: DmContent }),
])

export type SceneLine = z.infer<typeof SceneLine>

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
  outcomes: z.array(SceneOutcome).default([]),
})

export type SceneBeat = z.infer<typeof SceneBeat>

/** The dice a hit's damage can be rolled on, by their number of sides. 1 is a fixed 1 damage. */
export const SHIP_DAMAGE_DICE = [1, 2, 3, 4, 6] as const
export type ShipDamageDie = (typeof SHIP_DAMAGE_DICE)[number]

/**
 * How fast a vessel breaks up in real time while a scene is fought aboard it. The vessel's own
 * record owns its hull: the sectors, their hit points and where the escape pods are. Every interval a die picks one
 * slice of the hull, counted from the bow, and the DM chooses whether its port or its starboard
 * sector is hit. The hit's damage is rolled on the damage die. A sector that has taken all its hit
 * points is destroyed, and the vessel is lost once both sectors of one slice are destroyed,
 * because that cuts it in two.
 */
export const SceneShipDamage = z.strictObject({
  vessel: entityRefOf('item').describe('The vessel, whose record has a hull'),
  everySeconds: z.number().int().positive().describe('Real-time seconds between hits'),
  damageDie: z
    .union(SHIP_DAMAGE_DICE.map((sides) => z.literal(sides)))
    .describe('Sides of the die rolled for one hit. The DM can pick another at the table'),
})

export type SceneShipDamage = z.infer<typeof SceneShipDamage>

/** Who fights the party when the scene turns into a fight, and how many of them. */
const SceneOpponent = z.strictObject({
  creature: z.union([entityRefOf('npc'), entityRefOf('beast')]),
  count: z.number().int().positive().default(1),
})

export type SceneOpponent = z.infer<typeof SceneOpponent>

export const Scene = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1),
    location: entityRefOf('location'),
    alternateLocations: z.array(entityRefOf('location')).default([]),
    battleMaps: z.array(entityRefOf('location')).default([]),
    illustration: MediaUrl.optional(),
    setup: DmContent,
    beats: z
      .array(SceneBeat)
      .default([])
      .describe('The script, top to bottom. Prototype: when present the page shows it'),
    notes: DmContent.optional(),
    npcs: z.array(entityRefOf('npc')).default([]),
    outcomes: z.array(SceneOutcome).default([]),
    opponents: z
      .array(SceneOpponent)
      .default([])
      .describe('The starting roster of the encounter run from this scene'),
    combat: SceneCombatNotes.optional(),
    shipDamage: SceneShipDamage.optional(),
  }),
)

export const create = makeCreate(Scene)
export type Scene = z.infer<typeof Scene>
