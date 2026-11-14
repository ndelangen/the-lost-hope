import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { z } from 'zod'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityReference } from '#/components/entity-reference'
import { arcs } from '#/lib/dm-campaign'
import { cn } from '#/lib/utils'

import {
  type Storyline,
  buildStorylines,
  eventName,
  eventSlug,
  lanesInOrder,
  locationName,
  sessionColumns,
} from './-storylines-model'

/** Prototype: three ways to see where the arcs went, where they crossed, and where they lead. */
export const Route = createFileRoute('/dm/storylines')({
  validateSearch: z.object({ layout: z.enum(['a', 'b', 'c']).catch('a') }),
  head: () => ({
    meta: [
      { title: 'Storylines (prototype) | DM' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: StorylinesPrototype,
})

const LAYOUTS = [
  { id: 'a', label: 'A · Subway map' },
  { id: 'b', label: 'B · Lanes by place' },
  { id: 'c', label: 'C · Arc cards' },
] as const

function StorylinesPrototype() {
  const { layout } = Route.useSearch()
  const storylines = useMemo(() => buildStorylines(arcs), [])
  const [selected, setSelected] = useState<string | undefined>()
  const [hovered, setHovered] = useState<string | undefined>()
  const focus = hovered ?? selected
  const selectedLine = storylines.find((line) => line.key === selected)
  const props = { storylines, focus, onHover: setHovered, onSelect: setSelected }

  return (
    <div className="grid min-w-0 grid-cols-1 content-start gap-4">
      <div className="grid min-w-0 grid-cols-1 content-start gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-3xl font-bold">Storylines</h1>
          <nav className="flex flex-wrap gap-1 text-sm">
            {LAYOUTS.map((option) => (
              <Link
                key={option.id}
                to="/dm/storylines"
                search={{ layout: option.id }}
                className={cn(
                  'rounded-md border px-2 py-1',
                  layout === option.id ? 'bg-foreground text-background' : 'hover:bg-muted',
                )}
              >
                {option.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-muted-foreground text-sm">
          Prototype. Hover a storyline to follow it, click to pin it and read the details below.
        </p>
        {layout === 'a' ? <SubwayMap {...props} /> : null}
        {layout === 'b' ? <PlaceLanes {...props} /> : null}
        {layout === 'c' ? <ArcCards {...props} /> : null}
        {selectedLine && layout !== 'c' ? (
          <StorylineDetail line={selectedLine} storylines={storylines} onSelect={setSelected} />
        ) : null}
      </div>
    </div>
  )
}

type ViewProps = {
  storylines: Storyline[]
  focus: string | undefined
  onHover: (key: string | undefined) => void
  onSelect: (key: string | undefined) => void
}

const dim = (focus: string | undefined, key: string, related?: Set<string>) =>
  focus !== undefined && focus !== key && !related?.has(key)

function relatedTo(storylines: Storyline[], focus: string | undefined) {
  const line = storylines.find((l) => l.key === focus)
  return new Set(line?.crossings.map((c) => c.arcKey) ?? [])
}

/* ---------------------------------------------------------------- A: subway map */

function SubwayMap({ storylines, focus, onHover, onSelect }: ViewProps) {
  const COL = 40
  const ROW = 30
  const LEFT = 260
  const TOP = 36
  const columns = sessionColumns.length + 1
  const width = LEFT + columns * COL + 20
  const height = TOP + storylines.length * ROW + 10
  const x = (session: number) => LEFT + (session - 1) * COL + COL / 2
  const xNext = LEFT + sessionColumns.length * COL + COL / 2
  const y = (index: number) => TOP + index * ROW + ROW / 2
  const indexOf = new Map(storylines.map((line, index) => [line.key, index]))
  const related = relatedTo(storylines, focus)

  // One connector per pair of arcs per session where they share an event.
  const interchanges: { session: number; a: string; b: string; events: string[] }[] = []
  for (const line of storylines) {
    for (const crossing of line.crossings) {
      if ((indexOf.get(crossing.arcKey) ?? 0) <= (indexOf.get(line.key) ?? 0)) continue
      for (const stop of line.stops) {
        const shared = stop.events.filter((event) => crossing.events.includes(event))
        if (shared.length > 0)
          interchanges.push({
            session: stop.session,
            a: line.key,
            b: crossing.arcKey,
            events: shared,
          })
      }
    }
  }

  return (
    <div className="border-border bg-card overflow-x-auto rounded-xl border">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        className="block min-w-[56rem]"
        onMouseLeave={() => onHover(undefined)}
      >
        {sessionColumns.map((session) => (
          <g key={session.key}>
            <line
              x1={x(session.number)}
              x2={x(session.number)}
              y1={TOP - 6}
              y2={height}
              className="stroke-border"
              strokeDasharray="2 4"
            />
            <text
              x={x(session.number)}
              y={TOP - 14}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              <title>{session.name}</title>S{session.number}
            </text>
          </g>
        ))}
        <text
          x={xNext}
          y={TOP - 14}
          textAnchor="middle"
          className="fill-foreground text-[11px] font-semibold"
        >
          Next
        </text>

        {interchanges.map((ix) => {
          const ya = y(indexOf.get(ix.a)!)
          const yb = y(indexOf.get(ix.b)!)
          const lit = focus === ix.a || focus === ix.b
          return (
            <g key={`${ix.a}-${ix.b}-${ix.session}`} opacity={focus && !lit ? 0.1 : 1}>
              <title>{ix.events.map(eventName).join('\n')}</title>
              <line
                x1={x(ix.session)}
                x2={x(ix.session)}
                y1={ya}
                y2={yb}
                stroke="currentColor"
                className="text-foreground/40"
                strokeWidth={lit ? 6 : 4}
                strokeLinecap="round"
              />
            </g>
          )
        })}

        {storylines.map((line, index) => {
          const faded = dim(focus, line.key, related)
          const cy = y(index)
          return (
            <g
              key={line.key}
              opacity={faded ? 0.12 : 1}
              onMouseEnter={() => onHover(line.key)}
              onClick={() => onSelect(line.key)}
              className="cursor-pointer"
            >
              <rect x={0} y={cy - ROW / 2} width={width} height={ROW} fill="transparent" />
              <text
                x={LEFT - 12}
                y={cy + 4}
                textAnchor="end"
                className="fill-foreground text-[12px]"
              >
                {line.arc.name}
              </text>
              {line.stops.length > 0 ? (
                <line
                  x1={x(line.first)}
                  x2={x(line.last)}
                  y1={cy}
                  y2={cy}
                  stroke={line.color}
                  strokeWidth={focus === line.key ? 6 : 4}
                  strokeLinecap="round"
                />
              ) : null}
              {line.next.length > 0 ? (
                <>
                  <line
                    x1={line.stops.length > 0 ? x(line.last) : xNext}
                    x2={xNext}
                    y1={cy}
                    y2={cy}
                    stroke={line.color}
                    strokeWidth={3}
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx={xNext}
                    cy={cy}
                    r={8}
                    className="fill-card"
                    stroke={line.color}
                    strokeWidth={2}
                    strokeDasharray="3 2"
                  >
                    <title>{line.next.map((plot) => plot.name).join('\n')}</title>
                  </circle>
                  <text
                    x={xNext}
                    y={cy + 4}
                    textAnchor="middle"
                    className="text-[10px]"
                    fill={line.color}
                  >
                    {line.next.length}
                  </text>
                </>
              ) : null}
              {line.stops.map((stop) => (
                <circle
                  key={stop.session}
                  cx={x(stop.session)}
                  cy={cy}
                  r={Math.min(4 + stop.events.length, 10)}
                  className="fill-card"
                  stroke={line.color}
                  strokeWidth={3}
                >
                  <title>
                    {`S${stop.session} · ${locationName(stop.lane)}\n${stop.plots.join('\n')}`}
                  </title>
                </circle>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ---------------------------------------------------------------- B: lanes by place */

function PlaceLanes({ storylines, focus, onHover, onSelect }: ViewProps) {
  const COL = 52
  const LEFT = 170
  const TOP = 36
  const GAP = 6
  const lanes = lanesInOrder(storylines)
  const related = relatedTo(storylines, focus)

  // Who is in each lane in each session, so threads that meet bundle together.
  const cell = new Map<string, string[]>()
  storylines.forEach((line) => {
    for (const stop of line.stops) {
      const key = `${stop.lane}:${stop.session}`
      cell.set(key, [...(cell.get(key) ?? []), line.key])
    }
  })
  const laneHeight = new Map(
    lanes.map((lane) => {
      let most = 1
      for (const session of sessionColumns) {
        most = Math.max(most, cell.get(`${lane.key}:${session.number}`)?.length ?? 0)
      }
      return [lane.key, Math.max(30, most * GAP + 18)]
    }),
  )
  const laneTop = new Map<string, number>()
  let cursor = TOP
  for (const lane of lanes) {
    laneTop.set(lane.key, cursor)
    cursor += laneHeight.get(lane.key)!
  }
  const height = cursor + 10
  const width = LEFT + (sessionColumns.length + 1) * COL + 20
  const x = (session: number) => LEFT + (session - 1) * COL + COL / 2
  const xNext = LEFT + sessionColumns.length * COL + COL / 2
  const yAt = (lane: string, session: number, key: string) => {
    const members = cell.get(`${lane}:${session}`) ?? [key]
    const index = Math.max(0, members.indexOf(key))
    const top = laneTop.get(lane)!
    const middle = top + laneHeight.get(lane)! / 2
    return middle + (index - (members.length - 1) / 2) * GAP
  }

  return (
    <div className="border-border bg-card overflow-x-auto rounded-xl border">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        className="block min-w-[56rem]"
        onMouseLeave={() => onHover(undefined)}
      >
        {lanes.map((lane, index) => (
          <g key={lane.key}>
            <rect
              x={0}
              y={laneTop.get(lane.key)}
              width={width}
              height={laneHeight.get(lane.key)}
              className={index % 2 === 0 ? 'fill-muted/40' : 'fill-transparent'}
            />
            <text
              x={LEFT - 10}
              y={laneTop.get(lane.key)! + laneHeight.get(lane.key)! / 2 + 4}
              textAnchor="end"
              className="fill-muted-foreground text-[11px]"
            >
              {lane.name}
            </text>
          </g>
        ))}
        {sessionColumns.map((session) => (
          <text
            key={session.key}
            x={x(session.number)}
            y={TOP - 14}
            textAnchor="middle"
            className="fill-muted-foreground text-[11px]"
          >
            <title>{session.name}</title>S{session.number}
          </text>
        ))}
        <text
          x={xNext}
          y={TOP - 14}
          textAnchor="middle"
          className="fill-foreground text-[11px] font-semibold"
        >
          Next
        </text>

        {storylines.map((line) => {
          const points = line.stops.map((stop) => ({
            x: x(stop.session),
            y: yAt(stop.lane, stop.session, line.key),
            stop,
          }))
          const path = points
            .map((p, i) => {
              if (i === 0) return `M ${p.x} ${p.y}`
              const prev = points[i - 1]!
              const mid = (prev.x + p.x) / 2
              return `C ${mid} ${prev.y}, ${mid} ${p.y}, ${p.x} ${p.y}`
            })
            .join(' ')
          const last = points.at(-1)
          const faded = dim(focus, line.key, related)
          return (
            <g
              key={line.key}
              opacity={faded ? 0.1 : 1}
              onMouseEnter={() => onHover(line.key)}
              onClick={() => onSelect(line.key)}
              className="cursor-pointer"
            >
              <title>{line.arc.name}</title>
              <path d={path} fill="none" stroke="transparent" strokeWidth={12} />
              <path
                d={path}
                fill="none"
                stroke={line.color}
                strokeWidth={focus === line.key ? 4 : 2.5}
              />
              {last && line.next.length > 0 ? (
                <path
                  d={`M ${last.x} ${last.y} L ${xNext} ${last.y}`}
                  stroke={line.color}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              ) : null}
              {points.map((p) => (
                <circle key={p.stop.session} cx={p.x} cy={p.y} r={3} fill={line.color}>
                  <title>{`${line.arc.name}\nS${p.stop.session} · ${locationName(p.stop.lane)}\n${p.stop.plots.join('\n')}`}</title>
                </circle>
              ))}
              {focus === line.key && points[0] ? (
                <text
                  x={points[0].x}
                  y={points[0].y - 8}
                  className="text-[12px] font-semibold"
                  fill={line.color}
                >
                  {line.arc.name}
                </text>
              ) : null}
            </g>
          )
        })}
      </svg>
      <Legend storylines={storylines} focus={focus} onHover={onHover} onSelect={onSelect} />
    </div>
  )
}

function Legend({ storylines, focus, onHover, onSelect }: ViewProps) {
  return (
    <ul className="border-border flex flex-wrap gap-x-4 gap-y-1 border-t p-3 text-xs">
      {storylines.map((line) => (
        <li key={line.key}>
          <button
            type="button"
            onMouseEnter={() => onHover(line.key)}
            onMouseLeave={() => onHover(undefined)}
            onClick={() => onSelect(line.key)}
            className={cn('flex items-center gap-1.5', focus && focus !== line.key && 'opacity-40')}
          >
            <span className="size-2.5 rounded-full" style={{ background: line.color }} />
            {line.arc.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

/* ---------------------------------------------------------------- C: arc cards */

function ArcCards({ storylines, focus, onSelect }: Omit<ViewProps, 'onHover'>) {
  const byKey = new Map(storylines.map((line) => [line.key, line]))
  const sorted = storylines.toSorted((a, b) => b.next.length - a.next.length || b.last - a.last)
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {sorted.map((line) => (
        <li
          key={line.key}
          className={cn(
            'border-border bg-card grid content-start gap-3 rounded-xl border border-l-4 p-4 transition-opacity',
            focus &&
              focus !== line.key &&
              !line.crossings.some((c) => c.arcKey === focus) &&
              'opacity-40',
          )}
          style={{ borderLeftColor: line.color }}
        >
          <div className="grid gap-1">
            <Link
              to="/dm/arcs/$slug"
              params={{ slug: line.arc.slug }}
              className="font-semibold hover:underline"
            >
              {line.arc.name}
            </Link>
            <div className="text-muted-foreground text-sm">
              <ContentRenderer content={line.arc.direction} />
            </div>
          </div>
          <SessionStrip line={line} />
          {line.next.length > 0 ? (
            <div className="grid gap-1">
              <p className="text-xs font-semibold uppercase">Next</p>
              {line.next.map((plot) => (
                <div key={plot.slug} className="bg-muted/50 rounded-md p-2 text-sm">
                  <p className="font-medium">{plot.name}</p>
                  {plot.hook ? (
                    <div className="text-muted-foreground">
                      <ContentRenderer content={plot.hook} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-xs">
              No open plots: this storyline has run its course.
            </p>
          )}
          {line.crossings.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1 text-xs">
              <span className="text-muted-foreground">Crosses</span>
              {line.crossings.map((crossing) => {
                const other = byKey.get(crossing.arcKey)
                return other ? (
                  <button
                    type="button"
                    key={crossing.arcKey}
                    onClick={() => onSelect(crossing.arcKey)}
                    title={crossing.events.map(eventName).join('\n')}
                    className="flex items-center gap-1 rounded-full border px-2 py-0.5"
                  >
                    <span className="size-2 rounded-full" style={{ background: other.color }} />
                    {other.arc.name}
                  </button>
                ) : null
              })}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function SessionStrip({ line }: { line: Storyline }) {
  const bySession = new Map(line.stops.map((stop) => [stop.session, stop]))
  return (
    <div className="flex items-center gap-0.5">
      {sessionColumns.map((session) => {
        const stop = bySession.get(session.number)
        const running = session.number > line.first && session.number < line.last
        return (
          <span
            key={session.key}
            title={stop ? `S${session.number} · ${stop.plots.join(', ')}` : `S${session.number}`}
            className={cn('h-3 flex-1 rounded-sm', !stop && (running ? 'bg-muted' : 'bg-muted/30'))}
            style={stop ? { background: line.color } : undefined}
          />
        )
      })}
      <span
        title="Next"
        className="ml-1 h-3 w-6 rounded-sm border border-dashed"
        style={line.next.length > 0 ? { borderColor: line.color } : undefined}
      />
    </div>
  )
}

/* ---------------------------------------------------------------- shared detail */

function StorylineDetail({
  line,
  storylines,
  onSelect,
}: {
  line: Storyline
  storylines: Storyline[]
  onSelect: (key: string | undefined) => void
}) {
  const byKey = new Map(storylines.map((l) => [l.key, l]))
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
            className="text-xl font-semibold hover:underline"
          >
            {line.arc.name}
          </Link>
          <div className="text-muted-foreground text-sm">
            <ContentRenderer content={line.arc.direction} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSelect(undefined)}
          className="text-muted-foreground text-sm"
        >
          Close
        </button>
      </div>
      <ol className="grid gap-2 text-sm">
        {line.stops.map((stop) => (
          <li key={stop.session} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-2">
            <span className="text-muted-foreground font-mono">S{stop.session}</span>
            <div className="grid gap-0.5">
              <p className="font-medium">
                {stop.plots.join(' · ')}{' '}
                <span className="text-muted-foreground font-normal">
                  at {locationName(stop.lane)}
                </span>
              </p>
              <ul className="text-muted-foreground grid">
                {stop.events.map((event) => {
                  const slug = eventSlug(event)
                  const others = line.crossings.filter((c) => c.events.includes(event))
                  return (
                    <li key={event} className="flex flex-wrap items-center gap-2">
                      {slug ? <EntityReference kind="event" slug={slug} /> : eventName(event)}
                      {others.map((crossing) => {
                        const other = byKey.get(crossing.arcKey)
                        return other ? (
                          <button
                            type="button"
                            key={crossing.arcKey}
                            onClick={() => onSelect(crossing.arcKey)}
                            className="flex items-center gap-1 rounded-full border px-1.5 text-xs"
                          >
                            <span
                              className="size-2 rounded-full"
                              style={{ background: other.color }}
                            />
                            also {other.arc.name}
                          </button>
                        ) : null
                      })}
                    </li>
                  )
                })}
              </ul>
            </div>
          </li>
        ))}
        {line.next.map((plot) => (
          <li key={plot.slug} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-2">
            <span className="font-mono font-semibold" style={{ color: line.color }}>
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
      </ol>
    </section>
  )
}
