import { createFileRoute } from '@tanstack/react-router'

import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { DmSceneRow } from '#/components/dm/dm-scene-row'
import { EntityReference } from '#/components/entity-reference'
import { campaignEvents, pcs } from '#/lib/campaign'
import { arcs, resolveSourceRef, scenes, table } from '#/lib/dm-campaign'
import { buildDashboard, lastKnownLocations, playedEvent } from '#/lib/dm-dashboard'

export const Route = createFileRoute('/dm/')({
  head: () => ({
    meta: [
      { title: 'DM dashboard | The Lost Hope' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: DmDashboard,
})

function DmDashboard() {
  const party = lastKnownLocations(
    Object.entries(pcs)
      .filter(([, pc]) => pc.status === 'active')
      .map(([key]) => ({ ref: 'pc' as const, key })),
    campaignEvents()
      .toReversed()
      .map(({ data }) => playedEvent(data)),
  )
  const groups = buildDashboard({ table, scenes, arcs, party })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        <h1 className="text-3xl font-bold">Likely scenes</h1>
        {groups.map((group) => {
          const location = resolveSourceRef(group.location)
          return (
            <section
              key={group.location.key}
              className="grid grid-cols-1 gap-1"
              aria-label={location?.name}
            >
              <div className="border-border flex items-center justify-between gap-3 border-b pb-1">
                <EntityReference
                  kind="location"
                  slug={location?.slug ?? ''}
                  className="font-semibold"
                />
                <DmFaces people={group.party} />
              </div>
              {group.scenes.length > 0 ? (
                <ul className="grid grid-cols-1">
                  {group.scenes.map((item) => (
                    <DmSceneRow
                      key={item.key}
                      scene={item.scene}
                      pinned={item.pinned}
                      plots={item.plots}
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground px-1 py-2 text-sm">
                  No scenes selected here yet.
                </p>
              )}
            </section>
          )
        })}
      </div>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
