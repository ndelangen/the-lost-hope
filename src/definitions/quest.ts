import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { deriveSlug } from './slug'

export const Quest = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the quest'),
    icon: z
      .string()
      .describe(
        "A unique icon-catalog id for this quest's visual, e.g. `gi/GiTreasureMap` — see src/lib/quest-icons.tsx.",
      ),
    notes: Content.describe('The description of the quest'),
    status: z.enum(['open', 'resolved']).default('open'),
    clues: Content,
    conclusion: Content.default([]),
  }),
)

export const create = makeCreate(Quest)

export type Quest = z.infer<typeof Quest>
