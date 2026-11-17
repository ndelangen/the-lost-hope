import { z } from 'zod'

import { Background, Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { DEFAULT_AVATAR, MediaUrl, Portrait } from './media'
import { deriveSlug } from './slug'
import { OwnOrSharedStatBlock } from './stat-block'

const Beast = deriveSlug(
  z.strictObject({
    name: z.string().describe('The name of the Beast'),
    avatar: MediaUrl.default(DEFAULT_AVATAR).describe('The avatar of the Beast'),
    additionalPortraits: z.array(Portrait).optional(),
    previousPortraits: z.array(Portrait).optional(),
    location: EntityRefSchema.optional().describe('The home location of the Beast'),
    species: z.string().optional(),
    notes: Content.optional().describe(
      'One-line identity/flavor; may mix text and `refs.*` tokens',
    ),
    stats: OwnOrSharedStatBlock.describe(
      'DM only: 5e statistics, its own or a shared creature reference. Required for every record.',
    ),
    background: Background,
  }),
)

export const create = makeCreate(Beast)

export type Beast = z.infer<typeof Beast>
