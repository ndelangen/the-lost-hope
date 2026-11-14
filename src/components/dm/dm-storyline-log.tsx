/* oxlint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- the stations are a mouse shortcut; the labelled buttons beside the graph do the same */
import { useState } from 'react'

import { ArcIcon, resolveArcIcon } from '#/lib/arc-icons'
import type { Storyline, StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

import { DmStopCard } from './dm-stop-card'

const COLUMN = 18
const ROW = 28
const LINE = 3

type Props = {
  storylines: readonly Storyline[]
  sessions: readonly StorylineSession[]
  columns: ReadonlyMap<string, number>
  focus: string | undefined
  /** Storylines that don't match the active filters, drawn faded rather than hidden. */
  dimmed?: ReadonlySet<string>
  /** Arcs picked for comparing, drawn bold. */
  picked: readonly string[]
  onFocus: (key: string | undefined) => void
  onPick: (line: Storyline) => void
}

/** Arcs that share an event in this session, as groups of keys. */
function clustersOf(lines: readonly Storyline[], session: number): string[][] {
  const parent = new Map(lines.map((line) => [line.key, line.key]))
  const find = (key: string): string => {
    const up = parent.get(key)!
    return up === key ? key : find(up)
  }
  for (const line of lines) {
    const stop = line.stops.find((s) => s.session === session)
    for (const crossing of line.crossings) {
      if (parent.has(crossing.arcKey) && crossing.events.some((e) => stop?.events.includes(e))) {
        parent.set(find(line.key), find(crossing.arcKey))
      }
    }
  }
  const groups = new Map<string, string[]>()
  for (const line of lines) {
    const root = find(line.key)
    groups.set(root, [...(groups.get(root) ?? []), line.key])
  }
  return [...groups.values()]
}

/**
 * Arcs as `git log --graph`: one row per session holding every arc played in it, so the whole
 * campaign fits on a screen. Arcs that shared an event in a session are ringed together.
 */
export function DmStorylineLog({
  storylines,
  sessions,
  columns,
  focus,
  dimmed,
  picked,
  onFocus,
  onPick,
}: Props) {
  const [card, setCard] = useState<{ line: Storyline; session?: number; x: number; y: number }>()
  const open = storylines.filter((line) => line.next.length > 0)
  const rows = [
    { key: 'next', session: undefined, lines: open, clusters: [] as string[][] },
    ...sessions.toReversed().map((session) => {
      const lines = storylines.filter((line) =>
        line.stops.some((s) => s.session === session.number),
      )
      return { key: session.key, session, lines, clusters: clustersOf(lines, session.number) }
    }),
  ]
  const related = new Set(storylines.find((l) => l.key === focus)?.crossings.map((c) => c.arcKey))
  const faded = (key: string) =>
    dimmed?.has(key) ||
    (focus !== undefined && focus !== key && !related.has(key) && !picked.includes(key))
  const width = (Math.max(0, ...columns.values()) + 1) * COLUMN
  const height = rows.length * ROW
  const x = (key: string) => columns.get(key)! * COLUMN + COLUMN / 2
  const y = (index: number) => index * ROW + ROW / 2
  const oldest = sessions[0]?.number ?? 0

  return (
    <div className="relative flex gap-3">
      <svg width={width} height={height} className="shrink-0 overflow-visible" aria-hidden>
        {storylines.map((line) => {
          const top = rows.findIndex((row) => row.lines.includes(line))
          const latest = rows.findIndex((row) => row.session && row.lines.includes(line))
          const bottom = rows.findLastIndex((row) => row.lines.includes(line))
          if (top === -1) return null
          const continues = line.first !== undefined && line.first < oldest
          const strokeWidth = picked.includes(line.key) || focus === line.key ? LINE + 2 : LINE
          return (
            <g key={line.key} opacity={faded(line.key) ? 0.12 : 1}>
              <line
                x1={x(line.key)}
                x2={x(line.key)}
                y1={y(top)}
                y2={latest === -1 ? (continues ? height : y(top)) : y(latest)}
                stroke={line.color}
                strokeWidth={LINE}
                strokeDasharray="4 4"
              />
              {latest === -1 ? null : (
                <line
                  x1={x(line.key)}
                  x2={x(line.key)}
                  y1={y(latest)}
                  y2={continues ? height : y(bottom)}
                  stroke={line.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
              )}
            </g>
          )
        })}

        {rows.map((row, index) =>
          row.clusters
            .filter((cluster) => cluster.length > 1)
            .map((cluster) => {
              const xs = cluster.map(x)
              return (
                <rect
                  key={`${row.key}-${cluster.join()}`}
                  x={Math.min(...xs) - 7}
                  y={y(index) - 7}
                  width={Math.max(...xs) - Math.min(...xs) + 14}
                  height={14}
                  rx={7}
                  className="fill-card stroke-foreground"
                  strokeWidth={2.5}
                  opacity={cluster.every(faded) ? 0.15 : 1}
                />
              )
            }),
        )}

        {rows.map((row, index) =>
          row.lines.map((line) => {
            const tip = rows.findIndex((r) => r.lines.includes(line)) === index
            const inRing = row.clusters.some((c) => c.length > 1 && c.includes(line.key))
            const Icon = resolveArcIcon(line.arc.icon)
            return (
              <g
                key={`${row.key}-${line.key}`}
                opacity={faded(line.key) ? 0.12 : 1}
                className="cursor-pointer"
                onClick={() => onPick(line)}
                onMouseEnter={() => {
                  onFocus(line.key)
                  setCard({ line, session: row.session?.number, x: x(line.key), y: y(index) })
                }}
                onMouseLeave={() => {
                  onFocus(undefined)
                  setCard(undefined)
                }}
              >
                {tip ? (
                  <>
                    <circle
                      cx={x(line.key)}
                      cy={y(index)}
                      r={9}
                      className="fill-card"
                      stroke={line.color}
                      strokeWidth={2}
                      strokeDasharray={row.session ? undefined : '3 2'}
                    />
                    <Icon x={x(line.key) - 6} y={y(index) - 6} size={12} color={line.color} />
                  </>
                ) : (
                  <circle
                    cx={x(line.key)}
                    cy={y(index)}
                    r={inRing ? 3.5 : 5}
                    className={inRing ? undefined : 'fill-card'}
                    fill={inRing ? line.color : undefined}
                    stroke={inRing ? undefined : line.color}
                    strokeWidth={3}
                  />
                )}
              </g>
            )
          }),
        )}
      </svg>

      <ol className="min-w-0 flex-1">
        {rows.map((row) => (
          <li
            key={row.key}
            style={{ height: ROW }}
            className="flex min-w-0 items-center gap-2 text-sm"
          >
            <span className="shrink-0 font-mono text-xs">
              {row.session ? `S${row.session.number}` : 'Next'}
            </span>
            <span className="text-muted-foreground shrink-0 truncate text-xs">
              {row.session?.name}
            </span>
            <span className="flex min-w-0 gap-1 overflow-hidden">
              {row.lines.map((line) => (
                <button
                  type="button"
                  key={line.key}
                  title={line.arc.name}
                  aria-pressed={picked.includes(line.key)}
                  onClick={() => onPick(line)}
                  onMouseEnter={() => onFocus(line.key)}
                  onMouseLeave={() => onFocus(undefined)}
                  className={cn(
                    'hover:bg-muted shrink-0 rounded p-0.5',
                    picked.includes(line.key) && 'ring-foreground ring-1',
                    faded(line.key) && 'opacity-30',
                  )}
                  style={{ color: line.color }}
                >
                  <ArcIcon icon={line.arc.icon} />
                </button>
              ))}
            </span>
          </li>
        ))}
      </ol>

      {card ? <DmStopCard {...card} /> : null}
    </div>
  )
}
