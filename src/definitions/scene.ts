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
  }),
)

export const create = makeCreate(Scene)
export type Scene = z.infer<typeof Scene>
