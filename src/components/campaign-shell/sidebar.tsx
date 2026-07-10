import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, ChevronRight, Globe, Home, ScrollText } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  activePcs,
  allEntities,
  collectionKindFromPath,
  COLLECTION_LABELS,
  collectionTo,
  entityHref,
  entityLink,
  entitySlugFromPath,
  formerPcs as getFormerPcs,
  openQuests,
  resolvedQuests,
  sessionDays,
  sessionNumber,
  sessionSlugForEvent,
  sortEntitiesByName,
  sortedSessions,
  type Entity,
} from '#/lib/campaign'
import { cn } from '#/lib/utils'

import { ICONS, SIDEBAR_COLLECTIONS, STORAGE_KEYS, type SidebarCollection } from './constants'
import {
  EntityNavCollection,
  NavLink,
  SectionHeader,
  type EntityNavGroup,
  type EntityNavItem,
} from './nav'
import { NowBlock } from './now-block'
import {
  defaultExpandedCollections,
  defaultExpandedSessions,
  readStoredBoolean,
  usePersistedSet,
  writeStoredBoolean,
} from './storage'

type SidebarProps = {
  collapsed: boolean
  onNavigate: () => void
}

type WorldCollection = {
  kind: SidebarCollection
  count: number
  groups: EntityNavGroup[]
}

function navItems(entities: Entity[], withAvatar = false): EntityNavItem[] {
  return entities.map((entity) => ({
    slug: entity.slug,
    name: entity.data.name,
    avatar: withAvatar && 'avatar' in entity.data ? entity.data.avatar : undefined,
  }))
}

const SESSIONS = sortedSessions()
const PARTY_PCS = sortEntitiesByName(activePcs())
const FORMER_PCS = sortEntitiesByName(getFormerPcs())
const NPCS = sortEntitiesByName(allEntities('npc'))
const BEASTS = sortEntitiesByName(allEntities('beast'))
const LOCATIONS = sortEntitiesByName(allEntities('location'))
const OPEN_QUESTS = sortEntitiesByName(openQuests())
const RESOLVED_QUESTS = sortEntitiesByName(resolvedQuests())
const ORGANIZATIONS = sortEntitiesByName(allEntities('organization'))

export function Sidebar({ collapsed, onNavigate }: SidebarProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  const [formerPcsExpanded, setFormerPcsExpanded] = useState(
    () => readStoredBoolean(STORAGE_KEYS.formerPcsExpanded) ?? false,
  )
  const [expandedSessions, toggleSession, expandSession] = usePersistedSet(
    STORAGE_KEYS.expandedSessions,
    () => defaultExpandedSessions(pathname, SESSIONS),
  )
  const [expandedCollections, toggleCollection, expandCollection] = usePersistedSet(
    STORAGE_KEYS.expandedCollections,
    () => defaultExpandedCollections(pathname),
  )

  useEffect(() => {
    writeStoredBoolean(STORAGE_KEYS.formerPcsExpanded, formerPcsExpanded)
  }, [formerPcsExpanded])

  const activeKind = collectionKindFromPath(pathname)
  const activeSlug = entitySlugFromPath(pathname)

  useEffect(() => {
    const kind = collectionKindFromPath(pathname)
    const slug = entitySlugFromPath(pathname)

    if (kind && SIDEBAR_COLLECTIONS.includes(kind as SidebarCollection)) {
      expandCollection(kind)
    }
    if (kind === 'session' && slug) expandSession(slug)
    if (kind === 'event' && slug) {
      const sessionSlug = sessionSlugForEvent(slug)
      if (sessionSlug) expandSession(sessionSlug)
    }
    if (kind === 'pc' && slug && FORMER_PCS.some((pc) => pc.slug === slug)) {
      setFormerPcsExpanded(true)
    }
  }, [pathname, expandCollection, expandSession])

  const worldCollections: WorldCollection[] = [
    {
      kind: 'pc',
      count: PARTY_PCS.length + FORMER_PCS.length,
      groups: [
        { id: 'party', label: 'Party', items: navItems(PARTY_PCS, true) },
        ...(FORMER_PCS.length > 0
          ? [
              {
                id: 'former',
                label: 'Former / occasional',
                items: navItems(FORMER_PCS, true),
                expanded: formerPcsExpanded,
                onToggle: () => setFormerPcsExpanded((value) => !value),
              },
            ]
          : []),
      ],
    },
    { kind: 'npc', count: NPCS.length, groups: [{ id: 'all', items: navItems(NPCS, true) }] },
    {
      kind: 'location',
      count: LOCATIONS.length,
      groups: [{ id: 'all', items: navItems(LOCATIONS) }],
    },
    {
      kind: 'quest',
      count: OPEN_QUESTS.length + RESOLVED_QUESTS.length,
      groups: [
        { id: 'open', label: 'Open', items: navItems(OPEN_QUESTS) },
        ...(RESOLVED_QUESTS.length > 0
          ? [{ id: 'resolved', label: 'Resolved', items: navItems(RESOLVED_QUESTS) }]
          : []),
      ],
    },
    {
      kind: 'organization',
      count: ORGANIZATIONS.length,
      groups: [{ id: 'all', items: navItems(ORGANIZATIONS) }],
    },
    { kind: 'beast', count: BEASTS.length, groups: [{ id: 'all', items: navItems(BEASTS) }] },
  ]

  const renderSessions = () => (
    <div>
      <SectionHeader
        icon={ScrollText}
        label={COLLECTION_LABELS.session}
        count={SESSIONS.length}
        sticky
        collapsed={collapsed}
      />
      {!collapsed ? (
        <ul className="space-y-1">
          {SESSIONS.map((session) => {
            const data = session.data
            const number = sessionNumber(session.slug)
            const expanded = expandedSessions.has(session.slug)
            const days = sessionDays(data)
            const sessionActive = pathname === entityHref('session', session.slug)

            return (
              <li key={session.slug} className="space-y-0.5">
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => toggleSession(session.slug)}
                    className="text-muted-foreground hover:text-foreground rounded-md p-1"
                    aria-label={expanded ? 'Collapse session' : 'Expand session'}
                    aria-expanded={expanded}
                  >
                    {expanded ? (
                      <ChevronDown className="size-3.5" />
                    ) : (
                      <ChevronRight className="size-3.5" />
                    )}
                  </button>
                  <Link
                    {...entityLink('session', session.slug)}
                    className={cn(
                      'min-w-0 flex-1 truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                      sessionActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-muted',
                    )}
                    title={`Session ${number}: ${data.name}`}
                    onClick={onNavigate}
                  >
                    <span className="text-primary font-semibold tabular-nums">{number}</span>
                    <span className="text-muted-foreground mx-1.5">·</span>
                    <span className="font-medium">{data.name}</span>
                  </Link>
                </div>

                {expanded ? (
                  <ul className="border-border ml-3 space-y-2 border-l pl-3">
                    {days.map((day) => (
                      <li key={`${session.slug}-day-${day.day}`}>
                        <p className="text-muted-foreground px-1.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
                          Campaign day {day.day}
                        </p>
                        <ul className="space-y-0.5">
                          {day.events.map((event) => (
                            <li key={event.slug}>
                              <Link
                                {...entityLink('event', event.slug)}
                                className={cn(
                                  'block truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                                  pathname === entityHref('event', event.slug)
                                    ? 'bg-accent font-medium text-accent-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                )}
                                title={event.name}
                                onClick={onNavigate}
                              >
                                {event.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
          <li className="flex gap-3 px-2 pt-1">
            <Link
              to="/sessions"
              className="text-primary text-xs hover:underline"
              onClick={onNavigate}
            >
              All sessions →
            </Link>
            <Link
              to="/events"
              className="text-primary text-xs hover:underline"
              onClick={onNavigate}
            >
              All events →
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  )

  return (
    <nav className={cn('space-y-6', collapsed && 'space-y-2')}>
      <NavLink
        to="/"
        active={pathname === '/'}
        collapsed={collapsed}
        title="Overview"
        onNavigate={onNavigate}
      >
        <Home className="size-4 shrink-0" />
        {!collapsed ? <span>Overview</span> : null}
      </NavLink>

      <NowBlock collapsed={collapsed} onNavigate={onNavigate} />

      <div>
        {!collapsed ? (
          <p className="text-muted-foreground bg-background sticky top-0 z-20 mb-2 flex h-7 items-center px-2 text-[11px] font-semibold tracking-wider uppercase">
            Story
          </p>
        ) : null}
        {renderSessions()}
      </div>

      <div>
        {!collapsed ? (
          <p className="text-muted-foreground bg-background sticky top-0 z-20 mb-2 flex h-7 items-center gap-2 px-2 text-[11px] font-semibold tracking-wider uppercase">
            <Globe className="size-3.5" />
            World & Cast
          </p>
        ) : (
          <div className="flex justify-center py-1" title="World & Cast">
            <Globe className="text-muted-foreground size-4" />
          </div>
        )}

        {collapsed ? (
          <div className="space-y-1">
            {worldCollections.map(({ kind }) => {
              const Icon = ICONS[kind]
              return (
                <NavLink
                  key={kind}
                  to={collectionTo(kind)}
                  active={activeKind === kind}
                  collapsed
                  title={COLLECTION_LABELS[kind]}
                  onNavigate={onNavigate}
                >
                  <Icon className="size-4" />
                </NavLink>
              )
            })}
          </div>
        ) : (
          worldCollections.map(({ kind, count, groups }) => (
            <EntityNavCollection
              key={kind}
              kind={kind}
              label={COLLECTION_LABELS[kind]}
              icon={ICONS[kind]}
              count={count}
              expanded={expandedCollections.has(kind)}
              onToggle={() => toggleCollection(kind)}
              groups={groups}
              activeKind={activeKind}
              activeSlug={activeSlug}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </nav>
  )
}
