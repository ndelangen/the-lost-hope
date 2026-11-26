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
  hasNavigation?: boolean
  /** Drop the header, navigation, and width cap so a page can use the whole screen. */
  focused?: boolean
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
  hasNavigation = true,
  focused = false,
  onDismissNavigation,
}: CampaignShellLayoutProps) {
  if (focused) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <main className="min-w-0 p-3 sm:px-4">{children}</main>
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border bg-background/90 sticky top-0 z-30 border-b backdrop-blur">
        <Center maxWidth="7xl" className="px-4 sm:px-6">
          {header}
        </Center>
      </header>

      {hasNavigation && navigationOpen ? (
        <button
          type="button"
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation"
          onClick={onDismissNavigation}
        />
      ) : null}

      <Center maxWidth="7xl" className="px-4 sm:px-6">
        <Grid gap="none" template={hasNavigation ? 'auto-content' : 1}>
          {hasNavigation ? (
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
                // Folded, the rail's 48px squares sit in the middle of the strip left of the border.
                !navigationOpen && (navigationCollapsed ? '-ml-2 w-16 pr-4' : 'w-72 pr-4'),
              )}
            >
              <div className="pt-6">{navigation}</div>
            </aside>
          ) : null}

          <main
            className={cn(
              'min-w-0 pt-8 pl-0',
              // Local dev floats the player-screen dock over the page bottom; leave room for it.
              import.meta.env.DEV ? 'pb-24' : 'pb-8',
              // Pinned to the second column, so a hidden navigation never leaves the page in the
              // auto-sized first one.
              hasNavigation && 'col-start-2 lg:pl-8',
            )}
          >
            {children}
          </main>
        </Grid>
      </Center>
    </div>
  )
}
