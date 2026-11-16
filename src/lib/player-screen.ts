import type { AnyKind, EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR, DEFAULT_LOCATION_ILLUSTRATION } from '#/definitions/media'
import { PLAYER_VISIBLE_KEYS, SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { scenes } from '#/lib/dm-campaign'
import { HANDOUTS, type HandoutKey } from '#/lib/handouts'
import { playerScreenImageId, type PlayerScreenImage } from '#/lib/player-screen-state'
import { hasPublicAsset } from '#/lib/public-media'

export type PlayerScreenGroup =
  | 'Handouts'
  | 'Scenes'
  | 'Maps'
  | 'Places'
  | 'Characters'
  | 'Creatures'

export type ResolvedPlayerScreenImage = {
  /** The picture; absent for a handout the screen draws itself, such as Jim's letter. */
  src?: string
  /** The record's name, for the DM's own controls. */
  name: string
  slug: string
  /** What the player screen may print under the image; absent for records players have not met. */
  playerCaption?: string
  group: PlayerScreenGroup
  /** Whether the party has met the record, so naming it on screen gives nothing away. */
  met: boolean
}

type Named = { name: string; slug: string }
type WithAvatar = Named & { avatar: string }
type WithLocationArt = Named & { illustration: string; map?: { url: string } }

function record<T>(registry: Readonly<Record<string, unknown>>, key: string): T | undefined {
  return Object.hasOwn(registry, key) ? (registry[key] as T) : undefined
}

/** A real picture: self-hosted art that exists, not a placeholder. */
function realImage(src: string | undefined): string | undefined {
  if (!src || src === DEFAULT_AVATAR || src === DEFAULT_LOCATION_ILLUSTRATION) return undefined
  if (src.includes('placehold')) return undefined
  return hasPublicAsset(src) ? src : undefined
}

function isMet(ref: EntityRef<'pc' | 'npc' | 'beast' | 'location'>): boolean {
  return PLAYER_VISIBLE_KEYS[ref.ref].has(ref.key)
}

export function resolvePlayerScreenImage(
  selection: PlayerScreenImage,
): ResolvedPlayerScreenImage | undefined {
  if (selection.image === 'handout') {
    const handout = HANDOUTS[selection.ref.key]
    const src = 'image' in handout ? realImage(handout.image) : undefined
    if ('image' in handout && !src) return undefined
    // Handouts are props the players hold; their names stay off the screen.
    return { src, name: handout.name, slug: selection.ref.key, group: 'Handouts', met: true }
  }
  if (selection.ref.ref === 'scene') {
    const scene = record<Named & { illustration?: string }>(scenes, selection.ref.key)
    const src = realImage(scene?.illustration)
    // Scenes are DM prep: their names are never shown to players.
    return scene && src
      ? { src, name: scene.name, slug: scene.slug, group: 'Scenes', met: false }
      : undefined
  }

  const ref = selection.ref as EntityRef<'pc' | 'npc' | 'beast' | 'location'>
  const met = isMet(ref)
  if (selection.image === 'avatar') {
    const entity = record<WithAvatar>(SOURCE_REGISTRIES[ref.ref], ref.key)
    const src = realImage(entity?.avatar)
    if (!entity || !src) return undefined
    return {
      src,
      name: entity.name,
      slug: entity.slug,
      playerCaption: met ? entity.name : undefined,
      group: ref.ref === 'beast' ? 'Creatures' : 'Characters',
      met,
    }
  }

  const location = record<WithLocationArt>(SOURCE_REGISTRIES.location, ref.key)
  const src = realImage(selection.image === 'map' ? location?.map?.url : location?.illustration)
  if (!location || !src) return undefined
  return {
    src,
    name: location.name,
    slug: location.slug,
    playerCaption: met ? location.name : undefined,
    group: selection.image === 'map' ? 'Maps' : 'Places',
    met,
  }
}

export type PlayerScreenOption = ResolvedPlayerScreenImage & {
  id: string
  selection: PlayerScreenImage
}

const GROUP_ORDER: readonly PlayerScreenGroup[] = [
  'Handouts',
  'Scenes',
  'Maps',
  'Places',
  'Characters',
  'Creatures',
]

/** Every picture the DM can put on the player screen, grouped, and by name within a group. */
export function playerScreenOptions(): PlayerScreenOption[] {
  const selections: PlayerScreenImage[] = [
    ...(Object.keys(HANDOUTS) as HandoutKey[]).map(
      (key): PlayerScreenImage => ({ image: 'handout', ref: { ref: 'handout', key } }),
    ),
    ...Object.keys(scenes).map(
      (key): PlayerScreenImage => ({ image: 'illustration', ref: { ref: 'scene', key } }),
    ),
    ...Object.keys(SOURCE_REGISTRIES.location).flatMap((key): PlayerScreenImage[] => [
      { image: 'map', ref: { ref: 'location', key } },
      { image: 'illustration', ref: { ref: 'location', key } },
    ]),
    ...(['pc', 'npc', 'beast'] as const).flatMap((kind) =>
      Object.keys(SOURCE_REGISTRIES[kind]).map(
        (key): PlayerScreenImage => ({ image: 'avatar', ref: { ref: kind, key } }),
      ),
    ),
  ]

  return selections
    .flatMap((selection) => {
      const resolved = resolvePlayerScreenImage(selection)
      return resolved ? [{ ...resolved, id: playerScreenImageId(selection), selection }] : []
    })
    .toSorted(
      (a, b) =>
        GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || a.name.localeCompare(b.name),
    )
}

export function filterPlayerScreenOptions(
  options: readonly PlayerScreenOption[],
  query: string,
): readonly PlayerScreenOption[] {
  const words = query.toLowerCase().split(/\s+/u).filter(Boolean)
  if (words.length === 0) return options
  return options.filter((option) => {
    const haystack = `${option.name} ${option.group}`.toLowerCase()
    return words.every((word) => haystack.includes(word))
  })
}

const PAGE_KINDS: ReadonlyArray<
  [RegExp, 'pc' | 'npc' | 'beast' | 'location' | 'scene', 'slug' | 'key']
> = [
  [/^\/pcs\/detail\/([^/]+)$/u, 'pc', 'slug'],
  [/^\/npcs\/detail\/([^/]+)$/u, 'npc', 'slug'],
  [/^\/dm\/npcs\/([^/]+)$/u, 'npc', 'key'],
  [/^\/beasts\/detail\/([^/]+)$/u, 'beast', 'slug'],
  [/^\/locations\/detail\/([^/]+)$/u, 'location', 'slug'],
  [/^\/dm\/scenes\/([^/]+)$/u, 'scene', 'slug'],
]

/**
 * The pictures of the record on the page the DM is looking at, including maps and other records
 * associated with a scene.
 */
export function playerScreenOptionsForPage(
  options: readonly PlayerScreenOption[],
  pathname: string,
): readonly PlayerScreenOption[] {
  for (const [pattern, kind, by] of PAGE_KINDS) {
    const id = pattern.exec(pathname)?.[1]
    if (!id) continue
    const registry: Readonly<Record<string, unknown>> =
      kind === 'scene' ? scenes : SOURCE_REGISTRIES[kind]
    const key =
      by === 'key'
        ? id
        : Object.entries(registry).find(([, entry]) => (entry as Named).slug === id)?.[0]
    if (!key) return []
    const related: EntityRef<AnyKind>[] = [{ ref: kind, key }]
    if (kind === 'scene') {
      const scene = scenes[key]
      // Then the characters and places the scene mentions, such as Jim when the Hand comes for him.
      if (scene)
        related.push(
          scene.location,
          ...scene.alternateLocations,
          ...scene.battleMaps,
          ...scene.npcs,
          ...scene.references,
        )
    }
    const seen = new Set<string>()
    return related.flatMap((ref) =>
      options.filter((option) => {
        if (option.selection.ref.ref !== ref.ref || option.selection.ref.key !== ref.key)
          return false
        if (seen.has(option.id)) return false
        seen.add(option.id)
        return true
      }),
    )
  }
  return []
}
