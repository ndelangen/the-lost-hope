import { z } from 'zod'

import { Content } from './content'
import { EntityRefSchema } from './kind'
import { deriveSlug } from './slug'

export const MEMBERSHIP_STATUSES = ['active', 'former'] as const

export const Organization = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the organization'),
    summary: Content.optional().describe('One-line identity/flavor; may mix text and `refs.*` tokens'),
    notes: z.array(Content).optional(),
  }),
)

export const Membership = z.object({
  organization: EntityRefSchema,
  status: z.enum(MEMBERSHIP_STATUSES),
  rank: z.string(),
})

export function create(input: z.input<typeof Organization>): z.infer<typeof Organization> {
  return Organization.parse(input)
}

export type Organization = z.infer<typeof Organization>
export type Membership = z.infer<typeof Membership>
