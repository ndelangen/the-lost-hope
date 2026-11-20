import type { OverviewScene } from '#/lib/dm-scenes-overview'

import { DmOverviewSceneRow, DmScenePlots } from './dm-overview-scene-row'
import { DmPlaceTrail } from './dm-place-trail'

/** The scenes written and ready to run that no session has been chosen for yet. */
export function DmReadyScenes({ scenes }: { scenes: readonly OverviewScene[] }) {
  if (scenes.length === 0) return null
  return (
    <section aria-labelledby="ready-scenes" className="grid grid-cols-1 gap-1">
      <h2
        id="ready-scenes"
        className="border-border flex items-baseline gap-2 border-b pb-1 text-xl font-bold"
      >
        Ready for session
        <span className="text-muted-foreground text-sm font-normal">{scenes.length}</span>
      </h2>
      <ul className="divide-border grid grid-cols-1 divide-y">
        {scenes.map((item) => (
          <DmOverviewSceneRow
            key={item.key}
            item={item}
            detail={
              <>
                <DmPlaceTrail trail={item.trail.slice(-1)} className="max-w-[45%] shrink-0" />
                <span aria-hidden>·</span>
                <DmScenePlots item={item} />
              </>
            }
          />
        ))}
      </ul>
    </section>
  )
}
