import { createFileRoute } from '@tanstack/react-router'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { DmSceneRow } from '#/components/dm/dm-scene-row'
import { compareEntityNames } from '#/lib/campaign'
import { arcs, resolveSourceRef, scenes, table } from '#/lib/dm-campaign'
import { plotsByScene } from '#/lib/dm-dashboard'

export const Route = createFileRoute('/dm/scenes/')({
  head: () => ({
    meta: [{ title: 'Scenes | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ScenesIndex,
})

function ScenesIndex() {
  const plots = plotsByScene(arcs)
  const pinned = new Set(table.pinned.map((ref) => ref.key))
  const byLocation = new Map<string, [string, (typeof scenes)[string]][]>()
  for (const entry of Object.entries(scenes)) {
    const group = byLocation.get(entry[1].location.key) ?? []
    group.push(entry)
    byLocation.set(entry[1].location.key, group)
  }
  const locations = [...byLocation.keys()].toSorted((a, b) =>
    compareEntityNames(
      resolveSourceRef({ ref: 'location', key: a })?.name ?? a,
      resolveSourceRef({ ref: 'location', key: b })?.name ?? b,
    ),
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 content-start gap-5">
        <h1 className="text-3xl font-bold">All scenes</h1>
        {locations.length === 0 ? (
          <p className="text-muted-foreground">No scenes prepared yet.</p>
        ) : null}
        {locations.map((locationKey) => (
          <section key={locationKey} className="grid gap-1">
            <h2 className="border-border border-b pb-1 font-semibold">
              {resolveSourceRef({ ref: 'location', key: locationKey })?.name}
            </h2>
            <ul className="grid">
              {byLocation.get(locationKey)!.map(([key, scene]) => (
                <DmSceneRow
                  key={key}
                  scene={scene}
                  pinned={pinned.has(key)}
                  plots={plots.get(key) ?? []}
                />
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
