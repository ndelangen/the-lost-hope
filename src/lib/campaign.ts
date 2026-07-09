import events from '#/data/events/_index.ts'
import campaign from '#/data/index.ts'
import locations from '#/data/locations/_index.ts'
import npcs from '#/data/npcs/_index.ts'
import organizations from '#/data/organizations/_index.ts'
import pcs from '#/data/pcs/_index.ts'
import quests from '#/data/quests/_index.ts'
import sessions from '#/data/sessions/_index.ts'
import type { Event, EventMark } from '#/definitions/event.ts'
import { isEntityRef, type EntityKind, type EntityRef } from '#/definitions/kind.ts'
import type { Location, LocationType } from '#/definitions/location.ts'
import type { NPC } from '#/definitions/npc.ts'
import type { Membership } from '#/definitions/organization.ts'
import { MEMBERSHIP_STATUSES } from '#/definitions/organization.ts'
import type { Organization } from '#/definitions/organization.ts'
import type { PC } from '#/definitions/pc.ts'
import type { Quest } from '#/definitions/quest.ts'
import type { Reference } from '#/definitions/reference.ts'
import type { Session } from '#/definitions/session.ts'

export type { EntityKind }

export type {
  EventKey,
  LocationKey,
  NpcKey,
  OrganizationKey,
  PcKey,
  QuestKey,
  SessionKey,
} from '#/data/registry-keys.ts'

export type Entity =
  | { kind: 'pc'; slug: string; data: PC }
  | { kind: 'npc'; slug: string; data: NPC }
  | { kind: 'location'; slug: string; data: Location }
  | { kind: 'event'; slug: string; data: Event }
  | { kind: 'session'; slug: string; data: Session }
  | { kind: 'quest'; slug: string; data: Quest }
  | { kind: 'organization'; slug: string; data: Organization }

export const COLLECTIONS: EntityKind[] = [
  'session',
  'event',
  'location',
  'npc',
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
  quest: 'Quests',
  organization: 'Organizations',
}

export const COLLECTION_PATH: Record<EntityKind, string> = {
  session: 'sessions',
  event: 'events',
  location: 'locations',
  npc: 'npcs',
  pc: 'pcs',
  quest: 'quests',
  organization: 'organizations',
}

const REGISTRIES = {
  pc: pcs,
  npc: npcs,
  location: locations,
  event: events,
  session: sessions,
  quest: quests,
  organization: organizations,
} as const

export { campaign, pcs, npcs, locations, events, sessions, quests, organizations }

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
    .filter((entity): entity is Entity & { kind: 'event'; data: Event } => entity?.kind === 'event')
    .map((entity) => entity.data)
}

export function eventLocation(event: Event): Location | undefined {
  const entity = resolveRef(event.location)
  return entity?.kind === 'location' ? (entity.data as Location) : undefined
}

export function npcLocation(npc: NPC): Location | undefined {
  const entity = resolveRef(npc.location)
  return entity?.kind === 'location' ? (entity.data as Location) : undefined
}

export function locationParent(location: Location): Location | undefined {
  if (!('parent' in location) || !location.parent) return undefined
  const entity = resolveRef(location.parent)
  return entity?.kind === 'location' ? (entity.data as Location) : undefined
}

export type LocationEntity = Entity & { kind: 'location'; data: Location }

export function locationChildren(parentSlug: string): LocationEntity[] {
  return allEntities('location')
    .filter((entity) => {
      const parent = locationParent(entity.data as Location)
      return parent?.slug === parentSlug
    })
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
    ...entity,
    children: locationTree(entity.slug),
  }))
}

export function locationsByType(type: LocationType): LocationEntity[] {
  return allEntities('location')
    .filter((entity) => 'type' in entity.data && entity.data.type === type)
    .toSorted((a, b) => compareEntityNames(a.data.name, b.data.name))
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
  return allEntities('location').filter((entity) => {
    const loc = entity.data as Location
    return 'parent' in loc && loc.parent && locationAbsolutePosition(loc) !== undefined
  })
}

export function membershipOrg(membership: Membership): Organization | undefined {
  const entity = resolveRef(membership.organization)
  return entity?.kind === 'organization' ? (entity.data as Organization) : undefined
}

export function entityKind(value: Reference): EntityKind {
  return value.ref
}

export function entityTitle(value: Reference): string {
  return refLink(value)?.name ?? value.key
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

export function entityHref(kind: EntityKind, slug: string): string {
  if (kind === 'location') return `/locations/detail/${slug}`
  return `/${COLLECTION_PATH[kind]}/${slug}`
}

export function allEntities(kind: EntityKind): Entity[] {
  const registry = REGISTRIES[kind]
  return Object.values(registry).map((data) => ({
    kind,
    slug: data.slug,
    data,
  }))
}

export function getEntity(kind: EntityKind, slug: string): Entity | undefined {
  const registry = REGISTRIES[kind] as Record<string, { slug: string }>
  const data = Object.values(registry).find((entry) => entry.slug === slug)
  if (!data) return undefined
  return { kind, slug, data } as Entity
}

export function findEntityBySlug(slug: string): Entity | undefined {
  for (const kind of COLLECTIONS) {
    const entity = getEntity(kind, slug)
    if (entity) return entity
  }
  return undefined
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
 * Derive the PCs present in a session purely from its events' `parts`, deduped
 * by slug and resolved to the canonical PC record (so avatars/defaults apply).
 */
export function sessionPcs(session: Session): PC[] {
  const seen = new Set<string>()
  const result: PC[] = []
  for (const event of sessionEvents(session)) {
    for (const ref of collectReferences(event.parts)) {
      if (ref.ref !== 'pc' || seen.has(ref.key)) continue
      seen.add(ref.key)
      const entity = resolveRef(ref)
      if (entity?.kind === 'pc') result.push(entity.data as PC)
    }
  }
  return result.toSorted((a, b) => a.name.localeCompare(b.name))
}

export function openQuests(): Entity[] {
  return allEntities('quest').filter((q) => (q.data as Quest).status === 'open')
}

export function activePcs(): Entity[] {
  return allEntities('pc').filter((p) => (p.data as PC).status === 'active')
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

  for (const pc of Object.values(pcs)) {
    for (const membership of pc.memberships ?? []) {
      const memberOrg = membershipOrg(membership)
      if (!memberOrg || memberOrg.slug !== org.slug) continue
      entries.push({
        kind: 'pc',
        slug: pc.slug,
        name: pc.name,
        avatar: pc.avatar,
        rank: membership.rank,
        status: membership.status,
      })
    }
  }

  for (const npc of Object.values(npcs)) {
    for (const membership of npc.memberships ?? []) {
      const memberOrg = membershipOrg(membership)
      if (!memberOrg || memberOrg.slug !== org.slug) continue
      entries.push({
        kind: 'npc',
        slug: npc.slug,
        name: npc.name,
        avatar: npc.avatar,
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

export function campaignSessions(): Entity[] {
  return campaign.sessions.map((data) => ({
    kind: 'session' as const,
    slug: data.slug,
    data,
  }))
}

export function sessionNumber(slug: string): number | undefined {
  const index = campaign.sessions.findIndex((session) => session.slug === slug)
  return index === -1 ? undefined : index + 1
}

export function sortedSessions(): Entity[] {
  return [...campaignSessions()].toReversed()
}

export type SessionDay = {
  day: number
  date: Date
  events: Event[]
}

export function sessionDays(session: Session): SessionDay[] {
  const byDate = new Map<string, Event[]>()

  for (const event of sessionEvents(session)) {
    const key = event.date.toISOString().slice(0, 10)
    const dayEvents = byDate.get(key) ?? []
    dayEvents.push(event)
    byDate.set(key, dayEvents)
  }

  return [...byDate.entries()]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([key, dayEvents], index) => ({
      day: index + 1,
      date: new Date(key),
      events: dayEvents.toSorted((a, b) => a.date.getTime() - b.date.getTime()),
    }))
}

export function sortedEvents(): Entity[] {
  return allEntities('event').toSorted(
    (a, b) => (b.data as Event).date.getTime() - (a.data as Event).date.getTime(),
  )
}

export function chronologicalEvents(): Entity[] {
  return allEntities('event').toSorted(
    (a, b) => (a.data as Event).date.getTime() - (b.data as Event).date.getTime(),
  )
}

export type SessionTimelineEntry =
  | { kind: 'day'; date: Date; label: string }
  | {
      kind: 'event'
      date: Date
      slug: string
      name: string
      mark: EventMark
    }

export type SessionTimelineSection = {
  session: { slug: string; number: number; name: string; date: Date }
  entries: SessionTimelineEntry[]
}

export type StorylineNode =
  | { kind: 'session'; slug: string; number: number; name: string }
  | SessionTimelineEntry

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function sessionTimelineSections(): SessionTimelineSection[] {
  return campaign.sessions.flatMap((session) => {
    const number = sessionNumber(session.slug)
    if (number === undefined) return []

    const entries: SessionTimelineEntry[] = []
    for (const day of sessionDays(session)) {
      entries.push({ kind: 'day', date: day.date, label: formatDayLabel(day.date) })
      for (const event of day.events) {
        entries.push({
          kind: 'event',
          date: event.date,
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
          date: session.date,
        },
        entries,
      },
    ]
  })
}

export function storylineNodes(
  sections: SessionTimelineSection[] = sessionTimelineSections(),
): StorylineNode[] {
  const nodes: StorylineNode[] = []
  for (const section of sections) {
    nodes.push({
      kind: 'session',
      slug: section.session.slug,
      number: section.session.number,
      name: section.session.name,
    })
    nodes.push(...section.entries)
  }
  return nodes
}

function stripLeadingArticle(name: string): string {
  return name.replace(/^the\s+/i, '').trim()
}

/** Sort key that ignores a leading "The " article. */
export function compareEntityNames(a: string, b: string): number {
  return stripLeadingArticle(a).localeCompare(stripLeadingArticle(b))
}

export function sortEntitiesByName(entities: Entity[]): Entity[] {
  return [...entities].toSorted((a, b) => compareEntityNames(a.data.name, b.data.name))
}

export function collectionKindFromPath(pathname: string): EntityKind | undefined {
  const segment = pathname.split('/').filter(Boolean)[0]
  if (!segment) return undefined
  const entry = Object.entries(COLLECTION_PATH).find(([, path]) => path === segment)
  return entry ? (entry[0] as EntityKind) : undefined
}

export function sessionSlugForEvent(eventSlug: string): string | undefined {
  for (const session of campaign.sessions) {
    if (sessionEvents(session).some((event) => event.slug === eventSlug)) {
      return session.slug
    }
  }
  return undefined
}

export function nonActivePcs(): Entity[] {
  return allEntities('pc').filter((pc) => (pc.data as PC).status !== 'active')
}

export function resolvedQuests(): Entity[] {
  return allEntities('quest').filter((q) => (q.data as Quest).status === 'resolved')
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
