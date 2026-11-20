import type { FleetMarker, FleetRoster, FleetShip } from './fleet-roster'

/** How a ship looks at one moment of the sequence. */
export type ShipPhase = 'hidden' | 'shown' | 'exploding' | 'destroyed'

/** Where a tracked marker is: not yet on screen, waiting under the caption, or aboard its ship. */
export type MarkerPhase = 'hidden' | 'staged' | 'aboard'

/** What the fleet roster shows at one moment of its opening sequence. */
export type FleetFrame = {
  /** Milliseconds after the roster appears. */
  at: number
  caption: string
  /** Which side, by index into the roster's sides, holds each ship. */
  sideOf: Record<string, number>
  ships: Record<string, ShipPhase>
  markers: Record<string, MarkerPhase>
  /** How many side columns have their heading on screen. */
  sidesShown: number
  /** Ships in service ahead of lost ones; before the war every column is alphabetical. */
  settled: boolean
  /** Show the ships still being built. */
  building: boolean
  /** Animate this change by moving every ship from where it was to where it is now. */
  move: boolean
  /** The side whose ships are changing hands in this frame, one after another. */
  sweep?: number
}

export type FleetShipEntry = { side: number; ship: FleetShip }

/** Every ship in the roster's sides, with the side that holds it at the end. */
export function fleetShips(roster: FleetRoster): FleetShipEntry[] {
  return roster.sides.flatMap((side, index) => side.ships.map((ship) => ({ side: index, ship })))
}

export const FLEET_TIMING = {
  /** Gap between ships appearing during the build-up. */
  buildStagger: 140,
  /** Gap between ships starting to defect, within one sweep. */
  defectStagger: 110,
  defectDuration: 900,
  explode: 450,
  hold: 1600,
} as const

/**
 * The roster's opening sequence: the whole fleet builds up under its owner, the rival sides take
 * their ships, the tracked party boards, ships are lost one by one, alternating sides, and the
 * columns settle into the roster's final state. The last frame always equals the final roster.
 */
export function fleetSequence(roster: FleetRoster): FleetFrame[] {
  const entries = fleetShips(roster)
  const markers = entries.flatMap(({ ship }) => ship.aboard.map((marker) => ({ marker, ship })))
  const party = markers.find(({ marker }) => marker.id === 'party')
  const others = markers.filter((entry) => entry !== party)
  const owner = roster.owner.name
  const t = FLEET_TIMING

  const frames: FleetFrame[] = []
  let at = 0
  let frame: FleetFrame = {
    at,
    caption: '',
    sideOf: Object.fromEntries(entries.map(({ ship }) => [ship.key, 0])),
    ships: Object.fromEntries(entries.map(({ ship }) => [ship.key, 'hidden' as ShipPhase])),
    markers: Object.fromEntries(markers.map(({ marker }) => [marker.id, 'hidden' as MarkerPhase])),
    sidesShown: 1,
    settled: false,
    building: false,
    move: false,
  }
  const push = (delay: number, change: Partial<Omit<FleetFrame, 'at'>>) => {
    at += delay
    frame = { ...frame, ...change, at, move: change.move ?? false, sweep: change.sweep }
    frames.push(frame)
  }

  // The build-up: every ship takes its place under the owner, staggered by the screen itself.
  push(0, {
    caption: `The ${owner} fleet: ${entries.length} battle-cruisers`,
    ships: Object.fromEntries(entries.map(({ ship }) => [ship.key, 'shown' as ShipPhase])),
  })
  at += entries.length * t.buildStagger
  if (others.length > 0) {
    push(t.hold / 2, {
      markers: {
        ...frame.markers,
        ...ids(
          others.map(({ marker }) => marker),
          'aboard',
        ),
      },
    })
  }

  // The defection: each rival side takes its ships in one sweep.
  roster.sides.forEach((side, index) => {
    if (index === 0) return
    const taken = entries.filter((entry) => entry.side === index)
    push(t.hold, {
      caption: `${side.name} seizes ${countWord(taken.length)}`,
      sidesShown: index + 1,
      sweep: index,
      sideOf: {
        ...frame.sideOf,
        ...Object.fromEntries(taken.map(({ ship }) => [ship.key, index])),
      },
      move: true,
    })
    at += t.defectDuration + taken.length * t.defectStagger
  })

  // The boarding.
  if (party) {
    push(t.hold, {
      caption: `${party.marker.label} boards ${party.ship.name}`,
      markers: { ...frame.markers, [party.marker.id]: 'staged' },
    })
    push(t.hold, { markers: { ...frame.markers, [party.marker.id]: 'aboard' }, move: true })
  }

  // The war: losses alternate between the sides until every lost ship is gone.
  const losses = interleave(
    roster.sides.map((_, index) =>
      entries.filter((entry) => entry.side === index && entry.ship.status === 'destroyed'),
    ),
  )
  if (losses.length > 0) {
    push(t.hold, { caption: 'The fleet turns on itself' })
    for (const { ship } of losses) {
      push(t.explode, { ships: { ...frame.ships, [ship.key]: 'exploding' } })
      push(t.explode, { ships: { ...frame.ships, [ship.key]: 'destroyed' } })
    }
  }

  const remaining = entries.length - losses.length
  push(t.hold, {
    caption: `${capitalize(countWord(remaining))} ${remaining === 1 ? 'remains' : 'remain'}`,
    settled: true,
    move: true,
  })
  if (roster.building.length > 0) {
    push(t.hold, {
      caption: `…and ${countWord(roster.building.length)} more is being built`,
      building: true,
    })
  }
  return frames
}

function ids(markers: readonly FleetMarker[], phase: MarkerPhase): Record<string, MarkerPhase> {
  return Object.fromEntries(markers.map((marker) => [marker.id, phase]))
}

/** Takes one from each list in turn, so neither side loses all its ships first. */
function interleave<T>(lists: readonly (readonly T[])[]): T[] {
  const longest = Math.max(0, ...lists.map((list) => list.length))
  return Array.from({ length: longest }, (_, index) =>
    lists.flatMap((list) => (index < list.length ? [list[index]!] : [])),
  ).flat()
}

const WORDS = [
  'none',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
] as const

function countWord(count: number): string {
  return WORDS[count] ?? String(count)
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
