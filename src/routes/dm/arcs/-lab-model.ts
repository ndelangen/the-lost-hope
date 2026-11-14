/** Prototype only: derivations for the six storyline-graph variants. Nothing here is stored. */
import type { Arc } from '#/definitions/arc'
import type { EntityRef } from '#/definitions/kind'
import { collectReferences } from '#/lib/campaign-read-model'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { type Storyline, type StorylineSession, placeOf } from '#/lib/dm-storylines'

export type LabLine = Storyline & {
  /** Who mode: the person this line follows. */
  person?: EntityRef
  /** Bundles only: the storylines folded into this one. */
  members?: string[]
}

type SourceLocation = { name: string; parent?: EntityRef }
const LOCATIONS = SOURCE_REGISTRIES.location as unknown as Record<string, SourceLocation>
const EVENTS = SOURCE_REGISTRIES.event as unknown as Record<string, { name: string }>

export function eventName(key: string) {
  return EVENTS[key]?.name ?? key
}

/** The arc a storyline split off from: an earlier arc that shares an event with its first stop. */
export function branchParents(lines: readonly Storyline[]): Map<string, string> {
  const parents = new Map<string, string>()
  for (const line of lines) {
    const firstStop = line.stops[0]
    if (!firstStop || line.first === undefined) continue
    let best: { key: string; shared: number } | undefined
    for (const crossing of line.crossings) {
      const other = lines.find((l) => l.key === crossing.arcKey)
      if (!other || other.first === undefined || other.first >= line.first) continue
      const shared = crossing.events.filter((event) => firstStop.events.includes(event)).length
      if (shared > 0 && (!best || shared > best.shared)) best = { key: other.key, shared }
    }
    if (best) parents.set(line.key, best.key)
  }
  return parents
}

/**
 * Columns like a git client lays out lanes: a storyline takes a free column when it starts, and
 * prefers the free column nearest the storylines it shares events with, so connectors stay short.
 */
export function relatedColumns(lines: readonly Storyline[]): Map<string, number> {
  const busyUntil: number[] = []
  const columns = new Map<string, number>()
  for (const line of lines) {
    const start = line.first ?? Number.POSITIVE_INFINITY
    const end = line.next.length > 0 ? Number.POSITIVE_INFINITY : (line.last ?? start)
    const partners = line.crossings
      .map((crossing) => columns.get(crossing.arcKey))
      .filter((column): column is number => column !== undefined)
    const free = busyUntil.flatMap((until, column) => (until < start ? [column] : []))
    const candidates = [...free, busyUntil.length]
    const distance = (column: number) =>
      partners.length === 0 ? column : Math.min(...partners.map((p) => Math.abs(p - column)))
    const column = candidates.toSorted((a, b) => distance(a) - distance(b) || a - b)[0]!
    busyUntil[column] = end
    columns.set(line.key, column)
  }
  return columns
}

/** The top-level place a storyline mostly happened in, for bundling. */
function regionOf(line: Storyline): string {
  const place = line.stops.at(-1)?.place
  if (!place) return 'elsewhere'
  const chain: string[] = []
  for (let key: string | undefined = place; key; key = LOCATIONS[key]?.parent?.key)
    chain.unshift(key)
  return chain[1] ?? chain[0] ?? 'elsewhere'
}

/** Finished storylines folded into one line per region; open ones stay as they are. */
export function bundleFinished(
  lines: readonly Storyline[],
  expanded: ReadonlySet<string>,
): LabLine[] {
  const groups = new Map<string, Storyline[]>()
  for (const line of lines) {
    if (line.next.length > 0) continue
    const region = regionOf(line)
    groups.set(region, [...(groups.get(region) ?? []), line])
  }
  const out: LabLine[] = []
  const done = new Set<string>()
  for (const line of lines) {
    if (line.next.length > 0) {
      out.push(line)
      continue
    }
    const region = regionOf(line)
    const members = groups.get(region)!
    const key = `bundle:${region}`
    if (members.length < 2 || expanded.has(key)) {
      out.push(line)
      continue
    }
    if (done.has(key)) continue
    done.add(key)
    const memberKeys = new Set(members.map((m) => m.key))
    const bySession = new Map<number, { events: string[]; plots: string[] }>()
    for (const member of members) {
      for (const stop of member.stops) {
        const merged = bySession.get(stop.session) ?? { events: [], plots: [] }
        merged.events.push(...stop.events)
        merged.plots.push(member.arc.name)
        bySession.set(stop.session, merged)
      }
    }
    const stops = [...bySession.entries()]
      .toSorted(([a], [b]) => a - b)
      .map(([session, stop]) => ({
        session,
        events: stop.events,
        plots: stop.plots,
        place: undefined,
      }))
    out.push({
      key,
      color: '#8a8f98',
      arc: stubArc(
        key,
        `${LOCATIONS[region]?.name ?? region}: ${members.length} finished arcs`,
        'gi/GiStack',
      ),
      stops,
      first: stops[0]?.session,
      last: stops.at(-1)?.session,
      next: [],
      crossings: members
        .flatMap((member) => member.crossings)
        .filter((crossing) => !memberKeys.has(crossing.arcKey)),
      members: [...memberKeys],
    })
  }
  return out
}

const PEOPLE_COLORS = [
  '#e6194b',
  '#3cb44b',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#0f9fb0',
  '#d03fc4',
  '#7a9a01',
  '#9a6324',
  '#000075',
]

/** One line per active PC and per NPC who turns up most often, through the sessions they appear in. */
export function peopleLines(sessions: readonly StorylineSession[], npcCount = 5): LabLine[] {
  const events = SOURCE_REGISTRIES.event as unknown as Record<string, object>
  const pcs = SOURCE_REGISTRIES.pc as unknown as Record<string, { name: string; status?: string }>
  const npcs = SOURCE_REGISTRIES.npc as unknown as Record<string, { name: string }>

  const seen = new Map<string, { session: number; event: string }[]>()
  for (const session of sessions) {
    for (const event of session.events) {
      const people = new Set(
        collectReferences(events[event.key])
          .filter((ref) => ref.ref === 'pc' || ref.ref === 'npc')
          .map((ref) => `${ref.ref}:${ref.key}`),
      )
      for (const person of people) {
        seen.set(person, [
          ...(seen.get(person) ?? []),
          { session: session.number, event: event.key },
        ])
      }
    }
  }
  const activePcs = Object.entries(pcs)
    .filter(([, pc]) => pc.status === 'active')
    .map(([key]) => `pc:${key}`)
  const topNpcs = [...seen.entries()]
    .filter(([key]) => key.startsWith('npc:'))
    .toSorted(([, a], [, b]) => b.length - a.length)
    .slice(0, npcCount)
    .map(([key]) => key)
  const people = [...activePcs, ...topNpcs]

  const lines = people.map((person, index) => {
    const [kind, key] = person.split(':') as ['pc' | 'npc', string]
    const record = kind === 'pc' ? pcs[key] : npcs[key]
    const appearances = seen.get(person) ?? []
    const bySession = new Map<number, string[]>()
    for (const { session, event } of appearances) {
      bySession.set(session, [...(bySession.get(session) ?? []), event])
    }
    const stops = [...bySession.entries()]
      .toSorted(([a], [b]) => a - b)
      .map(([session, evs]) => ({
        session,
        events: evs,
        plots: [`${evs.length} events`],
        // Where they ended the session, so the graph can show who was together.
        place: placeOf((events[evs.at(-1)!] as { location: EntityRef }).location.key),
      }))
    return {
      key: person,
      color: PEOPLE_COLORS[index % PEOPLE_COLORS.length]!,
      person: { ref: kind, key } as EntityRef,
      arc: stubArc(person, record?.name ?? key, kind === 'pc' ? 'gi/GiHood' : 'gi/GiHood'),
      stops,
      first: stops[0]?.session,
      last: stops.at(-1)?.session,
      next: [],
      crossings: [] as Storyline['crossings'],
    }
  })
  for (const line of lines) {
    const mine = new Set(line.stops.flatMap((stop) => stop.events))
    line.crossings = lines
      .filter((other) => other !== line)
      .map((other) => ({
        arcKey: other.key,
        events: other.stops.flatMap((stop) => stop.events).filter((event) => mine.has(event)),
      }))
      .filter((crossing) => crossing.events.length > 0)
  }
  return lines
}

function stubArc(key: string, name: string, icon: string): Arc {
  return {
    name,
    slug: key.replace(/[^a-z0-9]+/gu, '-'),
    icon,
    direction: [],
    quests: [],
    sessions: [],
    plots: [],
  } as Arc
}

/**
 * Columns handed out from the top of the graph down, the way git log does: the arc played most
 * recently gets the first column, and an open arc that has gone quiet drifts to the edge. Among
 * free columns, an arc prefers one next to the arcs it shares events with.
 */
export function recentColumns(lines: readonly Storyline[]): Map<string, number> {
  const end = (line: Storyline) =>
    line.next.length > 0 ? Number.POSITIVE_INFINITY : (line.last ?? line.first ?? 0)
  const ordered = lines.toSorted(
    (a, b) =>
      Number(b.next.length > 0) - Number(a.next.length > 0) ||
      (b.last ?? b.first ?? 0) - (a.last ?? a.first ?? 0) ||
      (b.first ?? 0) - (a.first ?? 0),
  )
  // The session each column is taken down to; a column frees up below the arc using it.
  const busyDownTo: number[] = []
  const columns = new Map<string, number>()
  for (const line of ordered) {
    const top = end(line)
    const partners = line.crossings
      .map((crossing) => columns.get(crossing.arcKey))
      .filter((column): column is number => column !== undefined)
    const free = busyDownTo.flatMap((from, column) => (from > top ? [column] : []))
    const candidates = [...free, busyDownTo.length]
    const distance = (column: number) =>
      partners.length === 0 ? 0 : Math.min(...partners.map((p) => Math.abs(p - column)))
    const column = candidates.toSorted((a, b) => a - b || distance(a) - distance(b))[0]!
    busyDownTo[column] = line.first ?? 0
    columns.set(line.key, column)
  }
  return columns
}

export type Relation = {
  /** Events both arcs were part of. */
  shared: string[]
  /** People, places and things both arcs touch, rarest first, with how many arcs touch them. */
  common: { ref: EntityRef; arcs: number }[]
  /** Arcs that share an event with both, so a path runs A → C → B. */
  bridges: { line: Storyline; viaA: string[]; viaB: string[] }[]
  /** Records named in one arc's open plots that the other arc already touches: ready-made hooks. */
  hooks: { from: Storyline; plot: string; ref: EntityRef }[]
}

/** How two arcs are tied together, to help find a common path between them. */
export function relateArcs(
  lines: readonly Storyline[],
  a: Storyline,
  b: Storyline,
  referencesOf: (line: Storyline) => Set<string>,
): Relation {
  const refs = new Map(lines.map((line) => [line.key, referencesOf(line)]))
  const touching = (key: string) => lines.filter((line) => refs.get(line.key)!.has(key)).length
  const refA = refs.get(a.key)!
  const refB = refs.get(b.key)!
  const toRef = (key: string) => {
    const [ref, slug] = key.split(':') as [EntityRef['ref'], string]
    return { ref, key: slug } as EntityRef
  }
  const common = [...refA]
    .filter((key) => refB.has(key) && !/^(event|session|pc):/u.test(key))
    .map((key) => ({ ref: toRef(key), arcs: touching(key) }))
    // Things nearly every arc touches (the party, the world) tie nothing together.
    .filter(({ arcs }) => arcs <= Math.max(2, lines.length / 2))
    .toSorted((x, y) => x.arcs - y.arcs)
  const crossing = (from: Storyline, to: string) =>
    from.crossings.find((c) => c.arcKey === to)?.events ?? []
  const bridges = lines
    .filter((line) => line !== a && line !== b)
    .map((line) => ({ line, viaA: crossing(a, line.key), viaB: crossing(b, line.key) }))
    .filter(({ viaA, viaB }) => viaA.length > 0 && viaB.length > 0)
  const hooks = [a, b].flatMap((from) => {
    const other = from === a ? refB : refA
    return from.next.flatMap((plot) =>
      collectReferences(plot)
        .filter((ref) => other.has(`${ref.ref}:${ref.key}`) && !['event', 'pc'].includes(ref.ref))
        .map((ref) => ({ from, plot: plot.name, ref })),
    )
  })
  return { shared: crossing(a, b.key), common, bridges, hooks }
}
