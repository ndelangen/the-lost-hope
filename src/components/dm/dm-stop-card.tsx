import { ArcIcon } from '#/lib/arc-icons'
import { resolveSourceRef } from '#/lib/dm-campaign'
import type { Storyline } from '#/lib/dm-storylines'

/** What an arc did in one session, or what could come next, shown beside the hovered station. */
export function DmStopCard({
  line,
  session,
  x,
  y,
}: {
  line: Storyline
  session?: number
  x: number
  y: number
}) {
  const stop = line.stops.find((s) => s.session === session)
  return (
    <div
      className="border-border bg-card pointer-events-none absolute z-10 grid w-72 gap-1 rounded-lg border p-3 text-sm shadow-lg"
      style={{ left: x + 16, top: y - 12 }}
    >
      <p className="flex items-center gap-1.5 font-semibold" style={{ color: line.color }}>
        <ArcIcon icon={line.arc.icon} />
        {line.arc.name}
      </p>
      {session === undefined ? (
        line.next.map((plot) => (
          <p key={plot.slug}>
            <span className="font-medium">Next:</span> {plot.name}
          </p>
        ))
      ) : (
        <>
          <p className="text-muted-foreground text-xs">
            S{session} · {stop?.plots.join(' · ')}
          </p>
          <ul className="grid gap-0.5">
            {stop?.events.slice(0, 6).map((event) => (
              <li key={event} className="truncate">
                {resolveSourceRef({ ref: 'event', key: event })?.name ?? event}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
