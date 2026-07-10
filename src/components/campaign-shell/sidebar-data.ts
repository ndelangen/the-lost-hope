import { Building2, Dog, MapPin, Scroll, User, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import {
  activePcs,
  allEntities,
  collectionKindFromPath,
  entitySlugFromPath,
  nonActivePcs,
  openQuests,
  resolvedQuests,
  sessionDays,
  sessionNumber,
  sessionSlugForEvent,
  sortEntitiesByName,
  sortedSessions,
  type Entity,
  type EntityKind,
} from '#/lib/campaign'

type StoryEntityKind = 'session' | 'event'
export type SidebarCollectionKind = Exclude<EntityKind, StoryEntityKind>

export type SidebarNavItem = {
  slug: string
  name: string
  avatar?: string
}

export type SidebarNavGroup = {
  id: string
  label?: string
  items: SidebarNavItem[]
  expansionId?: string
}

export type SidebarCollection = {
  kind: SidebarCollectionKind
  icon: LucideIcon
  count: number
  groups: SidebarNavGroup[]
  expansionId: string
}

type SidebarCollectionDefinition = {
  kind: SidebarCollectionKind
  icon: LucideIcon
  avatars?: boolean
  groups?: () => SidebarNavGroup[]
}

const FORMER_PC_GROUP_EXPANSION_ID = 'group:pc:former'

function collectionExpansionId(kind: SidebarCollectionKind) {
  return `collection:${kind}`
}

function sessionExpansionId(slug: string) {
  return `session:${slug}`
}

function navItems(entities: Entity[], withAvatar = false): SidebarNavItem[] {
  return entities.map((entity) => ({
    slug: entity.slug,
    name: entity.data.name,
    avatar: withAvatar && 'avatar' in entity.data ? entity.data.avatar : undefined,
  }))
}

const partyPcs = sortEntitiesByName(activePcs())
const formerPcEntities = sortEntitiesByName(nonActivePcs())
const formerPcSlugs = new Set(formerPcEntities.map((pc) => pc.slug))

// This is the sidebar's one intentional collection registry: it owns display order and the few
// collections whose groups differ from the generic sorted list.
const collectionDefinitions: SidebarCollectionDefinition[] = [
  {
    kind: 'pc',
    icon: User,
    groups: () => [
      { id: 'party', label: 'Party', items: navItems(partyPcs, true) },
      ...(formerPcEntities.length > 0
        ? [
            {
              id: 'former',
              label: 'Former / occasional',
              items: navItems(formerPcEntities, true),
              expansionId: FORMER_PC_GROUP_EXPANSION_ID,
            },
          ]
        : []),
    ],
  },
  { kind: 'npc', icon: Users, avatars: true },
  { kind: 'location', icon: MapPin },
  {
    kind: 'quest',
    icon: Scroll,
    groups: () => {
      const open = sortEntitiesByName(openQuests())
      const resolved = sortEntitiesByName(resolvedQuests())
      return [
        { id: 'open', label: 'Open', items: navItems(open) },
        ...(resolved.length > 0
          ? [{ id: 'resolved', label: 'Resolved', items: navItems(resolved) }]
          : []),
      ]
    },
  },
  { kind: 'organization', icon: Building2 },
  { kind: 'beast', icon: Dog },
]

export const sidebarCollections: SidebarCollection[] = collectionDefinitions.map((definition) => {
  const groups = definition.groups?.() ?? [
    {
      id: 'all',
      items: navItems(sortEntitiesByName(allEntities(definition.kind)), definition.avatars),
    },
  ]

  return {
    kind: definition.kind,
    icon: definition.icon,
    count: groups.reduce((count, group) => count + group.items.length, 0),
    groups,
    expansionId: collectionExpansionId(definition.kind),
  }
})

export const sidebarSessions = sortedSessions().map((session) => ({
  slug: session.slug,
  name: session.data.name,
  number: sessionNumber(session.slug),
  expansionId: sessionExpansionId(session.slug),
  days: sessionDays(session.data).map((day) => ({
    day: day.day,
    events: day.events.map((event) => ({ slug: event.slug, name: event.name })),
  })),
}))

export function isSidebarCollectionKind(
  kind: EntityKind | undefined,
): kind is SidebarCollectionKind {
  return sidebarCollections.some((collection) => collection.kind === kind)
}

export type SidebarRouteState = {
  activeKind?: EntityKind
  activeSlug?: string
  expansionIds: string[]
}

export function sidebarRouteState(pathname: string): SidebarRouteState {
  const activeKind = collectionKindFromPath(pathname)
  const activeSlug = entitySlugFromPath(pathname)
  const expansionIds: string[] = []

  if (isSidebarCollectionKind(activeKind)) {
    expansionIds.push(collectionExpansionId(activeKind))
  }

  if (activeKind === 'session' && activeSlug) {
    expansionIds.push(sessionExpansionId(activeSlug))
  }

  if (activeKind === 'event' && activeSlug) {
    const sessionSlug = sessionSlugForEvent(activeSlug)
    if (sessionSlug) expansionIds.push(sessionExpansionId(sessionSlug))
  }

  if (activeKind === 'pc' && activeSlug && formerPcSlugs.has(activeSlug)) {
    expansionIds.push(FORMER_PC_GROUP_EXPANSION_ID)
  }

  return { activeKind, activeSlug, expansionIds }
}

export function defaultSidebarExpansions(pathname: string): Set<string> {
  const expansions = new Set(sidebarRouteState(pathname).expansionIds)
  const latestSession = sidebarSessions[0]
  if (latestSession) expansions.add(latestSession.expansionId)
  return expansions
}
