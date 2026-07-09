import { z } from 'zod'

import { Content } from './content'
import { EntityRefSchema } from './kind'
import { MediaUrl } from './media'
import { deriveSlug } from './slug'

export const EventMark = z.discriminatedUnion('type', [
  z.object({ type: z.literal('avatar'), url: MediaUrl }),
  z.object({
    type: z.literal('icon'),
    name: z
      .string()
      .min(1)
      .describe('react-icons id, e.g. `gi/GiSailboat` — see src/lib/event-icons.tsx'),
  }),
])

export type EventMark = z.infer<typeof EventMark>

export const EventSchema = deriveSlug(
  z.strictObject({
    name: z.string(),
    parts: z.array(Content),
    date: z.date(),
    location: EntityRefSchema,
    mark: EventMark,
    image: MediaUrl.optional(),
  }),
)

export const Event = EventSchema

export type Event = z.output<typeof EventSchema>

export function create(input: z.input<typeof EventSchema>): Event {
  return EventSchema.parse(input)
}
