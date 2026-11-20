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

const BondOutcome = z.discriminatedUnion('state', [
  z.strictObject({ who: CharacterRef, state: z.literal('retained') }),
  z.strictObject({ who: CharacterRef, state: z.literal('severed'), effect: entityRefOf('effect') }),
])

export const BondOutcomes = z
  .strictObject({
    toward: CharacterRef,
    outcomes: z.array(BondOutcome).min(1),
  })
  .superRefine(({ toward, outcomes }, ctx) => {
    const seen = new Set<string>()
    for (const [index, outcome] of outcomes.entries()) {
      const id = `${outcome.who.ref}:${outcome.who.key}`
      if (seen.has(id))
        ctx.addIssue({
          code: 'custom',
          path: ['outcomes', index, 'who'],
          message: 'A bond has one outcome per character',
        })
      if (outcome.who.ref === toward.ref && outcome.who.key === toward.key)
        ctx.addIssue({
          code: 'custom',
          path: ['outcomes', index, 'who'],
          message: 'A bond outcome needs two different characters',
        })
      seen.add(id)
    }
  })

export type BondOutcomes = z.infer<typeof BondOutcomes>

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
    foretold: z
      .array(Foretold)
      .min(1)
      .optional()
      .describe('What was promised or foretold in this event, still to come or come true'),
    background: Background,
  }),
)

export const Event = EventSchema

export type Event = z.output<typeof EventSchema>

export const create = makeCreate(EventSchema)
