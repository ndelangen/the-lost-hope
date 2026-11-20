import { Construction, Skull, Users } from 'lucide-react'
import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'

import { useFleetRoster } from '#/components/player-screen/use-fleet-roster'
import { Avatar } from '#/components/ui/avatar'
import { ITEM_STATUS_LABELS } from '#/definitions/item'
import { type FleetMarker, type FleetRoster } from '#/lib/fleet-roster'
import {
  FLEET_TIMING,
  fleetSequence,
  fleetShips,
  type FleetFrame,
  type FleetShipEntry,
} from '#/lib/fleet-sequence'
import { ItemIcon } from '#/lib/item-icons'
import { OrganizationIcon } from '#/lib/organization-icons'
import { cn } from '#/lib/utils'

type Tone = { text: string; bar: string; ring: string; glow: string }

/** The owner's side reads as cool and loyal; any side that seized ships reads as hostile. */
const OWNER_TONE: Tone = {
  text: 'text-sky-300',
  bar: 'bg-sky-400',
  ring: 'ring-sky-400/40',
  glow: 'shadow-[0_0_60px_rgb(56_189_248/0.25)]',
}
const RIVAL_TONE: Tone = {
  text: 'text-red-400',
  bar: 'bg-red-500',
  ring: 'ring-red-500/40',
  glow: 'shadow-[0_0_60px_rgb(239_68_68/0.25)]',
}

const toneOf = (side: number) => (side === 0 ? OWNER_TONE : RIVAL_TONE)

/**
 * An organization's fleet on the player screen, readable from across the table. It opens with a
 * sequence: the fleet builds up, rival sides seize their ships, the party boards, and the lost
 * ships go down one by one. Press R on the player screen to play it again.
 */
export function FleetRosterOnScreen({ owner }: { owner: string }) {
  const roster = useFleetRoster(owner)
  return roster ? <FleetRosterSequence roster={roster} /> : null
}

function FleetRosterSequence({ roster }: { roster: FleetRoster }) {
  const frames = useMemo(() => fleetSequence(roster), [roster])
  const entries = useMemo(() => fleetShips(roster), [roster])
  const { frame, index } = useFramePlayback(frames)
  const intro = !frames.slice(0, index + 1).some((step) => step.move)
  const exploding = entries.find(({ ship }) => frame.ships[ship.key] === 'exploding')

  const columns = roster.sides.map((_, side) => shipsInColumn(entries, frame, side))
  const shown = entries.filter(({ ship }) => frame.ships[ship.key] !== 'hidden')
  const lost = shown.filter(({ ship }) => frame.ships[ship.key] === 'destroyed').length
  const staged = allMarkers(entries).filter(({ marker }) => frame.markers[marker.id] === 'staged')

  return (
    <div className="absolute inset-0 flex flex-col gap-[3vh] overflow-hidden bg-[radial-gradient(ellipse_at_top,rgb(30_58_95)_0%,rgb(8_12_24)_65%)] px-[5vw] py-[5vh]">
      <DefectionStagger frame={frame} entries={entries} />
      {exploding ? (
        <div
          key={exploding.ship.key}
          aria-hidden
          className="fleet-flash pointer-events-none absolute inset-0 z-10"
        />
      ) : null}

      <header className="fleet-title flex flex-wrap items-end justify-between gap-x-[3vw] gap-y-[1vh]">
        <div>
          <p className="text-[clamp(0.9rem,1.8vh,1.5rem)] font-semibold tracking-[0.3em] text-white/50 uppercase">
            Fleet roster
          </p>
          <h1 className="text-[clamp(2rem,6vh,5rem)] leading-none font-bold tracking-tight">
            {roster.owner.name} battle-cruisers
          </h1>
        </div>
        <p className="text-[clamp(1rem,2.6vh,2rem)] text-white/70 tabular-nums">
          {shown.length} ships ·{' '}
          <span className="text-white">{shown.length - lost} in service</span> ·{' '}
          <span className="text-white/50">{lost} lost</span>
        </p>
      </header>

      <div className="flex min-h-[clamp(2.5rem,6vh,5rem)] items-center gap-[1.5vw]">
        {frame.caption ? (
          <p
            key={frame.caption}
            className="fleet-caption text-[clamp(1.5rem,4.2vh,3.6rem)] font-semibold tracking-tight text-amber-200 [text-shadow:0_0_40px_rgb(251_191_36/0.45)]"
          >
            {frame.caption}
          </p>
        ) : null}
        {staged.map(({ marker }) => (
          <span key={marker.id} className="fleet-caption text-[clamp(1.2rem,3.4vh,2.8rem)]">
            <AboardMarker marker={marker} />
          </span>
        ))}
      </div>

      <ol aria-label="Control of every ship" className="flex h-[1.6vh] min-h-3 gap-[0.3vw]">
        {columns.flat().map(({ ship }, order) => (
          <li
            key={ship.key}
            title={ship.name}
            style={
              {
                viewTransitionName: `fleet-bar-${ship.key}`,
                animationDelay: `${order * FLEET_TIMING.buildStagger}ms`,
              } as CSSProperties
            }
            className={cn(
              'flex-1 rounded-full transition-opacity duration-500',
              toneOf(frame.sideOf[ship.key] ?? 0).bar,
              intro && 'fleet-bar-build',
              frame.ships[ship.key] === 'destroyed' && 'opacity-25',
            )}
          />
        ))}
      </ol>

      <div
        className="grid min-h-0 flex-1 gap-[3vw]"
        style={{ gridTemplateColumns: `repeat(${roster.sides.length}, minmax(0, 1fr))` }}
      >
        {roster.sides.map((side, index) => {
          const ships = columns[index]!
          const tone = toneOf(index)
          const inService = ships.filter(({ ship }) => frame.ships[ship.key] !== 'destroyed')
          // Before any side has seized ships, the owner's column spans the screen in sub-columns,
          // so every row keeps the height it will have once the fleet is split.
          const spans = index === 0 && frame.sidesShown === 1 ? roster.sides.length : 1
          return (
            <section
              key={side.key}
              aria-label={side.name}
              className={cn(
                'flex min-h-0 flex-col gap-[2vh] rounded-3xl bg-black/40 p-[2vw] ring-1 transition-all duration-700',
                tone.ring,
                tone.glow,
                index < frame.sidesShown ? 'opacity-100' : 'hidden',
              )}
              style={spans > 1 ? { gridColumn: '1 / -1' } : undefined}
            >
              <header className="flex items-center justify-between gap-[1vw]">
                <h2
                  className={cn(
                    'flex min-w-0 items-center gap-[0.8vw] text-[clamp(1.5rem,4vh,3.5rem)] leading-tight font-bold',
                    tone.text,
                  )}
                >
                  <OrganizationIcon icon={side.icon} className="size-[1em]" />
                  <span className="truncate">{side.name}</span>
                </h2>
                <p className="shrink-0 text-right text-[clamp(1rem,2.4vh,1.9rem)] leading-tight tabular-nums">
                  <span className="font-bold text-white">{inService.length}</span>
                  <span className="text-white/60"> in service</span>
                  <br />
                  <span className="text-white/50">{ships.length - inService.length} lost</span>
                </p>
              </header>
              <ul
                className="grid min-h-0 flex-1 auto-rows-fr gap-x-[3vw] gap-y-[1vh]"
                style={{ gridTemplateColumns: `repeat(${spans}, minmax(0, 1fr))` }}
              >
                {ships.map((entry, order) => (
                  <FleetShipRow
                    key={entry.ship.key}
                    entry={entry}
                    frame={frame}
                    intro={intro}
                    order={order}
                  />
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      {roster.building.length > 0 ? (
        <footer
          className={cn(
            'flex flex-wrap items-center gap-x-[2vw] gap-y-[1vh] rounded-2xl bg-amber-400/10 px-[2vw] py-[1.5vh] text-[clamp(1rem,2.6vh,2rem)] ring-1 ring-amber-400/30 transition-all duration-1000',
            frame.building ? 'opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <span className="flex items-center gap-[0.8vw] font-semibold text-amber-300">
            <Construction className="size-[1.2em]" aria-hidden />
            {ITEM_STATUS_LABELS['under-construction']}
          </span>
          {roster.building.map((ship) => (
            <span key={ship.key} className="flex items-center gap-[0.6vw]">
              <ItemIcon icon={ship.icon} className="size-[1.1em] text-amber-200" />
              {ship.name}
            </span>
          ))}
        </footer>
      ) : null}
    </div>
  )
}

function FleetShipRow({
  entry: { ship },
  frame,
  intro,
  order,
}: {
  entry: FleetShipEntry
  frame: FleetFrame
  intro: boolean
  order: number
}) {
  const phase = frame.ships[ship.key]
  const lost = phase === 'destroyed'
  const tone = toneOf(frame.sideOf[ship.key] ?? 0)
  const aboard = ship.aboard.filter((marker) => frame.markers[marker.id] === 'aboard')
  return (
    <li
      style={
        {
          viewTransitionName: `fleet-ship-${ship.key}`,
          viewTransitionClass: 'fleet-ship',
          animationDelay: intro ? `${order * FLEET_TIMING.buildStagger}ms` : undefined,
        } as CSSProperties
      }
      className={cn(
        'flex min-h-0 items-center gap-[1vw] rounded-xl px-[1vw] text-[clamp(1rem,2.6vh,2.1rem)] transition-colors duration-500',
        lost ? 'bg-white/[0.03] text-white/35' : 'bg-white/10 text-white',
        phase === 'hidden' && 'opacity-0',
        phase === 'shown' && intro && 'fleet-build',
        phase === 'exploding' && 'fleet-explode',
      )}
    >
      <ItemIcon
        icon={ship.icon}
        className={cn('size-[1.2em]', lost ? 'text-white/30' : tone.text)}
      />
      <span className={cn('min-w-0 flex-1 truncate font-medium', lost && 'line-through')}>
        {ship.name}
      </span>
      {aboard.map((marker) => (
        <AboardMarker key={marker.id} marker={marker} />
      ))}
      {lost ? (
        <span className="fleet-lost flex shrink-0 items-center gap-[0.4vw] text-[0.7em] tracking-wider uppercase">
          <Skull className="size-[1.1em]" aria-hidden />
          {ITEM_STATUS_LABELS.destroyed}
        </span>
      ) : null}
    </li>
  )
}

/** A pin on a ship row: the portraits of whoever is aboard, named only for screen readers. */
function AboardMarker({ marker }: { marker: FleetMarker }) {
  return (
    <span
      title={marker.label}
      style={
        {
          viewTransitionName: `fleet-marker-${marker.id.replace(':', '-')}`,
          viewTransitionClass: 'fleet-ship',
        } as CSSProperties
      }
      className="flex shrink-0 items-center rounded-full bg-emerald-400 p-[0.15em] shadow-[0_0_30px_rgb(52_211_153/0.6)]"
    >
      <span className="sr-only">{marker.label}</span>
      {marker.avatars.length > 0 ? (
        marker.avatars.map((avatar, index) => (
          <Avatar
            key={avatar}
            src={avatar}
            sizes="64px"
            maxWidth={128}
            loading="eager"
            className={cn('size-[1.5em] ring-2 ring-emerald-400', index > 0 && '-ml-[0.45em]')}
          />
        ))
      ) : (
        <span className="grid size-[1.5em] place-items-center rounded-full bg-black/15 text-black">
          <Users className="size-[0.9em]" aria-hidden />
        </span>
      )}
    </span>
  )
}

/**
 * During a defection sweep, ships leave one after another rather than all at once: each moving
 * ship's view transition starts a little after the one before it.
 */
function DefectionStagger({ frame, entries }: { frame: FleetFrame; entries: FleetShipEntry[] }) {
  if (frame.sweep === undefined) return null
  const moving = entries.filter(({ side }) => side === frame.sweep)
  const css = moving
    .map(({ ship }, index) => {
      const names = [`fleet-ship-${ship.key}`, `fleet-bar-${ship.key}`]
      const selectors = names.flatMap((name) => [
        `::view-transition-group(${name})`,
        `::view-transition-old(${name})`,
        `::view-transition-new(${name})`,
      ])
      return `${selectors.join(',')}{animation-delay:${index * FLEET_TIMING.defectStagger}ms}`
    })
    .join('')
  return <style>{css}</style>
}

/** The ships a column holds in this frame: alphabetical before the war, final order after it. */
function shipsInColumn(
  entries: readonly FleetShipEntry[],
  frame: FleetFrame,
  side: number,
): FleetShipEntry[] {
  const here = entries.filter(({ ship }) => frame.sideOf[ship.key] === side)
  return frame.settled ? here : here.toSorted((a, b) => a.ship.name.localeCompare(b.ship.name))
}

function allMarkers(entries: readonly FleetShipEntry[]) {
  return entries.flatMap(({ ship }) => ship.aboard.map((marker) => ({ marker, ship })))
}

/**
 * Steps through the frames on their schedule. A frame that moves ships is applied inside a view
 * transition, so each ship slides from its old place to its new one. Reduced motion shows the
 * final frame straight away. R replays the sequence.
 */
function useFramePlayback(frames: readonly FleetFrame[]): { frame: FleetFrame; index: number } {
  const last = frames.length - 1
  const [index, setIndex] = useState(() => (prefersReducedMotion() ? last : 0))
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIndex(last)
      return
    }
    setIndex(0)
    const timers = frames.slice(1).map((frame, offset) =>
      window.setTimeout(() => {
        const apply = () => flushSync(() => setIndex(offset + 1))
        if (frame.move && 'startViewTransition' in document) document.startViewTransition(apply)
        else apply()
      }, frame.at),
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [frames, last, run])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'r' || event.key === 'R') setRun((value) => value + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return { frame: frames[Math.min(index, last)]!, index: Math.min(index, last) }
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
