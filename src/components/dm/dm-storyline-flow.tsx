/* oxlint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- the stations are a mouse shortcut; the labelled buttons beside the graph do the same */
import { useState } from 'react'

import { ArcIcon, resolveArcIcon } from '#/lib/arc-icons'
import { type FlowSlot, layoutFlow } from '#/lib/dm-storyline-flow'
import type { Storyline, StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

import { DmStopCard } from './dm-stop-card'

const ROW = 44

type Props = {
  storylines: readonly Storyline[]
  sessions: readonly StorylineSession[]
  focus: string | undefined
  /** Storylines that don't match the active filters, drawn faded rather than hidden. */
  dimmed?: ReadonlySet<string>
  onFocus: (key: string | undefined) => void
  onPick: (line: Storyline) => void
}

/**
 * Arcs as a movie narrative chart: no fixed columns. In every session, arcs that share an event
 * are pulled into a tight group with a ring around it, and arcs with nothing to do with each
 * other drift apart, so you can see storylines meet and split again.
 */
export function DmStorylineFlow({ storylines, sessions, focus, dimmed, onFocus, onPick }: Props) {
  const [card, setCard] = useState<{ line: Storyline; session?: number; x: number; y: number }>()
  const rows = layoutFlow(storylines, sessions)
  const byKey = new Map(storylines.map((line) => [line.key, line]))
  const width = Math.max(0, ...rows.flatMap((row) => row.slots.map((slot) => slot.x))) + 24
  const y = (index: number) => index * ROW + ROW / 2
  const related = new Set(byKey.get(focus ?? '')?.crossings.map((c) => c.arcKey))
  const faded = (key: string) =>
    dimmed?.has(key) || (focus !== undefined && focus !== key && !related.has(key))
  const hoverOn = (line: Storyline, session: number | undefined, x: number, at: number) => {
    onFocus(line.key)
    setCard({ line, session, x: x + 12, y: at })
  }
  const hoverOff = () => {
    onFocus(undefined)
    setCard(undefined)
  }

  return (
    <div className="relative flex gap-3">
      <svg
        width={width}
        height={rows.length * ROW}
        className="shrink-0 overflow-visible"
        aria-hidden
      >
        <g transform="translate(12 0)">
          {storylines.map((line) => {
            const points = rows.flatMap((row, index) => {
              const slot = row.slots.find((s) => s.key === line.key)
              return slot ? [{ x: slot.x, y: y(index), next: row.session === undefined }] : []
            })
            return (
              <g key={line.key} opacity={faded(line.key) ? 0.1 : 1}>
                {points.slice(1).map((point, i) => {
                  const prev = points[i]!
                  const mid = (prev.y + point.y) / 2
                  return (
                    <path
                      key={point.y}
                      d={`M ${prev.x} ${prev.y} C ${prev.x} ${mid}, ${point.x} ${mid}, ${point.x} ${point.y}`}
                      fill="none"
                      stroke={line.color}
                      strokeWidth={focus === line.key ? 5 : 3}
                      strokeDasharray={prev.next ? '4 4' : undefined}
                    />
                  )
                })}
              </g>
            )
          })}

          {rows.map((row, index) => {
            if (!row.session) return null
            const groups = new Map<number, FlowSlot[]>()
            for (const slot of row.slots)
              groups.set(slot.group, [...(groups.get(slot.group) ?? []), slot])
            return [...groups.values()]
              .filter((group) => group.length > 1 && group.every((slot) => slot.played))
              .map((group) => (
                <rect
                  key={`${row.session!.key}-${group[0]!.key}`}
                  x={group[0]!.x - 7}
                  y={y(index) - 7}
                  width={group.at(-1)!.x - group[0]!.x + 14}
                  height={14}
                  rx={7}
                  className="fill-card stroke-foreground"
                  strokeWidth={2}
                  opacity={group.every((slot) => faded(slot.key)) ? 0.15 : 1}
                />
              ))
          })}

          {rows.map((row, index) =>
            row.slots
              .filter((slot) => slot.played)
              .map((slot) => {
                const line = byKey.get(slot.key)!
                const Icon = resolveArcIcon(line.arc.icon)
                return (
                  <g
                    key={`${row.session?.key ?? 'next'}-${slot.key}`}
                    opacity={faded(slot.key) ? 0.1 : 1}
                    className="cursor-pointer"
                    onClick={() => onPick(line)}
                    onMouseEnter={() => hoverOn(line, row.session?.number, slot.x, y(index))}
                    onMouseLeave={hoverOff}
                  >
                    {row.session ? (
                      <circle
                        cx={slot.x}
                        cy={y(index)}
                        r={4}
                        fill={line.color}
                        className="stroke-card"
                        strokeWidth={1}
                      />
                    ) : (
                      <>
                        <circle
                          cx={slot.x}
                          cy={y(index)}
                          r={8}
                          className="fill-card"
                          stroke={line.color}
                          strokeWidth={2}
                          strokeDasharray="3 2"
                        />
                        <Icon x={slot.x - 5.5} y={y(index) - 5.5} size={11} color={line.color} />
                      </>
                    )}
                  </g>
                )
              }),
          )}
        </g>
      </svg>

      <ol className="min-w-0 flex-1">
        {rows.map((row) => (
          <li
            key={row.session?.key ?? 'next'}
            style={{ height: ROW }}
            className="flex min-w-0 items-center gap-2 text-sm"
          >
            <span className="shrink-0 font-mono text-xs">
              {row.session ? `S${row.session.number}` : 'Next'}
            </span>
            <span className="text-muted-foreground shrink-0 truncate text-xs">
              {row.session?.name}
            </span>
            <span className="flex min-w-0 gap-0.5 overflow-hidden">
              {row.slots
                .filter((slot) => slot.played)
                .map((slot) => {
                  const line = byKey.get(slot.key)!
                  return (
                    <button
                      type="button"
                      key={slot.key}
                      title={line.arc.name}
                      onClick={() => onPick(line)}
                      onMouseEnter={() => onFocus(line.key)}
                      onMouseLeave={() => onFocus(undefined)}
                      className={cn(
                        'hover:bg-muted shrink-0 rounded p-0.5',
                        faded(line.key) && 'opacity-30',
                      )}
                      style={{ color: line.color }}
                    >
                      <ArcIcon icon={line.arc.icon} />
                    </button>
                  )
                })}
            </span>
          </li>
        ))}
      </ol>

      {card ? <DmStopCard {...card} /> : null}
    </div>
  )
}
