import { createFileRoute } from '@tanstack/react-router'

import { DmLocationBranch } from '#/components/dm/dm-location-branch'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { campaignEvents, pcs } from '#/lib/campaign'
import { arcs, scenes, sourceLocationParent, table } from '#/lib/dm-campaign'
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
  const tree = buildDashboard({ table, scenes, arcs, party, parentOf: sourceLocationParent })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        <h1 className="text-3xl font-bold">Likely scenes</h1>
        {tree.map((node) => (
          <DmLocationBranch key={node.location.key} node={node} depth={0} />
        ))}
      </div>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
