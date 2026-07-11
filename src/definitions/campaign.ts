import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { Quest } from './quest'
import { Session } from './session'

export const Campaign = z.strictObject({
  name: z.string().describe('The name of the campaign'),
  notes: Content.describe('The description of the campaign'),
  pitch: Content.optional(),
  houseRules: Content.optional(),
  quests: z.array(Quest),
  sessions: z.array(Session),
})

export const create = makeCreate(Campaign)

export type Campaign = z.infer<typeof Campaign>
