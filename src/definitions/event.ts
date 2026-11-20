import { z } from 'zod'

import { Background, Content } from './content'
import { makeCreate } from './create'
import { Foretold } from './foretold'
import { EntityRefSchema, entityRefOf } from './kind'
import { MediaUrl } from './media'
import { deriveSlug } from './slug'

const EventMark = z.discriminatedUnion('type', [
  z.strictObject({
    type: z.literal('avatar'),
    of: z
      .union([entityRefOf('pc'), entityRefOf('npc'), entityRefOf('beast')])
      .describe('Whose portrait marks the event, as it looked on the event’s campaign day'),
  }),
  z.object({
    type: z.literal('icon'),
    name: z
      .string()
      .min(1)
      .describe('Icon-catalog id, e.g. `gi/GiSailboat` — see src/lib/event-icons.tsx'),
  }),
])

export type EventMark = z.infer<typeof EventMark>

const CharacterRef = z.union([entityRefOf('pc'), entityRefOf('npc'), entityRefOf('beast')])

/**
 * Who kept an emotional bond with one character after an event. The effect owns who lost it: its
 * bearers are the severed side, so the roster is never written twice.
 */
export const BondOutcomes = z
  .strictObject({
    toward: CharacterRef,
    retained: z.array(CharacterRef).describe('Characters who kept their bond'),
    severed: entityRefOf('effect').describe('The effect every character who lost the bond bears'),
  })
  .superRefine(({ toward, retained }, ctx) => {
    const seen = new Set<string>()
    for (const [index, who] of retained.entries()) {
      const id = `${who.ref}:${who.key}`
      if (seen.has(id))
        ctx.addIssue({
          code: 'custom',
          path: ['retained', index],
          message: 'A bond has one outcome per character',
        })
      if (who.ref === toward.ref && who.key === toward.key)
        ctx.addIssue({
          code: 'custom',
          path: ['retained', index],
          message: 'A bond outcome needs two different characters',
        })
      seen.add(id)
    }
  })

export type BondOutcomes = z.infer<typeof BondOutcomes>

/** An animated replay of what happened, played full screen from the event and its session. */
export const EventVisualization = z.discriminatedUnion('kind', [
  z.strictObject({
    kind: z.literal('fleet-battle'),
    fleet: entityRefOf('organization').describe('The organization whose fleet fought'),
  }),
])

export type EventVisualization = z.infer<typeof EventVisualization>

export const EventSchema = deriveSlug(
  z.strictObject({
    name: z.string(),
    notes: Content,
    bondOutcomes: BondOutcomes.optional().describe(
      'Recorded emotional bonds after an event; directed toward one character',
    ),
    day: z.number().int().positive(),
    location: EntityRefSchema,
    mark: EventMark,
    illustrations: z
      .array(MediaUrl)
      .default([])
      .describe(
        'Pictures the players were shown during this event, such as the illustration of the scene played',
      ),
    visualizations: z
      .array(EventVisualization)
      .default([])
      .describe('Animated replays of this event, such as a fleet battle on the radar'),
    foretold: z
      .array(Foretold)
      .min(1)
      .optional()
      .describe('What was promised or foretold in this event, still to come or settled'),
    background: Background,
  }),
)

export const Event = EventSchema

export type Event = z.output<typeof EventSchema>

export const create = makeCreate(EventSchema)
