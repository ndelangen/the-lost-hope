import type { ArtStyle } from '#/definitions/art-style'
import type { EntityRef } from '#/definitions/kind'
import { entityHref, resolveRef } from '#/lib/campaign'
import { resolveScene } from '#/lib/dm-campaign'

/** One reference picture of a style, resolved to the record that owns it. */
export type ArtReference = {
  /** The record's name. */
  name: string
  /** The picture's logical source, as campaign data and the image pipeline name it. */
  src: string
  /** The record's page in the app. */
  href: string
  /** Where the original came from: the campaign registry or the published library. */
  origin: 'campaign' | 'library'
}

/** What the resolver needs to know about a library entry: its name and its pictures in order. */
export type LibraryArtEntry = {
  type: string
  slug: string
  name: string
  art?: readonly { file: string }[]
  printings: readonly { art?: readonly { file: string }[] }[]
}

function libraryPictures(entry: LibraryArtEntry): string[] {
  return [
    ...(entry.art ?? []).map(({ file }) => file),
    ...entry.printings.flatMap(({ art }) => (art ?? []).map(({ file }) => file)),
  ]
}

function campaignPicture(ref: EntityRef, picture: (data: Record<string, unknown>) => unknown) {
  const entity = resolveRef(ref)
  if (!entity) return undefined
  const src = picture(entity.data as Record<string, unknown>)
  if (typeof src !== 'string') return undefined
  return {
    name: entity.data.name,
    src,
    href: entityHref(entity.kind, entity.slug),
    origin: 'campaign' as const,
  }
}

const first = (list: unknown) => (Array.isArray(list) ? list[0] : undefined)

/**
 * Resolves each reference of a style to its picture. A reference that no longer resolves to a
 * picture (renamed record, removed art) comes back as `undefined` in its place, so a test can name
 * it.
 */
export function artStyleReferences(
  style: ArtStyle,
  library: readonly LibraryArtEntry[],
): (ArtReference | undefined)[] {
  switch (style.shows) {
    case 'avatar':
      return style.references.map((ref) => campaignPicture(ref, (data) => data.avatar))
    case 'locationIllustration':
      return style.references.map((ref) => campaignPicture(ref, (data) => data.illustration))
    case 'locationMap':
      return style.references.map((ref) =>
        campaignPicture(ref, (data) => (data.map as { url?: string } | undefined)?.url),
      )
    case 'illustration':
      return style.references.map((ref) => {
        if (ref.ref === 'event') return campaignPicture(ref, (data) => first(data.illustrations))
        const scene = resolveScene(ref)
        const src = first(scene?.illustrations)
        if (!scene || typeof src !== 'string') return undefined
        return { name: scene.name, src, href: `/dm/scenes/${scene.slug}`, origin: 'campaign' }
      })
    case 'libraryArt':
      return style.references.map((slug) => {
        const entry = library.find(
          (record) => record.type === style.library && record.slug === slug,
        )
        const src = entry && libraryPictures(entry)[0]
        if (!entry || !src) return undefined
        return {
          name: entry.name,
          src,
          href: `/library/${style.library}/${slug}?dm=true`,
          origin: 'library',
        }
      })
  }
}
