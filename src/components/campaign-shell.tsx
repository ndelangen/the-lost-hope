import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { Menu, Scroll, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

import { Inline, Stack } from '#/components/ui/layout'
import { campaign } from '#/lib/campaign'

import { CampaignSearch } from './campaign-shell/campaign-search'
import { CampaignShellLayout } from './campaign-shell/layout'
import { Sidebar } from './campaign-shell/sidebar'
import { usePersistedBoolean } from './campaign-shell/storage'

export function CampaignShell({ themeControl }: { themeControl: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const hasNavigation = pathname !== '/_icons'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = usePersistedBoolean(
    'dag:sidebar:collapsed',
    false,
  )
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
          <button
            type="button"
            onClick={() => setDrawerOpen((value) => !value)}
            className="border-border rounded-md border p-1.5 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
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
        {themeControl}
      </Inline>
    </Inline>
  )

  const navigation = (
    <Stack gap="lg">
      {drawerOpen ? (
        <CampaignSearch query={query} onQueryChange={setQuery} onNavigate={closeDrawer} />
      ) : null}
      <Sidebar
        collapsed={drawerOpen ? false : sidebarCollapsed}
        onNavigate={closeDrawer}
        onToggleCollapsed={drawerOpen ? undefined : () => setSidebarCollapsed((value) => !value)}
      />
    </Stack>
  )

  return (
    <CampaignShellLayout
      header={header}
      navigation={navigation}
      navigationRef={drawerRef}
      navigationOpen={drawerOpen}
      navigationCollapsed={sidebarCollapsed}
      hasNavigation={hasNavigation}
      onDismissNavigation={closeDrawer}
    >
      <Outlet />
    </CampaignShellLayout>
  )
}
