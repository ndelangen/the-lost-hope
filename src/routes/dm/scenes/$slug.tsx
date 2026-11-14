import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Pin } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { EntityReference } from '#/components/entity-reference'
import { arcs, npcMotivations, resolveSourceRef, scenes, table } from '#/lib/dm-campaign'
import { plotsByScene } from '#/lib/dm-dashboard'

export const Route = createFileRoute('/dm/scenes/$slug')({
  loader: ({ params }) => {
    const entry = Object.entries(scenes).find(([, scene]) => scene.slug === params.slug)
    if (!entry) throw notFound()
    return { key: entry[0] }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData ? scenes[loaderData.key]?.name : 'Scene'} | DM` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: SceneRoute,
})

function SceneRoute() {
  const { key } = Route.useLoaderData()
  const scene = scenes[key]!
  const plots = plotsByScene(arcs).get(key) ?? []
  const pinned = table.pinned.some((ref) => ref.key === key)
  const location = resolveSourceRef(scene.location)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="border-border bg-card grid min-w-0 content-start gap-5 rounded-xl border p-6">
        <header className="grid gap-1">
          <p className="text-muted-foreground text-xs">
            {plots.map(({ arc, arcKey, plot }) => (
              <span key={`${arcKey}:${plot.slug}`} className="mr-3">
                <Link to="/dm/arcs/$slug" params={{ slug: arc.slug }} className="hover:underline">
                  {arc.name}
                </Link>{' '}
                › {plot.name}
              </span>
            ))}
          </p>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {pinned ? <Pin aria-label="Pinned" className="size-5 text-amber-600" /> : null}
            {scene.name}
          </h1>
          <p className="text-sm">
            at{' '}
            {location ? (
              <EntityReference kind="location" slug={location.slug} className="font-medium" />
            ) : null}
          </p>
        </header>

        {scene.npcs.length > 0 ? (
          <section className="grid gap-2">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">NPCs</h2>
            <ul className="grid gap-3">
              {scene.npcs.map((npc) => {
                const motivations = npcMotivations(npc)
                return (
                  <li key={npc.key} className="flex gap-3">
                    <DmFaces people={[npc]} size="md" />
                    <div className="grid gap-1">
                      <p className="font-medium">{resolveSourceRef(npc)?.name}</p>
                      {motivations ? (
                        <ContentRenderer content={motivations} className="text-muted-foreground" />
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}

        <section className="grid gap-1">
          <h2 className="text-muted-foreground text-xs font-semibold uppercase">Setup</h2>
          <ContentRenderer content={scene.setup} />
        </section>

        {scene.outcomes.length > 0 ? (
          <section className="grid gap-2">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">If…</h2>
            <dl className="grid gap-2">
              {scene.outcomes.map((outcome, index) => (
                // oxlint-disable-next-line react/no-array-index-key -- outcomes have no ids
                <div key={index} className="bg-muted/50 grid gap-1 rounded-md p-3">
                  <dt className="font-medium">
                    <ContentRenderer content={outcome.when} />
                  </dt>
                  <dd className="text-muted-foreground">
                    <ContentRenderer content={outcome.response} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {scene.notes ? (
          <section className="grid gap-1">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">Notes</h2>
            <ContentRenderer content={scene.notes} />
          </section>
        ) : null}
      </article>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
