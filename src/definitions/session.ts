import { z } from 'zod'

import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { deriveSlug } from './slug'

export const Session = deriveSlug(
  z.strictObject({
    name: z.string(),
    events: z.array(EntityRefSchema),
    date: z.date(),
  }),
)

export const create = makeCreate(Session)

export type Session = z.infer<typeof Session>
