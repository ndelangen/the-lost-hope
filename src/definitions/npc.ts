import { z } from 'zod'

import { Content } from './content'
import { EntityRefSchema } from './kind'
import { DEFAULT_AVATAR, MediaUrl } from './media'
import { Membership } from './organization'
import { deriveSlug } from './slug'

export const NPC = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the NPC'),
    avatar: MediaUrl.default(DEFAULT_AVATAR).describe('The avatar of the NPC'),
    location: EntityRefSchema.describe('The home location of the NPC'),
    role: z.string().optional(),
    species: z.string().optional(),
    languages: z
      .array(z.string())
      .optional()
      .describe("Languages spoken/understood, e.g. ['Common', 'Draconic']"),
    summary: Content.optional().describe('One-line identity/flavor; may mix text and `refs.*` tokens'),
    notes: z.array(Content).optional(),
    memberships: z.array(Membership).optional(),
  }),
)

export function create(input: z.input<typeof NPC>): z.infer<typeof NPC> {
  return NPC.parse(input)
}

export type NPC = z.infer<typeof NPC>
