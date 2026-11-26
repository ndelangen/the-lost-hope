import { z } from 'zod'

import { Background, Content } from './content'
import { makeCreate } from './create'
import { Foretold } from './foretold'
import { EntityRefSchema, entityRefOf } from './kind'
import { EQUIPMENT_CATEGORIES, ITEM_CATEGORIES as MAGIC_ITEM_CATEGORIES } from './library'
import { Price, PriceRange } from './price'
import { deriveSlug } from './slug'

/** What kind of thing a campaign item is: the library's equipment and magic-item categories, once each. */
export type CampaignItemCategory =
  | (typeof MAGIC_ITEM_CATEGORIES)[number]
  | (typeof EQUIPMENT_CATEGORIES)[number]

export const CAMPAIGN_ITEM_CATEGORIES = [
  ...new Set<CampaignItemCategory>([...MAGIC_ITEM_CATEGORIES, ...EQUIPMENT_CATEGORIES]),
] as [CampaignItemCategory, ...CampaignItemCategory[]]

export const ITEM_STATUSES = ['under-construction', 'destroyed'] as const

export type ItemStatus = (typeof ITEM_STATUSES)[number]

export const ITEM_STATUS_LABELS: Record<ItemStatus, string> = {
  'under-construction': 'Under construction',
  destroyed: 'Destroyed',
}

export const VESSEL_CLASSES = ['battle-cruiser'] as const

export type VesselClass = (typeof VESSEL_CLASSES)[number]

export const VESSEL_CLASS_LABELS: Record<VesselClass, string> = {
  'battle-cruiser': 'Battle-cruiser',
}

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
  z
    .strictObject({
      name: z.string().describe('The canonical name of the item'),
      icon: z
        .string()
        .describe(
          "A unique icon-catalog id for this item's icon, e.g. `gi/GiBroadsword` — see src/lib/item-icons.tsx.",
        ),
      library: z
        .union([entityRefOf('magicItem'), entityRefOf('equipment')])
        .optional()
        .describe(
          'The library entry this item is one of, such as a Bag of Holding. Its category, price, rules and picture come from there',
        ),
      category: z
        .enum(CAMPAIGN_ITEM_CATEGORIES)
        .optional()
        .describe('What kind of thing it is, for an item with no library entry'),
      price: z
        .union([Price, PriceRange])
        .optional()
        .describe(
          'What it is worth, for an item with no library entry: one price, or a range when that varies',
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
      controlledBy: EntityRefSchema.optional().describe(
        'Who commands the item when that is not its owner, such as a crew that seized a vessel',
      ),
      status: z
        .enum(ITEM_STATUSES)
        .optional()
        .describe(
          'Whether the item is not in use yet or no longer exists; absent when it is in use',
        ),
      quantity: z
        .number()
        .int()
        .positive()
        .optional()
        .describe('The number represented when this item is a stack rather than a unique object'),
      vessel: z.enum(VESSEL_CLASSES).optional().describe('The class of ship, for a vessel'),
      hull: ShipHull.optional().describe('A vessel’s sectors, for fights aboard it'),
      notes: Content.optional().describe('Identity or flavor not represented by structured fields'),
      foretold: z
        .array(
          Foretold.refine(
            (entry) => entry.when?.type !== 'within' && entry.when?.type !== 'after',
            {
              message: 'An item has no day to count from; promise spans belong on the event',
            },
          ),
        )
        .min(1)
        .optional()
        .describe('What the item is bound to do later, such as open under a full moon'),
      background: Background,
    })
    .refine((item) => (item.library ? !item.category && !item.price : !!item.category), {
      message: 'An item names either its library entry or its own category (and price), never both',
    }),
)

export const create = makeCreate(Item)

export type Item = z.infer<typeof Item>
