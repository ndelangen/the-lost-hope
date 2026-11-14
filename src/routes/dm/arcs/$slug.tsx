import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { EntityReference } from '#/components/entity-reference'
import { Pill } from '#/components/ui/pill'
import { ArcIcon } from '#/lib/arc-icons'
import { resolveRef } from '#/lib/campaign'
import { arcs, resolveScene, sessionsForArc } from '#/lib/dm-campaign'

export const Route = createFileRoute('/dm/arcs/$slug')({
  loader: ({ params }) => {
    const entry = Object.entries(arcs).find(([, arc]) => arc.slug === params.slug)
    if (!entry) throw notFound()
    return { key: entry[0] }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData ? arcs[loaderData.key]?.name : 'Arc'} | DM` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ArcRoute,
})

function ArcRoute() {
  const { key } = Route.useLoaderData()
  const arc = arcs[key]!
  const sessions = sessionsForArc(arc)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        <header className="grid gap-2">
          <p className="text-muted-foreground text-xs uppercase">Arc</p>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <ArcIcon icon={arc.icon} className="size-8" />
            {arc.name}
          </h1>
          <ContentRenderer content={arc.direction} />
          {sessions.length > 0 ? (
            <p className="text-muted-foreground flex flex-wrap gap-2 text-sm">
              Played in
              {sessions.map((session) => (
                <EntityReference key={session.slug} kind="session" slug={session.slug} />
              ))}
            </p>
          ) : null}
        </header>
        {arc.notes ? <ContentRenderer content={arc.notes} /> : null}
        <section className="grid gap-3">
          <h2 className="text-muted-foreground text-xs font-semibold uppercase">Plots</h2>
          <ol className="grid gap-3">
            {arc.plots.map((plot) => {
              const scene = plot.scene ? resolveScene(plot.scene) : undefined
              return (
                <li
                  key={plot.slug}
                  className="border-border bg-card grid gap-2 rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{plot.name}</h3>
                    <div className="flex items-center gap-3">
                      <DmFaces people={plot.npcs} />
                      <Pill variant={plot.status === 'open' ? 'warning' : 'secondary'}>
                        {plot.status}
                      </Pill>
                    </div>
                  </div>
                  {plot.hook ? <ContentRenderer content={plot.hook} /> : null}
                  {scene ? (
                    <p className="text-sm">
                      Scene:{' '}
                      <Link
                        to="/dm/scenes/$slug"
                        params={{ slug: scene.slug }}
                        className="font-medium hover:underline"
                      >
                        {scene.name}
                      </Link>
                    </p>
                  ) : null}
                  {plot.events.length > 0 ? (
                    <ul className="text-muted-foreground grid gap-1 text-sm">
                      {plot.events.map((event) => {
                        const played = resolveRef(event)
                        return played ? (
                          <li key={event.key}>
                            <EntityReference kind="event" slug={played.slug} />
                          </li>
                        ) : null
                      })}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </section>
      </div>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
