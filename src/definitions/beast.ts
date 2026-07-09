import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { DEFAULT_AVATAR, MediaUrl } from './media'
import { deriveSlug } from './slug'

export const Beast = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the Beast'),
    avatar: MediaUrl.default(DEFAULT_AVATAR).describe('The avatar of the Beast'),
    location: EntityRefSchema.optional().describe('The home location of the Beast'),
    species: z.string().optional(),
    summary: Content.optional().describe(
      'One-line identity/flavor; may mix text and `refs.*` tokens',
    ),
  }),
)

export const create = makeCreate(Beast)

export type Beast = z.infer<typeof Beast>
