import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { Card, CardContent, CardDescription, CardHeader } from '#/components/ui/card'
import { readDmAccess, updateDmAccess } from '#/lib/dm-access.server'

const getDmAccess = createServerFn({ method: 'GET' }).handler(() => readDmAccess())

export const Route = createFileRoute('/dm')({
  validateSearch: (search: Record<string, unknown>) => ({
    incorrect: search.incorrect === true ? true : undefined,
  }),
  loader: () => getDmAccess(),
  head: () => ({
    meta: [
      { title: 'DM dashboard | The Lost Hope' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  headers: () => ({
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  }),
  server: {
    handlers: {
      POST: ({ request }) => updateDmAccess(request),
    },
  },
  component: DmRoute,
})

function DmRoute() {
  const access = Route.useLoaderData()
  const { incorrect } = Route.useSearch()
  const buttonClass = 'bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium'

  if (access !== 'unlocked') {
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-semibold">DM dashboard</h1>
          {access === 'locked' ? (
            <CardDescription>Enter your access code to open the dashboard.</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>
          {access === 'unavailable' ? (
            <p>DM access is unavailable.</p>
          ) : (
            <form action="/dm" method="post" className="grid gap-3">
              <label htmlFor="dm-access-code" className="text-sm font-medium">
                Access code
              </label>
              <input
                id="dm-access-code"
                name="code"
                type="password"
                autoComplete="current-password"
                required
                maxLength={32}
                aria-invalid={incorrect}
                aria-describedby={incorrect ? 'dm-access-error' : undefined}
                className="border-input bg-background rounded-md border px-3 py-2"
              />
              {incorrect ? (
                <p id="dm-access-error" role="alert">
                  That access code is incorrect.
                </p>
              ) : null}
              <button type="submit" className={buttonClass}>
                Unlock dashboard
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="mx-auto grid w-full max-w-3xl gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">DM dashboard</h1>
        <form action="/dm" method="post">
          <button
            name="action"
            value="lock"
            className="border-border rounded-md border px-3 py-2 text-sm"
          >
            Lock dashboard
          </button>
        </form>
      </div>
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Campaign shortcuts</h2>
        </CardHeader>
        <CardContent>
          <nav aria-label="Campaign shortcuts" className="grid gap-3 sm:grid-cols-2">
            <Link to="/sessions" className="border-border rounded-md border p-3">
              Sessions
            </Link>
            <Link to="/npcs" className="border-border rounded-md border p-3">
              NPCs
            </Link>
            <Link to="/quests" className="border-border rounded-md border p-3">
              Quests
            </Link>
            <Link to="/locations/map" className="border-border rounded-md border p-3">
              World map
            </Link>
          </nav>
        </CardContent>
      </Card>
    </section>
  )
}
