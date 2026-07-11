import type { Campaign } from '#/definitions/campaign'
import type { Event } from '#/definitions/event'
import { isEntityRef, type EntityKind, type EntityRef } from '#/definitions/kind'

import type { DataOf, Entity, EntityOf } from './campaign-registries'

export type EntityCollectionIndex<K extends EntityKind> = {
  all: readonly EntityOf<K>[]
  byKey: ReadonlyMap<string, EntityOf<K>>
  bySlug: ReadonlyMap<string, EntityOf<K>>
}

export type EntityIndexes = {
  [K in EntityKind]: EntityCollectionIndex<K>
}

export type ReverseLink = {
  entity: Entity
}

export type SessionDay = {
  day: number
  events: readonly Event[]
}

type CampaignChronology = {
  sessions: readonly EntityOf<'session'>[]
  sortedSessions: readonly EntityOf<'session'>[]
  sessionNumberBySlug: ReadonlyMap<string, number>
  sessionEventsBySlug: ReadonlyMap<string, readonly Event[]>
  sessionDaysBySlug: ReadonlyMap<string, readonly SessionDay[]>
  events: readonly EntityOf<'event'>[]
  sortedEvents: readonly EntityOf<'event'>[]
  sessionSlugByEventSlug: ReadonlyMap<string, string>
}

type CampaignEntityGroups = {
  activePcs: readonly EntityOf<'pc'>[]
  nonActivePcs: readonly EntityOf<'pc'>[]
  openQuests: readonly EntityOf<'quest'>[]
  resolvedQuests: readonly EntityOf<'quest'>[]
}

export type CampaignReadModel = {
  entities: EntityIndexes
  groups: CampaignEntityGroups
  reverseLinksByEntity: ReadonlyMap<Entity, readonly ReverseLink[]>
  searchTextByEntity: ReadonlyMap<Entity, string>
  chronology: CampaignChronology
}

type CampaignRegistries = {
  [K in EntityKind]: Record<string, DataOf<K>>
}

type CreateCampaignReadModelOptions = {
  campaign: Campaign
  collectionOrder: readonly EntityKind[]
  registries: CampaignRegistries
}

export function collectReferences(
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

function createEntityIndexes(
  registries: CampaignRegistries,
  collectionOrder: readonly EntityKind[],
): EntityIndexes {
  return Object.fromEntries(
    collectionOrder.map((kind) => {
      const keyedEntities = Object.entries(registries[kind]).map(([key, data]) => {
        const entity = { kind, slug: data.slug, data } as Entity
        return [key, entity] as const
      })
      const all = Object.freeze(keyedEntities.map(([, entity]) => entity))
      return [
        kind,
        {
          all,
          byKey: new Map(keyedEntities),
          bySlug: new Map(all.map((entity) => [entity.slug, entity])),
        },
      ]
    }),
  ) as unknown as EntityIndexes
}

function resolveIndexedRef(indexes: EntityIndexes, ref: EntityRef): Entity | undefined {
  return indexes[ref.ref].byKey.get(ref.key)
}

function createReferenceIndexes(indexes: EntityIndexes, collectionOrder: readonly EntityKind[]) {
  const mutableReverseLinks = new Map<Entity, ReverseLink[]>()
  const searchTextByEntity = new Map<Entity, string>()

  for (const kind of collectionOrder) {
    for (const entity of indexes[kind].all) {
      const references = Object.freeze(collectReferences(entity.data))

      const referencedNames: string[] = []
      const linkedTargets = new Set<Entity>()
      for (const ref of references) {
        const target = resolveIndexedRef(indexes, ref)
        if (!target) continue
        referencedNames.push(target.data.name)
        if (target === entity || linkedTargets.has(target)) continue
        linkedTargets.add(target)
        const links = mutableReverseLinks.get(target) ?? []
        links.push({ entity })
        mutableReverseLinks.set(target, links)
      }

      searchTextByEntity.set(
        entity,
        [JSON.stringify(entity.data), ...referencedNames].join(' ').toLowerCase(),
      )
    }
  }

  const reverseLinksByEntity = new Map(
    [...mutableReverseLinks].map(([entity, links]) => [entity, Object.freeze(links)] as const),
  )

  return { reverseLinksByEntity, searchTextByEntity }
}

function createEntityGroups(indexes: EntityIndexes): CampaignEntityGroups {
  return {
    activePcs: Object.freeze(indexes.pc.all.filter((pc) => pc.data.status === 'active')),
    nonActivePcs: Object.freeze(indexes.pc.all.filter((pc) => pc.data.status !== 'active')),
    openQuests: Object.freeze(indexes.quest.all.filter((quest) => quest.data.status === 'open')),
    resolvedQuests: Object.freeze(
      indexes.quest.all.filter((quest) => quest.data.status === 'resolved'),
    ),
  }
}

function createChronology(indexes: EntityIndexes, campaign: Campaign): CampaignChronology {
  const sessionNumberBySlug = new Map<string, number>()
  const sessionEventsBySlug = new Map<string, readonly Event[]>()
  const sessionDaysBySlug = new Map<string, readonly SessionDay[]>()
  const sessionSlugByEventSlug = new Map<string, string>()

  const campaignSessions: readonly EntityOf<'session'>[] = Object.freeze(
    campaign.sessions.map((session) => {
      sessionNumberBySlug.set(session.slug, session.number)
      return (
        indexes.session.bySlug.get(session.slug) ?? {
          kind: 'session' as const,
          slug: session.slug,
          data: session,
        }
      )
    }),
  )

  const campaignEvents: EntityOf<'event'>[] = []
  for (const session of campaignSessions) {
    const sessionEvents = Object.freeze(
      session.data.events.flatMap((ref) => {
        if (ref.ref !== 'event') return []
        const entity = indexes.event.byKey.get(ref.key)
        return entity ? [entity.data] : []
      }),
    )
    sessionEventsBySlug.set(session.slug, sessionEvents)

    const eventsByDay = new Map<number, Event[]>()
    for (const event of sessionEvents) {
      const dayEvents = eventsByDay.get(event.day) ?? []
      dayEvents.push(event)
      eventsByDay.set(event.day, dayEvents)
      sessionSlugByEventSlug.set(event.slug, session.slug)

      const eventEntity = indexes.event.bySlug.get(event.slug)
      if (eventEntity) campaignEvents.push(eventEntity)
    }

    sessionDaysBySlug.set(
      session.slug,
      Object.freeze(
        [...eventsByDay.entries()]
          .toSorted(([a], [b]) => a - b)
          .map(([day, events]) => ({ day, events: Object.freeze(events) })),
      ),
    )
  }

  const events = Object.freeze(campaignEvents)
  return {
    sessions: campaignSessions,
    sortedSessions: Object.freeze(campaignSessions.toReversed()),
    sessionNumberBySlug,
    sessionEventsBySlug,
    sessionDaysBySlug,
    events,
    sortedEvents: Object.freeze(events.toReversed()),
    sessionSlugByEventSlug,
  }
}

export function createCampaignReadModel({
  campaign,
  collectionOrder,
  registries,
}: CreateCampaignReadModelOptions): CampaignReadModel {
  const entities = createEntityIndexes(registries, collectionOrder)
  const references = createReferenceIndexes(entities, collectionOrder)
  return {
    entities,
    groups: createEntityGroups(entities),
    ...references,
    chronology: createChronology(entities, campaign),
  }
}
