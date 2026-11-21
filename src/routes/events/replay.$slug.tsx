import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'

import { getEntity } from '#/lib/campaign'

const FleetBattleOnScreen = lazy(() =>
  import('#/components/player-screen/fleet-battle-on-screen').then((module) => ({
    default: module.FleetBattleOnScreen,
  })),
)

/** An event's animated replay on a page of its own, filling the window. */
export const Route = createFileRoute('/events/replay/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('event', params.slug)
    if (!entity || entity.data.visualizations.length === 0) throw notFound()
    return entity
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Replay · ${loaderData.data.name}` : 'Replay' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ReplayPage,
})

function ReplayPage() {
  const entity = Route.useLoaderData()
  const visualization = entity.data.visualizations[0]!
  // The replay runs on the browser's clock, so it starts once the page is in the browser.
  const [inBrowser, setInBrowser] = useState(false)
  useEffect(() => setInBrowser(true), [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-black text-white">
      {inBrowser ? (
        <Suspense fallback={null}>
          <FleetBattleOnScreen owner={visualization.fleet.key} />
        </Suspense>
      ) : null}
      <Link
        to="/events/detail/$slug"
        params={{ slug: entity.slug }}
        className="absolute right-[calc(min(30vw,34rem)+1rem)] bottom-4 z-10 flex max-w-[40vw] items-center gap-2 truncate rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {entity.data.name}
      </Link>
    </div>
  )
}
