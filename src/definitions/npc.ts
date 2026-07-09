import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { DEFAULT_AVATAR, MediaUrl } from './media'
import { Membership } from './organization'
import { deriveSlug } from './slug'

export const NPC = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the NPC'),
    avatar: MediaUrl.default(DEFAULT_AVATAR).describe('The avatar of the NPC'),
    location: EntityRefSchema.optional().describe('The home location of the NPC'),
    species: z.string().optional(),
    languages: z
      .array(z.string())
      .optional()
      .describe("Languages spoken/understood, e.g. ['Common', 'Draconic']"),
    notes: Content.optional().describe(
      'One-line identity/flavor; may mix text and `refs.*` tokens',
    ),
    memberships: z.array(Membership).optional(),
  }),
)

export const create = makeCreate(NPC)

export type NPC = z.infer<typeof NPC>
