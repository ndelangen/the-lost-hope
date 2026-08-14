import type { Content } from '#/definitions/content'
import type { EventMark } from '#/definitions/event'
import { isEntityRef, type EntityRef } from '#/definitions/kind'
import type { QuestType } from '#/definitions/quest'
import type { Session } from '#/definitions/session'
import {
  eventLocation,
  locationParent,
  resolveRef,
  reverseLinks,
  sessionDays,
} from '#/lib/campaign'

export type SessionJournalReference = {
  kind: 'pc' | 'npc' | 'beast'
  slug: string
  name: string
  avatar: string
}

export type SessionJournalQuest = {
  slug: string
  name: string
  type: QuestType
}

export type SessionJournalLocation = {
  slug: string
  name: string
  parent?: {
    slug: string
    name: string
  }
}

export type SessionJournalEvent = {
  index: number
  slug: string
  name: string
  notes: Content
  mark: EventMark
  location?: SessionJournalLocation
  transition?: {
    slug: string
    name: string
  }
  references: SessionJournalReference[]
  quests: SessionJournalQuest[]
}

export type SessionJournalDay = {
  day: number
  events: SessionJournalEvent[]
}

/** Display-ready journal data derived exclusively from canonical campaign registries. */
export function sessionJournalData(session: Session): SessionJournalDay[] {
  let eventIndex = 0
  let previousParentSlug: string | undefined

  return sessionDays(session).map(({ day, events }) => ({
    day,
    events: events.map((event) => {
      eventIndex += 1
      const location = eventLocation(event)
      const parent = location ? locationParent(location) : undefined
      const referencedEntities = referencesIn(event.notes).flatMap((reference) => {
        const entity = resolveRef(reference)
        return entity ? [entity] : []
      })
      const transition =
        parent && previousParentSlug && parent.slug !== previousParentSlug
          ? { slug: parent.slug, name: parent.name }
          : undefined

      previousParentSlug = parent?.slug

      return {
        index: eventIndex,
        slug: event.slug,
        name: event.name,
        notes: event.notes,
        mark: event.mark,
        location: location
          ? {
              slug: location.slug,
              name: location.name,
              parent: parent ? { slug: parent.slug, name: parent.name } : undefined,
            }
          : undefined,
        transition,
        references: uniqueByKey(
          referencedEntities.flatMap((entity): SessionJournalReference[] =>
            entity.kind === 'pc' || entity.kind === 'npc' || entity.kind === 'beast'
              ? [
                  {
                    kind: entity.kind,
                    slug: entity.slug,
                    name: entity.data.name,
                    avatar: entity.data.avatar,
                  },
                ]
              : [],
          ),
          (reference) => `${reference.kind}:${reference.slug}`,
        ),
        quests: uniqueByKey(
          [
            ...referencedEntities.flatMap((entity): SessionJournalQuest[] =>
              entity.kind === 'quest'
                ? [{ slug: entity.slug, name: entity.data.name, type: entity.data.type }]
                : [],
            ),
            ...reverseLinks('event', event.slug).flatMap(({ entity }): SessionJournalQuest[] =>
              entity.kind === 'quest'
                ? [{ slug: entity.slug, name: entity.data.name, type: entity.data.type }]
                : [],
            ),
          ],
          (quest) => quest.slug,
        ),
      }
    }),
  }))
}

function referencesIn(value: unknown): EntityRef[] {
  if (isEntityRef(value)) return [value]
  if (Array.isArray(value)) return value.flatMap(referencesIn)
  return []
}

function uniqueByKey<T>(items: T[], keyFor: (item: T) => string): T[] {
  return [...new Map(items.map((item) => [keyFor(item), item])).values()]
}
