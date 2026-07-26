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
        "A unique icon-catalog id for this item's icon, e.g. `gi/GiBroadsword` — see src/lib/item-icons.tsx.",
      ),
    currentOwner: EntityRefSchema.nullable().describe(
      'The current owner of the item, or null when ownership is unknown',
    ),
    carriedBy: EntityRefSchema.nullable().describe(
      'The character currently carrying the item, or null when that is unknown',
    ),
    craftedBy: EntityRefSchema.nullable().describe(
      'The entity that crafted the item, or null when its maker is unknown',
    ),
    quantity: z
      .number()
      .int()
      .positive()
      .optional()
      .describe('The number represented when this item is a stack rather than a unique object'),
    notes: Content.optional().describe('Identity or flavor not represented by structured fields'),
  }),
)

export const create = makeCreate(Item)

export type Item = z.infer<typeof Item>
