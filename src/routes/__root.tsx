import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { CampaignShell } from '#/components/campaign-shell'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

const THEME_SCRIPT = `(() => { try { const stored = localStorage.getItem('dag:theme'); const dark = stored === 'dark' || (stored !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.classList.toggle('dark', dark); } catch {} })()`

function RootComponent() {
  return (
    <RootDocument>
      <CampaignShell />
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
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundPage() {
  return (
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
  )
}
