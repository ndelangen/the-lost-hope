import type { Content } from '#/definitions/content'
import type { EventMark } from '#/definitions/event'
import { isEntityRef, type EntityKind, type EntityRef } from '#/definitions/kind'
import type { QuestType } from '#/definitions/quest'
import type { Session } from '#/definitions/session'
import {
  eventLocation,
  getEntity,
  locationAncestors,
  locationParent,
  locationTypeOf,
  resolveRef,
  reverseLinks,
  sessionDays,
  sessionNumber,
  sessionPcs,
} from '#/lib/campaign'
import { formatSessionDate } from '#/lib/session-date'

export type JournalMention = {
  kind: EntityKind
  slug: string
  name: string
  avatar?: string
}

export type JournalLocation = {
  slug: string
  name: string
  icon?: string
  parentSlug?: string
  parentName?: string
  path: string[]
  scene: string
  mapUrl?: string
}

export type JournalQuestReference = {
  slug: string
  name: string
  type: QuestType
}

export type JournalEvent = {
  index: number
  slug: string
  name: string
  day: number
  notes: Content
  mark: EventMark
  location?: JournalLocation
  mentions: JournalMention[]
  quests: JournalQuestReference[]
}

export type JournalDay = {
  day: number
  events: JournalEvent[]
}

export type SessionJournalPrototypeModel = {
  slug: string
  name: string
  number?: number
  dateLabel: string
  icon: string
  notes?: Content
  eventCount: number
  party: Array<{ slug: string; name: string; avatar: string }>
  days: JournalDay[]
}

/** PROTOTYPE ONLY: display-ready input shared by six throwaway journal compositions. */
export function sessionJournalPrototypeModel(session: Session): SessionJournalPrototypeModel {
  let eventIndex = 0
  const days = sessionDays(session).map(({ day, events }) => ({
    day,
    events: events.map((event) => {
      eventIndex += 1
      const location = eventLocation(event)
      const parent = location ? locationParent(location) : undefined
      const locationPath = location
        ? [...locationAncestors(location), location].filter((entry) => entry.slug !== 'world')
        : []
      const scene =
        locationPath
          .toReversed()
          .find((entry) => ['dungeon', 'building'].includes(locationTypeOf(entry) ?? ''))?.name ??
        location?.name ??
        'Unknown location'
      const mentions = journalMentions(event.notes)

      return {
        index: eventIndex,
        slug: event.slug,
        name: event.name,
        day,
        notes: event.notes,
        mark: event.mark,
        location: location
          ? {
              slug: location.slug,
              name: location.name,
              icon: location.icon,
              parentSlug: parent?.slug,
              parentName: parent?.name,
              path: locationPath.map((entry) => entry.name),
              scene,
              mapUrl: location.map.url.includes('placehold.co') ? undefined : location.map.url,
            }
          : undefined,
        mentions,
        quests: journalQuestReferences(event.slug, mentions),
      }
    }),
  }))

  return {
    slug: session.slug,
    name: session.name,
    number: sessionNumber(session.slug),
    dateLabel: formatSessionDate(session.date, 'long'),
    icon: session.icon,
    notes: session.notes,
    eventCount: eventIndex,
    party: sessionPcs(session).map((pc) => ({
      slug: pc.slug,
      name: pc.name,
      avatar: pc.avatar,
    })),
    days,
  }
}

function journalQuestReferences(
  eventSlug: string,
  mentions: JournalMention[],
): JournalQuestReference[] {
  const direct = mentions.flatMap((mention) => {
    if (mention.kind !== 'quest') return []
    const quest = getEntity('quest', mention.slug)
    return quest ? [{ slug: quest.slug, name: quest.data.name, type: quest.data.type }] : []
  })
  const incoming = reverseLinks('event', eventSlug).flatMap(({ entity }) =>
    entity.kind === 'quest'
      ? [{ slug: entity.slug, name: entity.data.name, type: entity.data.type }]
      : [],
  )

  return [...new Map([...direct, ...incoming].map((quest) => [quest.slug, quest])).values()]
}

function journalMentions(content: Content): JournalMention[] {
  const seen = new Set<string>()
  const mentions: JournalMention[] = []

  for (const ref of referencesIn(content)) {
    const entity = resolveRef(ref)
    if (!entity) continue
    const id = `${entity.kind}:${entity.slug}`
    if (seen.has(id)) continue
    seen.add(id)

    mentions.push({
      kind: entity.kind,
      slug: entity.slug,
      name: entity.data.name,
      avatar:
        entity.kind === 'pc' || entity.kind === 'npc' || entity.kind === 'beast'
          ? entity.data.avatar
          : undefined,
    })
  }

  return mentions
}

function referencesIn(value: unknown): EntityRef[] {
  if (isEntityRef(value)) return [value]
  if (Array.isArray(value)) return value.flatMap(referencesIn)
  return []
}
