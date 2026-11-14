import { createFileRoute } from '@tanstack/react-router'

import { DmEffectsPanel } from '#/components/dm/dm-effects-panel'
import { DmLocationBranch } from '#/components/dm/dm-location-branch'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { useEffectLiveState } from '#/components/dm/use-effect-live-state'
import { campaignEvents, campaignToday, liveEffects, pcs } from '#/lib/campaign'
import { arcs, scenes, sourceLocationParent, table } from '#/lib/dm-campaign'
import { buildDashboard, lastKnownLocations, playedEvent } from '#/lib/dm-dashboard'
import {
  closeReminders,
  dismissReminder,
  fireTrigger,
  meetObligation,
  obligationStatuses,
  pendingReminders,
} from '#/lib/effect-reminders'

const effectsInPlay = liveEffects()

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
  const live = useEffectLiveState(campaignToday())

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        {live.state ? (
          <DmEffectsPanel
            state={live.state}
            reminders={pendingReminders(live.state, effectsInPlay)}
            obligations={obligationStatuses(live.state, effectsInPlay)}
            actions={{
              fire: (trigger) => live.update((state) => fireTrigger(state, trigger)),
              dismiss: (id) => live.update((state) => dismissReminder(state, id)),
              close: () => live.update(closeReminders),
              meet: (id) => live.update((state) => meetObligation(state, id)),
              reset: live.reset,
            }}
          />
        ) : null}
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
