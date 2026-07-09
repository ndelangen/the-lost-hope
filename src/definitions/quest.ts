import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { deriveSlug } from './slug'

export const Quest = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the quest'),
    description: z.string().describe('The description of the quest'),
    status: z.enum(['open', 'resolved']).default('open'),
    clues: z.array(Content),
    conclusion: z.array(Content).default([]),
  }),
)

export const create = makeCreate(Quest)

export type Quest = z.infer<typeof Quest>
