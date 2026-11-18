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

export const EventSchema = deriveSlug(
  z.strictObject({
    name: z.string(),
    notes: Content,
    day: z.number().int().positive(),
    location: EntityRefSchema,
    mark: EventMark,
    image: MediaUrl.optional(),
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
