import { Link, createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { compareEntityNames } from '#/lib/campaign'
import { arcs } from '#/lib/dm-campaign'

export const Route = createFileRoute('/dm/arcs/')({
  head: () => ({
    meta: [{ title: 'Arcs | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ArcsIndex,
})

function ArcsIndex() {
  const sorted = Object.values(arcs).toSorted((a, b) => compareEntityNames(a.name, b.name))
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 content-start gap-4">
        <h1 className="text-3xl font-bold">Arcs</h1>
        {sorted.length === 0 ? (
          <p className="text-muted-foreground">No arcs prepared yet.</p>
        ) : null}
        <ul className="divide-border grid divide-y">
          {sorted.map((arc) => {
            const open = arc.plots.filter((plot) => plot.status === 'open').length
            return (
              <li key={arc.slug} className="grid gap-1 px-1 py-3">
                <span className="flex items-baseline justify-between gap-3">
                  <Link
                    to="/dm/arcs/$slug"
                    params={{ slug: arc.slug }}
                    className="font-medium hover:underline"
                  >
                    {arc.name}
                  </Link>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {open} open of {arc.plots.length} plots
                  </span>
                </span>
                <ContentRenderer content={arc.direction} className="text-muted-foreground" />
              </li>
            )
          })}
        </ul>
      </div>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
