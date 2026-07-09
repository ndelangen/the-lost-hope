import { Link, useNavigate, Outlet, useRouterState } from '@tanstack/react-router'
import {
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  Globe,
  Home,
  MapPin,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Scroll,
  ScrollText,
  Search,
  User,
  Users,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Event } from '#/definitions/event.ts'
import type { NPC } from '#/definitions/npc.ts'
import type { PC } from '#/definitions/pc.ts'
import type { Session } from '#/definitions/session.ts'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  activePcs,
  allEntities,
  campaign,
  collectionKindFromPath,
  COLLECTION_LABELS,
  COLLECTION_PATH,
  entityHref,
  eventLocation,
  openQuests,
  resolvedQuests,
  searchEntities,
  sessionDays,
  sessionNumber,
  sessionSlugForEvent,
  sortEntitiesByName,
  sortedEvents,
  sortedSessions,
  type Entity,
  type EntityKind,
} from '@/lib/campaign'
import { cn } from '@/lib/utils'

const ICONS: Record<EntityKind, React.ComponentType<{ className?: string }>> = {
  session: ScrollText,
  event: BookOpen,
  location: MapPin,
  npc: Users,
  pc: User,
  quest: Scroll,
  organization: Building2,
}

const SIDEBAR_COLLECTIONS = [
  'pc',
  'npc',
  'location',
  'quest',
  'organization',
] as const satisfies EntityKind[]

const STORAGE_KEYS = {
  expandedSessions: 'dag:sidebar:expanded-sessions',
  expandedCollections: 'dag:sidebar:expanded-collections',
  sidebarCollapsed: 'dag:sidebar:collapsed',
  formerPcsExpanded: 'dag:sidebar:former-pcs',
} as const

function formatDayDate(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function readStoredSet(key: string): Set<string> | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return new Set(parsed.filter((item): item is string => typeof item === 'string'))
  } catch {
    return null
  }
}

function writeStoredSet(key: string, value: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...value]))
}

function readStoredBoolean(key: string): boolean | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    return raw === 'true'
  } catch {
    return null
  }
}

function writeStoredBoolean(key: string, value: boolean) {
  localStorage.setItem(key, String(value))
}

function defaultExpandedSessions(pathname: string, sessions: Entity[]): Set<string> {
  const stored = readStoredSet(STORAGE_KEYS.expandedSessions)
  if (stored) return stored

  const slugs = new Set<string>()
  const latest = sessions[0]
  if (latest) slugs.add(latest.slug)

  const kind = collectionKindFromPath(pathname)
  if (kind === 'event') {
    const eventSlug = pathname.split('/').filter(Boolean)[1]
    if (eventSlug) {
      const sessionSlug = sessionSlugForEvent(eventSlug)
      if (sessionSlug) slugs.add(sessionSlug)
    }
  } else if (kind === 'session') {
    const sessionSlug = pathname.split('/').filter(Boolean)[1]
    if (sessionSlug) slugs.add(sessionSlug)
  }

  return slugs
}

function defaultExpandedCollections(pathname: string): Set<string> {
  const stored = readStoredSet(STORAGE_KEYS.expandedCollections)
  if (stored) return stored

  const kind = collectionKindFromPath(pathname)
  if (kind && SIDEBAR_COLLECTIONS.includes(kind as (typeof SIDEBAR_COLLECTIONS)[number])) {
    return new Set([kind])
  }
  return new Set()
}

function usePersistedSet(
  key: string,
  initial: () => Set<string>,
): [Set<string>, (slug: string) => void, (slug: string) => void] {
  const [set, setSet] = useState<Set<string>>(initial)

  useEffect(() => {
    writeStoredSet(key, set)
  }, [key, set])

  const toggle = useCallback((slug: string) => {
    setSet((current) => {
      const next = new Set(current)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }, [])

  const expand = useCallback((slug: string) => {
    setSet((current) => {
      if (current.has(slug)) return current
      const next = new Set(current)
      next.add(slug)
      return next
    })
  }, [])

  return [set, toggle, expand]
}

type CampaignSearchProps = {
  query: string
  onQueryChange: (value: string) => void
  onNavigate?: () => void
  className?: string
  inputClassName?: string
}

function CampaignSearch({
  query,
  onQueryChange,
  onNavigate,
  className,
  inputClassName,
}: CampaignSearchProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const results = useMemo(() => searchEntities(query, 20), [query])

  const flatResults = useMemo(() => {
    const grouped = new Map<EntityKind, Entity[]>()
    for (const entity of results) {
      const group = grouped.get(entity.kind) ?? []
      group.push(entity)
      grouped.set(entity.kind, group)
    }
    return [...grouped.entries()].flatMap(([, items]) => items)
  }, [results])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigateTo = (entity: Entity) => {
    navigate({ to: entityHref(entity.kind, entity.slug) })
    onQueryChange('')
    setOpen(false)
    onNavigate?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onQueryChange('')
      setOpen(false)
      inputRef.current?.blur()
      return
    }

    if (!open || flatResults.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((index) => (index + 1) % flatResults.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((index) => (index - 1 + flatResults.length) % flatResults.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const selected = flatResults[selectedIndex]
      if (selected) navigateTo(selected)
    }
  }

  const groupedResults = useMemo(() => {
    const grouped = new Map<EntityKind, Entity[]>()
    for (const entity of results) {
      const group = grouped.get(entity.kind) ?? []
      group.push(entity)
      grouped.set(entity.kind, group)
    }
    return grouped
  }, [results])

  let flatIndex = -1

  return (
    <div className={cn('relative', className)}>
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 150)
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search campaign…"
        aria-label="Search campaign"
        className={cn(
          'border-border bg-card ring-ring h-9 w-full rounded-lg border pr-3 pl-9 text-sm outline-none focus:ring-2',
          inputClassName,
        )}
      />
      {open && query.trim().length > 0 ? (
        <div className="border-border bg-card absolute top-full right-0 left-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border shadow-lg">
          {results.length === 0 ? (
            <p className="text-muted-foreground px-3 py-4 text-sm">No results for "{query}"</p>
          ) : (
            groupedResults.size > 0 &&
            [...groupedResults.entries()].map(([kind, items]) => (
                <div key={kind}>
                  <p className="text-muted-foreground bg-muted/50 sticky top-0 px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase">
                    {COLLECTION_LABELS[kind]}
                  </p>
                  <ul>
                    {items.map((entity) => {
                      flatIndex += 1
                      const index = flatIndex
                      const isSelected = index === selectedIndex
                      const KindIcon = ICONS[entity.kind]
                      return (
                        <li key={`${entity.kind}-${entity.slug}`}>
                          <button
                            type="button"
                            className={cn(
                              'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                              isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-muted',
                            )}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => navigateTo(entity)}
                          >
                            <KindIcon className="text-muted-foreground size-4 shrink-0" />
                            <span className="min-w-0 flex-1 truncate">{entity.data.name}</span>
                            <Badge variant="secondary" className="shrink-0">
                              {COLLECTION_LABELS[kind].replace(/s$/, '')}
                            </Badge>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))
          )}
        </div>
      ) : null}
    </div>
  )
}

type NowBlockProps = {
  collapsed?: boolean
  onNavigate?: () => void
}

function NowBlock({ collapsed, onNavigate }: NowBlockProps) {
  const sessions = useMemo(() => sortedSessions(), [])
  const currentSession = sessions[0]
  const partyCount = useMemo(() => activePcs().length, [])
  const questCount = useMemo(() => openQuests().length, [])
  const latestEvent = useMemo(() => sortedEvents()[0], [])
  const currentLocation = useMemo(() => {
    if (!latestEvent) return undefined
    return eventLocation(latestEvent.data as Event)
  }, [latestEvent])

  if (collapsed) {
    return (
      <Link
        to={currentSession ? entityHref('session', currentSession.slug) : '/'}
        className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
        title="Current session"
        onClick={onNavigate}
      >
        <ScrollText className="size-4" />
      </Link>
    )
  }

  return (
    <Card className="shadow-none">
      <CardContent className="space-y-2 p-3">
        <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">Now</p>
        {currentSession ? (
          <Link
            to={entityHref('session', currentSession.slug)}
            className="hover:text-primary block truncate text-sm font-medium"
            onClick={onNavigate}
          >
            Session {sessionNumber(currentSession.slug)} · {currentSession.data.name}
          </Link>
        ) : null}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <Link to={`/${COLLECTION_PATH.pc}`} className="text-primary hover:underline" onClick={onNavigate}>
            Party: {partyCount}
          </Link>
          <Link
            to={`/${COLLECTION_PATH.quest}`}
            className="text-primary hover:underline"
            onClick={onNavigate}
          >
            Open quests: {questCount}
          </Link>
        </div>
        {currentLocation ? (
          <Link
            to={entityHref('location', currentLocation.slug)}
            className="text-muted-foreground hover:text-foreground block truncate text-xs"
            onClick={onNavigate}
          >
            Where: {currentLocation.name}
          </Link>
        ) : null}
      </CardContent>
    </Card>
  )
}

type NavLinkProps = {
  to: string
  active: boolean
  title?: string
  collapsed?: boolean
  onNavigate?: () => void
  className?: string
  children: React.ReactNode
}

function NavLink({
  to,
  active,
  title,
  collapsed,
  onNavigate,
  className,
  children,
}: NavLinkProps) {
  return (
    <Link
      to={to}
      title={title}
      onClick={onNavigate}
      className={cn(
        'flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
        collapsed ? 'justify-center' : 'gap-2',
        active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      {children}
    </Link>
  )
}

type EntityNavRowProps = {
  kind: EntityKind
  slug: string
  name: string
  active: boolean
  avatar?: string
  onNavigate?: () => void
}

function EntityNavRow({ kind, slug, name, active, avatar, onNavigate }: EntityNavRowProps) {
  const href = entityHref(kind, slug)
  return (
    <li>
      <Link
        to={href}
        title={name}
        onClick={onNavigate}
        className={cn(
          'flex items-center gap-2 truncate rounded-md px-2 py-1 text-sm transition-colors',
          active
            ? 'bg-accent font-medium text-accent-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        {avatar ? <Avatar src={avatar} className="size-5" /> : null}
        <span className="truncate">{name}</span>
      </Link>
    </li>
  )
}

type SectionHeaderProps = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  count?: number
  sticky?: boolean
  expanded?: boolean
  onToggle?: () => void
  collapsed?: boolean
}

function SectionHeader({
  icon: Icon,
  label,
  count,
  sticky,
  expanded,
  onToggle,
  collapsed,
}: SectionHeaderProps) {
  if (collapsed) {
    return (
      <div className="flex justify-center py-1" title={label}>
        <Icon className="text-muted-foreground size-4" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'text-muted-foreground mb-2 flex items-center gap-2 px-2 text-xs font-semibold tracking-wider uppercase',
        sticky && 'bg-background sticky top-0 z-10 py-1',
      )}
    >
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground rounded-md p-0.5"
          aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </button>
      ) : null}
      <Icon className="size-3.5" />
      <span>{label}</span>
      {count !== undefined ? (
        <Badge variant="secondary" className="ml-auto">
          {count}
        </Badge>
      ) : null}
    </div>
  )
}

export function CampaignShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => readStoredBoolean(STORAGE_KEYS.sidebarCollapsed) ?? false,
  )
  const [formerPcsExpanded, setFormerPcsExpanded] = useState(
    () => readStoredBoolean(STORAGE_KEYS.formerPcsExpanded) ?? false,
  )
  const drawerRef = useRef<HTMLElement>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const sessions = useMemo(() => sortedSessions(), [])
  const [expandedSessions, toggleSession, expandSession] = usePersistedSet(
    STORAGE_KEYS.expandedSessions,
    () => defaultExpandedSessions(pathname, sessions),
  )
  const [expandedCollections, toggleCollection, expandCollection] = usePersistedSet(
    STORAGE_KEYS.expandedCollections,
    () => defaultExpandedCollections(pathname),
  )

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    writeStoredBoolean(STORAGE_KEYS.sidebarCollapsed, sidebarCollapsed)
  }, [sidebarCollapsed])

  useEffect(() => {
    writeStoredBoolean(STORAGE_KEYS.formerPcsExpanded, formerPcsExpanded)
  }, [formerPcsExpanded])

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  useEffect(() => {
    if (!drawerOpen || !drawerRef.current) return
    const focusable = drawerRef.current.querySelector<HTMLElement>(
      'input, button, a, [tabindex]:not([tabindex="-1"])',
    )
    focusable?.focus()
  }, [drawerOpen])

  const activeKind = collectionKindFromPath(pathname)
  const activeSlug = pathname.split('/').filter(Boolean)[1]

  const partyPcs = useMemo(() => sortEntitiesByName(activePcs()), [])
  const formerPcs = useMemo(
    () =>
      sortEntitiesByName(
        allEntities('pc').filter((pc) => (pc.data as PC).status !== 'active'),
      ),
    [],
  )
  const npcs = useMemo(() => sortEntitiesByName(allEntities('npc')), [])
  const locations = useMemo(() => sortEntitiesByName(allEntities('location')), [])
  const openQuestEntities = useMemo(() => sortEntitiesByName(openQuests()), [])
  const resolvedQuestEntities = useMemo(() => sortEntitiesByName(resolvedQuests()), [])
  const organizations = useMemo(() => sortEntitiesByName(allEntities('organization')), [])

  useEffect(() => {
    const kind = collectionKindFromPath(pathname)
    const slug = pathname.split('/').filter(Boolean)[1]

    if (kind && SIDEBAR_COLLECTIONS.includes(kind as (typeof SIDEBAR_COLLECTIONS)[number])) {
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

  const collectionItems: Record<(typeof SIDEBAR_COLLECTIONS)[number], Entity[]> = {
    pc: partyPcs,
    npc: npcs,
    location: locations,
    quest: openQuestEntities,
    organization: organizations,
  }

  const collectionCounts: Record<(typeof SIDEBAR_COLLECTIONS)[number], number> = {
    pc: partyPcs.length + formerPcs.length,
    npc: npcs.length,
    location: locations.length,
    quest: openQuestEntities.length + resolvedQuestEntities.length,
    organization: organizations.length,
  }

  const renderSessions = (collapsed: boolean) => (
    <div>
      <SectionHeader
        icon={ScrollText}
        label={COLLECTION_LABELS.session}
        count={sessions.length}
        sticky
        collapsed={collapsed}
      />
      {!collapsed ? (
        <ul className="space-y-1">
          {sessions.map((session) => {
            const data = session.data as Session
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
                    to={entityHref('session', session.slug)}
                    className={cn(
                      'min-w-0 flex-1 truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                      sessionActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-muted',
                    )}
                    title={`Session ${number}: ${data.name}`}
                    onClick={closeDrawer}
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
                          Day {day.day}
                          <span className="text-muted-foreground/70 ml-1.5 font-normal normal-case">
                            · {formatDayDate(day.date)}
                          </span>
                        </p>
                        <ul className="space-y-0.5">
                          {day.events.map((event) => {
                            const eventHref = entityHref('event', event.slug)
                            return (
                              <li key={event.slug}>
                                <Link
                                  to={eventHref}
                                  className={cn(
                                    'block truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                                    pathname === eventHref
                                      ? 'bg-accent font-medium text-accent-foreground'
                                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                  )}
                                  title={event.name}
                                  onClick={closeDrawer}
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
              to={`/${COLLECTION_PATH.session}`}
              className="text-primary text-xs hover:underline"
              onClick={closeDrawer}
            >
              All sessions →
            </Link>
            <Link
              to={`/${COLLECTION_PATH.event}`}
              className="text-primary text-xs hover:underline"
              onClick={closeDrawer}
            >
              All events →
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  )

  const renderPcCollection = (collapsed: boolean) => {
    const kind = 'pc' as const
    const Icon = ICONS[kind]
    const expanded = expandedCollections.has(kind)

    if (collapsed) {
      return (
        <Link
          to={`/${COLLECTION_PATH.pc}`}
          className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
          title={COLLECTION_LABELS.pc}
          onClick={closeDrawer}
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
                    avatar={(item.data as PC).avatar}
                    onNavigate={closeDrawer}
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
                        avatar={(item.data as PC).avatar}
                        onNavigate={closeDrawer}
                      />
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : null}
            <li>
              <Link
                to={`/${COLLECTION_PATH[kind]}`}
                className="text-primary block px-2 py-1 text-xs hover:underline"
                onClick={closeDrawer}
              >
                Browse all →
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    )
  }

  const renderQuestCollection = (collapsed: boolean) => {
    const kind = 'quest' as const
    const Icon = ICONS[kind]
    const expanded = expandedCollections.has(kind)

    if (collapsed) {
      return (
        <Link
          to={`/${COLLECTION_PATH.quest}`}
          className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
          title={COLLECTION_LABELS.quest}
          onClick={closeDrawer}
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
                    onNavigate={closeDrawer}
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
                      onNavigate={closeDrawer}
                    />
                  ))}
                </ul>
              </li>
            ) : null}
            <li>
              <Link
                to={`/${COLLECTION_PATH[kind]}`}
                className="text-primary block px-2 py-1 text-xs hover:underline"
                onClick={closeDrawer}
              >
                Browse all →
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    )
  }

  const renderCollection = (kind: Exclude<(typeof SIDEBAR_COLLECTIONS)[number], 'pc' | 'quest'>) => {
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
                onNavigate={closeDrawer}
              />
            ))}
            <li>
              <Link
                to={`/${COLLECTION_PATH[kind]}`}
                className="text-primary block px-2 py-1 text-xs hover:underline"
                onClick={closeDrawer}
              >
                Browse all →
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    )
  }

  const renderWorldCollections = (collapsed: boolean) => {
    if (collapsed) {
      return (
        <div className="space-y-1">
          {renderPcCollection(true)}
          <Link
            to={`/${COLLECTION_PATH.npc}`}
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
            title={COLLECTION_LABELS.npc}
            onClick={closeDrawer}
          >
            <Users className="size-4" />
          </Link>
          <Link
            to={`/${COLLECTION_PATH.location}`}
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
            title={COLLECTION_LABELS.location}
            onClick={closeDrawer}
          >
            <MapPin className="size-4" />
          </Link>
          {renderQuestCollection(true)}
          <Link
            to={`/${COLLECTION_PATH.organization}`}
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
            title={COLLECTION_LABELS.organization}
            onClick={closeDrawer}
          >
            <Building2 className="size-4" />
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
      </>
    )
  }

  const renderSidebarNav = (collapsed: boolean) => (
    <nav className={cn('space-y-6', collapsed && 'space-y-2')}>
      <NavLink
        to="/"
        active={pathname === '/'}
        collapsed={collapsed}
        title="Overview"
        onNavigate={closeDrawer}
      >
        <Home className="size-4 shrink-0" />
        {!collapsed ? <span>Overview</span> : null}
      </NavLink>

      {!collapsed ? <NowBlock onNavigate={closeDrawer} /> : <NowBlock collapsed onNavigate={closeDrawer} />}

      <div>
        {!collapsed ? (
          <p className="text-muted-foreground bg-background sticky top-0 z-10 mb-2 px-2 py-1 text-[11px] font-semibold tracking-wider uppercase">
            Story
          </p>
        ) : null}
        {renderSessions(collapsed)}
      </div>

      <div>
        {!collapsed ? (
          <p className="text-muted-foreground bg-background sticky top-0 z-10 mb-2 flex items-center gap-2 px-2 py-1 text-[11px] font-semibold tracking-wider uppercase">
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

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border bg-background/90 sticky top-0 z-30 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen((value) => !value)}
            className="border-border rounded-md border p-1.5 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Scroll className="text-primary size-5" />
            <span>{campaign.name}</span>
          </Link>
          <CampaignSearch
            query={query}
            onQueryChange={setQuery}
            className="relative ml-auto hidden max-w-xs flex-1 sm:block"
          />
        </div>
      </header>

      {drawerOpen ? (
        <button
          type="button"
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation"
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}

      <div className="mx-auto flex max-w-7xl gap-0 px-4 sm:px-6">
        <aside
          ref={drawerRef}
          role={drawerOpen ? 'dialog' : undefined}
          aria-modal={drawerOpen ? true : undefined}
          aria-label={drawerOpen ? 'Navigation' : undefined}
          className={cn(
            'border-border sticky top-14 h-[calc(100vh-3.5rem)] shrink-0 overflow-y-auto border-r py-6',
            drawerOpen
              ? 'bg-background fixed inset-y-14 left-0 z-50 block w-72 px-4 shadow-xl lg:static lg:px-0 lg:shadow-none'
              : 'hidden lg:block',
            !drawerOpen && (sidebarCollapsed ? 'w-14 pr-1' : 'w-72 pr-4'),
          )}
        >
          {drawerOpen ? (
            <div className="mb-4 lg:hidden">
              <CampaignSearch query={query} onQueryChange={setQuery} onNavigate={closeDrawer} />
            </div>
          ) : null}
          <div
            className={cn(
              'mb-4 hidden lg:flex',
              sidebarCollapsed && !drawerOpen ? 'justify-center' : 'justify-end',
            )}
          >
            <button
              type="button"
              onClick={() => setSidebarCollapsed((value) => !value)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-1.5"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </button>
          </div>
          {renderSidebarNav(drawerOpen ? false : sidebarCollapsed)}
        </aside>

        <main className="min-w-0 flex-1 py-8 pl-0 lg:pl-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
