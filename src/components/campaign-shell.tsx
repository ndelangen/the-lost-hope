import { Link, Outlet } from '@tanstack/react-router'
import { Menu, PanelLeftClose, PanelLeftOpen, Scroll, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { campaign } from '#/lib/campaign'
import { cn } from '#/lib/utils'

import { CampaignSearch } from './campaign-shell/campaign-search'
import { STORAGE_KEYS } from './campaign-shell/constants'
import { Sidebar } from './campaign-shell/sidebar'
import { readStoredBoolean, writeStoredBoolean } from './campaign-shell/storage'

export function CampaignShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => readStoredBoolean(STORAGE_KEYS.sidebarCollapsed) ?? false,
  )
  const drawerRef = useRef<HTMLElement>(null)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    writeStoredBoolean(STORAGE_KEYS.sidebarCollapsed, sidebarCollapsed)
  }, [sidebarCollapsed])

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
            'border-border sticky top-14 h-[calc(100vh-3.5rem)] shrink-0 overflow-y-auto border-r pb-6',
            drawerOpen
              ? 'bg-background fixed inset-y-14 left-0 z-50 block w-72 px-4 shadow-xl lg:static lg:px-0 lg:shadow-none'
              : 'hidden lg:block',
            !drawerOpen && (sidebarCollapsed ? 'w-14 pr-1' : 'w-72 pr-4'),
          )}
        >
          {drawerOpen ? (
            <div className="mb-4 pt-6 lg:hidden">
              <CampaignSearch query={query} onQueryChange={setQuery} onNavigate={closeDrawer} />
            </div>
          ) : null}
          <div
            className={cn(
              'mb-4 hidden pt-6 lg:flex',
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
          <Sidebar collapsed={drawerOpen ? false : sidebarCollapsed} onNavigate={closeDrawer} />
        </aside>

        <main className="min-w-0 flex-1 py-8 pl-0 lg:pl-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
