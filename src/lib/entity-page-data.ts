import type { EventMark } from '#/definitions/event'
import type { NPC } from '#/definitions/npc'
import type { Membership } from '#/definitions/organization'
import type { PC } from '#/definitions/pc'
import type { Session } from '#/definitions/session'
import {
  allEntities,
  entityTeaser,
  eventLocation,
  membershipOrg,
  reverseLinks,
  sessionDays,
  sortEntitiesByName,
  type EntityKind,
} from '#/lib/campaign'

export type EntityCardItem = {
  kind: EntityKind
  slug: string
  name: string
  description?: string
}

export function entityCollectionItems(kind: EntityKind): EntityCardItem[] {
  return sortEntitiesByName(allEntities(kind)).map((entity) => ({
    kind: entity.kind,
    slug: entity.slug,
    name: entity.data.name,
    description: entityTeaser(entity),
  }))
}

export type ReferencedByItem = {
  kind: EntityKind
  slug: string
  name: string
  reason: string
}

export function referencedByItems(kind: EntityKind, slug: string): ReferencedByItem[] {
  return reverseLinks(kind, slug).map(({ entity, reason }) => ({
    kind: entity.kind,
    slug: entity.slug,
    name: entity.data.name,
    reason,
  }))
}

export type CharacterMembership = Pick<Membership, 'rank' | 'status'> & {
  organizationSlug: string
}

export function characterMemberships(character: PC | NPC): CharacterMembership[] {
  return (character.memberships ?? []).flatMap((membership) => {
    const organization = membershipOrg(membership)
    return organization
      ? [{ organizationSlug: organization.slug, rank: membership.rank, status: membership.status }]
      : []
  })
}

export type SessionTimelineDay = {
  day: number
  events: {
    slug: string
    name: string
    mark: EventMark
    locationSlug?: string
  }[]
}

export function sessionTimelineDays(session: Session): SessionTimelineDay[] {
  return sessionDays(session).map(({ day, events }) => ({
    day,
    events: events.map((event) => ({
      slug: event.slug,
      name: event.name,
      mark: event.mark,
      locationSlug: eventLocation(event)?.slug,
    })),
  }))
}
