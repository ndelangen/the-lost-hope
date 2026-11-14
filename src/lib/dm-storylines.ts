import type { Arc } from '#/definitions/arc'
import type { EntityRef } from '#/definitions/kind'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'

/**
 * The storyline map is derived entirely from arcs, sessions and events: an arc runs through
 * the sessions its plot events were played in, two arcs cross where they share an event, and
 * an arc's open plots are where it might lead next. Nothing here is stored.
 */

export type StorylineSession = {
  key: string
  number: number
  name: string
  events: readonly EntityRef[]
}

export type Stop = {
  session: number
  events: string[]
  plots: string[]
  /** The settlement (or top-level place) most of this stop's events happened in. */
  place: string | undefined
}

export type Crossing = { arcKey: string; events: string[] }

export type Storyline = {
  key: string
  arc: Arc
  color: string
  stops: Stop[]
  first: number | undefined
  last: number | undefined
  next: Arc['plots'][number][]
  crossings: Crossing[]
}

/** Distinct line colours, assigned in the order arcs start. They repeat after twenty arcs. */
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

type SourceSession = { name: string; number: number; events: EntityRef[] }
type SourceLocation = { parent?: EntityRef; type?: string }

/** Every session in play order, from the full campaign source. */
export function campaignSessionsInOrder(): StorylineSession[] {
  return Object.entries(SOURCE_REGISTRIES.session as Record<string, SourceSession>)
    .map(([key, session]) => ({
      key,
      number: session.number,
      name: session.name,
      events: session.events,
    }))
    .toSorted((a, b) => a.number - b.number)
}

/** The settlement a location sits in, or the top-level place when it is not in a settlement. */
export function placeOf(locationKey: string): string {
  const locations = SOURCE_REGISTRIES.location as Record<string, SourceLocation>
  const chain: string[] = []
  for (let key: string | undefined = locationKey; key; key = locations[key]?.parent?.key) {
    chain.unshift(key)
  }
  const belowRoot = chain.slice(1)
  return (
    belowRoot.findLast((key) => locations[key]?.type === 'settlement') ??
    belowRoot[0] ??
    locationKey
  )
}

function eventLocation(eventKey: string): string | undefined {
  return (SOURCE_REGISTRIES.event as Record<string, { location: EntityRef }>)[eventKey]?.location
    .key
}

export function buildStorylines(
  arcs: Readonly<Record<string, Arc>>,
  sessions: readonly StorylineSession[] = campaignSessionsInOrder(),
  locationOf: (eventKey: string) => string | undefined = eventLocation,
): Storyline[] {
  const sessionOfEvent = new Map<string, number>()
  for (const session of sessions) {
    for (const event of session.events) sessionOfEvent.set(event.key, session.number)
  }

  const arcsOfEvent = new Map<string, Set<string>>()
  for (const [arcKey, arc] of Object.entries(arcs)) {
    for (const plot of arc.plots) {
      for (const event of plot.events) {
        arcsOfEvent.set(event.key, (arcsOfEvent.get(event.key) ?? new Set()).add(arcKey))
      }
    }
  }

  const lines = Object.entries(arcs).map(([key, arc]) => {
    const bySession = new Map<number, { events: string[]; plots: Set<string>; places: string[] }>()
    for (const plot of arc.plots) {
      for (const event of plot.events) {
        const session = sessionOfEvent.get(event.key)
        if (session === undefined) continue
        const stop = bySession.get(session) ?? { events: [], plots: new Set(), places: [] }
        stop.events.push(event.key)
        stop.plots.add(plot.name)
        const location = locationOf(event.key)
        if (location) stop.places.push(placeOf(location))
        bySession.set(session, stop)
      }
    }
    const stops: Stop[] = [...bySession.entries()]
      .toSorted(([a], [b]) => a - b)
      .map(([session, stop]) => ({
        session,
        events: stop.events,
        plots: [...stop.plots],
        place: mostCommon(stop.places),
      }))

    const crossings = new Map<string, string[]>()
    for (const event of stops.flatMap((stop) => stop.events)) {
      for (const other of arcsOfEvent.get(event) ?? []) {
        if (other !== key) crossings.set(other, [...(crossings.get(other) ?? []), event])
      }
    }

    return {
      key,
      arc,
      color: '',
      stops,
      first: stops[0]?.session,
      last: stops.at(-1)?.session,
      next: arc.plots.filter((plot) => plot.status === 'open'),
      crossings: [...crossings.entries()].map(([arcKey, events]) => ({ arcKey, events })),
    }
  })

  const sorted = lines.toSorted(
    (a, b) => order(a.first) - order(b.first) || order(a.last) - order(b.last),
  )
  for (const [index, line] of sorted.entries()) line.color = PALETTE[index % PALETTE.length]!
  return sorted
}

/** Arcs that have not been played yet sort last. */
function order(session: number | undefined) {
  return session ?? Number.POSITIVE_INFINITY
}

function mostCommon(values: readonly string[]): string | undefined {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return [...counts.entries()].toSorted(([, a], [, b]) => b - a)[0]?.[0]
}

/**
 * Give each storyline a column, like branches in a git graph. A storyline holds its column from
 * its first session until its last one, or for good while it still has open plots. When it ends,
 * a later storyline can reuse the column.
 */
export function assignColumns(storylines: readonly Storyline[]): Map<string, number> {
  const busyUntil: number[] = []
  const columns = new Map<string, number>()
  for (const line of storylines) {
    const start = line.first ?? Number.POSITIVE_INFINITY
    const end = line.next.length > 0 ? Number.POSITIVE_INFINITY : (line.last ?? start)
    let column = busyUntil.findIndex((until) => until < start)
    if (column === -1) column = busyUntil.length
    busyUntil[column] = end
    columns.set(line.key, column)
  }
  return columns
}
