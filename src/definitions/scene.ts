import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema, entityRefOf } from './kind'
import { deriveSlug } from './slug'

export const Scene = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1),
    location: entityRefOf('location'),
    setup: Content,
    notes: Content.optional(),
    npcs: z.array(entityRefOf('npc')).default([]),
    references: z.array(EntityRefSchema).default([]),
    outcomes: z.array(z.strictObject({ when: Content, response: Content })).default([]),
  }),
)

export const create = makeCreate(Scene)
export type Scene = z.infer<typeof Scene>
