import { z } from 'zod'

import { Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema } from './kind'
import { MediaUrl } from './media'
import { deriveSlug } from './slug'

export const LOCATION_TYPES = [
  'settlement',
  'building',
  'wilderness',
  'dungeon',
  'landmark',
  'realm',
  'route',
] as const

export type LocationType = (typeof LOCATION_TYPES)[number]

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  settlement: 'Settlements',
  building: 'Buildings',
  wilderness: 'Wilderness',
  dungeon: 'Dungeons',
  landmark: 'Landmarks',
  realm: 'Realms',
  route: 'Routes',
}

const locationFields = {
  name: z.string(),
  icon: z
    .string()
    .optional()
    .describe(
      "react-icons id for this location's avatar, e.g. `gi/GiCastle` — see src/lib/location-icons.tsx. Should be unique per location; falls back to a map-pin placeholder when omitted.",
    ),
  aliases: z
    .array(z.string())
    .optional()
    .describe(
      'Other names the same place is known by (e.g. an in-world second name). The canonical `name` drives the slug; aliases are display-only and searchable.',
    ),
  description: z
    .array(Content)
    .optional()
    .describe(
      'Prose describing what the location is and how it looks. Locations have no `summary` — card teaser and page body both read from this. Mix text and `refs.*` tokens for entity links; never narrate events here.',
    ),
  map: z
    .strictObject({
      url: MediaUrl,
      width: z.number(),
      height: z.number(),
    })
    .optional()
    .default({
      url: 'https://placehold.co/1000x700?text=Map',
      width: 1000,
      height: 700,
    }),
}

const LocationRoot = z.strictObject({
  ...locationFields,
  parent: z.never().optional(),
  at: z.never().optional(),
  type: z.never().optional(),
})

const locationSchema = z.xor([
  LocationRoot,
  z.strictObject({
    ...locationFields,
    type: z.enum(LOCATION_TYPES),
    parent: EntityRefSchema,
    at: z.tuple([z.number(), z.number()]),
  }),
])

export const Location = deriveSlug(locationSchema)

export const create = makeCreate(Location)

export type Location = z.infer<typeof Location>
