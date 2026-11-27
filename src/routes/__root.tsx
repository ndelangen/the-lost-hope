import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import { lazy, Suspense, type ReactNode } from 'react'

import { CampaignShell } from '#/components/campaign-shell'
import { DM_MODE_AVAILABLE } from '#/components/dm-mode'
import { loadEntityIcons } from '#/components/entity-icons'
import { parseUiPreferences } from '#/lib/ui-preferences'

import '../styles.css'

/** Local dev only: the notice for a reload held back while the DM has unsaved work. */
const DevReloadNotice = import.meta.env.DEV
  ? lazy(() =>
      import('#/components/dev-reload-notice').then((module) => ({
        default: module.DevReloadNotice,
      })),
    )
  : undefined

/** Read the shell preferences from the request so the server render already matches them. */
const loadUiPreferences = createIsomorphicFn()
  .server(() => parseUiPreferences(getRequestHeader('cookie') ?? '', DM_MODE_AVAILABLE))
  .client(() => parseUiPreferences(document.cookie, DM_MODE_AVAILABLE))

/**
 * The server draws every entity icon and library picture in its HTML, so it loads the modules the
 * browser defers until after hydration before rendering.
 */
const loadDeferredModules = createIsomorphicFn()
  .server(async () => {
    const { loadLibraryImages } = await import('#/components/library/library-image')
    await Promise.all([loadEntityIcons(), loadLibraryImages()])
  })
  .client(() => undefined)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
  loader: async () => {
    await loadDeferredModules()
    return loadUiPreferences()
  },
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

const THEME_SCRIPT = `(() => { try { const stored = localStorage.getItem('dag:theme'); const dark = stored === 'dark' || (stored !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.classList.toggle('dark', dark); } catch {} })()`

function RootComponent() {
  const preferences = Route.useLoaderData()
  return (
    <RootDocument>
      <CampaignShell initialPreferences={preferences} />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {children}
        {DevReloadNotice ? (
          <Suspense fallback={null}>
            <DevReloadNotice />
          </Suspense>
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundPage() {
  return (
    <>
      <title>Page not found | The Lost Hope</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta
        name="description"
        content="This campaign record does not exist or is not part of The Lost Hope public archive."
      />
      <section className="mx-auto max-w-2xl py-16">
        <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          This campaign record does not exist or is not part of the public archive.
        </p>
        <Link to="/" className="text-primary mt-6 inline-block font-medium hover:underline">
          Return to The Lost Hope →
        </Link>
      </section>
    </>
  )
}
