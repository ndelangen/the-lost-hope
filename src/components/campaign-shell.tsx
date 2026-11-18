import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { Menu, PanelLeftClose, PanelLeftOpen, Scroll, X } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

import { DM_MODE_AVAILABLE, DmModeContext } from '#/components/dm-mode'
import { Inline, Stack } from '#/components/ui/layout'
import { campaign } from '#/lib/campaign'
import type { UiPreferences } from '#/lib/ui-preferences'
import { cn } from '#/lib/utils'

import { CampaignSearch } from './campaign-shell/campaign-search'
import { DmControls } from './campaign-shell/dm-controls'
import { CampaignShellLayout } from './campaign-shell/layout'
import { Sidebar } from './campaign-shell/sidebar'
import { useTheme } from './campaign-shell/theme'
import { ThemeToggle } from './campaign-shell/theme-toggle'
import { useUiPreferences } from './campaign-shell/ui-preferences'

const headerButtonClass =
  'border-border text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 size-9 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none'

/** The DM's player-screen picker is a table tool for local dev; the public site never ships it. */
const PlayerScreenDock = import.meta.env.DEV
  ? lazy(() =>
      import('#/components/player-screen/player-screen-dock').then((module) => ({
        default: module.PlayerScreenDock,
      })),
    )
  : undefined

/** A pinned ship-damage clock is a DM table tool too, so it also ships in local dev only. */
const ShipDamageDock = import.meta.env.DEV
  ? lazy(() =>
      import('#/components/dm/ship-damage-dock').then((module) => ({
        default: module.ShipDamageDock,
      })),
    )
  : undefined

export function CampaignShell({ initialPreferences }: { initialPreferences: UiPreferences }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const hasNavigation = pathname !== '/_icons'
  // A running encounter in combat focus takes the whole screen.
  const focused = useRouterState({
    select: (state) =>
      state.location.pathname.startsWith('/dm/encounter/') &&
      (state.location.search as { combat?: unknown }).combat === true,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [{ dmMode, navigationCollapsed }, setPreference] = useUiPreferences(initialPreferences)
  const { theme, toggleTheme } = useTheme()
  const drawerRef = useRef<HTMLElement>(null)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

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

  const header = (
    <Inline justify="between" gap="md" className="h-14">
      <Inline gap="md">
        {hasNavigation ? (
          <>
            <button
              type="button"
              onClick={() => setDrawerOpen((value) => !value)}
              className={cn(headerButtonClass, 'inline-flex lg:hidden')}
              aria-label="Toggle navigation"
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setPreference('navigationCollapsed', !navigationCollapsed)}
              className={cn(headerButtonClass, 'hidden lg:inline-flex')}
              aria-label={navigationCollapsed ? 'Expand navigation' : 'Collapse navigation'}
              aria-expanded={!navigationCollapsed}
              title={navigationCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            >
              {navigationCollapsed ? (
                <PanelLeftOpen className="size-4" aria-hidden />
              ) : (
                <PanelLeftClose className="size-4" aria-hidden />
              )}
            </button>
          </>
        ) : null}
        <Link to="/" className="font-semibold tracking-tight">
          <Inline as="span" inline gap="sm">
            <Scroll className="text-primary size-5" />
            <span>{campaign.name}</span>
          </Inline>
        </Link>
      </Inline>
      <Inline gap="sm" justify="end" className="min-w-0 flex-1">
        <CampaignSearch
          query={query}
          onQueryChange={setQuery}
          className="relative hidden w-full max-w-xs sm:block"
        />
        {DM_MODE_AVAILABLE ? (
          <DmControls dmMode={dmMode} onToggleDmMode={() => setPreference('dmMode', !dmMode)} />
        ) : null}
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </Inline>
    </Inline>
  )

  const navigation = (
    <Stack gap="lg">
      {drawerOpen ? (
        <CampaignSearch query={query} onQueryChange={setQuery} onNavigate={closeDrawer} />
      ) : null}
      <Sidebar collapsed={drawerOpen ? false : navigationCollapsed} onNavigate={closeDrawer} />
    </Stack>
  )

  // The player screen is a bare picture on the players' monitor.
  if (pathname === '/display') return <Outlet />

  return (
    <>
      <CampaignShellLayout
        header={header}
        navigation={navigation}
        navigationRef={drawerRef}
        navigationOpen={drawerOpen}
        navigationCollapsed={navigationCollapsed}
        hasNavigation={hasNavigation}
        focused={focused}
        onDismissNavigation={closeDrawer}
      >
        <DmModeContext value={dmMode}>
          <Outlet />
        </DmModeContext>
        {PlayerScreenDock ? (
          <Suspense fallback={null}>
            <PlayerScreenDock />
          </Suspense>
        ) : null}
      </CampaignShellLayout>
      {/* Outside the layout, so entering combat focus does not restart the clock or its alarm. */}
      {ShipDamageDock ? (
        <Suspense fallback={null}>
          <ShipDamageDock />
        </Suspense>
      ) : null}
    </>
  )
}
