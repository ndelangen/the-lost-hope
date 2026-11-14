import { z } from 'zod'

import { makeCreate } from './create'
import { deriveSlug } from './slug'
import { StatBlock } from './stat-block'

/**
 * DM-only shared stat block for a kind of creature, such as a gang tough. NPCs and beasts that are
 * this kind of creature reference it from `stats` instead of copying its numbers.
 */
export const Creature = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1).describe('The kind of creature, e.g. `Tough`'),
    stats: StatBlock,
  }),
)

export const create = makeCreate(Creature)
export type Creature = z.infer<typeof Creature>
