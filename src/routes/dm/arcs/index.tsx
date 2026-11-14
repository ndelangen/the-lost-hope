import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { z } from 'zod'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { DmStorylineDetail } from '#/components/dm/dm-storyline-detail'
import { DmStorylineGraph } from '#/components/dm/dm-storyline-graph'
import { arcs } from '#/lib/dm-campaign'
import { assignColumns, buildStorylines, campaignSessionsInOrder } from '#/lib/dm-storylines'

export const Route = createFileRoute('/dm/arcs/')({
  validateSearch: z.object({ arc: z.string().optional().catch(undefined) }),
  head: () => ({
    meta: [{ title: 'Arcs | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ArcsIndex,
})

function ArcsIndex() {
  const { arc: selectedSlug } = Route.useSearch()
  const { storylines, sessions, columns } = useMemo(() => {
    const lines = buildStorylines(arcs)
    return { storylines: lines, sessions: campaignSessionsInOrder(), columns: assignColumns(lines) }
  }, [])
  const [hovered, setHovered] = useState<string | undefined>()
  const selected = storylines.find((line) => line.arc.slug === selectedSlug)

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-3">
        <h1 className="text-3xl font-bold">Arcs</h1>
        {storylines.length === 0 ? (
          <p className="text-muted-foreground">No arcs prepared yet.</p>
        ) : (
          <DmStorylineGraph
            storylines={storylines}
            sessions={sessions}
            columns={columns}
            focus={hovered ?? selected?.key}
            onFocus={setHovered}
            selectedSlug={selectedSlug}
          />
        )}
      </div>
      <aside className="order-first grid min-w-0 content-start gap-4 xl:sticky xl:top-20 xl:order-none xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
        <DmQuickLinks stackAt="xl" />
        {selected ? (
          <DmStorylineDetail line={selected} storylines={storylines} />
        ) : (
          <p className="text-muted-foreground text-sm">
            Pick an arc to see where it was played, which arcs it crossed, and where it could go
            next.
          </p>
        )}
      </aside>
    </div>
  )
}
