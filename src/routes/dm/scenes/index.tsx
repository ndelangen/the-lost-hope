import { Link, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { DmOverviewSceneRow, DmScenePlots } from '#/components/dm/dm-overview-scene-row'
import { DmPlaceTrail } from '#/components/dm/dm-place-trail'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { ArcIcon } from '#/lib/arc-icons'
import { arcs, scenes, sourceLocationParent, table } from '#/lib/dm-campaign'
import {
  groupScenesByArc,
  groupScenesByPlace,
  scenesInRunningOrder,
  trailBelow,
} from '#/lib/dm-scenes-overview'
import { cn } from '#/lib/utils'

const LAYOUTS = {
  order: 'Running order',
  arc: 'By arc',
  place: 'By place',
} as const
type Layout = keyof typeof LAYOUTS

export const Route = createFileRoute('/dm/scenes/')({
  head: () => ({
    meta: [{ title: 'Scenes | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  validateSearch: z.object({ layout: z.enum(['order', 'arc', 'place']).optional() }),
  component: ScenesIndex,
})

function ScenesIndex() {
  const { layout = 'order' } = Route.useSearch()
  const all = scenesInRunningOrder({ table, scenes, arcs, parentOf: sourceLocationParent })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-bold">All scenes</h1>
          <nav aria-label="Layout" className="border-border flex rounded-md border p-0.5 text-sm">
            {(Object.keys(LAYOUTS) as Layout[]).map((key) => (
              <Link
                key={key}
                to="/dm/scenes"
                search={{ layout: key }}
                className={cn(
                  'rounded px-3 py-1',
                  key === layout
                    ? 'bg-muted font-medium'
                    : 'text-muted-foreground hover:bg-muted/50',
                )}
              >
                {LAYOUTS[key]}
              </Link>
            ))}
          </nav>
        </div>
        {all.length === 0 ? (
          <p className="text-muted-foreground">No scenes prepared yet.</p>
        ) : layout === 'order' ? (
          <ol className="divide-border grid grid-cols-1 divide-y">
            {all.map((item) => (
              <DmOverviewSceneRow
                key={item.key}
                item={item}
                leading={
                  <span className="text-muted-foreground w-5 shrink-0 text-right text-sm tabular-nums">
                    {item.position}
                  </span>
                }
                detail={
                  <>
                    <DmPlaceTrail trail={item.trail.slice(-1)} className="max-w-[45%] shrink-0" />
                    <span aria-hidden>·</span>
                    <DmScenePlots item={item} />
                  </>
                }
              />
            ))}
          </ol>
        ) : layout === 'arc' ? (
          groupScenesByArc(all).map((group) => (
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
                  <DmOverviewSceneRow
                    key={item.key}
                    item={item}
                    detail={
                      <>
                        <DmPlaceTrail
                          trail={item.trail.slice(-1)}
                          className="max-w-[45%] shrink-0"
                        />
                        <span aria-hidden>·</span>
                        <DmScenePlots item={item} withArc={false} />
                      </>
                    }
                  />
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {groupScenesByPlace(all).map((group) => (
              <section
                key={group.place.key}
                className="border-border grid grid-cols-1 content-start gap-1 rounded-lg border p-3"
              >
                <h2 className="flex items-baseline justify-between gap-2 px-2">
                  <span className="flex min-w-0 items-baseline gap-2">
                    <DmPlaceTrail trail={[group.place]} className="font-semibold" />
                    {group.region.length > 0 ? (
                      <DmPlaceTrail
                        trail={group.region}
                        className="text-muted-foreground text-xs font-normal"
                      />
                    ) : null}
                  </span>
                  <span className="text-muted-foreground text-sm">{group.scenes.length}</span>
                </h2>
                <ul className="grid grid-cols-1">
                  {group.scenes.map((item) => {
                    const below = trailBelow(item, group.place)
                    return (
                      <DmOverviewSceneRow
                        key={item.key}
                        item={item}
                        detail={
                          <>
                            {below.length > 0 ? (
                              <>
                                <DmPlaceTrail
                                  trail={below.slice(-1)}
                                  className="max-w-[45%] shrink-0"
                                />
                                <span aria-hidden>·</span>
                              </>
                            ) : null}
                            <DmScenePlots item={item} />
                          </>
                        }
                      />
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
