import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { deriveSlug } from './slug'

export const QUEST_TYPES = ['mystery', 'mission'] as const
export const QuestType = z.enum(QUEST_TYPES)

export const Quest = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the quest'),
    icon: z
      .string()
      .describe(
        "A unique icon-catalog id for this quest's visual, e.g. `gi/GiTreasureMap` — see src/lib/quest-icons.tsx.",
      ),
    type: QuestType.describe("The party's primary objective for this quest"),
    notes: Content.describe('The description of the quest'),
    status: z.enum(['open', 'resolved']).default('open'),
    clues: Content,
    conclusion: Content.default([]),
  }),
)

export const create = makeCreate(Quest)

export type QuestType = z.infer<typeof QuestType>
export type Quest = z.infer<typeof Quest>
