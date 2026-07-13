import { Link, useRouterState } from '@tanstack/react-router'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Globe,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  ScrollText,
} from 'lucide-react'
import { useEffect } from 'react'

import { EntityReference } from '#/components/entity-reference'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import { COLLECTION_LABELS, collectionTo, entityHref } from '#/lib/campaign'
import { cn } from '#/lib/utils'

import { EntityNavCollection, NavLink, SectionHeader } from './nav'
import { NowBlock } from './now-block'
import {
  defaultSidebarExpansions,
  sidebarCollections,
  sidebarRouteState,
  sidebarSessions,
} from './sidebar-data'
import { usePersistedSet } from './storage'

type SidebarProps = {
  collapsed: boolean
  onNavigate: () => void
  onToggleCollapsed?: () => void
}

export function Sidebar({ collapsed, onNavigate, onToggleCollapsed }: SidebarProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const routeState = sidebarRouteState(pathname)
  const [expandedItems, toggleItem, expandItem] = usePersistedSet(
    'dag:sidebar:expanded-items',
    () => defaultSidebarExpansions(pathname),
  )

  useEffect(() => {
    for (const expansionId of sidebarRouteState(pathname).expansionIds) expandItem(expansionId)
  }, [pathname, expandItem])

  return (
    <Stack as="nav" gap={collapsed ? 'sm' : 'xl'}>
      <Stack gap="2xs" className={cn(!collapsed && 'pr-1')}>
        {collapsed ? (
          <Stack gap="2xs">
            {collapsed && onToggleCollapsed ? (
              <SidebarToggle collapsed onToggle={onToggleCollapsed} />
            ) : null}
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
          </Stack>
        ) : (
          <Grid gap="2xs" template="content-auto" align="center">
            <NavLink to="/" active={pathname === '/'} title="Overview" onNavigate={onNavigate}>
              <Home className="size-4 shrink-0" />
              <span>Overview</span>
            </NavLink>
            {onToggleCollapsed ? (
              <SidebarToggle collapsed={false} onToggle={onToggleCollapsed} />
            ) : null}
          </Grid>
        )}
        <NavLink
          to="/intro"
          active={pathname === '/intro'}
          collapsed={collapsed}
          title="Campaign intro"
          onNavigate={onNavigate}
        >
          <BookOpen className="size-4 shrink-0" />
          {!collapsed ? <span>Campaign intro</span> : null}
        </NavLink>
      </Stack>

      <NowBlock collapsed={collapsed} onNavigate={onNavigate} />

      <Stack gap="sm">
        {!collapsed ? (
          <Link
            to="/events"
            onClick={onNavigate}
            className="text-muted-foreground bg-background hover:text-foreground hover:bg-muted sticky top-0 z-20 block h-7 rounded-md px-2 text-[11px] font-semibold tracking-wider uppercase transition-colors"
          >
            <Inline as="span" inline gap="none" className="h-full">
              Story
            </Inline>
          </Link>
        ) : null}
        <Stack gap="sm">
          <SectionHeader
            kind="session"
            icon={ScrollText}
            count={sidebarSessions.length}
            sticky
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
          {!collapsed ? (
            <Stack as="ul" gap="2xs">
              {sidebarSessions.map((session) => {
                const expanded = expandedItems.has(session.expansionId)
                const sessionActive = pathname === entityHref('session', session.slug)

                return (
                  <Stack as="li" gap="3xs" key={session.slug}>
                    <Grid gap="3xs" template="auto-content" align="center">
                      <button
                        type="button"
                        onClick={() => toggleItem(session.expansionId)}
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
                      <EntityReference
                        kind="session"
                        slug={session.slug}
                        previewSide="right"
                        wrapperClassName="min-w-0"
                        unstyled
                        className={cn(
                          'block truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                          sessionActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-foreground hover:bg-muted',
                        )}
                        onNavigate={onNavigate}
                      >
                        {() => (
                          <Inline as="span" gap="xs">
                            <span className="text-primary font-semibold tabular-nums">
                              {session.number}
                            </span>
                            <span className="text-muted-foreground">·</span>
                            <span className="font-medium">{session.name}</span>
                          </Inline>
                        )}
                      </EntityReference>
                    </Grid>

                    {expanded ? (
                      <Stack as="ul" gap="3xs" className="border-border border-l pl-6">
                        {session.events.map((event) => (
                          <li key={event.slug}>
                            <EntityReference
                              kind="event"
                              slug={event.slug}
                              label={event.name}
                              previewSide="right"
                              wrapperClassName="block"
                              unstyled
                              className={cn(
                                'block truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                                pathname === entityHref('event', event.slug)
                                  ? 'bg-accent font-medium text-accent-foreground'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                              )}
                              onNavigate={onNavigate}
                            >
                              {({ label }) => label}
                            </EntityReference>
                          </li>
                        ))}
                      </Stack>
                    ) : null}
                  </Stack>
                )
              })}
              <Inline as="li" gap="md" className="px-2 pt-1">
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
              </Inline>
            </Stack>
          ) : null}
        </Stack>
      </Stack>

      <Stack gap="sm">
        {!collapsed ? (
          <Inline
            as="p"
            gap="sm"
            className="text-muted-foreground bg-background sticky top-0 z-20 h-7 px-2 text-[11px] font-semibold tracking-wider uppercase"
          >
            <Globe className="size-3.5" />
            World & Cast
          </Inline>
        ) : (
          <Inline gap="none" justify="center" className="py-1" title="World & Cast">
            <Globe className="text-muted-foreground size-4" />
          </Inline>
        )}

        {collapsed ? (
          <Stack gap="2xs">
            {sidebarCollections.map(({ kind, icon: Icon }) => {
              return (
                <NavLink
                  key={kind}
                  to={collectionTo(kind)}
                  active={routeState.activeKind === kind}
                  collapsed
                  title={COLLECTION_LABELS[kind]}
                  onNavigate={onNavigate}
                >
                  <Icon className="size-4" />
                </NavLink>
              )
            })}
          </Stack>
        ) : (
          sidebarCollections.map((collection) => (
            <EntityNavCollection
              key={collection.kind}
              collection={collection}
              expanded={expandedItems.has(collection.expansionId)}
              onToggle={() => toggleItem(collection.expansionId)}
              expandedItems={expandedItems}
              onToggleItem={toggleItem}
              activeKind={routeState.activeKind}
              activeSlug={routeState.activeSlug}
              onNavigate={onNavigate}
            />
          ))
        )}
      </Stack>
    </Stack>
  )
}

function SidebarToggle({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'text-muted-foreground hover:text-foreground hover:bg-muted hidden h-7 shrink-0 rounded-md lg:block',
        collapsed ? 'w-full' : 'w-7',
      )}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      <Inline as="span" gap="none" justify="center" className="size-full">
        {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
      </Inline>
    </button>
  )
}
