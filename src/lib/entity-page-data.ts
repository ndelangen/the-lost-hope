import type { NPC } from '#/definitions/npc'
import type { Membership } from '#/definitions/organization'
import type { PC } from '#/definitions/pc'
import {
  allEntities,
  entityTeaser,
  membershipOrg,
  sortEntitiesByName,
  type EntityKind,
} from '#/lib/campaign'

type EntityCollectionKind = Exclude<EntityKind, 'quest'>

export type EntityCardItem = {
  kind: EntityKind
  slug: string
  name: string
  description?: string
  meta?: string
}

export function entityCollectionItems(kind: EntityCollectionKind): EntityCardItem[] {
  return sortEntitiesByName(allEntities(kind)).map((entity) => ({
    kind: entity.kind,
    slug: entity.slug,
    name: entity.data.name,
    description: entityTeaser(entity),
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
