/* oxlint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- prototype only */
import { useState } from 'react'

import { DmFaces } from '#/components/dm/dm-faces'
import { ArcIcon, resolveArcIcon } from '#/lib/arc-icons'
import { resolveSourceRef } from '#/lib/dm-campaign'
import type { StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

import { type LabLine, eventName } from './-lab-model'

const COLUMN = 18
const ROW = 28
const LINE = 3

export type LabOptions = {
  interchange: 'curve' | 'pill'
  density: 'arc' | 'session'
  branchParents?: ReadonlyMap<string, string>
  hoverCards: boolean
  /** Who mode: group people by where they ended each session instead of by shared events. */
  clusterBy?: 'event' | 'place'
}

type Row = {
  key: string
  kind: 'header' | 'stations'
  session?: StorylineSession
  lines: LabLine[]
  clusters: string[][]
  merges: [string, string][]
  detail: string
}

function clustersByPlace(lines: readonly LabLine[], session: number): string[][] {
  const groups = new Map<string, string[]>()
  for (const line of lines) {
    const place = line.stops.find((s) => s.session === session)?.place ?? ''
    groups.set(place, [...(groups.get(place) ?? []), line.key])
  }
  return [...groups.values()]
}

function clustersOf(lines: readonly LabLine[], session: number): string[][] {
  const parent = new Map(lines.map((line) => [line.key, line.key]))
  const find = (key: string): string => {
    const up = parent.get(key)!
    return up === key ? key : find(up)
  }
  for (const line of lines) {
    const stop = line.stops.find((s) => s.session === session)
    for (const crossing of line.crossings) {
      if (!parent.has(crossing.arcKey)) continue
      if (crossing.events.some((event) => stop?.events.includes(event))) {
        parent.set(find(line.key), find(crossing.arcKey))
      }
    }
  }
  const groups = new Map<string, string[]>()
  for (const line of lines)
    groups.set(find(line.key), [...(groups.get(find(line.key)) ?? []), line.key])
  return [...groups.values()]
}

export function LabGraph({
  lines,
  sessions,
  columns,
  options,
  onSelect,
  selected,
}: {
  lines: readonly LabLine[]
  sessions: readonly StorylineSession[]
  columns: ReadonlyMap<string, number>
  options: LabOptions
  onSelect: (line: LabLine) => void
  selected?: string
}) {
  const [hover, setHover] = useState<string | undefined>()
  const [card, setCard] = useState<{ line: LabLine; session?: number; x: number; y: number }>()
  const byKey = new Map(lines.map((line) => [line.key, line]))
  const open = lines.filter((line) => line.next.length > 0)

  const rows: Row[] = []
  const stationRow = (
    key: string,
    session: StorylineSession | undefined,
    members: LabLine[],
    merges: [string, string][] = [],
  ): Row => ({
    key,
    kind: 'stations',
    session,
    lines: members,
    clusters:
      session && options.interchange === 'pill'
        ? (options.clusterBy === 'place' ? clustersByPlace : clustersOf)(members, session.number)
        : members.map((m) => [m.key]),
    merges,
    detail:
      session === undefined
        ? members.map((m) => m.next.map((p) => p.name).join(' · ')).join(' · ')
        : [
            ...new Set(
              members.flatMap(
                (m) => m.stops.find((s) => s.session === session.number)?.plots ?? [],
              ),
            ),
          ].join(' · '),
  })

  if (options.density === 'session') {
    if (open.length > 0) rows.push(stationRow('next', undefined, open))
    for (const session of sessions.toReversed()) {
      const here = lines.filter((line) => line.stops.some((s) => s.session === session.number))
      rows.push(stationRow(session.key, session, here))
    }
  } else {
    rows.push({ key: 'h:next', kind: 'header', lines: [], clusters: [], merges: [], detail: '' })
    for (const line of open) rows.push(stationRow(`next:${line.key}`, undefined, [line]))
    for (const session of sessions.toReversed()) {
      rows.push({
        key: `h:${session.key}`,
        kind: 'header',
        session,
        lines: [],
        clusters: [],
        merges: [],
        detail: '',
      })
      const here = lines.filter((line) => line.stops.some((s) => s.session === session.number))
      if (options.interchange === 'pill') {
        for (const cluster of clustersOf(here, session.number)) {
          rows.push(
            stationRow(
              `${session.number}:${cluster.join('+')}`,
              session,
              cluster.map((k) => byKey.get(k)!),
            ),
          )
        }
      } else {
        for (const [position, line] of here.entries()) {
          const stop = line.stops.find((s) => s.session === session.number)!
          const merges = line.crossings
            .filter((c) => c.events.some((event) => stop.events.includes(event)))
            .map((c) => c.arcKey)
            .filter((other) => here.findIndex((l) => l.key === other) > position)
            .map((other) => [line.key, other] as [string, string])
          rows.push(stationRow(`${session.number}:${line.key}`, session, [line], merges))
        }
      }
    }
  }

  const contains = (row: Row, key: string) => row.lines.some((line) => line.key === key)
  const spans = lines.map((line) => ({
    line,
    top: rows.findIndex((row) => contains(row, line.key)),
    latest: rows.findIndex((row) => row.session !== undefined && contains(row, line.key)),
    bottom: rows.findLastIndex((row) => contains(row, line.key)),
    continues: line.first !== undefined && line.first < (sessions[0]?.number ?? 0),
  }))
  const tipOf = new Map(spans.map((span) => [span.line.key, span.top]))

  const focus = hover ?? selected
  const related = new Set(byKey.get(focus ?? '')?.crossings.map((c) => c.arcKey))
  const faded = (key: string) => focus !== undefined && focus !== key && !related.has(key)
  const maxColumn = Math.max(0, ...lines.map((line) => columns.get(line.key) ?? 0))
  const width = (maxColumn + 1) * COLUMN
  const height = rows.length * ROW
  const x = (key: string) => (columns.get(key) ?? 0) * COLUMN + COLUMN / 2
  const y = (index: number) => index * ROW + ROW / 2

  return (
    <div className="relative flex gap-3">
      <svg width={width} height={height} className="shrink-0 overflow-visible">
        {spans.map(({ line, top, latest, bottom, continues }) => {
          if (top === -1) return null
          const dashedTo = latest !== -1 ? y(latest) : continues ? height : y(top)
          const parent = options.branchParents?.get(line.key)
          return (
            <g key={line.key} opacity={faded(line.key) ? 0.12 : 1}>
              {dashedTo > y(top) ? (
                <line
                  x1={x(line.key)}
                  x2={x(line.key)}
                  y1={y(top)}
                  y2={dashedTo}
                  stroke={line.color}
                  strokeWidth={LINE}
                  strokeDasharray="4 4"
                />
              ) : null}
              {latest !== -1 ? (
                <line
                  x1={x(line.key)}
                  x2={x(line.key)}
                  y1={y(latest)}
                  y2={continues ? height : y(bottom)}
                  stroke={line.color}
                  strokeWidth={line.members ? LINE * 2.5 : focus === line.key ? LINE + 2 : LINE}
                  strokeLinecap="round"
                />
              ) : null}
              {parent && byKey.has(parent) && !continues ? (
                <path
                  d={`M ${x(line.key)} ${y(bottom)} C ${x(line.key)} ${y(bottom) + ROW}, ${x(parent)} ${y(bottom)}, ${x(parent)} ${y(bottom) + ROW}`}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={LINE}
                />
              ) : null}
            </g>
          )
        })}

        {rows.map((row, index) =>
          row.merges.map(([a, b]) => (
            <path
              key={`${row.key}-${b}`}
              d={`M ${x(a)} ${y(index)} Q ${x(b)} ${y(index)}, ${x(b)} ${y(index) + ROW}`}
              fill="none"
              stroke={byKey.get(a)!.color}
              strokeWidth={LINE}
              opacity={focus && focus !== a && focus !== b ? 0.12 : 1}
            />
          )),
        )}

        {rows.map((row, index) =>
          row.session !== undefined && options.interchange === 'pill'
            ? row.clusters
                .filter((cluster) => cluster.length > 1)
                .map((cluster) => {
                  const xs = cluster.map(x)
                  const left = Math.min(...xs)
                  const right = Math.max(...xs)
                  return (
                    <rect
                      key={`${row.key}-${cluster.join()}`}
                      x={left - 7}
                      y={y(index) - 7}
                      width={right - left + 14}
                      height={14}
                      rx={7}
                      className="fill-card stroke-foreground"
                      strokeWidth={2.5}
                      opacity={
                        focus && !cluster.includes(focus) && !cluster.some((k) => related.has(k))
                          ? 0.15
                          : 1
                      }
                    />
                  )
                })
            : null,
        )}

        {rows.map((row, index) =>
          row.lines.map((line) => {
            const tip = tipOf.get(line.key) === index
            const inPill = row.clusters.some(
              (cluster) => cluster.length > 1 && cluster.includes(line.key),
            )
            const handlers = options.hoverCards
              ? {
                  onMouseEnter: () => {
                    setHover(line.key)
                    setCard({ line, session: row.session?.number, x: x(line.key), y: y(index) })
                  },
                  onMouseLeave: () => {
                    setHover(undefined)
                    setCard(undefined)
                  },
                }
              : {}
            if (tip) {
              const Icon = resolveArcIcon(line.arc.icon)
              return (
                <g
                  key={`${row.key}-${line.key}`}
                  opacity={faded(line.key) ? 0.12 : 1}
                  {...handlers}
                  onClick={() => onSelect(line)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={x(line.key)}
                    cy={y(index)}
                    r={9}
                    className="fill-card"
                    stroke={line.color}
                    strokeWidth={2}
                    strokeDasharray={row.session === undefined ? '3 2' : undefined}
                  />
                  {line.person ? (
                    <foreignObject x={x(line.key) - 8} y={y(index) - 8} width={16} height={16}>
                      <DmFaces people={[line.person]} size="xs" />
                    </foreignObject>
                  ) : (
                    <Icon x={x(line.key) - 6} y={y(index) - 6} size={12} color={line.color} />
                  )}
                </g>
              )
            }
            return (
              <circle
                key={`${row.key}-${line.key}`}
                cx={x(line.key)}
                cy={y(index)}
                r={inPill ? 3.5 : 5}
                className={inPill ? undefined : 'fill-card'}
                fill={inPill ? line.color : undefined}
                stroke={inPill ? undefined : line.color}
                strokeWidth={3}
                opacity={faded(line.key) ? 0.12 : 1}
                {...handlers}
                onClick={() => onSelect(line)}
              />
            )
          }),
        )}
      </svg>

      <ol className="min-w-0 flex-1">
        {rows.map((row) => (
          <li
            key={row.key}
            style={{ height: ROW }}
            className={cn('flex min-w-0 items-center', row.kind === 'header' && 'items-end pb-1')}
          >
            {row.kind === 'header' ? (
              <span
                className={cn(
                  'truncate text-xs',
                  row.session ? 'text-muted-foreground' : 'font-semibold',
                )}
              >
                {row.session ? (
                  <>
                    <span className="font-mono">S{row.session.number}</span> · {row.session.name}
                  </>
                ) : (
                  'Next'
                )}
              </span>
            ) : options.density === 'session' ? (
              <span className="flex min-w-0 items-center gap-2 text-sm">
                <span className="shrink-0 font-mono text-xs">
                  {row.session ? `S${row.session.number}` : 'Next'}
                </span>
                <span className="text-muted-foreground shrink-0 truncate text-xs">
                  {row.session?.name}
                </span>
                {options.clusterBy === 'place' && row.session ? (
                  <span className="text-muted-foreground flex min-w-0 gap-3 overflow-hidden text-xs">
                    {row.clusters.map((cluster) => {
                      const place = byKey
                        .get(cluster[0]!)
                        ?.stops.find((s) => s.session === row.session!.number)?.place
                      return (
                        <span key={cluster.join()} className="flex shrink-0 items-center gap-1">
                          {place ? resolveSourceRef({ ref: 'location', key: place })?.name : '?'}
                          <DmFaces
                            people={cluster.map((key) => byKey.get(key)!.person!)}
                            size="xs"
                          />
                        </span>
                      )
                    })}
                  </span>
                ) : null}
                <span
                  className={cn(
                    'flex min-w-0 gap-1 overflow-hidden',
                    options.clusterBy === 'place' && 'hidden',
                  )}
                >
                  {row.lines.map((line) => (
                    <button
                      type="button"
                      key={line.key}
                      onClick={() => onSelect(line)}
                      onMouseEnter={() => setHover(line.key)}
                      onMouseLeave={() => setHover(undefined)}
                      title={line.arc.name}
                      className={cn(
                        'shrink-0 rounded p-0.5 hover:bg-muted',
                        faded(line.key) && 'opacity-30',
                      )}
                      style={{ color: line.color }}
                    >
                      <ArcIcon icon={line.arc.icon} />
                    </button>
                  ))}
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onSelect(row.lines[0]!)}
                onMouseEnter={() => setHover(row.lines[0]!.key)}
                onMouseLeave={() => setHover(undefined)}
                className={cn(
                  'hover:bg-muted/60 flex w-full min-w-0 items-center gap-2 rounded px-1 text-left text-sm',
                  row.lines.every((line) => faded(line.key)) && 'opacity-30',
                  row.lines.some((line) => line.key === selected) && 'bg-muted',
                )}
              >
                {row.lines.length === 1 ? (
                  <span
                    className="flex max-w-[65%] shrink-0 items-center gap-1 font-medium"
                    style={{ color: row.lines[0]!.color }}
                  >
                    <ArcIcon icon={row.lines[0]!.arc.icon} />
                    <span className="truncate">{row.lines[0]!.arc.name}</span>
                  </span>
                ) : (
                  <span className="flex min-w-0 items-center gap-1 font-medium">
                    {row.lines.map((line) => (
                      <span key={line.key} style={{ color: line.color }}>
                        <ArcIcon icon={line.arc.icon} />
                      </span>
                    ))}
                    <span className="truncate">
                      {row.lines.map((line) => line.arc.name).join(' + ')}
                    </span>
                  </span>
                )}
                {row.lines.length === 1 ? (
                  <span className="text-muted-foreground truncate">{row.detail}</span>
                ) : null}
              </button>
            )}
          </li>
        ))}
      </ol>

      {card ? (
        <div
          className="border-border bg-card pointer-events-none absolute z-10 grid w-72 gap-1 rounded-lg border p-3 text-sm shadow-lg"
          style={{ left: card.x + 16, top: card.y - 12 }}
        >
          <p className="flex items-center gap-1.5 font-semibold" style={{ color: card.line.color }}>
            <ArcIcon icon={card.line.arc.icon} />
            {card.line.arc.name}
          </p>
          {card.session === undefined ? (
            card.line.next.map((plot) => (
              <p key={plot.slug}>
                <span className="font-medium">Next:</span> {plot.name}
              </p>
            ))
          ) : (
            <>
              <p className="text-muted-foreground text-xs">
                S{card.session} ·{' '}
                {card.line.stops.find((s) => s.session === card.session)?.plots.join(' · ')}
              </p>
              <ul className="grid gap-0.5">
                {card.line.stops
                  .find((s) => s.session === card.session)
                  ?.events.slice(0, 6)
                  .map((event) => (
                    <li key={event} className="truncate">
                      {eventName(event)}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}
