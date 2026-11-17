import { createFileRoute } from '@tanstack/react-router'

import { DmEffectsPanel } from '#/components/dm/dm-effects-panel'
import { DmLocationBranch } from '#/components/dm/dm-location-branch'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { DmSceneRow } from '#/components/dm/dm-scene-row'
import { PartyTokens } from '#/components/dm/party-tokens'
import { useEffectLiveState } from '#/components/dm/use-effect-live-state'
import { useTokenCounts } from '#/components/dm/use-token-counts'
import { campaignEvents, campaignToday, liveEffects, pcs } from '#/lib/campaign'
import { arcs, scenes, sourceLocationParent, table, tokens } from '#/lib/dm-campaign'
import { buildDashboard, lastKnownLocations, playedEvent, runningOrder } from '#/lib/dm-dashboard'
import {
  closeReminders,
  dismissReminder,
  effectsEndedAtTable,
  effectsInPlay,
  endEffect,
  fireTrigger,
  meetObligation,
  obligationStatuses,
  pendingReminders,
  restoreEffect,
} from '#/lib/effect-reminders'
import { tokenRows } from '#/lib/pc-tokens'

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
  const order = runningOrder({ table, scenes, arcs })
  const live = useEffectLiveState(campaignToday())
  const candidates = liveEffects()
  const inPlay = live.state ? effectsInPlay(live.state, candidates) : []
  const tokenCounts = useTokenCounts(tokenRows(pcs, tokens))

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-5">
        {live.state ? (
          <DmEffectsPanel
            state={live.state}
            effects={inPlay}
            endedEffects={effectsEndedAtTable(live.state, candidates)}
            reminders={pendingReminders(live.state, inPlay)}
            obligations={obligationStatuses(live.state, inPlay)}
            actions={{
              fire: (trigger) => live.update((state) => fireTrigger(state, trigger)),
              dismiss: (id) => live.update((state) => dismissReminder(state, id)),
              close: () => live.update(closeReminders),
              meet: (id) => live.update((state) => meetObligation(state, id)),
              end: (slug) => live.update((state) => endEffect(state, slug)),
              restore: (slug) => live.update((state) => restoreEffect(state, slug)),
              reset: live.reset,
            }}
          />
        ) : null}
        <h1 className="text-3xl font-bold">Running order</h1>
        {order.length > 0 ? (
          <ol className="marker:text-muted-foreground grid list-decimal grid-cols-1 pl-6 marker:font-semibold">
            {order.map((item) => (
              <DmSceneRow
                key={item.key}
                scene={item.scene}
                pinned={item.pinned}
                plots={item.plots}
              />
            ))}
          </ol>
        ) : (
          <p className="text-muted-foreground">No likely scenes selected yet.</p>
        )}
        <PartyTokens
          rows={tokenCounts.rows}
          onAdjust={import.meta.env.DEV ? (...step) => void tokenCounts.adjust(...step) : undefined}
          error={tokenCounts.error}
        />
        <h2 className="text-xl font-bold">By location</h2>
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
