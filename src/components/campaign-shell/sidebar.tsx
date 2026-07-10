import { Link, useRouterState } from '@tanstack/react-router'
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Globe,
  Home,
  MapPin,
  ScrollText,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Badge } from '#/components/ui/badge'
import type { NPC } from '#/definitions/npc.ts'
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
import { EntityNavRow, NavLink, SectionHeader } from './nav'
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

export function Sidebar({ collapsed, onNavigate }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const sessions = useMemo(() => sortedSessions(), [])

  const [formerPcsExpanded, setFormerPcsExpanded] = useState(
    () => readStoredBoolean(STORAGE_KEYS.formerPcsExpanded) ?? false,
  )

  const [expandedSessions, toggleSession, expandSession] = usePersistedSet(
    STORAGE_KEYS.expandedSessions,
    () => defaultExpandedSessions(pathname, sessions),
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

  const partyPcs = useMemo(() => sortEntitiesByName(activePcs()), [])
  const formerPcs = useMemo(() => sortEntitiesByName(getFormerPcs()), [])
  const npcs = useMemo(() => sortEntitiesByName(allEntities('npc')), [])
  const beasts = useMemo(() => sortEntitiesByName(allEntities('beast')), [])
  const locations = useMemo(() => sortEntitiesByName(allEntities('location')), [])
  const openQuestEntities = useMemo(() => sortEntitiesByName(openQuests()), [])
  const resolvedQuestEntities = useMemo(() => sortEntitiesByName(resolvedQuests()), [])
  const organizations = useMemo(() => sortEntitiesByName(allEntities('organization')), [])

  useEffect(() => {
    const kind = collectionKindFromPath(pathname)
    const slug = entitySlugFromPath(pathname)

    if (kind && SIDEBAR_COLLECTIONS.includes(kind as SidebarCollection)) {
      expandCollection(kind)
    }

    if (kind === 'session' && slug) {
      expandSession(slug)
    }

    if (kind === 'event' && slug) {
      const sessionSlug = sessionSlugForEvent(slug)
      if (sessionSlug) expandSession(sessionSlug)
    }

    if (kind === 'pc' && slug && formerPcs.some((pc) => pc.slug === slug)) {
      setFormerPcsExpanded(true)
    }
  }, [pathname, expandCollection, expandSession, formerPcs])

  const collectionItems: Record<SidebarCollection, Entity[]> = {
    beast: beasts,
    pc: partyPcs,
    npc: npcs,
    location: locations,
    quest: openQuestEntities,
    organization: organizations,
  }

  const collectionCounts: Record<SidebarCollection, number> = {
    beast: beasts.length,
    pc: partyPcs.length + formerPcs.length,
    npc: npcs.length,
    location: locations.length,
    quest: openQuestEntities.length + resolvedQuestEntities.length,
    organization: organizations.length,
  }

  const renderSessions = (isCollapsed: boolean) => (
    <div>
      <SectionHeader
        icon={ScrollText}
        label={COLLECTION_LABELS.session}
        count={sessions.length}
        sticky
        collapsed={isCollapsed}
      />
      {!isCollapsed ? (
        <ul className="space-y-1">
          {sessions.map((session) => {
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
                          {day.events.map((event) => {
                            const eventHref = entityHref('event', event.slug)
                            return (
                              <li key={event.slug}>
                                <Link
                                  {...entityLink('event', event.slug)}
                                  className={cn(
                                    'block truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                                    pathname === eventHref
                                      ? 'bg-accent font-medium text-accent-foreground'
                                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                  )}
                                  title={event.name}
                                  onClick={onNavigate}
                                >
                                  {event.name}
                                </Link>
                              </li>
                            )
                          })}
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

  const renderPcCollection = (isCollapsed: boolean) => {
    const kind = 'pc' as const
    const Icon = ICONS[kind]
    const expanded = expandedCollections.has(kind)

    if (isCollapsed) {
      return (
        <Link
          to="/pcs"
          className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
          title={COLLECTION_LABELS.pc}
          onClick={onNavigate}
        >
          <Icon className="size-4" />
        </Link>
      )
    }

    return (
      <div>
        <SectionHeader
          icon={Icon}
          label={COLLECTION_LABELS[kind]}
          count={collectionCounts[kind]}
          sticky
          expanded={expanded}
          onToggle={() => toggleCollection(kind)}
        />
        {expanded ? (
          <ul className="space-y-0.5">
            <li>
              <p className="text-muted-foreground px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
                Party
                <Badge variant="secondary" className="ml-2">
                  {partyPcs.length}
                </Badge>
              </p>
              <ul className="space-y-0.5">
                {partyPcs.map((item) => (
                  <EntityNavRow
                    key={item.slug}
                    kind={kind}
                    slug={item.slug}
                    name={item.data.name}
                    active={activeKind === kind && activeSlug === item.slug}
                    avatar={item.data.avatar}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            </li>
            {formerPcs.length > 0 ? (
              <li>
                <button
                  type="button"
                  onClick={() => setFormerPcsExpanded((value) => !value)}
                  className="text-muted-foreground hover:text-foreground flex w-full items-center gap-1 px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase"
                  aria-expanded={formerPcsExpanded}
                >
                  {formerPcsExpanded ? (
                    <ChevronDown className="size-3" />
                  ) : (
                    <ChevronRight className="size-3" />
                  )}
                  Former / occasional
                  <Badge variant="secondary" className="ml-auto">
                    {formerPcs.length}
                  </Badge>
                </button>
                {formerPcsExpanded ? (
                  <ul className="space-y-0.5">
                    {formerPcs.map((item) => (
                      <EntityNavRow
                        key={item.slug}
                        kind={kind}
                        slug={item.slug}
                        name={item.data.name}
                        active={activeKind === kind && activeSlug === item.slug}
                        avatar={item.data.avatar}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : null}
            <li>
              <Link
                to="/pcs"
                className="text-primary block px-2 py-1 text-xs hover:underline"
                onClick={onNavigate}
              >
                Browse all →
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    )
  }

  const renderQuestCollection = (isCollapsed: boolean) => {
    const kind = 'quest' as const
    const Icon = ICONS[kind]
    const expanded = expandedCollections.has(kind)

    if (isCollapsed) {
      return (
        <Link
          to="/quests"
          className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
          title={COLLECTION_LABELS.quest}
          onClick={onNavigate}
        >
          <Icon className="size-4" />
        </Link>
      )
    }

    return (
      <div>
        <SectionHeader
          icon={Icon}
          label={COLLECTION_LABELS[kind]}
          count={collectionCounts[kind]}
          sticky
          expanded={expanded}
          onToggle={() => toggleCollection(kind)}
        />
        {expanded ? (
          <ul className="space-y-0.5">
            <li>
              <p className="text-muted-foreground px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
                Open
                <Badge variant="secondary" className="ml-2">
                  {openQuestEntities.length}
                </Badge>
              </p>
              <ul className="space-y-0.5">
                {openQuestEntities.map((item) => (
                  <EntityNavRow
                    key={item.slug}
                    kind={kind}
                    slug={item.slug}
                    name={item.data.name}
                    active={activeKind === kind && activeSlug === item.slug}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            </li>
            {resolvedQuestEntities.length > 0 ? (
              <li>
                <p className="text-muted-foreground px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
                  Resolved
                  <Badge variant="secondary" className="ml-2">
                    {resolvedQuestEntities.length}
                  </Badge>
                </p>
                <ul className="space-y-0.5">
                  {resolvedQuestEntities.map((item) => (
                    <EntityNavRow
                      key={item.slug}
                      kind={kind}
                      slug={item.slug}
                      name={item.data.name}
                      active={activeKind === kind && activeSlug === item.slug}
                      onNavigate={onNavigate}
                    />
                  ))}
                </ul>
              </li>
            ) : null}
            <li>
              <Link
                to={'/quests'}
                className="text-primary block px-2 py-1 text-xs hover:underline"
                onClick={onNavigate}
              >
                Browse all →
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    )
  }

  const renderCollection = (kind: Exclude<SidebarCollection, 'pc' | 'quest'>) => {
    const Icon = ICONS[kind]
    const items = collectionItems[kind]
    const expanded = expandedCollections.has(kind)

    return (
      <div>
        <SectionHeader
          icon={Icon}
          label={COLLECTION_LABELS[kind]}
          count={collectionCounts[kind]}
          sticky
          expanded={expanded}
          onToggle={() => toggleCollection(kind)}
        />
        {expanded ? (
          <ul className="space-y-0.5">
            {items.map((item) => (
              <EntityNavRow
                key={item.slug}
                kind={kind}
                slug={item.slug}
                name={item.data.name}
                active={activeKind === kind && activeSlug === item.slug}
                avatar={kind === 'npc' ? (item.data as NPC).avatar : undefined}
                onNavigate={onNavigate}
              />
            ))}
            <li>
              <Link
                to={collectionTo(kind)}
                className="text-primary block px-2 py-1 text-xs hover:underline"
                onClick={onNavigate}
              >
                Browse all →
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    )
  }

  const renderWorldCollections = (isCollapsed: boolean) => {
    if (isCollapsed) {
      const BeastIcon = ICONS.beast
      return (
        <div className="space-y-1">
          {renderPcCollection(true)}
          <Link
            to="/npcs"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
            title={COLLECTION_LABELS.npc}
            onClick={onNavigate}
          >
            <Users className="size-4" />
          </Link>
          <Link
            to="/locations"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
            title={COLLECTION_LABELS.location}
            onClick={onNavigate}
          >
            <MapPin className="size-4" />
          </Link>
          {renderQuestCollection(true)}
          <Link
            to="/organizations"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
            title={COLLECTION_LABELS.organization}
            onClick={onNavigate}
          >
            <Building2 className="size-4" />
          </Link>
          <Link
            to="/beasts"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
            title={COLLECTION_LABELS.beast}
            onClick={onNavigate}
          >
            <BeastIcon className="size-4" />
          </Link>
        </div>
      )
    }

    return (
      <>
        {renderPcCollection(false)}
        {renderCollection('npc')}
        {renderCollection('location')}
        {renderQuestCollection(false)}
        {renderCollection('organization')}
        {renderCollection('beast')}
      </>
    )
  }

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
        {renderSessions(collapsed)}
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
        {renderWorldCollections(collapsed)}
      </div>
    </nav>
  )
}
