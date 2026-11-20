import { Play, Radar, X } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import type { EventVisualization } from '#/definitions/event'
import { cn } from '#/lib/utils'

const FleetBattleOnScreen = lazy(() =>
  import('#/components/player-screen/fleet-battle-on-screen').then((module) => ({
    default: module.FleetBattleOnScreen,
  })),
)

const TITLES: Record<EventVisualization['kind'], { title: string; description: string }> = {
  'fleet-battle': {
    title: 'Fleet battle replay',
    description: 'The battle as it played out on the radar, from deployment to the last shot.',
  },
}

/** An event's animated replays: a card for each that plays it full screen. */
export function EventVisualizations({
  visualizations,
  className,
}: {
  visualizations: readonly EventVisualization[]
  className?: string
}) {
  const [playing, setPlaying] = useState<EventVisualization>()
  if (visualizations.length === 0) return null

  return (
    <div className={cn('grid gap-2', className)}>
      {visualizations.map((visualization, index) => {
        const { title, description } = TITLES[visualization.kind]
        return (
          <button
            // oxlint-disable-next-line react/no-array-index-key -- replays have no other identity
            key={index}
            type="button"
            onClick={() => setPlaying(visualization)}
            className="group flex items-center gap-4 rounded-xl border border-teal-500/30 bg-[radial-gradient(ellipse_at_left,rgb(20_60_60),rgb(3_10_14)_70%)] p-4 text-left text-teal-100 transition hover:border-teal-300/60"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-teal-400/15 ring-1 ring-teal-300/40 transition group-hover:bg-teal-400/25">
              <Play className="size-5 translate-x-0.5" aria-hidden />
            </span>
            <span className="grid gap-0.5">
              <span className="flex items-center gap-2 font-mono text-sm font-semibold tracking-widest uppercase">
                <Radar className="size-4" aria-hidden />
                {title}
              </span>
              <span className="text-sm text-teal-100/70">{description}</span>
            </span>
          </button>
        )
      })}
      {playing ? (
        <ReplayOverlay visualization={playing} onClose={() => setPlaying(undefined)} />
      ) : null}
    </div>
  )
}

/** A replay filling the window above everything else, closed with its button or Escape. */
function ReplayOverlay({
  visualization,
  onClose,
}: {
  visualization: EventVisualization
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    dialog.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialog}
      aria-label={TITLES[visualization.kind].title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none border-0 bg-black p-0 text-white backdrop:bg-black"
    >
      <Suspense fallback={null}>
        <FleetBattleOnScreen owner={visualization.fleet.key} />
      </Suspense>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close the replay"
        className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
      >
        <X className="size-5" aria-hidden />
      </button>
    </dialog>
  )
}
