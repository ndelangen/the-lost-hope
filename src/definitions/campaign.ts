import { z } from 'zod'

import { Content } from './content'
import { Quest } from './quest'
import { Session } from './session'

export const Campaign = z.strictObject({
  name: z.string().describe('The name of the campaign'),
  description: z.array(Content).describe('The description of the campaign'),
  pitch: z.array(Content).optional(),
  quests: z.array(Quest),
  sessions: z.array(Session),
})

export function create(input: z.input<typeof Campaign>): z.infer<typeof Campaign> {
  return Campaign.parse(input)
}

export type Campaign = z.infer<typeof Campaign>
