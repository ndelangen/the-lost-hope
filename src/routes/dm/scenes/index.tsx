import { createFileRoute } from '@tanstack/react-router'

import { DmLocationBranch } from '#/components/dm/dm-location-branch'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { arcs, scenes, sourceLocationParent, table } from '#/lib/dm-campaign'
import { buildDashboard } from '#/lib/dm-dashboard'

export const Route = createFileRoute('/dm/scenes/')({
  head: () => ({
    meta: [{ title: 'Scenes | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ScenesIndex,
})

function ScenesIndex() {
  const tree = buildDashboard({
    table: {
      likely: Object.keys(scenes).map((key) => ({ ref: 'scene', key })),
      pinned: table.pinned,
    },
    scenes,
    arcs,
    party: new Map(),
    parentOf: sourceLocationParent,
  })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        <h1 className="text-3xl font-bold">All scenes</h1>
        {tree.length === 0 ? (
          <p className="text-muted-foreground">No scenes prepared yet.</p>
        ) : null}
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
