import type { Arc } from '#/definitions/arc'
import type { EntityRef } from '#/definitions/kind'
import { collectReferences } from '#/lib/campaign-read-model'
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
export const PALETTE = [
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
 * Give each storyline a column, handed out from the top of the graph down, the way git log does.
 * Open arcs come first, the one played most recently taking the first column, so an arc that has
 * gone quiet drifts to the edge. Among free columns, an arc prefers one next to the arcs it shares
 * events with. A column frees up below the arc using it, for an older arc to reuse.
 */
export function assignColumns(storylines: readonly Storyline[]): Map<string, number> {
  const top = (line: Storyline) =>
    line.next.length > 0 ? Number.POSITIVE_INFINITY : (line.last ?? line.first ?? 0)
  const ordered = storylines.toSorted(
    (a, b) =>
      top(b) - top(a) ||
      (b.last ?? b.first ?? 0) - (a.last ?? a.first ?? 0) ||
      (b.first ?? 0) - (a.first ?? 0),
  )
  const busyDownTo: number[] = []
  const columns = new Map<string, number>()
  for (const line of ordered) {
    const partners = line.crossings
      .map((crossing) => columns.get(crossing.arcKey))
      .filter((column): column is number => column !== undefined)
    const distance = (column: number) =>
      partners.length === 0 ? 0 : Math.min(...partners.map((p) => Math.abs(p - column)))
    const free = busyDownTo.flatMap((from, column) => (from > top(line) ? [column] : []))
    const column = [...free, busyDownTo.length].toSorted(
      (a, b) => a - b || distance(a) - distance(b),
    )[0]!
    busyDownTo[column] = line.first ?? 0
    columns.set(line.key, column)
  }
  return columns
}

/** The arc a storyline split off from: an older arc that shares an event with its first stop. */
export function branchParents(storylines: readonly Storyline[]): Map<string, string> {
  const parents = new Map<string, string>()
  for (const line of storylines) {
    const firstStop = line.stops[0]
    if (!firstStop || line.first === undefined) continue
    let best: { key: string; shared: number } | undefined
    for (const crossing of line.crossings) {
      const other = storylines.find((l) => l.key === crossing.arcKey)
      if (!other || other.first === undefined || other.first >= line.first) continue
      const shared = crossing.events.filter((event) => firstStop.events.includes(event)).length
      if (shared > 0 && (!best || shared > best.shared)) best = { key: other.key, shared }
    }
    if (best) parents.set(line.key, best.key)
  }
  return parents
}

/** How many sessions an arc has been running, and how many since it was last played. */
export function arcAge(line: Storyline, latest: number) {
  return {
    open: line.first === undefined ? 0 : latest - line.first + 1,
    quiet: latest - (line.last ?? line.first ?? latest),
  }
}

/** A record a storyline can be filtered on, written `kind:key` so it fits in a URL. */
export type FocusKey = `${EntityRef['ref']}:${string}`

export function focusKey(ref: EntityRef): FocusKey {
  return `${ref.ref}:${ref.key}`
}

export function parseFocusKey(value: string): EntityRef | undefined {
  const [ref, key] = value.split(':')
  if (!ref || !key || !Object.hasOwn(SOURCE_REGISTRIES, ref)) return undefined
  return { ref: ref as EntityRef['ref'], key }
}

/**
 * Everything a storyline touches: the records its arc and plots name, everything its played
 * events reference (DM-only fields included), and every place those events happened in, up the
 * location tree, so focusing on Skynet also finds what happened at the inn.
 */
export function storylineReferences(line: Storyline): Set<FocusKey> {
  const events = SOURCE_REGISTRIES.event as Record<string, object>
  const locations = SOURCE_REGISTRIES.location as Record<string, SourceLocation>
  const found = new Set<FocusKey>()
  const add = (ref: EntityRef) => {
    found.add(focusKey(ref))
    if (ref.ref !== 'location') return
    for (let key = locations[ref.key]?.parent?.key; key; key = locations[key]?.parent?.key) {
      found.add(`location:${key}`)
    }
  }
  for (const ref of collectReferences(line.arc)) add(ref)
  for (const stop of line.stops) {
    for (const event of stop.events) {
      for (const ref of collectReferences(events[event])) add(ref)
    }
  }
  return found
}

export type StorylineFilters = {
  /** Only storylines that touch this record. */
  focus?: EntityRef
  /** Only storylines that still have open plots. */
  openOnly?: boolean
  /** Only the most recent sessions. Older rows are left out, and lines run off the bottom. */
  recent?: number
  /** Only open storylines that have been running for at least this many sessions. */
  longerThan?: number
  /** Only open storylines that have not been played for at least this many sessions. */
  quietFor?: number
}

/** Which storylines match the filters, and which sessions to show. */
export function applyStorylineFilters(
  storylines: readonly Storyline[],
  sessions: readonly StorylineSession[],
  { focus, openOnly, recent, longerThan, quietFor }: StorylineFilters,
): { matching: Set<string>; sessions: StorylineSession[] } {
  const shown = recent ? sessions.slice(-recent) : [...sessions]
  const latest = sessions.at(-1)?.number ?? 0
  const age = (line: Storyline) => arcAge(line, latest)
  const oldest = shown[0]?.number ?? 0
  const wanted = focus ? focusKey(focus) : undefined
  const matching = new Set(
    storylines
      .filter((line) => !(openOnly || longerThan || quietFor) || line.next.length > 0)
      .filter((line) => !longerThan || age(line).open >= longerThan)
      .filter((line) => !quietFor || age(line).quiet >= quietFor)
      .filter((line) => line.next.length > 0 || (line.last ?? -1) >= oldest)
      .filter((line) => !wanted || storylineReferences(line).has(wanted))
      .map((line) => line.key),
  )
  return { matching, sessions: shown }
}

/** Every record the storylines touch, for the focus picker. The world itself is left out. */
export function focusOptions(storylines: readonly Storyline[]): EntityRef[] {
  const keys = new Set<FocusKey>()
  for (const line of storylines) for (const key of storylineReferences(line)) keys.add(key)
  return [...keys]
    .map((key) => parseFocusKey(key))
    .filter((ref): ref is EntityRef => ref !== undefined)
    .filter((ref) => ref.ref !== 'event' && ref.ref !== 'session')
    .filter(
      (ref) =>
        (SOURCE_REGISTRIES.location as Record<string, SourceLocation>)[ref.key]?.parent ||
        ref.ref !== 'location',
    )
}
