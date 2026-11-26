import { z } from 'zod'

import { entityRefOf } from './kind'

/**
 * One kind of campaign artwork (portraits, battlemaps, event illustrations…): what it is for, the
 * canvas it is painted on, how it should look, and the existing pictures that show that look best.
 * New art of this kind is generated with those pictures as visual references.
 */
const styleFields = {
  name: z.string().min(1).describe('What the DM calls this kind of art'),
  use: z.string().min(1).describe('Where the art appears and what it must do there, in one line'),
  canvas: z
    .strictObject({ width: z.number().int().positive(), height: z.number().int().positive() })
    .describe('Pixel size to generate new art at'),
  guide: z
    .array(z.string().min(1))
    .min(1)
    .describe('How this kind of art looks, one rule per line, for whoever generates the next one'),
}

/** The pictures a style shows, each named by the record that owns it, never by its file path. */
export const ArtStyle = z.discriminatedUnion('shows', [
  z.strictObject({
    ...styleFields,
    shows: z.literal('avatar'),
    references: z.array(z.union([entityRefOf('npc'), entityRefOf('pc'), entityRefOf('beast')])),
  }),
  z.strictObject({
    ...styleFields,
    shows: z.literal('locationIllustration'),
    references: z.array(entityRefOf('location')),
  }),
  z.strictObject({
    ...styleFields,
    shows: z.literal('locationMap'),
    references: z.array(entityRefOf('location')),
  }),
  z.strictObject({
    ...styleFields,
    shows: z.literal('illustration'),
    references: z
      .array(z.union([entityRefOf('event'), entityRefOf('scene')]))
      .describe('Events and prepared scenes; each shows its first illustration'),
  }),
  z.strictObject({
    ...styleFields,
    shows: z.literal('libraryArt'),
    library: z.enum(['items', 'monsters']),
    references: z
      .array(z.string().min(1))
      .describe('Library entry slugs of this type; each shows the entry’s first picture'),
  }),
])

export type ArtStyle = z.infer<typeof ArtStyle>

export const ArtStyles = z.record(z.string(), ArtStyle)

export function create(styles: Record<string, z.input<typeof ArtStyle>>) {
  return ArtStyles.parse(styles)
}
