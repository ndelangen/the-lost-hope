import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { campaignEvents, pcs } from '#/lib/campaign'
import { lastKnownLocations, playedEvent } from '#/lib/dm-dashboard'

/** Authoring only exists in local dev; the static build drops the editor and its endpoints. */
const NpcDraftEditor = import.meta.env.DEV
  ? lazy(() =>
      import('#/components/dm/npc-draft-editor').then((module) => ({
        default: module.NpcDraftEditor,
      })),
    )
  : undefined

export const Route = createFileRoute('/dm/npcs/new')({
  head: () => ({
    meta: [{ title: 'New NPC | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: NewNpcRoute,
})

/** Where most of the active party was last seen, as the default home for a new NPC. */
function partyLocation(): string | undefined {
  const party = lastKnownLocations(
    Object.entries(pcs)
      .filter(([, pc]) => pc.status === 'active')
      .map(([key]) => ({ ref: 'pc' as const, key })),
    campaignEvents()
      .toReversed()
      .map(({ data }) => playedEvent(data)),
  )
  const counts = new Map<string, number>()
  for (const location of party.values())
    counts.set(location.key, (counts.get(location.key) ?? 0) + 1)
  return [...counts.entries()].toSorted((a, b) => b[1] - a[1])[0]?.[0]
}

function NewNpcRoute() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 content-start gap-4">
        <h1 className="text-3xl font-bold">New NPC</h1>
        {NpcDraftEditor ? (
          <Suspense fallback={null}>
            <NpcDraftEditor partyLocation={partyLocation()} />
          </Suspense>
        ) : (
          <p className="text-muted-foreground">
            Creating an NPC works in local dev, where Codex can draft it and the app can save it to
            the campaign data.
          </p>
        )}
      </div>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}
