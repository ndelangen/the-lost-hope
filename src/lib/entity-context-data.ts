import type { Content } from '#/definitions/content'
import type { EntityRef } from '#/definitions/kind'
import {
  allEntities,
  COLLECTIONS,
  eventLocation,
  resolveRef,
  sessionNumber,
  sessionSlugForEvent,
  sortedEvents,
  type Entity,
  type EntityKind,
} from '#/lib/campaign'
import { collectReferences } from '#/lib/campaign-read-model'

export type ContextEntity = { kind: EntityKind; slug: string; name: string }
export type ContextConnection = {
  id: string
  target: ContextEntity
  label: string
  source: ContextEntity
}
export type ContextHistoryEntry = {
  event: ContextEntity
  day: number
  session?: ContextEntity & { number?: number }
  location?: ContextEntity
  passages: Content
  mentions: ContextEntity[]
  reason: 'mentioned' | 'location' | 'session' | 'linked'
}
export type ContextSource = {
  entity: ContextEntity
  record: ContextEntity
  passages: Content
  quest?: { status: 'open' | 'resolved'; type: 'mystery' | 'mission' }
}
export type EntityContextData = {
  entity: ContextEntity
  history: ContextHistoryEntry[]
  connections: ContextConnection[]
  people: ContextEntity[]
  threads: ContextSource[]
  sources: ContextSource[]
}

function identity(entity: Entity): ContextEntity {
  return { kind: entity.kind, slug: entity.slug, name: entity.data.name }
}

function same(a: ContextEntity, b: ContextEntity): boolean {
  return a.kind === b.kind && a.slug === b.slug
}

function references(value: unknown, target: ContextEntity): boolean {
  return collectReferences(value).some((ref) => {
    const entity = resolveRef(ref)
    return entity && same(identity(entity), target)
  })
}

function prose(entity: Entity): Content {
  const notes = 'notes' in entity.data ? (entity.data.notes ?? []) : []
  return entity.kind === 'quest'
    ? [...notes, ...entity.data.clues, ...entity.data.conclusion]
    : notes
}

function peopleIn(value: unknown): ContextEntity[] {
  const people = collectReferences(value).flatMap((ref) => {
    const entity = resolveRef(ref)
    return entity && ['npc', 'pc', 'beast'].includes(entity.kind) ? [identity(entity)] : []
  })
  return [...new Map(people.map((person) => [`${person.kind}:${person.slug}`, person])).values()]
}

/** Derive only relationships explicitly recorded in structured fields, in both directions. */
function structuredConnections(focus: ContextEntity): ContextConnection[] {
  const result: ContextConnection[] = []
  function add(
    source: Entity,
    ref: EntityRef | null | undefined,
    forward: string,
    inverse: string,
  ) {
    if (!ref) return
    const destination = resolveRef(ref)
    if (!destination) return
    const from = identity(source)
    const to = identity(destination)
    if (same(from, to)) return
    const target = same(from, focus) ? to : same(to, focus) ? from : undefined
    if (!target) return
    const label = same(from, focus) ? forward : inverse
    result.push({
      id: `${from.kind}:${from.slug}:${label}:${to.kind}:${to.slug}`,
      target,
      label,
      source: from,
    })
  }

  for (const kind of COLLECTIONS) {
    for (const source of allEntities(kind)) {
      switch (source.kind) {
        case 'npc':
        case 'pc':
          for (const membership of source.data.memberships ?? []) {
            const former = membership.status === 'former' ? 'Former ' : ''
            add(
              source,
              membership.organization,
              `${former}${membership.rank}`,
              `${former}${membership.rank}`,
            )
          }
          if (source.kind === 'npc') add(source, source.data.location, 'Home', 'Home of')
          break
        case 'beast':
          add(source, source.data.location, 'Based at', 'Base of')
          break
        case 'item':
          add(source, source.data.currentOwner, 'Owned by', 'Owns')
          add(source, source.data.carriedBy, 'Carried by', 'Carries')
          add(source, source.data.craftedBy, 'Crafted by', 'Crafted')
          break
        case 'location':
          if ('parent' in source.data) add(source, source.data.parent, 'Within', 'Contains')
          for (const connection of source.data.connections) {
            add(
              source,
              connection.destination,
              `${connection.type}: ${connection.label}`,
              `Incoming ${connection.type}: ${connection.label}`,
            )
          }
          break
        case 'event':
          if (focus.kind === 'event')
            add(source, source.data.location, 'Took place at', 'Event here')
          break
        case 'session':
        case 'organization':
        case 'quest':
          break
      }
    }
  }
  return [...new Map(result.map((connection) => [connection.id, connection])).values()].toSorted(
    (a, b) => a.target.name.localeCompare(b.target.name) || a.label.localeCompare(b.label),
  )
}

/** Read-only context from canonical records. Prose references remain mentions, never inferred relationships. */
export function entityContextData(entity: Entity): EntityContextData {
  const focus = identity(entity)
  const linkedEvents = new Set(
    collectReferences(entity.data).flatMap((ref) => {
      const target = resolveRef(ref)
      return target?.kind === 'event' ? [target.slug] : []
    }),
  )
  const history = sortedEvents()
    .toReversed()
    .toSorted((a, b) => a.data.day - b.data.day)
    .flatMap((event): ContextHistoryEntry[] => {
      if (same(identity(event), focus)) return []
      const mentioned = references(event.data.notes, focus)
      const place = eventLocation(event.data)
      const atLocation = focus.kind === 'location' && place?.slug === focus.slug
      const sessionSlug = sessionSlugForEvent(event.slug)
      const inSession = focus.kind === 'session' && sessionSlug === focus.slug
      if (!mentioned && !atLocation && !inSession && !linkedEvents.has(event.slug)) return []
      const session = sessionSlug
        ? allEntities('session').find((candidate) => candidate.slug === sessionSlug)
        : undefined
      return [
        {
          event: identity(event),
          day: event.data.day,
          session: session
            ? { ...identity(session), number: sessionNumber(session.slug) }
            : undefined,
          location: place ? { kind: 'location', slug: place.slug, name: place.name } : undefined,
          passages: mentioned
            ? event.data.notes.filter((paragraph) => references(paragraph, focus))
            : event.data.notes,
          mentions: peopleIn(event.data.notes).filter((person) => !same(person, focus)),
          reason: mentioned
            ? 'mentioned'
            : atLocation
              ? 'location'
              : inSession
                ? 'session'
                : 'linked',
        },
      ]
    })
  const sources: ContextSource[] = []
  for (const kind of COLLECTIONS) {
    if (kind === 'event') continue
    for (const candidate of allEntities(kind)) {
      if (same(identity(candidate), focus)) continue
      const passages = prose(candidate).filter((paragraph) => references(paragraph, focus))
      const outgoing = prose(entity).filter((paragraph) =>
        references(paragraph, identity(candidate)),
      )
      if (!passages.length && !outgoing.length) continue
      sources.push({
        entity: identity(candidate),
        record: passages.length ? identity(candidate) : focus,
        passages: passages.length ? passages : outgoing,
        quest:
          candidate.kind === 'quest'
            ? { status: candidate.data.status, type: candidate.data.type }
            : undefined,
      })
    }
  }
  const people = peopleIn(entity.data).filter((person) => !same(person, focus))
  for (const entry of history) people.push(...entry.mentions)
  const contextPeople = [
    ...new Map(people.map((person) => [`${person.kind}:${person.slug}`, person])).values(),
  ].toSorted((a, b) => a.name.localeCompare(b.name))
  const connections = structuredConnections(focus)
  if (entity.kind === 'event') {
    const sessionSlug = sessionSlugForEvent(entity.slug)
    const session = allEntities('session').find((candidate) => candidate.slug === sessionSlug)
    if (session)
      connections.push({
        id: `session:${session.slug}`,
        target: identity(session),
        label: 'Recorded in',
        source: identity(session),
      })
  }
  return {
    entity: focus,
    history,
    connections,
    people: contextPeople,
    threads: sources
      .filter((source) => source.quest)
      .toSorted((a, b) => a.entity.name.localeCompare(b.entity.name)),
    sources: sources
      .filter((source) => !source.quest)
      .toSorted((a, b) => a.entity.name.localeCompare(b.entity.name)),
  }
}

export function historyWithPerson(
  history: ContextHistoryEntry[],
  person: ContextEntity | undefined,
) {
  return person
    ? history.filter((entry) => entry.mentions.some((mention) => same(mention, person)))
    : history
}
