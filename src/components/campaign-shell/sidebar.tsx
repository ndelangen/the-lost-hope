import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, ChevronRight, Globe, Home, ScrollText } from 'lucide-react'
import { useEffect } from 'react'

import { COLLECTION_LABELS, collectionTo, entityHref, entityLink } from '#/lib/campaign'
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
}

export function Sidebar({ collapsed, onNavigate }: SidebarProps) {
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
        <div>
          <SectionHeader
            kind="session"
            icon={ScrollText}
            count={sidebarSessions.length}
            sticky
            collapsed={collapsed}
          />
          {!collapsed ? (
            <ul className="space-y-1">
              {sidebarSessions.map((session) => {
                const expanded = expandedItems.has(session.expansionId)
                const sessionActive = pathname === entityHref('session', session.slug)

                return (
                  <li key={session.slug} className="space-y-0.5">
                    <div className="flex items-center gap-0.5">
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
                      <Link
                        {...entityLink('session', session.slug)}
                        className={cn(
                          'min-w-0 flex-1 truncate rounded-md px-1.5 py-1 text-sm transition-colors',
                          sessionActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-foreground hover:bg-muted',
                        )}
                        title={`Session ${session.number}: ${session.name}`}
                        onClick={onNavigate}
                      >
                        <span className="text-primary font-semibold tabular-nums">
                          {session.number}
                        </span>
                        <span className="text-muted-foreground mx-1.5">·</span>
                        <span className="font-medium">{session.name}</span>
                      </Link>
                    </div>

                    {expanded ? (
                      <ul className="border-border ml-3 space-y-2 border-l pl-3">
                        {session.days.map((day) => (
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
          </div>
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
      </div>
    </nav>
  )
}
