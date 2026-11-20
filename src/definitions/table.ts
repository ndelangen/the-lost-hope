import { z } from 'zod'

import { makeCreate } from './create'
import { entityRefOf } from './kind'

/**
 * The DM's place in the prepared scenes: the scenes the party has left behind, the scenes it is
 * likely to reach next session, scenes written and ready but not yet given a session, and scenes
 * to keep in view regardless of where the party is.
 * Codex updates it while prepping with the DM.
 */
export const Table = z.strictObject({
  past: z
    .array(entityRefOf('scene'))
    .default([])
    .describe(
      'Scenes the party has left behind, in the order they came up, whether they were played or skipped. They leave the dashboard and stay reachable as past scenes. A scene is in at most one of past, likely and ready',
    ),
  likely: z
    .array(entityRefOf('scene'))
    .default([])
    .describe(
      'Scenes the party is likely to reach next session, in the order the DM plans to run them',
    ),
  ready: z
    .array(entityRefOf('scene'))
    .default([])
    .describe(
      'Scenes written and ready to run, not yet given a session. They wait here until the DM moves them into likely',
    ),
  pinned: z
    .array(entityRefOf('scene'))
    .default([])
    .describe('Scenes to keep on the dashboard wherever the party is'),
})

export const create = makeCreate(Table)
export type Table = z.infer<typeof Table>
