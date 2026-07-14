import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { deriveSlug } from './slug'

export const MEMBERSHIP_STATUSES = ['active', 'former'] as const

export const Organization = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the organization'),
    icon: z
      .string()
      .optional()
      .describe(
        "Icon-catalog id for this organization's avatar, e.g. `gi/GiCrossedSwords` — see src/lib/organization-icons.tsx. Should be unique per organization; falls back to a building placeholder when omitted.",
      ),
    notes: Content.optional(),
  }),
)

export const Membership = z.object({
  organization: EntityRefSchema,
  status: z.enum(MEMBERSHIP_STATUSES),
  rank: z.string(),
})

export const create = makeCreate(Organization)

export type Organization = z.infer<typeof Organization>
export type Membership = z.infer<typeof Membership>
