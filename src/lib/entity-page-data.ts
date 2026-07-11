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
  questProgress,
  reverseLinks,
  sessionDays,
  sortEntitiesByName,
  type EntityKind,
  type QuestProgress,
} from '#/lib/campaign'

export type EntityCardItem = {
  kind: EntityKind
  slug: string
  name: string
  description?: string
  meta?: string
}

export function entityCollectionItems(kind: EntityKind): EntityCardItem[] {
  return sortEntitiesByName(allEntities(kind)).map((entity) => {
    const progress = entity.kind === 'quest' ? questProgress(entity.data) : undefined
    return {
      kind: entity.kind,
      slug: entity.slug,
      name: entity.data.name,
      description: entity.kind === 'quest' ? undefined : entityTeaser(entity),
      meta: entity.kind === 'quest' ? questProgressText(progress) : undefined,
    }
  })
}

export function questProgressText(progress: QuestProgress | undefined): string {
  if (!progress) return 'No linked progress'
  if (progress.campaignDaysAgo === 0) return 'Current day'
  const unit = progress.campaignDaysAgo === 1 ? 'day' : 'days'
  return `${progress.campaignDaysAgo} ${unit} ago`
}

export type ReferencedByItem = {
  kind: EntityKind
  slug: string
  name: string
}

export function referencedByItems(kind: EntityKind, slug: string): ReferencedByItem[] {
  return reverseLinks(kind, slug).map(({ entity }) => ({
    kind: entity.kind,
    slug: entity.slug,
    name: entity.data.name,
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
