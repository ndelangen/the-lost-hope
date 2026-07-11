import { Link, Outlet } from '@tanstack/react-router'
import { Menu, Scroll, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Center, Grid, Inline, Stack } from '#/components/ui/layout'
import { campaign } from '#/lib/campaign'
import { cn } from '#/lib/utils'

import { CampaignSearch } from './campaign-shell/campaign-search'
import { Sidebar } from './campaign-shell/sidebar'
import { usePersistedBoolean } from './campaign-shell/storage'

export function CampaignShell() {
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

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border bg-background/90 sticky top-0 z-30 border-b backdrop-blur">
        <Center maxWidth="7xl" className="px-4 sm:px-6">
          <Inline justify="between" gap="md" className="h-14">
            <Inline gap="md">
              <button
                type="button"
                onClick={() => setDrawerOpen((value) => !value)}
                className="border-border rounded-md border p-1.5 lg:hidden"
                aria-label="Toggle navigation"
                aria-expanded={drawerOpen}
              >
                {drawerOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
              <Link to="/" className="font-semibold tracking-tight">
                <Inline as="span" inline gap="sm">
                  <Scroll className="text-primary size-5" />
                  <span>{campaign.name}</span>
                </Inline>
              </Link>
            </Inline>
            <CampaignSearch
              query={query}
              onQueryChange={setQuery}
              className="relative hidden w-full max-w-xs sm:block"
            />
          </Inline>
        </Center>
      </header>

      {drawerOpen ? (
        <button
          type="button"
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation"
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}

      <Center maxWidth="7xl" className="px-4 sm:px-6">
        <Grid gap="none" className="grid-cols-[auto_minmax(0,1fr)]">
          <aside
            ref={drawerRef}
            role={drawerOpen ? 'dialog' : undefined}
            aria-modal={drawerOpen ? true : undefined}
            aria-label={drawerOpen ? 'Navigation' : undefined}
            className={cn(
              'border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r pb-6 lg:pt-6',
              drawerOpen
                ? 'bg-background fixed inset-y-14 left-0 z-50 block w-72 px-4 shadow-xl lg:static lg:px-0 lg:shadow-none'
                : 'hidden lg:block',
              !drawerOpen && (sidebarCollapsed ? 'w-14 pr-1' : 'w-72 pr-4'),
            )}
          >
            <Stack gap="lg">
              {drawerOpen ? (
                <div className="pt-6 lg:hidden">
                  <CampaignSearch query={query} onQueryChange={setQuery} onNavigate={closeDrawer} />
                </div>
              ) : null}
              <Sidebar
                collapsed={drawerOpen ? false : sidebarCollapsed}
                onNavigate={closeDrawer}
                onToggleCollapsed={
                  drawerOpen ? undefined : () => setSidebarCollapsed((value) => !value)
                }
              />
            </Stack>
          </aside>

          <main className="min-w-0 py-8 pl-0 lg:pl-8">
            <Outlet />
          </main>
        </Grid>
      </Center>
    </div>
  )
}
