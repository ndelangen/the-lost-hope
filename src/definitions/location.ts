import { z } from 'zod'

import { Background, Content } from './content'
import { makeCreate } from './create'
import { EntityRefSchema, entityRefOf } from './kind'
import { DEFAULT_LOCATION_ILLUSTRATION, MediaUrl, Portrait } from './media'
import { deriveSlug } from './slug'

export const LOCATION_TYPES = [
  'settlement',
  'region',
  'district',
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
  region: 'Regions',
  district: 'Districts',
  building: 'Buildings',
  wilderness: 'Wilderness',
  dungeon: 'Dungeons',
  landmark: 'Landmarks',
  realm: 'Realms',
  route: 'Routes',
}

const LOCATION_ILLUSTRATION_PATH = /^\/assets\/locations\/[^?#]+\.(?:jpe?g|png|svg|webp)$/u

export const LocationConnection = z.strictObject({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
  type: z.enum(['door', 'passage', 'portal']),
  label: z.string().trim().min(1),
  destination: EntityRefSchema.refine((destination) => destination.ref === 'location', {
    message: 'Connections must target a location',
  }),
  at: z.tuple([z.number().nonnegative(), z.number().nonnegative()]),
})

export type LocationConnection = z.infer<typeof LocationConnection>

export const LocationIllustrationUrl = MediaUrl.refine(
  (value) =>
    LOCATION_ILLUSTRATION_PATH.test(value) && !value.split('/').some((segment) => segment === '..'),
  {
    message:
      'Location illustrations must be self-hosted image paths under /assets/locations/ without query strings, fragments, or parent traversal',
  },
)

const MapPoint = z.tuple([z.number().nonnegative(), z.number().nonnegative()])

const DeckArea = z.array(MapPoint).min(3)

/**
 * A map that shows a deck of a vessel: where each sector of the vessel's hull lies on it, in the
 * order of the hull, from bow to stern. Each area is a polygon in map pixels.
 */
export const LocationDeck = z.strictObject({
  vessel: entityRefOf('item').describe('The vessel, whose record has a hull'),
  port: z.array(DeckArea).min(1).describe('Outlines of the port sectors, bow to stern'),
  starboard: z.array(DeckArea).min(1).describe('Outlines of the starboard sectors, bow to stern'),
})

export type LocationDeck = z.infer<typeof LocationDeck>

const locationFields = {
  name: z.string(),
  publicMapLandmark: z
    .literal(true)
    .optional()
    .describe('A public map landmark the campaign can show before the party encounters it.'),
  connections: z
    .array(LocationConnection)
    .refine((connections) => new Set(connections.map(({ id }) => id)).size === connections.length, {
      message: 'Location connection IDs must be unique within their source location',
    })
    .optional()
    .default([]),
  icon: z
    .string()
    .optional()
    .describe(
      "Icon-catalog id for this location's compact symbol, e.g. `gi/GiCastle` — see src/lib/location-icons.tsx. Should be unique per location; falls back to a map-pin placeholder when omitted.",
    ),
  illustration: LocationIllustrationUrl.optional()
    .default(DEFAULT_LOCATION_ILLUSTRATION)
    .describe(
      'Self-hosted artistic depiction of the location. Defaults to the shared location placeholder and does not establish campaign canon.',
    ),
  additionalPortraits: z.array(Portrait).optional(),
  aliases: z
    .array(z.string())
    .optional()
    .describe(
      'Other names the same place is known by (e.g. an in-world second name). The canonical `name` drives the slug; aliases are display-only and searchable.',
    ),
  notes: Content.optional().describe(
    'The single home for prose describing what the location is and how it looks. The card teaser and page body both read from it. Mix text and `refs.*` tokens for entity links; never narrate events here.',
  ),
  background: Background,
  map: z
    .strictObject({
      url: MediaUrl,
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      schematicPositions: z.boolean().optional(),
    })
    .refine(({ width, height }) => width * 2 === height * 3, {
      message:
        'Location maps must use a 3:2 landscape ratio. Extend the artwork instead of cropping it.',
    })
    .optional()
    .default({
      url: 'https://placehold.co/1050x700?text=Map',
      width: 1050,
      height: 700,
    }),
  deck: LocationDeck.optional().describe(
    'For a deck map of a vessel: where its sectors lie, for ship damage on the map',
  ),
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

export const Location = deriveSlug(
  locationSchema.superRefine((location, context) => {
    location.connections.forEach((connection, index) => {
      if (connection.at[0] > location.map.width || connection.at[1] > location.map.height) {
        context.addIssue({
          code: 'custom',
          path: ['connections', index, 'at'],
          message: 'Connection coordinates must fit within the source location map',
        })
      }
    })
    for (const side of ['port', 'starboard'] as const) {
      location.deck?.[side].forEach((area, index) => {
        if (area.some(([x, y]) => x > location.map.width || y > location.map.height)) {
          context.addIssue({
            code: 'custom',
            path: ['deck', side, index],
            message: 'Sector outlines must fit within the location map',
          })
        }
      })
    }
  }),
)

export const create = makeCreate(Location)

export type Location = z.infer<typeof Location>
