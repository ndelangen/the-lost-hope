import { Link } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityReference } from '#/components/entity-reference'
import { ArcIcon } from '#/lib/arc-icons'
import { resolveSourceRef } from '#/lib/dm-campaign'
import type { Storyline } from '#/lib/dm-storylines'

/** Everything about one arc on the map: where it was played, what it crossed, and what is next. */
export function DmStorylineDetail({
  line,
  storylines,
}: {
  line: Storyline
  storylines: readonly Storyline[]
}) {
  const byKey = new Map(storylines.map((other) => [other.key, other]))
  return (
    <section
      className="border-border bg-card grid gap-4 rounded-xl border border-l-4 p-4"
      style={{ borderLeftColor: line.color }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <Link
            to="/dm/arcs/$slug"
            params={{ slug: line.arc.slug }}
            className="flex items-center gap-2 text-xl font-semibold hover:underline"
          >
            <ArcIcon icon={line.arc.icon} className="size-5" />
            {line.arc.name}
          </Link>
          <div className="text-muted-foreground text-sm">
            <ContentRenderer content={line.arc.direction} />
          </div>
        </div>
        <Link
          to="/dm/arcs"
          search={{}}
          resetScroll={false}
          className="text-muted-foreground shrink-0 text-sm hover:underline"
        >
          Close
        </Link>
      </div>
      <ol className="grid gap-3 text-sm">
        {line.next.map((plot) => (
          <li key={plot.slug} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-2">
            <span className="font-semibold" style={{ color: line.color }}>
              Next
            </span>
            <div>
              <p className="font-medium">{plot.name}</p>
              {plot.hook ? (
                <div className="text-muted-foreground">
                  <ContentRenderer content={plot.hook} />
                </div>
              ) : null}
            </div>
          </li>
        ))}
        {line.stops.toReversed().map((stop) => (
          <li key={stop.session} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-2">
            <span className="text-muted-foreground font-mono">S{stop.session}</span>
            <div className="grid gap-0.5">
              <p className="font-medium">
                {stop.plots.join(' · ')}
                {stop.place ? (
                  <span className="text-muted-foreground font-normal">
                    {' '}
                    at {resolveSourceRef({ ref: 'location', key: stop.place })?.name}
                  </span>
                ) : null}
              </p>
              <ul className="grid gap-0.5">
                {stop.events.map((event) => {
                  const record = resolveSourceRef({ ref: 'event', key: event })
                  const crossings = line.crossings.filter((c) => c.events.includes(event))
                  return (
                    <li key={event} className="flex flex-wrap items-center gap-x-2">
                      {record ? <EntityReference kind="event" slug={record.slug} /> : event}
                      {crossings.map((crossing) => {
                        const other = byKey.get(crossing.arcKey)
                        return other ? (
                          <Link
                            key={crossing.arcKey}
                            to="/dm/arcs"
                            search={(prev) => ({ ...prev, arc: other.arc.slug })}
                            resetScroll={false}
                            className="hover:bg-muted flex items-center gap-1 rounded-full border px-1.5 text-xs"
                          >
                            <span
                              className="size-2 rounded-full"
                              style={{ background: other.color }}
                            />
                            also {other.arc.name}
                          </Link>
                        ) : null
                      })}
                    </li>
                  )
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
