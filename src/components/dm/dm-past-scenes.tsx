import { ChevronRight } from 'lucide-react'

import type { OverviewScene } from '#/lib/dm-scenes-overview'

import { DmOverviewSceneRow, DmScenePlots } from './dm-overview-scene-row'
import { DmPlaceTrail } from './dm-place-trail'

/** The scenes the party has left behind, folded away but one click from any scene list. */
export function DmPastScenes({ scenes }: { scenes: readonly OverviewScene[] }) {
  if (scenes.length === 0) return null
  return (
    <details className="border-border group rounded-lg border">
      <summary className="hover:bg-muted/50 flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-lg px-3 font-semibold [&::-webkit-details-marker]:hidden">
        <ChevronRight
          aria-hidden
          className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-90"
        />
        Past scenes
        <span className="text-muted-foreground text-sm font-normal">{scenes.length}</span>
      </summary>
      <ol className="divide-border border-border grid grid-cols-1 divide-y border-t px-1 pb-1">
        {scenes.map((item) => (
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
    </details>
  )
}
