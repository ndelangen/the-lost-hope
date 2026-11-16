import { Link, createFileRoute } from '@tanstack/react-router'

import { DmOverviewSceneRow } from '#/components/dm/dm-overview-scene-row'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { ArcIcon } from '#/lib/arc-icons'
import { arcs, scenes, table } from '#/lib/dm-campaign'
import { scenesByArc } from '#/lib/dm-scenes-overview'

export const Route = createFileRoute('/dm/scenes/')({
  head: () => ({
    meta: [{ title: 'Scenes | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ScenesIndex,
})

function ScenesIndex() {
  const groups = scenesByArc({ table, scenes, arcs })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        <h1 className="text-3xl font-bold">All scenes</h1>
        {groups.length === 0 ? (
          <p className="text-muted-foreground">No scenes prepared yet.</p>
        ) : null}
        {groups.map((group) => (
          <section key={group.arc?.key ?? 'unlinked'} className="grid grid-cols-1 gap-1">
            <h2 className="border-border flex items-center gap-2 border-b pb-1 font-semibold">
              {group.arc ? (
                <Link
                  to="/dm/arcs/$slug"
                  params={{ slug: group.arc.arc.slug }}
                  className="flex items-center gap-2 hover:underline"
                >
                  <ArcIcon icon={group.arc.arc.icon} className="size-4" />
                  {group.arc.arc.name}
                </Link>
              ) : (
                <span className="text-muted-foreground">Not linked to an arc</span>
              )}
              <span className="text-muted-foreground text-sm font-normal">
                {group.scenes.length}
              </span>
            </h2>
            <ul className="grid grid-cols-1">
              {group.scenes.map((item) => (
                <DmOverviewSceneRow key={item.key} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
