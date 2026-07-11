import type { ReactNode, Ref } from 'react'

import { Center, Grid } from '#/components/ui/layout'
import { cn } from '#/lib/utils'

type CampaignShellLayoutProps = {
  children: ReactNode
  header: ReactNode
  navigation: ReactNode
  navigationRef: Ref<HTMLElement>
  navigationOpen: boolean
  navigationCollapsed: boolean
  onDismissNavigation: () => void
}

/** Owns the responsive campaign shell geometry; callers supply state and rendered content. */
export function CampaignShellLayout({
  children,
  header,
  navigation,
  navigationRef,
  navigationOpen,
  navigationCollapsed,
  onDismissNavigation,
}: CampaignShellLayoutProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border bg-background/90 sticky top-0 z-30 border-b backdrop-blur">
        <Center maxWidth="7xl" className="px-4 sm:px-6">
          {header}
        </Center>
      </header>

      {navigationOpen ? (
        <button
          type="button"
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation"
          onClick={onDismissNavigation}
        />
      ) : null}

      <Center maxWidth="7xl" className="px-4 sm:px-6">
        <Grid gap="none" template="auto-content">
          <aside
            ref={navigationRef}
            role={navigationOpen ? 'dialog' : undefined}
            aria-modal={navigationOpen ? true : undefined}
            aria-label={navigationOpen ? 'Navigation' : undefined}
            className={cn(
              'border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r pb-6',
              navigationOpen
                ? 'bg-background fixed inset-y-14 left-0 z-50 block w-72 px-4 shadow-xl lg:static lg:px-0 lg:shadow-none'
                : 'hidden lg:block',
              !navigationOpen && (navigationCollapsed ? 'w-14 pr-1' : 'w-72 pr-4'),
            )}
          >
            <div className="pt-6">{navigation}</div>
          </aside>

          <main className="min-w-0 py-8 pl-0 lg:pl-8">{children}</main>
        </Grid>
      </Center>
    </div>
  )
}
