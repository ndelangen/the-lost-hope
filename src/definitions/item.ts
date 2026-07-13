import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { deriveSlug } from './slug'

export const Item = deriveSlug(
  z.strictObject({
    name: z.string().describe('The canonical name of the item'),
    icon: z
      .string()
      .describe(
        "A unique react-icons id for this item's icon, e.g. `gi/GiBroadsword` — see src/lib/item-icons.tsx.",
      ),
    currentOwner: EntityRefSchema.nullable().describe(
      'The current owner of the item, or null when ownership is unknown',
    ),
    carriedBy: EntityRefSchema.nullable().describe(
      'The character currently carrying the item, or null when that is unknown',
    ),
    notes: Content.optional().describe('Identity or flavor not represented by structured fields'),
  }),
)

export const create = makeCreate(Item)

export type Item = z.infer<typeof Item>
