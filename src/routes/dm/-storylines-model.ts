import type { Arc } from '#/definitions/arc'
import type { EntityRef } from '#/definitions/kind'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveSourceRef } from '#/lib/dm-campaign'

/** Prototype only: derives everything from arcs, sessions and events. Nothing here is stored. */

type SourceEvent = { name: string; location: EntityRef }
type SourceSession = { name: string; number: number; events: EntityRef[] }
type SourceLocation = { name: string; type?: string; parent?: EntityRef }

const EVENTS = SOURCE_REGISTRIES.event as unknown as Record<string, SourceEvent>
const SESSIONS = SOURCE_REGISTRIES.session as unknown as Record<string, SourceSession>
const LOCATIONS = SOURCE_REGISTRIES.location as unknown as Record<string, SourceLocation>

export type SessionColumn = { key: string; number: number; name: string }

export type Stop = {
  session: number
  events: string[]
  plots: string[]
  lane: string
}

export type Storyline = {
  key: string
  arc: Arc
  color: string
  stops: Stop[]
  first: number
  last: number
  next: Arc['plots'][number][]
  crossings: { arcKey: string; events: string[] }[]
}

export type Lane = { key: string; name: string }

export const sessionColumns: SessionColumn[] = Object.entries(SESSIONS)
  .map(([key, session]) => ({ key, number: session.number, name: session.name }))
  .toSorted((a, b) => a.number - b.number)

const sessionOfEvent = new Map<string, number>()
for (const session of Object.values(SESSIONS)) {
  for (const event of session.events) sessionOfEvent.set(event.key, session.number)
}

export function eventName(key: string) {
  return EVENTS[key]?.name ?? key
}

export function eventSlug(key: string) {
  return resolveSourceRef({ ref: 'event', key })?.slug
}

/** The settlement (or the top-level place, when there is none) an event happened in. */
export function laneOfLocation(key: string): string {
  const chain: string[] = []
  let current: string | undefined = key
  while (current) {
    chain.unshift(current)
    current = LOCATIONS[current]?.parent?.key
  }
  const below = chain.slice(1)
  const settlement = below.findLast((k) => LOCATIONS[k]?.type === 'settlement')
  return settlement ?? below[0] ?? key
}

export function locationName(key: string) {
  return LOCATIONS[key]?.name ?? key
}

const PALETTE = [
  '#e6194b',
  '#3cb44b',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#0f9fb0',
  '#d03fc4',
  '#7a9a01',
  '#c8102e',
  '#008080',
  '#9a6324',
  '#5b2a86',
  '#b8860b',
  '#000075',
  '#2f855a',
  '#c05621',
  '#6b46c1',
  '#2b6cb0',
  '#9b2c2c',
  '#4a5568',
]

export function buildStorylines(arcs: Readonly<Record<string, Arc>>): Storyline[] {
  const arcsOfEvent = new Map<string, Set<string>>()
  for (const [arcKey, arc] of Object.entries(arcs)) {
    for (const plot of arc.plots) {
      for (const event of plot.events) {
        const set = arcsOfEvent.get(event.key) ?? new Set()
        set.add(arcKey)
        arcsOfEvent.set(event.key, set)
      }
    }
  }

  const lines = Object.entries(arcs).map(([key, arc]) => {
    const bySession = new Map<number, { events: string[]; plots: Set<string>; lanes: string[] }>()
    for (const plot of arc.plots) {
      for (const event of plot.events) {
        const session = sessionOfEvent.get(event.key)
        if (session === undefined) continue
        const stop = bySession.get(session) ?? { events: [], plots: new Set(), lanes: [] }
        stop.events.push(event.key)
        stop.plots.add(plot.name)
        const location = EVENTS[event.key]?.location.key
        if (location) stop.lanes.push(laneOfLocation(location))
        bySession.set(session, stop)
      }
    }
    const stops: Stop[] = [...bySession.entries()]
      .toSorted(([a], [b]) => a - b)
      .map(([session, stop]) => ({
        session,
        events: stop.events,
        plots: [...stop.plots],
        lane: mostCommon(stop.lanes),
      }))

    const crossings = new Map<string, string[]>()
    for (const stop of stops) {
      for (const event of stop.events) {
        for (const other of arcsOfEvent.get(event) ?? []) {
          if (other === key) continue
          crossings.set(other, [...(crossings.get(other) ?? []), event])
        }
      }
    }

    return {
      key,
      arc,
      stops,
      first: stops[0]?.session ?? Infinity,
      last: stops.at(-1)?.session ?? -Infinity,
      next: arc.plots.filter((plot) => plot.status === 'open'),
      crossings: [...crossings.entries()].map(([arcKey, events]) => ({ arcKey, events })),
    }
  })

  return lines
    .toSorted((a, b) => a.first - b.first || a.last - b.last)
    .map((line, index) => Object.assign(line, { color: PALETTE[index % PALETTE.length]! }))
}

/** Lanes in the order the story first reaches them. */
export function lanesInOrder(storylines: readonly Storyline[]): Lane[] {
  const firstSeen = new Map<string, number>()
  for (const line of storylines) {
    for (const stop of line.stops) {
      firstSeen.set(stop.lane, Math.min(firstSeen.get(stop.lane) ?? Infinity, stop.session))
    }
  }
  return [...firstSeen.entries()]
    .toSorted(([, a], [, b]) => a - b)
    .map(([key]) => ({ key, name: locationName(key) }))
}

function mostCommon(values: readonly string[]): string {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return [...counts.entries()].toSorted(([, a], [, b]) => b - a)[0]?.[0] ?? ''
}
