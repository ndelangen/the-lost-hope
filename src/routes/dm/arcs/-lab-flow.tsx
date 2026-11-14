/* oxlint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- prototype only */
import { useState } from 'react'

import { ArcIcon, resolveArcIcon } from '#/lib/arc-icons'
import type { Storyline, StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

import { eventName } from './-lab-model'

const ROW = 44
const TIGHT = 12
const LOOSE = 26

type Slot = { key: string; x: number; played: boolean; group: number }

/** Arcs sharing an event in this session, as groups of keys. Arcs not played are on their own. */
function groupsIn(active: readonly Storyline[], session: number): string[][] {
  const parent = new Map(active.map((line) => [line.key, line.key]))
  const find = (key: string): string => (parent.get(key) === key ? key : find(parent.get(key)!))
  for (const line of active) {
    const stop = line.stops.find((s) => s.session === session)
    if (!stop) continue
    for (const crossing of line.crossings) {
      if (parent.has(crossing.arcKey) && crossing.events.some((e) => stop.events.includes(e))) {
        parent.set(find(line.key), find(crossing.arcKey))
      }
    }
  }
  const groups = new Map<string, string[]>()
  for (const line of active)
    groups.set(find(line.key), [...(groups.get(find(line.key)) ?? []), line.key])
  return [...groups.values()]
}

/**
 * Storyline layout, as in xkcd's movie charts: every session re-orders the arcs that are running,
 * keeping the previous order where it can, pulling arcs that share an event into one tight group,
 * and spacing groups that have nothing to do with each other further apart.
 */
export function layoutFlow(
  storylines: readonly Storyline[],
  sessions: readonly StorylineSession[],
) {
  const byKey = new Map(storylines.map((line) => [line.key, line]))
  const isActive = (line: Storyline, session: number) =>
    line.first !== undefined &&
    session >= line.first &&
    (line.next.length > 0 || session <= (line.last ?? -1))

  let order: string[] = []
  const rows: { session: StorylineSession | undefined; slots: Slot[] }[] = []
  for (const session of [...sessions, undefined]) {
    const number = session?.number ?? Number.POSITIVE_INFINITY
    const active = storylines.filter((line) =>
      session ? isActive(line, number) : line.next.length > 0,
    )
    const activeKeys = new Set(active.map((line) => line.key))
    order = order.filter((key) => activeKeys.has(key))
    for (const line of active) if (!order.includes(line.key)) order.push(line.key)

    const groups = session ? groupsIn(active, number) : active.map((line) => [line.key])
    // Each group moves to the average position of its members, then members sit together.
    const rank = new Map(order.map((key, index) => [key, index]))
    const placed = groups
      .map((group) => ({
        group: group.toSorted((a, b) => rank.get(a)! - rank.get(b)!),
        at: group.reduce((sum, key) => sum + rank.get(key)!, 0) / group.length,
      }))
      .toSorted((a, b) => a.at - b.at)
    order = placed.flatMap(({ group }) => group)

    let x = 0
    const slots: Slot[] = []
    for (const [groupIndex, { group }] of placed.entries()) {
      if (groupIndex > 0) x += LOOSE
      for (const [i, key] of group.entries()) {
        if (i > 0) x += TIGHT
        slots.push({
          key,
          x,
          group: groupIndex,
          played: session ? byKey.get(key)!.stops.some((s) => s.session === number) : true,
        })
      }
    }
    rows.push({ session, slots })
  }
  return rows.toReversed()
}

export function FlowGraph({
  storylines,
  sessions,
  onSelect,
  selected,
}: {
  storylines: readonly Storyline[]
  sessions: readonly StorylineSession[]
  onSelect: (line: Storyline) => void
  selected?: string
}) {
  const [hover, setHover] = useState<string | undefined>()
  const [card, setCard] = useState<{ line: Storyline; session?: number; x: number; y: number }>()
  const rows = layoutFlow(storylines, sessions)
  const byKey = new Map(storylines.map((line) => [line.key, line]))
  const width = Math.max(0, ...rows.flatMap((row) => row.slots.map((slot) => slot.x))) + 24
  const y = (index: number) => index * ROW + ROW / 2
  const focus = hover ?? selected
  const related = new Set(byKey.get(focus ?? '')?.crossings.map((c) => c.arcKey))
  const faded = (key: string) => focus !== undefined && focus !== key && !related.has(key)

  return (
    <div className="relative flex gap-3">
      <svg width={width} height={rows.length * ROW} className="shrink-0 overflow-visible">
        <g transform="translate(12 0)">
          {storylines.map((line) => {
            const points = rows.flatMap((row, index) => {
              const slot = row.slots.find((s) => s.key === line.key)
              return slot ? [{ x: slot.x, y: y(index), next: row.session === undefined }] : []
            })
            if (points.length === 0) return null
            const segments = points.slice(1).map((point, i) => {
              const prev = points[i]!
              const mid = (prev.y + point.y) / 2
              return {
                d: `M ${prev.x} ${prev.y} C ${prev.x} ${mid}, ${point.x} ${mid}, ${point.x} ${point.y}`,
                dashed: prev.next,
              }
            })
            return (
              <g key={line.key} opacity={faded(line.key) ? 0.1 : 1}>
                {segments.map((segment, i) => (
                  <path
                    key={i}
                    d={segment.d}
                    fill="none"
                    stroke={line.color}
                    strokeWidth={focus === line.key ? 5 : 3}
                    strokeDasharray={segment.dashed ? '4 4' : undefined}
                  />
                ))}
              </g>
            )
          })}

          {rows.map((row, index) => {
            const groups = new Map<number, Slot[]>()
            for (const slot of row.slots)
              groups.set(slot.group, [...(groups.get(slot.group) ?? []), slot])
            return [...groups.values()]
              .filter(
                (group) => group.length > 1 && group.every((slot) => slot.played) && row.session,
              )
              .map((group) => (
                <rect
                  key={`${index}-${group[0]!.key}`}
                  x={group[0]!.x - 7}
                  y={y(index) - 7}
                  width={group.at(-1)!.x - group[0]!.x + 14}
                  height={14}
                  rx={7}
                  className="fill-card stroke-foreground"
                  strokeWidth={2}
                  opacity={
                    focus && !group.some((slot) => slot.key === focus || related.has(slot.key))
                      ? 0.15
                      : 1
                  }
                />
              ))
          })}

          {rows.map((row, index) =>
            row.slots
              .filter((slot) => slot.played)
              .map((slot) => {
                const line = byKey.get(slot.key)!
                const isNext = row.session === undefined
                const Icon = resolveArcIcon(line.arc.icon)
                return (
                  <g
                    key={`${index}-${slot.key}`}
                    opacity={faded(slot.key) ? 0.1 : 1}
                    className="cursor-pointer"
                    onClick={() => onSelect(line)}
                    onMouseEnter={() => {
                      setHover(line.key)
                      setCard({ line, session: row.session?.number, x: slot.x + 12, y: y(index) })
                    }}
                    onMouseLeave={() => {
                      setHover(undefined)
                      setCard(undefined)
                    }}
                  >
                    {isNext ? (
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
                    ) : (
                      <circle
                        cx={slot.x}
                        cy={y(index)}
                        r={4}
                        fill={line.color}
                        stroke="white"
                        strokeWidth={1}
                      />
                    )}
                  </g>
                )
              }),
          )}
        </g>
      </svg>

      <ol className="min-w-0 flex-1">
        {rows.map((row, index) => (
          <li
            key={index}
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
                      onClick={() => onSelect(line)}
                      onMouseEnter={() => setHover(line.key)}
                      onMouseLeave={() => setHover(undefined)}
                      className={cn(
                        'shrink-0 rounded p-0.5 hover:bg-muted',
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

      {card ? (
        <div
          className="border-border bg-card pointer-events-none absolute z-10 grid w-72 gap-1 rounded-lg border p-3 text-sm shadow-lg"
          style={{ left: card.x + 16, top: card.y - 12 }}
        >
          <p className="flex items-center gap-1.5 font-semibold" style={{ color: card.line.color }}>
            <ArcIcon icon={card.line.arc.icon} />
            {card.line.arc.name}
          </p>
          {card.session === undefined
            ? card.line.next.map((plot) => (
                <p key={plot.slug}>
                  <span className="font-medium">Next:</span> {plot.name}
                </p>
              ))
            : card.line.stops
                .find((s) => s.session === card.session)
                ?.events.slice(0, 6)
                .map((event) => (
                  <p key={event} className="truncate">
                    {eventName(event)}
                  </p>
                ))}
        </div>
      ) : null}
    </div>
  )
}
