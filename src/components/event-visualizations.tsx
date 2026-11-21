import { Link } from '@tanstack/react-router'
import { Play, Radar } from 'lucide-react'

import type { EventVisualization } from '#/definitions/event'
import { cn } from '#/lib/utils'

const TITLES: Record<EventVisualization['kind'], { title: string; description: string }> = {
  'fleet-battle': {
    title: 'Fleet battle replay',
    description: 'The battle as it played out on the radar, from deployment to the last shot.',
  },
}

/** An event's animated replays: a card for each, linking to the replay's own page. */
export function EventVisualizations({
  eventSlug,
  visualizations,
  className,
}: {
  eventSlug: string
  visualizations: readonly EventVisualization[]
  className?: string
}) {
  if (visualizations.length === 0) return null

  return (
    <div className={cn('grid gap-2', className)}>
      {visualizations.map((visualization) => {
        const { title, description } = TITLES[visualization.kind]
        return (
          <Link
            key={visualization.kind}
            to="/events/replay/$slug"
            params={{ slug: eventSlug }}
            className="group flex items-center gap-4 rounded-xl border border-teal-500/30 bg-[radial-gradient(ellipse_at_left,rgb(20_60_60),rgb(3_10_14)_70%)] p-4 text-left text-teal-100 no-underline transition hover:border-teal-300/60"
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
          </Link>
        )
      })}
    </div>
  )
}
