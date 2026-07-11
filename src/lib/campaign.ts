import campaign from '#/data/index.ts'
import type { Event, EventMark } from '#/definitions/event.ts'
import { isEntityRef, type EntityKind, type EntityRef } from '#/definitions/kind.ts'
import type { Location, LocationType } from '#/definitions/location.ts'
import type { NPC } from '#/definitions/npc.ts'
import type { Membership } from '#/definitions/organization.ts'
import { MEMBERSHIP_STATUSES } from '#/definitions/organization.ts'
import type { Organization } from '#/definitions/organization.ts'
import type { PC } from '#/definitions/pc.ts'
import type { Quest } from '#/definitions/quest.ts'
import type { Session } from '#/definitions/session.ts'

import {
  collectReferences,
  createCampaignReadModel,
  type ReverseLink,
  type SessionDay,
} from './campaign-read-model'
import {
  beasts,
  events,
  locations,
  npcs,
  organizations,
  pcs,
  quests,
  REGISTRIES,
  sessions,
  type DataOf,
  type Entity,
  type EntityOf,
} from './campaign-registries'

export type { EntityKind }
export type { DataOf, Entity, EntityOf, ReverseLink, SessionDay }

export type {
  BeastKey,
  EventKey,
  LocationKey,
  NpcKey,
  OrganizationKey,
  PcKey,
  QuestKey,
  SessionKey,
} from '#/data/generated/refs.ts'

export const COLLECTIONS: readonly EntityKind[] = [
  'session',
  'event',
  'location',
  'npc',
  'beast',
  'pc',
  'quest',
  'organization',
]

export const COLLECTION_LABELS: Record<EntityKind, string> = {
  session: 'Sessions',
  event: 'Events',
  location: 'Locations',
  npc: 'NPCs',
  pc: 'PCs',
  beast: 'Beasts',
  quest: 'Quests',
  organization: 'Organizations',
}

export const COLLECTION_PATH: Record<EntityKind, string> = {
  session: 'sessions',
  event: 'events',
  location: 'locations',
  npc: 'npcs',
  beast: 'beasts',
  pc: 'pcs',
  quest: 'quests',
  organization: 'organizations',
}

const campaignModel = createCampaignReadModel({
  campaign,
  collectionOrder: COLLECTIONS,
  registries: REGISTRIES,
})

export { beasts, campaign, events, locations, npcs, organizations, pcs, quests, sessions }

export function resolveRef(ref: EntityRef): Entity | undefined {
  return campaignModel.entities[ref.ref].byKey.get(ref.key)
}

export function refLink(
  ref: EntityRef,
): { kind: EntityKind; slug: string; name: string } | undefined {
  const entity = resolveRef(ref)
  if (!entity) return undefined
  return { kind: entity.kind, slug: entity.slug, name: entity.data.name }
}

export function sessionEvents(session: Session): readonly Event[] {
  return campaignModel.chronology.sessionEventsBySlug.get(session.slug) ?? []
}

export function eventLocation(event: Event): Location | undefined {
  const entity = resolveRef(event.location)
  return entity?.kind === 'location' ? entity.data : undefined
}

export function npcLocation(npc: NPC): Location | undefined {
  if (!npc.location) return undefined
  const entity = resolveRef(npc.location)
  return entity?.kind === 'location' ? entity.data : undefined
}

export function locationParent(location: Location): Location | undefined {
  if (!('parent' in location) || !location.parent) return undefined
  const entity = resolveRef(location.parent)
  return entity?.kind === 'location' ? entity.data : undefined
}

export type LocationEntity = EntityOf<'location'>

export function locationChildren(parentSlug: string): LocationEntity[] {
  return allEntities('location')
    .filter((entity) => locationParent(entity.data)?.slug === parentSlug)
    .toSorted((a, b) => compareEntityNames(a.data.name, b.data.name))
}

export function locationAncestors(location: Location): Location[] {
  const ancestors: Location[] = []
  let current = locationParent(location)
  while (current) {
    ancestors.unshift(current)
    current = locationParent(current)
  }
  return ancestors
}

export type LocationTreeNode = LocationEntity & { children: LocationTreeNode[] }

export function locationTree(rootSlug = locations.world.slug): LocationTreeNode[] {
  return locationChildren(rootSlug).map((entity) => ({
    kind: entity.kind,
    slug: entity.slug,
    data: entity.data,
    children: locationTree(entity.slug),
  }))
}

export function locationTypeOf(location: Location): LocationType | undefined {
  return 'type' in location ? location.type : undefined
}

export function locationActivityCount(slug: string): number {
  return reverseLinks('location', slug).length
}

export function locationAbsolutePosition(location: Location): [number, number] | undefined {
  if (!('at' in location) || !location.at) return undefined
  const parent = locationParent(location)
  if (!parent || parent.slug === locations.world.slug) return location.at
  const parentPos = locationAbsolutePosition(parent)
  if (!parentPos) return location.at
  return [parentPos[0] + location.at[0], parentPos[1] + location.at[1]]
}

export function mapPlottableLocations(): LocationEntity[] {
  return allEntities('location').filter(
    (entity) =>
      'parent' in entity.data &&
      entity.data.parent &&
      locationAbsolutePosition(entity.data) !== undefined,
  )
}

export function membershipOrg(membership: Membership): Organization | undefined {
  const entity = resolveRef(membership.organization)
  return entity?.kind === 'organization' ? entity.data : undefined
}

/**
 * Derive a PC's mechanical stat line (e.g. "Human Warlock 4 · Great Old One
 * Patron") from its structured fields. This is the single place that formats
 * species/class/level/subclass — data files must never restate these in prose.
 */
export function pcStatLine(pc: PC): string {
  const build = [pc.species, pc.class].filter(Boolean).join(' ')
  const withLevel = pc.level ? `${build} ${pc.level}`.trim() : build
  return [withLevel, pc.subclass].filter(Boolean).join(' · ')
}

const PC_STATUS_LABELS: Record<PC['status'], string> = {
  active: 'Active',
  retired: 'Retired',
  occasional: 'Occasional',
  'missing-presumed-dead': 'MIA · presumed dead',
}

export function pcStatusLabel(status: PC['status']): string {
  return PC_STATUS_LABELS[status]
}

/** Flatten Content (string | ref token | array | media) to a plain-text preview. */
export function contentToText(content: unknown): string {
  if (typeof content === 'string') return content
  if (isEntityRef(content)) return refLink(content)?.name ?? ''
  if (Array.isArray(content)) return content.map(contentToText).filter(Boolean).join(' ')
  return ''
}

/** Derive the short collection-card preview for an entity from canonical data. */
export function entityTeaser(entity: Entity): string {
  if ('notes' in entity.data && entity.data.notes) return contentToText(entity.data.notes)
  return entity.kind === 'pc' ? pcStatLine(entity.data) : ''
}

/** Route pattern for an entity kind's detail page. */
export type EntityTo =
  | '/pcs/detail/$slug'
  | '/npcs/detail/$slug'
  | '/beasts/detail/$slug'
  | '/locations/detail/$slug'
  | '/events/detail/$slug'
  | '/sessions/detail/$slug'
  | '/quests/detail/$slug'
  | '/organizations/detail/$slug'

/** Route pattern for an entity kind's collection/index page. */
export type CollectionTo =
  | '/pcs'
  | '/npcs'
  | '/locations'
  | '/events'
  | '/sessions'
  | '/quests'
  | '/beasts'
  | '/organizations'

const ENTITY_TO: Record<EntityKind, EntityTo> = {
  pc: '/pcs/detail/$slug',
  npc: '/npcs/detail/$slug',
  location: '/locations/detail/$slug',
  event: '/events/detail/$slug',
  session: '/sessions/detail/$slug',
  quest: '/quests/detail/$slug',
  beast: '/beasts/detail/$slug',
  organization: '/organizations/detail/$slug',
}

const COLLECTION_TO: Record<EntityKind, CollectionTo> = {
  pc: '/pcs',
  npc: '/npcs',
  location: '/locations',
  event: '/events',
  session: '/sessions',
  quest: '/quests',
  beast: '/beasts',
  organization: '/organizations',
}

/** Typed router props (`to` + `params`) for an entity's detail page. */
export function entityLink(
  kind: EntityKind,
  slug: string,
): { to: EntityTo; params: { slug: string } } {
  return { to: ENTITY_TO[kind], params: { slug } }
}

/** Typed `to` for an entity kind's collection/index page. */
export function collectionTo(kind: EntityKind): CollectionTo {
  return COLLECTION_TO[kind]
}

/**
 * Raw path string for an entity's detail page. Prefer {@link entityLink} for
 * `<Link>`/`navigate`; use this only where a plain string is needed (e.g.
 * comparing against `location.pathname`).
 */
export function entityHref(kind: EntityKind, slug: string): string {
  return `/${COLLECTION_PATH[kind]}/detail/${slug}`
}

export function allEntities<K extends EntityKind>(kind: K): readonly EntityOf<K>[] {
  return campaignModel.entities[kind].all
}

export function getEntity<K extends EntityKind>(kind: K, slug: string): EntityOf<K> | undefined {
  return campaignModel.entities[kind].bySlug.get(slug)
}

export type ReferenceValidationError = {
  ref: EntityRef
  path: string
}

export function validateReferences(): ReferenceValidationError[] {
  const errors: ReferenceValidationError[] = []

  function walk(value: unknown, path: string): void {
    if (isEntityRef(value)) {
      if (!resolveRef(value)) errors.push({ ref: value, path })
      return
    }
    if (!value || typeof value !== 'object') return
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${path}[${index}]`))
      return
    }
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      walk(child, `${path}.${key}`)
    }
  }

  for (const kind of COLLECTIONS) {
    for (const entity of allEntities(kind)) {
      walk(entity.data, `${kind}/${entity.slug}`)
    }
  }
  walk(campaign, 'campaign')
  return errors
}

export function reverseLinks(kind: EntityKind, slug: string): readonly ReverseLink[] {
  const target = getEntity(kind, slug)
  return target ? (campaignModel.reverseLinksByEntity.get(target) ?? []) : []
}

/**
 * Derive the PCs present in a session purely from references in its events' notes, deduped
 * by slug and resolved to the canonical PC record (so avatars/defaults apply).
 */
export function sessionPcs(session: Session): PC[] {
  const seen = new Set<string>()
  const result: PC[] = []
  for (const event of sessionEvents(session)) {
    for (const ref of collectReferences(event.notes)) {
      if (ref.ref !== 'pc' || seen.has(ref.key)) continue
      seen.add(ref.key)
      const entity = resolveRef(ref)
      if (entity?.kind === 'pc') result.push(entity.data)
    }
  }
  return result.toSorted((a, b) => a.name.localeCompare(b.name))
}

export function openQuests(): readonly EntityOf<'quest'>[] {
  return campaignModel.groups.openQuests
}

export function resolvedQuests(): readonly EntityOf<'quest'>[] {
  return campaignModel.groups.resolvedQuests
}

export type QuestProgress = {
  event: EntityOf<'event'>
  campaignDaysAgo: number
}

/** Most recent campaign event explicitly referenced by a quest's synthesis. */
export function questProgress(quest: Quest): QuestProgress | undefined {
  const linkedEventSlugs = new Set(
    collectReferences(quest).flatMap((ref) => {
      if (ref.ref !== 'event') return []
      const entity = resolveRef(ref)
      return entity?.kind === 'event' ? [entity.slug] : []
    }),
  )
  const event = sortedEvents().find((candidate) => linkedEventSlugs.has(candidate.slug))
  if (!event) return undefined

  const currentCampaignDay = sortedEvents()[0]?.data.day ?? event.data.day
  return { event, campaignDaysAgo: Math.max(0, currentCampaignDay - event.data.day) }
}

export function activePcs(): readonly EntityOf<'pc'>[] {
  return campaignModel.groups.activePcs
}

export function nonActivePcs(): readonly EntityOf<'pc'>[] {
  return campaignModel.groups.nonActivePcs
}

export type OrganizationMember = {
  kind: 'pc' | 'npc'
  slug: string
  name: string
  avatar: string
  rank: string
}

export type OrganizationMemberGroup = {
  status: (typeof MEMBERSHIP_STATUSES)[number]
  ranks: {
    rank: string
    members: OrganizationMember[]
  }[]
}

/** Reverse-scan PCs and NPCs for memberships in the given organization. */
export function organizationMembers(org: Organization): OrganizationMemberGroup[] {
  const entries: (OrganizationMember & { status: (typeof MEMBERSHIP_STATUSES)[number] })[] = []

  const characters: { kind: 'pc' | 'npc'; record: PC | NPC }[] = [
    ...Object.values(pcs).map((record) => ({ kind: 'pc' as const, record })),
    ...Object.values(npcs).map((record) => ({ kind: 'npc' as const, record })),
  ]

  for (const { kind, record } of characters) {
    for (const membership of record.memberships ?? []) {
      const memberOrg = membershipOrg(membership)
      if (!memberOrg || memberOrg.slug !== org.slug) continue
      entries.push({
        kind,
        slug: record.slug,
        name: record.name,
        avatar: record.avatar,
        rank: membership.rank,
        status: membership.status,
      })
    }
  }

  return MEMBERSHIP_STATUSES.flatMap((status) => {
    const byStatus = entries.filter((entry) => entry.status === status)
    if (byStatus.length === 0) return []

    const rankMap = new Map<string, OrganizationMember[]>()
    for (const entry of byStatus) {
      const members = rankMap.get(entry.rank) ?? []
      members.push({
        kind: entry.kind,
        slug: entry.slug,
        name: entry.name,
        avatar: entry.avatar,
        rank: entry.rank,
      })
      rankMap.set(entry.rank, members)
    }

    const ranks = [...rankMap.entries()]
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([rank, members]) => ({
        rank,
        members: members.toSorted((a, b) => a.name.localeCompare(b.name)),
      }))

    return [{ status, ranks }]
  })
}

export function campaignSessions(): readonly EntityOf<'session'>[] {
  return campaignModel.chronology.sessions
}

export function sessionNumber(slug: string): number | undefined {
  return campaignModel.chronology.sessionNumberBySlug.get(slug)
}

export function sortedSessions(): readonly EntityOf<'session'>[] {
  return campaignModel.chronology.sortedSessions
}

export function sessionDays(session: Session): readonly SessionDay[] {
  return campaignModel.chronology.sessionDaysBySlug.get(session.slug) ?? []
}

export function campaignEvents(): readonly EntityOf<'event'>[] {
  return campaignModel.chronology.events
}

export function sortedEvents(): readonly EntityOf<'event'>[] {
  return campaignModel.chronology.sortedEvents
}

export type SessionTimelineEntry =
  | { kind: 'day'; day: number }
  | {
      kind: 'event'
      day: number
      slug: string
      name: string
      mark: EventMark
    }

export type SessionTimelineSection = {
  session: { slug: string; number: number; name: string }
  entries: SessionTimelineEntry[]
}

export function sessionTimelineSections(): SessionTimelineSection[] {
  return campaign.sessions.flatMap((session) => {
    const number = sessionNumber(session.slug)
    if (number === undefined) return []

    const entries: SessionTimelineEntry[] = []
    for (const day of sessionDays(session)) {
      entries.push({ kind: 'day', day: day.day })
      for (const event of day.events) {
        entries.push({
          kind: 'event',
          day: event.day,
          slug: event.slug,
          name: event.name,
          mark: event.mark,
        })
      }
    }

    return [
      {
        session: {
          slug: session.slug,
          number,
          name: session.name,
        },
        entries,
      },
    ]
  })
}

function stripLeadingArticle(name: string): string {
  return name.replace(/^the\s+/i, '').trim()
}

/** Sort key that ignores a leading "The " article. */
export function compareEntityNames(a: string, b: string): number {
  return stripLeadingArticle(a).localeCompare(stripLeadingArticle(b))
}

export function sortEntitiesByName<T extends Entity>(entities: readonly T[]): T[] {
  return entities.toSorted((a, b) => compareEntityNames(a.data.name, b.data.name))
}

export function collectionKindFromPath(pathname: string): EntityKind | undefined {
  const segment = pathname.split('/').find(Boolean)
  if (!segment) return undefined
  const entry = Object.entries(COLLECTION_PATH).find(([, path]) => path === segment)
  return entry ? (entry[0] as EntityKind) : undefined
}

/**
 * Slug of the entity detail page for a pathname like `/pcs/detail/jim`. Returns
 * `undefined` for collection/index or other views (e.g. `/locations/map`).
 */
export function entitySlugFromPath(pathname: string): string | undefined {
  const [, view, slug] = pathname.split('/').filter(Boolean)
  return view === 'detail' ? slug : undefined
}

export function sessionSlugForEvent(eventSlug: string): string | undefined {
  return campaignModel.chronology.sessionSlugByEventSlug.get(eventSlug)
}

export function searchEntities(query: string, limit = 20): Entity[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const hits: Entity[] = []
  for (const kind of COLLECTIONS) {
    for (const entity of allEntities(kind)) {
      if (campaignModel.searchTextByEntity.get(entity)?.includes(q)) hits.push(entity)
    }
  }
  return hits.slice(0, limit)
}
