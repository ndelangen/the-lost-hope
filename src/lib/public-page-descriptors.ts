import type { EntityKind } from '#/definitions/kind'
import { DEFAULT_LOCATION_ILLUSTRATION } from '#/definitions/media'
import {
  COLLECTIONS,
  COLLECTION_LABELS,
  allEntities,
  campaign,
  contentToText,
  entityHref,
  entityTeaser,
  eventLocation,
  locationParent,
  npcLocation,
  pcStatLine,
  sessionNumber,
  type Entity,
} from '#/lib/campaign'

export const SITE_ORIGIN = 'https://the-lost-hope.netlify.app'
export const SOCIAL_PREVIEW_VERSION = 'world-window-v1'

export type PublicPageKind = 'home' | 'intro' | 'questions' | 'collection' | 'locations' | 'detail'

export type PublicPageDescriptor = {
  path: string
  pageKind: PublicPageKind
  entity?: { kind: EntityKind; slug: string }
  title: string
  description: string
  eyebrow: string
  context: string
  footnote: string
  accent: string
  softAccent: string
  imageCandidate?: string
}

const KIND_COLORS: Record<EntityKind, { accent: string; softAccent: string }> = {
  session: { accent: '#2563eb', softAccent: '#dbeafe' },
  event: { accent: '#d97706', softAccent: '#fef3c7' },
  location: { accent: '#059669', softAccent: '#d1fae5' },
  npc: { accent: '#7c3aed', softAccent: '#ede9fe' },
  beast: { accent: '#ea580c', softAccent: '#ffedd5' },
  pc: { accent: '#0891b2', softAccent: '#cffafe' },
  quest: { accent: '#e11d48', softAccent: '#ffe4e6' },
  organization: { accent: '#0d9488', softAccent: '#ccfbf1' },
  item: { accent: '#c026d3', softAccent: '#fae8ff' },
}

const KIND_LABELS: Record<EntityKind, string> = {
  session: 'Campaign session',
  event: 'Campaign event',
  location: 'Location',
  npc: 'Non-player character',
  beast: 'Beast',
  pc: 'Player character',
  quest: 'Quest',
  organization: 'Organization',
  item: 'Notable item',
}

const COLLECTION_DESCRIPTIONS: Record<EntityKind, string> = {
  session: 'Catch up on every recorded play session in The Lost Hope campaign.',
  event: 'Follow The Lost Hope campaign story through its complete linked event timeline.',
  location: 'Explore every known place, route, settlement, and realm in The Lost Hope.',
  npc: 'Meet the friends, rivals, strangers, and powers encountered by the party.',
  beast: 'Review the creatures and beasts encountered throughout the campaign.',
  pc: 'Meet the player characters at the heart of The Lost Hope campaign.',
  quest: 'Track the party’s open mysteries, missions, clues, and resolved quests.',
  organization: 'Explore the groups, guilds, and allegiances shaping the campaign.',
  item: 'Browse notable equipment, artifacts, and possessions from the campaign.',
}

const STATIC_PAGES: readonly PublicPageDescriptor[] = [
  {
    path: '/',
    pageKind: 'home',
    title: campaign.name,
    description:
      'Reconstruct the story, follow unresolved mysteries, and explore every person, place, and event in The Lost Hope campaign.',
    eyebrow: 'Campaign companion',
    context: 'Player campaign archive',
    footnote: 'Explore the campaign',
    accent: '#d59b42',
    softAccent: '#f8e7c7',
  },
  {
    path: '/intro',
    pageKind: 'intro',
    title: `Welcome to ${campaign.name}`,
    description: summarize(contentToText(campaign.notes), 'The story and rules of The Lost Hope.'),
    eyebrow: 'Campaign introduction',
    context: 'D&D 5e · Homebrew',
    footnote: 'Begin the story',
    accent: '#d59b42',
    softAccent: '#f8e7c7',
  },
  {
    path: '/questions',
    pageKind: 'questions',
    title: 'Campaign questions',
    description: 'Review and help resolve open questions about The Lost Hope campaign record.',
    eyebrow: 'Unresolved canon',
    context: 'Campaign questions',
    footnote: 'Help complete the archive',
    accent: '#64748b',
    softAccent: '#e2e8f0',
  },
  ...COLLECTIONS.filter((kind) => kind !== 'location').map((kind) =>
    Object.assign(
      {
        path: `/${collectionPath(kind)}`,
        pageKind: 'collection' as const,
        title: COLLECTION_LABELS[kind],
        description: COLLECTION_DESCRIPTIONS[kind],
        eyebrow: `${COLLECTION_LABELS[kind]} archive`,
        context: `${allEntities(kind).length} known ${COLLECTION_LABELS[kind].toLowerCase()}`,
        footnote: 'Explore the campaign',
      },
      KIND_COLORS[kind],
    ),
  ),
  {
    path: '/locations/map',
    pageKind: 'locations',
    title: 'Locations map',
    description: 'Explore every known campaign location through the linked world map.',
    eyebrow: 'Location archive',
    context: `${allEntities('location').length} known locations`,
    footnote: 'Explore the known world',
    ...KIND_COLORS.location,
  },
  {
    path: '/locations/list',
    pageKind: 'locations',
    title: 'Locations list',
    description: 'Browse the complete hierarchy of known campaign locations and realms.',
    eyebrow: 'Location archive',
    context: `${allEntities('location').length} known locations`,
    footnote: 'Explore the known world',
    ...KIND_COLORS.location,
  },
]

function collectionPath(kind: EntityKind): string {
  return entityHref(kind, '__slug__').split('/')[1] ?? ''
}

function summarize(value: string, fallback: string): string {
  const normalized = value.replace(/\s+/gu, ' ').trim()
  if (!normalized) return fallback
  if (normalized.length <= 180) return normalized
  return `${normalized.slice(0, 177).replace(/\s+\S*$/u, '')}…`
}

function imageCandidate(entity: Entity): string | undefined {
  switch (entity.kind) {
    case 'pc':
    case 'npc':
    case 'beast':
      return entity.data.avatar
    case 'event':
      return (
        entity.data.image ?? (entity.data.mark.type === 'avatar' ? entity.data.mark.url : undefined)
      )
    case 'location':
      return locationIllustrationImageCandidate(entity.data.illustration)
    default:
      return undefined
  }
}

export function locationIllustrationImageCandidate(illustration: string): string | undefined {
  return illustration === DEFAULT_LOCATION_ILLUSTRATION ? undefined : illustration
}

function entityDescription(entity: Entity): string {
  const teaser = entityTeaser(entity)
  if (teaser) return summarize(teaser, '')

  switch (entity.kind) {
    case 'pc':
      return summarize(
        pcStatLine(entity.data),
        `${entity.data.name}, a player character in The Lost Hope.`,
      )
    case 'session':
      return `Session ${sessionNumber(entity.slug)} of The Lost Hope campaign, containing ${entity.data.events.length} recorded events.`
    case 'event': {
      const place = eventLocation(entity.data)
      return `A campaign event on day ${entity.data.day}${place ? ` at ${place.name}` : ''}.`
    }
    case 'location': {
      const parent = locationParent(entity.data)
      return `${entity.data.name}${parent ? ` in ${parent.name}` : ''}, a known location in The Lost Hope campaign.`
    }
    case 'npc': {
      const place = npcLocation(entity.data)
      return `${entity.data.name}${place ? ` of ${place.name}` : ''}, a character encountered in The Lost Hope campaign.`
    }
    case 'beast':
      return `${entity.data.name}, a creature encountered in The Lost Hope campaign.`
    case 'quest':
      return `${entity.data.name}, a ${entity.data.status} ${entity.data.type} in The Lost Hope campaign.`
    case 'organization':
      return `${entity.data.name}, an organization in The Lost Hope campaign.`
    case 'item':
      return `${entity.data.name}, a notable item in The Lost Hope campaign.`
  }
}

function entityContext(entity: Entity): string {
  switch (entity.kind) {
    case 'pc':
      return [entity.data.species, entity.data.class].filter(Boolean).join(' · ') || KIND_LABELS.pc
    case 'event':
      return `Campaign day ${entity.data.day}`
    case 'session':
      return `Session ${sessionNumber(entity.slug)}`
    case 'quest':
      return `${entity.data.status === 'open' ? 'Open' : 'Resolved'} ${entity.data.type}`
    default:
      return KIND_LABELS[entity.kind]
  }
}

function detailDescriptor(entity: Entity): PublicPageDescriptor {
  return {
    path: entityHref(entity.kind, entity.slug),
    pageKind: 'detail',
    entity: { kind: entity.kind, slug: entity.slug },
    title: entity.data.name,
    description: entityDescription(entity),
    eyebrow: KIND_LABELS[entity.kind],
    context: entityContext(entity),
    footnote: `${COLLECTION_LABELS[entity.kind]} archive`,
    imageCandidate: imageCandidate(entity),
    ...KIND_COLORS[entity.kind],
  }
}

export const PUBLIC_PAGE_DESCRIPTORS: readonly PublicPageDescriptor[] = [
  ...STATIC_PAGES,
  ...COLLECTIONS.flatMap((kind) => allEntities(kind).map(detailDescriptor)),
]

export function publicPageDescriptor(path: string): PublicPageDescriptor | undefined {
  return PUBLIC_PAGE_DESCRIPTORS.find((page) => page.path === path)
}

export function publicEntityPageDescriptor(
  kind: EntityKind,
  slug: string,
): PublicPageDescriptor | undefined {
  return publicPageDescriptor(entityHref(kind, slug))
}

export function validatePublicPageDescriptors(): string[] {
  const errors: string[] = []
  const paths = new Set<string>()
  for (const page of PUBLIC_PAGE_DESCRIPTORS) {
    if (paths.has(page.path)) errors.push(`Duplicate public path: ${page.path}`)
    paths.add(page.path)
    if (
      page.path !== '/' &&
      (page.path.endsWith('/') || page.path.includes('?') || page.path.includes('#'))
    ) {
      errors.push(`Non-canonical public path: ${page.path}`)
    }
    if (!page.title.trim()) errors.push(`Missing title: ${page.path}`)
    if (!page.description.trim()) errors.push(`Missing description: ${page.path}`)
  }
  if (PUBLIC_PAGE_DESCRIPTORS.length !== 350) {
    errors.push(`Expected 350 public pages, found ${PUBLIC_PAGE_DESCRIPTORS.length}`)
  }
  return errors
}
