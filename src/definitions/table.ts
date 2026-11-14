import { z } from 'zod'

import { makeCreate } from './create'
import { entityRefOf } from './kind'

/**
 * The DM's selection for the next session: scenes the party is likely to reach, and scenes to
 * keep in view regardless of where the party is. Codex updates it while prepping with the DM.
 */
export const Table = z.strictObject({
  likely: z
    .array(entityRefOf('scene'))
    .default([])
    .describe('Scenes the party is likely to reach next session'),
  pinned: z
    .array(entityRefOf('scene'))
    .default([])
    .describe('Scenes to keep on the dashboard wherever the party is'),
})

export const create = makeCreate(Table)
export type Table = z.infer<typeof Table>
