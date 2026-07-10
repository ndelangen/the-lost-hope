import { Link } from '@tanstack/react-router'
import { useMemo } from 'react'

import {
  COLLECTION_LABELS,
  entityLink,
  type SessionTimelineEntry,
  type SessionTimelineSection,
} from '#/lib/campaign'
import { DAY_MARK_ICON, EventMarkIcon } from '#/lib/event-icons'
import { cn } from '#/lib/utils'

// --- Geometry ---------------------------------------------------------------
// The storyline is drawn in a fixed 1000-wide coordinate space. Marker
// coordinates and the road path are computed from the SAME numbers, so every
// bullet is guaranteed to sit exactly on the line. The wrapper keeps the
// viewBox aspect ratio, so nothing is measured from the DOM.

const W = 1000
const CX = W / 2
const LEFT = 120
const RIGHT = W - 120
const COLS = 5
const COL_STEP = (RIGHT - LEFT) / (COLS - 1)
const ROW_GAP = 180
const R = ROW_GAP / 2 // every turn is a half-circle whose diameter == the row gap
const HEADER_BLOCK = 108 // vertical room reserved for a centered session header
const ENTRY_STUB = 40 // straight vertical below a header before the road bends out
const EXIT_STUB = 40 // straight vertical after the road returns to center
const SESSION_GAP = 44 // gap between one session's end and the next header
const TOP_PAD = 4
const BOTTOM_PAD = 56

// Grid columns shared by every row so bullets stay vertically aligned.
const ALL_COLS = Array.from({ length: COLS }, (_, i) => LEFT + i * COL_STEP)
// Columns that fit on a half row (center -> edge), leaving room for the turn.
const LEFT_HALF = ALL_COLS.filter((x) => x <= CX - R) // ascending, e.g. [120, 310]
const RIGHT_HALF = ALL_COLS.filter((x) => x >= CX + R) // ascending, e.g. [690, 880]

type PlacedBullet = { node: SessionTimelineEntry; x: number; y: number }

type PlacedSection = {
  session: SessionTimelineSection['session']
  headerY: number
  bullets: PlacedBullet[]
}

type Layout = {
  width: number
  height: number
  pathD: string
  sections: PlacedSection[]
  startPoint: { x: number; y: number }
  endPoint: { x: number; y: number }
}

/** Rows needed so every bullet gets a slot (two half rows + full middle rows). */
function rowsFor(count: number): number {
  let n = 2
  while (LEFT_HALF.length * 2 + COLS * (n - 2) < count) n++
  return n
}

function buildLayout(sections: SessionTimelineSection[]): Layout {
  const path: string[] = []
  const placed: PlacedSection[] = []
  let cursor = TOP_PAD
  let startY = TOP_PAD + HEADER_BLOCK
  let lastBottom = TOP_PAD

  sections.forEach((section, si) => {
    const count = section.entries.length
    const headerY = cursor + HEADER_BLOCK / 2
    const spineTopY = cursor + HEADER_BLOCK
    const rows = rowsFor(count)
    const firstRowY = spineTopY + ENTRY_STUB + R
    const lastRowY = firstRowY + (rows - 1) * ROW_GAP
    const sessionBottomY = lastRowY + R + EXIT_STUB

    // Continue the single continuous stroke from the previous section.
    if (si === 0) {
      startY = spineTopY
      path.push(`M ${CX} ${spineTopY}`)
    } else {
      path.push(`L ${CX} ${spineTopY}`)
    }

    // Entry: vertical stub, then a quarter circle bending left into row 0.
    path.push(`L ${CX} ${firstRowY - R}`)
    path.push(`A ${R} ${R} 0 0 1 ${CX - R} ${firstRowY}`)
    path.push(`L ${LEFT} ${firstRowY}`)

    const slots: Array<{ x: number; y: number }> = []
    // Row 0 is a half row running center -> left edge.
    for (const x of LEFT_HALF.toReversed()) slots.push({ x, y: firstRowY })

    let edge: number = LEFT
    for (let r = 1; r <= rows - 1; r++) {
      const rowY = firstRowY + r * ROW_GAP
      // Half-circle U-turn (diameter == ROW_GAP) at the current edge.
      if (edge === LEFT) path.push(`A ${R} ${R} 0 0 0 ${LEFT} ${rowY}`)
      else path.push(`A ${R} ${R} 0 0 1 ${RIGHT} ${rowY}`)

      if (r < rows - 1) {
        const target = edge === LEFT ? RIGHT : LEFT
        path.push(`L ${target} ${rowY}`)
        const cols = edge === LEFT ? ALL_COLS : ALL_COLS.toReversed()
        for (const x of cols) slots.push({ x, y: rowY })
        edge = target
      } else {
        // Final half row curves back to center, then a stub to the next header.
        if (edge === LEFT) {
          path.push(`L ${CX - R} ${rowY}`)
          path.push(`A ${R} ${R} 0 0 1 ${CX} ${rowY + R}`)
          for (const x of LEFT_HALF) slots.push({ x, y: rowY })
        } else {
          path.push(`L ${CX + R} ${rowY}`)
          path.push(`A ${R} ${R} 0 0 0 ${CX} ${rowY + R}`)
          for (const x of RIGHT_HALF.toReversed()) slots.push({ x, y: rowY })
        }
        path.push(`L ${CX} ${sessionBottomY}`)
      }
    }

    const bullets: PlacedBullet[] = section.entries.map((node, i) => ({
      node,
      x: slots[i].x,
      y: slots[i].y,
    }))

    placed.push({ session: section.session, headerY, bullets })

    lastBottom = sessionBottomY
    cursor = sessionBottomY + SESSION_GAP
  })

  return {
    width: W,
    height: lastBottom + BOTTOM_PAD,
    pathD: path.join(' '),
    sections: placed,
    startPoint: { x: CX, y: startY },
    endPoint: { x: CX, y: lastBottom },
  }
}

// --- Markers ----------------------------------------------------------------

function Bullet({
  children,
  label,
  className,
}: {
  children: React.ReactNode
  label: string
  className?: string
}) {
  return (
    <div className="group/bullet relative flex flex-col items-center">
      <span className="text-foreground bg-card border-border pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-50 w-max max-w-[210px] -translate-x-1/2 scale-95 rounded-lg border px-3 py-1.5 text-center text-xs leading-snug font-medium opacity-0 shadow-lg transition-all duration-150 group-hover/bullet:scale-100 group-hover/bullet:opacity-100">
        {label}
        <span className="bg-card border-border absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b" />
      </span>
      <div
        className={cn(
          'ring-background flex size-12 items-center justify-center rounded-full ring-[6px] transition-transform duration-150 group-hover/bullet:scale-110',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

function EventBullet({ entry }: { entry: Extract<SessionTimelineEntry, { kind: 'event' }> }) {
  const { mark } = entry
  return (
    <Link {...entityLink('event', entry.slug)} aria-label={entry.name} className="block">
      <Bullet
        label={entry.name}
        className="border-border bg-card group-hover/bullet:border-primary/50 border-2 shadow-sm"
      >
        {mark.type === 'avatar' ? (
          <img src={mark.url} alt="" className="size-full rounded-full object-cover" />
        ) : (
          <EventMarkIcon name={mark.name} className="text-muted-foreground size-[18px]" />
        )}
      </Bullet>
    </Link>
  )
}

function DayBullet({ entry }: { entry: Extract<SessionTimelineEntry, { kind: 'day' }> }) {
  return (
    <Bullet
      label={`Campaign day ${entry.day}`}
      className="border-2 border-amber-400/70 bg-amber-50 shadow-sm dark:bg-amber-950/50"
    >
      <EventMarkIcon name={DAY_MARK_ICON} className="size-5 text-amber-500" />
    </Bullet>
  )
}

function SessionHeader({ session }: { session: SessionTimelineSection['session'] }) {
  return (
    <Link
      {...entityLink('session', session.slug)}
      title={session.name}
      className="bg-background hover:text-primary group flex max-w-[320px] flex-col items-center gap-1 rounded-xl px-5 py-2 text-center transition-colors"
    >
      <span className="text-muted-foreground group-hover:text-primary/70 text-[11px] font-semibold tracking-[0.24em] uppercase transition-colors">
        Session {session.number}
      </span>
      <span className="text-lg leading-tight font-semibold text-balance">{session.name}</span>
    </Link>
  )
}

// --- Component --------------------------------------------------------------

const pct = (value: number, total: number) => `${(value / total) * 100}%`

export function EventsTimeline({
  sections,
  eventCount,
  daySpan,
}: {
  sections: SessionTimelineSection[]
  eventCount: number
  daySpan: string | null
}) {
  const layout = useMemo(() => buildLayout(sections), [sections])

  return (
    <div className="space-y-8">
      <header>
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {COLLECTION_LABELS.event}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{COLLECTION_LABELS.event}</h1>
        <p className="text-muted-foreground mt-2">
          {eventCount} events across {sections.length} sessions
          {daySpan ? ` · ${daySpan}` : null}
        </p>
      </header>

      <div
        className="relative mx-auto w-full max-w-3xl"
        style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          fill="none"
          aria-hidden
        >
          {/* soft road underlay */}
          <path
            d={layout.pathD}
            stroke="currentColor"
            strokeWidth={12}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted"
          />
          {/* dotted trail */}
          <path
            d={layout.pathD}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.1 13"
            className="text-muted-foreground/45"
          />
          {/* terminal caps */}
          <circle
            cx={layout.startPoint.x}
            cy={layout.startPoint.y}
            r={5}
            className="fill-muted-foreground/40"
          />
          <circle
            cx={layout.endPoint.x}
            cy={layout.endPoint.y}
            r={5}
            className="fill-muted-foreground/40"
          />
        </svg>

        {layout.sections.map((section) => (
          <div key={section.session.slug}>
            <div
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(CX, layout.width), top: pct(section.headerY, layout.height) }}
            >
              <SessionHeader session={section.session} />
            </div>

            {section.bullets.map((bullet) => (
              <div
                key={
                  bullet.node.kind === 'event'
                    ? `event-${bullet.node.slug}`
                    : `day-${section.session.slug}-${bullet.node.day}-${bullet.y}`
                }
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 hover:z-40"
                style={{ left: pct(bullet.x, layout.width), top: pct(bullet.y, layout.height) }}
              >
                {bullet.node.kind === 'event' ? (
                  <EventBullet entry={bullet.node} />
                ) : (
                  <DayBullet entry={bullet.node} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
