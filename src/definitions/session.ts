import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { deriveSlug } from './slug'

export const Session = deriveSlug(
  z.strictObject({
    name: z.string(),
    number: z.number().int().positive(),
    events: z.array(EntityRefSchema),
    date: z.date(),
    notes: Content.optional(),
  }),
)

export const create = makeCreate(Session)

export type Session = z.infer<typeof Session>
