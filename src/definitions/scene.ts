import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema, entityRefOf } from './kind'
import { MediaUrl } from './media'
import { deriveSlug } from './slug'

/** Prep for when a scene turns into a fight, pinned at the top of its encounter in combat focus. */
export const SceneCombatNotes = z.strictObject({
  tactics: Content.optional().describe('How the opposition fights'),
  morale: Content.optional().describe('When they flee, surrender, or change sides'),
  terrain: Content.optional().describe('Cover, hazards, light, and what is on the map'),
  reinforcements: Content.optional().describe('Who else arrives, and what triggers them'),
  exits: Content.optional().describe('Other ways out for either side'),
})

export type SceneCombatNotes = z.infer<typeof SceneCombatNotes>

/**
 * One "if" in a scene. Follow-ups only come into play when this branch happens, so
 * skipping a branch skips everything nested under it.
 */
export type SceneOutcome = { when: Content; response: Content; followUps: SceneOutcome[] }
type SceneOutcomeInput = { when: Content; response: Content; followUps?: SceneOutcomeInput[] }

export const SceneOutcome: z.ZodType<SceneOutcome, SceneOutcomeInput> = z.lazy(() =>
  z.strictObject({
    when: Content.describe('What the party does, or what happens'),
    response: Content.describe('How the world answers'),
    followUps: z
      .array(SceneOutcome)
      .default([])
      .describe('Follow-ups that only happen after this one'),
  }),
)

const ShipSector = z.strictObject({
  name: z.string().trim().min(1),
  escapePods: z.boolean().describe('Whether this sector has a way off the ship'),
})

/** The dice a hit's damage can be rolled on, by their number of sides. 1 is a fixed 1 damage. */
export const SHIP_DAMAGE_DICE = [1, 2, 3, 4, 6] as const
export type ShipDamageDie = (typeof SHIP_DAMAGE_DICE)[number]

/**
 * A vessel that breaks up in real time while a scene is fought aboard it. Every interval a die
 * picks one slice of the ship, counted from the bow, and the DM chooses whether its port or its
 * starboard sector is hit. The hit's damage is rolled on the damage die. A sector that has taken
 * all its hit points is destroyed, and the vessel is lost once both sectors of one slice are
 * destroyed, because that cuts it in two.
 */
export const SceneShipDamage = z
  .strictObject({
    vessel: entityRefOf('item'),
    everySeconds: z.number().int().positive().describe('Real-time seconds between hits'),
    damageDie: z
      .union(SHIP_DAMAGE_DICE.map((sides) => z.literal(sides)))
      .describe('Sides of the die rolled for one hit. The DM can pick another at the table'),
    sectorHitPoints: z.number().int().positive().describe('Damage that destroys a sector'),
    port: z.array(ShipSector).min(1).describe('Port sectors, from bow to stern'),
    starboard: z.array(ShipSector).min(1).describe('Starboard sectors, from bow to stern'),
  })
  .refine((ship) => ship.port.length === ship.starboard.length, {
    message: 'Port and starboard need the same number of sectors',
  })

export type SceneShipDamage = z.infer<typeof SceneShipDamage>

export const Scene = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1),
    location: entityRefOf('location'),
    illustration: MediaUrl.optional(),
    setup: Content,
    notes: Content.optional(),
    npcs: z.array(entityRefOf('npc')).default([]),
    references: z.array(EntityRefSchema).default([]),
    outcomes: z.array(SceneOutcome).default([]),
    combat: SceneCombatNotes.optional(),
    shipDamage: SceneShipDamage.optional(),
  }),
)

export const create = makeCreate(Scene)
export type Scene = z.infer<typeof Scene>
