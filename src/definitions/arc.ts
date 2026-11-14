import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { entityRefOf } from './kind'
import { deriveSlug } from './slug'

export const Plot = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1),
    status: z.enum(['open', 'closed']).default('open'),
    hook: Content.optional(),
    notes: Content.optional(),
    npcs: z.array(entityRefOf('npc')).default([]),
    scene: entityRefOf('scene').optional(),
    events: z.array(entityRefOf('event')).default([]),
  }),
)

export const Arc = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1),
    icon: z
      .string()
      .describe(
        "A unique icon-catalog id for this arc's symbol, e.g. `gi/GiViolin` — see src/lib/arc-icons.tsx.",
      ),
    direction: Content,
    notes: Content.optional(),
    quests: z.array(entityRefOf('quest')).default([]),
    sessions: z.array(entityRefOf('session')).default([]),
    plots: z.array(Plot),
  }),
)

export const create = makeCreate(Arc)
export type Arc = z.infer<typeof Arc>
