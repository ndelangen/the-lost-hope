import { z } from 'zod'

import { Background, Content } from './content'
import { makeCreate } from './create'
import { Foretold } from './foretold'
import { EntityRefSchema } from './kind'
import { deriveSlug } from './slug'

const ShipSector = z.strictObject({
  name: z.string().trim().min(1),
  escapePods: z.boolean().describe('Whether this sector has a way off the ship'),
})

/** A vessel's layout, in slices from bow to stern, each with a port and a starboard sector. */
export const ShipHull = z
  .strictObject({
    port: z.array(ShipSector).min(1).describe('Port sectors, from bow to stern'),
    starboard: z.array(ShipSector).min(1).describe('Starboard sectors, from bow to stern'),
  })
  .refine((hull) => hull.port.length === hull.starboard.length, {
    message: 'Port and starboard need the same number of sectors',
  })

export type ShipHull = z.infer<typeof ShipHull>

const Item = deriveSlug(
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
    hull: ShipHull.optional().describe('A vessel’s sectors, for fights aboard it'),
    notes: Content.optional().describe('Identity or flavor not represented by structured fields'),
    foretold: z
      .array(
        Foretold.refine((entry) => entry.when?.type !== 'within' && entry.when?.type !== 'after', {
          message: 'An item has no day to count from; promise spans belong on the event',
        }),
      )
      .min(1)
      .optional()
      .describe('What the item is bound to do later, such as open under a full moon'),
    background: Background,
  }),
)

export const create = makeCreate(Item)

export type Item = z.infer<typeof Item>
