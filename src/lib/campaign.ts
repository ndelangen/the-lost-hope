import beasts from '#/data/beasts/_index.ts'
import events from '#/data/events/_index.ts'
import campaign from '#/data/index.ts'
import locations from '#/data/locations/_index.ts'
import npcs from '#/data/npcs/_index.ts'
import organizations from '#/data/organizations/_index.ts'
import pcs from '#/data/pcs/_index.ts'
import quests from '#/data/quests/_index.ts'
import sessions from '#/data/sessions/_index.ts'
import type { Beast } from '#/definitions/beast.ts'
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

export type { EntityKind }

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

export type Entity =
  | { kind: 'beast'; slug: string; data: Beast }
  | { kind: 'pc'; slug: string; data: PC }
  | { kind: 'npc'; slug: string; data: NPC }
  | { kind: 'location'; slug: string; data: Location }
  | { kind: 'event'; slug: string; data: Event }
  | { kind: 'session'; slug: string; data: Session }
  | { kind: 'quest'; slug: string; data: Quest }
  | { kind: 'organization'; slug: string; data: Organization }

/** The concrete `Entity` variant for a given kind (e.g. `EntityOf<'pc'>`). */
export type EntityOf<K extends EntityKind> = Extract<Entity, { kind: K }>

/** The `data` payload type for a given kind. */
export type DataOf<K extends EntityKind> = EntityOf<K>['data']

export const COLLECTIONS: EntityKind[] = [
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

const REGISTRIES = {
  beast: beasts,
  pc: pcs,
  npc: npcs,
  location: locations,
  event: events,
  session: sessions,
  quest: quests,
  organization: organizations,
} as const

export { beasts, campaign, events, locations, npcs, organizations, pcs, quests, sessions }

export function resolveRef(ref: EntityRef): Entity | undefined {
  const registry = REGISTRIES[ref.ref] as Record<string, { slug: string; name: string }>
  const data = registry[ref.key]
  if (!data) return undefined
  return { kind: ref.ref, slug: data.slug, data } as Entity
}

export function refLink(
  ref: EntityRef,
): { kind: EntityKind; slug: string; name: string } | undefined {
  const entity = resolveRef(ref)
  if (!entity) return undefined
  return { kind: entity.kind, slug: entity.slug, name: entity.data.name }
}

export function sessionEvents(session: Session): Event[] {
  return session.events
    .map((ref) => resolveRef(ref))
    .filter((entity): entity is EntityOf<'event'> => entity?.kind === 'event')
    .map((entity) => entity.data)
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

export function allEntities<K extends EntityKind>(kind: K): EntityOf<K>[] {
  const registry = REGISTRIES[kind]
  return Object.values(registry).map((data) => ({
    kind,
    slug: (data as { slug: string }).slug,
    data,
  })) as EntityOf<K>[]
}

export function getEntity<K extends EntityKind>(kind: K, slug: string): EntityOf<K> | undefined {
  return allEntities(kind).find((entity) => entity.slug === slug)
}

function collectReferences(
  value: unknown,
  out: EntityRef[] = [],
  seen = new WeakSet<object>(),
): EntityRef[] {
  if (!value || typeof value !== 'object') return out
  if (seen.has(value as object)) return out
  seen.add(value as object)

  if (isEntityRef(value)) {
    out.push(value)
    return out
  }

  if (Array.isArray(value)) {
    for (const item of value) collectReferences(item, out, seen)
    return out
  }

  for (const key of Object.keys(value)) {
    collectReferences((value as Record<string, unknown>)[key], out, seen)
  }
  return out
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

export function reverseLinks(kind: EntityKind, slug: string): { entity: Entity; reason: string }[] {
  const hits: { entity: Entity; reason: string }[] = []
  const seen = new Set<string>()
  const target = getEntity(kind, slug)
  if (!target) return hits

  for (const collectionKind of COLLECTIONS) {
    for (const entity of allEntities(collectionKind)) {
      if (entity.kind === kind && entity.slug === slug) continue
      const dedupeKey = `${entity.kind}-${entity.slug}`
      if (seen.has(dedupeKey)) continue
      const refs = collectReferences(entity.data)
      for (const ref of refs) {
        const resolved = resolveRef(ref)
        if (resolved && resolved.kind === kind && resolved.slug === slug) {
          hits.push({ entity, reason: `Referenced in ${entity.data.name}` })
          seen.add(dedupeKey)
          break
        }
      }
    }
  }
  return hits
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

export function openQuests(): EntityOf<'quest'>[] {
  return allEntities('quest').filter((quest) => quest.data.status === 'open')
}

export function resolvedQuests(): EntityOf<'quest'>[] {
  return allEntities('quest').filter((quest) => quest.data.status === 'resolved')
}

export function activePcs(): EntityOf<'pc'>[] {
  return allEntities('pc').filter((pc) => pc.data.status === 'active')
}

export function nonActivePcs(): EntityOf<'pc'>[] {
  return allEntities('pc').filter((pc) => pc.data.status !== 'active')
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

export function campaignSessions(): EntityOf<'session'>[] {
  return campaign.sessions.map((data) => ({ kind: 'session', slug: data.slug, data }))
}

export function sessionNumber(slug: string): number | undefined {
  const index = campaign.sessions.findIndex((session) => session.slug === slug)
  return index === -1 ? undefined : index + 1
}

export function sortedSessions(): EntityOf<'session'>[] {
  return campaignSessions().toReversed()
}

export type SessionDay = {
  day: number
  events: Event[]
}

export function sessionDays(session: Session): SessionDay[] {
  const byDay = new Map<number, Event[]>()

  for (const event of sessionEvents(session)) {
    const dayEvents = byDay.get(event.day) ?? []
    dayEvents.push(event)
    byDay.set(event.day, dayEvents)
  }

  return [...byDay.entries()]
    .toSorted(([a], [b]) => a - b)
    .map(([day, dayEvents]) => ({
      day,
      events: dayEvents,
    }))
}

export function campaignEvents(): EntityOf<'event'>[] {
  return campaign.sessions.flatMap((session) =>
    sessionEvents(session).map((data) => ({ kind: 'event' as const, slug: data.slug, data })),
  )
}

export function sortedEvents(): EntityOf<'event'>[] {
  return campaignEvents().toReversed()
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

export function sortEntitiesByName<T extends Entity>(entities: T[]): T[] {
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
  for (const session of campaign.sessions) {
    if (sessionEvents(session).some((event) => event.slug === eventSlug)) {
      return session.slug
    }
  }
  return undefined
}

export function searchEntities(query: string, limit = 20): Entity[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const hits: Entity[] = []
  for (const kind of COLLECTIONS) {
    for (const entity of allEntities(kind)) {
      const haystack = [
        JSON.stringify(entity.data),
        ...collectReferences(entity.data)
          .map((ref) => refLink(ref)?.name)
          .filter(Boolean),
      ]
        .join(' ')
        .toLowerCase()
      if (haystack.includes(q)) hits.push(entity)
    }
  }
  return hits.slice(0, limit)
}
