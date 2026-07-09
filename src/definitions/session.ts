import { z } from 'zod'

import { EntityRefSchema } from './kind'
import { deriveSlug } from './slug'

export const Session = deriveSlug(
  z.strictObject({
    name: z.string(),
    events: z.array(EntityRefSchema),
    date: z.date(),
  }),
)

export function create(input: z.input<typeof Session>): z.infer<typeof Session> {
  return Session.parse(input)
}

export type Session = z.infer<typeof Session>
