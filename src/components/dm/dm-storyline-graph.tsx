import { Link } from '@tanstack/react-router'

import { resolveSourceRef } from '#/lib/dm-campaign'
import type { Storyline, StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

const COLUMN = 14
const ROW = 28
const LINE = 3

type Props = {
  storylines: readonly Storyline[]
  sessions: readonly StorylineSession[]
  columns: ReadonlyMap<string, number>
  focus: string | undefined
  onFocus: (key: string | undefined) => void
  selectedSlug: string | undefined
}

type Row =
  | { kind: 'header'; key: string; session?: StorylineSession }
  | {
      kind: 'stop'
      key: string
      line: Storyline
      session?: number
      detail: string
      merges: string[]
    }

/**
 * Arcs as a git graph. Rows run newest first: what could happen next, then each session with one
 * row per arc played in it. Every arc is a coloured line in its own column, with a dot on each row
 * it was played in. A short branch joins two arcs that share an event, and the line is dashed
 * above an arc's latest session while it still has open plots.
 */
export function DmStorylineGraph({
  storylines,
  sessions,
  columns,
  focus,
  onFocus,
  selectedSlug,
}: Props) {
  const rows: Row[] = [{ kind: 'header', key: 'next' }]
  for (const line of storylines) {
    if (line.next.length === 0) continue
    rows.push({
      kind: 'stop',
      key: `next:${line.key}`,
      line,
      detail: line.next.map((plot) => plot.name).join(' · '),
      merges: [],
    })
  }
  for (const session of sessions.toReversed()) {
    rows.push({ kind: 'header', key: session.key, session })
    const here = storylines.filter((line) => line.stops.some((s) => s.session === session.number))
    for (const [position, line] of here.entries()) {
      const stop = line.stops.find((s) => s.session === session.number)!
      rows.push({
        kind: 'stop',
        key: `${session.number}:${line.key}`,
        line,
        session: session.number,
        detail: stop.plots.join(' · '),
        // Draw each shared event once, from the arc listed first in this session.
        merges: line.crossings
          .filter((crossing) => crossing.events.some((event) => stop.events.includes(event)))
          .map((crossing) => crossing.arcKey)
          .filter((other) => here.findIndex((l) => l.key === other) > position),
      })
    }
  }

  const spans = storylines.map((line) => {
    const isLine = (row: Row) => row.kind === 'stop' && row.line.key === line.key
    return {
      line,
      top: rows.findIndex(isLine),
      latest: rows.findIndex(
        (row) => isLine(row) && row.kind === 'stop' && row.session !== undefined,
      ),
      bottom: rows.findLastIndex(isLine),
    }
  })

  const related = new Set(
    storylines.find((line) => line.key === focus)?.crossings.map((crossing) => crossing.arcKey),
  )
  const faded = (key: string) => focus !== undefined && focus !== key && !related.has(key)
  const width = (Math.max(0, ...columns.values()) + 1) * COLUMN
  const x = (key: string) => columns.get(key)! * COLUMN + COLUMN / 2
  const y = (index: number) => index * ROW + ROW / 2

  return (
    <div className="flex gap-3">
      <svg width={width} height={rows.length * ROW} className="shrink-0" aria-hidden>
        {spans.map(({ line, top, latest, bottom }) =>
          top === -1 ? null : (
            <g key={line.key} opacity={faded(line.key) ? 0.12 : 1}>
              {latest > top ? (
                <line
                  x1={x(line.key)}
                  x2={x(line.key)}
                  y1={y(top)}
                  y2={y(latest)}
                  stroke={line.color}
                  strokeWidth={LINE}
                  strokeDasharray="4 4"
                />
              ) : null}
              <line
                x1={x(line.key)}
                x2={x(line.key)}
                y1={y(Math.max(top, latest))}
                y2={y(bottom)}
                stroke={line.color}
                strokeWidth={focus === line.key ? LINE + 2 : LINE}
              />
            </g>
          ),
        )}
        {rows.map((row, index) =>
          row.kind === 'stop'
            ? row.merges.map((other) => (
                <path
                  key={`${row.key}-${other}`}
                  d={`M ${x(row.line.key)} ${y(index)} Q ${x(other)} ${y(index)}, ${x(other)} ${y(index) + ROW}`}
                  fill="none"
                  stroke={row.line.color}
                  strokeWidth={LINE}
                  opacity={focus && focus !== row.line.key && focus !== other ? 0.12 : 1}
                />
              ))
            : null,
        )}
        {rows.map((row, index) =>
          row.kind === 'stop' ? (
            <circle
              key={row.key}
              cx={x(row.line.key)}
              cy={y(index)}
              r={5}
              className="fill-card"
              stroke={row.line.color}
              strokeWidth={3}
              strokeDasharray={row.session === undefined ? '3 2' : undefined}
              opacity={faded(row.line.key) ? 0.12 : 1}
            />
          ) : null,
        )}
      </svg>
      <ol className="min-w-0 flex-1">
        {rows.map((row) =>
          row.kind === 'header' ? (
            <li key={row.key} className="flex items-end pb-1 text-xs" style={{ height: ROW }}>
              {row.session ? (
                <Link
                  to="/sessions/detail/$slug"
                  params={{
                    slug: resolveSourceRef({ ref: 'session', key: row.session.key })?.slug ?? '',
                  }}
                  className="text-muted-foreground truncate hover:underline"
                >
                  <span className="font-mono">S{row.session.number}</span> · {row.session.name}
                </Link>
              ) : (
                <span className="font-semibold">Next</span>
              )}
            </li>
          ) : (
            <li key={row.key} style={{ height: ROW }} className="flex items-center">
              <ArcLine
                line={row.line}
                detail={row.detail}
                faded={faded(row.line.key)}
                selected={row.line.arc.slug === selectedSlug}
                onFocus={onFocus}
              />
            </li>
          ),
        )}
      </ol>
    </div>
  )
}

function ArcLine({
  line,
  detail,
  faded,
  selected,
  onFocus,
}: {
  line: Storyline
  detail: string
  faded: boolean
  selected: boolean
  onFocus: (key: string | undefined) => void
}) {
  return (
    <Link
      to="/dm/arcs"
      search={{ arc: selected ? undefined : line.arc.slug }}
      resetScroll={false}
      onMouseEnter={() => onFocus(line.key)}
      onMouseLeave={() => onFocus(undefined)}
      onFocus={() => onFocus(line.key)}
      onBlur={() => onFocus(undefined)}
      className={cn(
        'hover:bg-muted/60 flex w-full min-w-0 items-baseline gap-2 rounded px-1 text-sm transition-opacity',
        faded && 'opacity-30',
        selected && 'bg-muted',
      )}
    >
      <span className="max-w-[60%] shrink-0 truncate font-medium" style={{ color: line.color }}>
        {line.arc.name}
      </span>
      <span className="text-muted-foreground truncate">{detail}</span>
    </Link>
  )
}
