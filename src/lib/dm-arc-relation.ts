import type { EntityRef } from '#/definitions/kind'
import { collectReferences } from '#/lib/campaign-read-model'
import { type Storyline, parseFocusKey, storylineReferences } from '#/lib/dm-storylines'

export type ArcRelation = {
  /** Events both arcs were part of. */
  shared: string[]
  /** People, places and things both arcs touch, rarest first, with how many arcs touch each. */
  common: { ref: EntityRef; arcs: number }[]
  /** Arcs that share an event with both, so a path runs from one through it to the other. */
  bridges: { line: Storyline; viaA: string[]; viaB: string[] }[]
  /** Records named in one arc's open plots that the other arc already touches. */
  hooks: { from: Storyline; plot: string; ref: EntityRef }[]
}

/** Kinds that tie nothing together: the party is in everything, and events are listed separately. */
const IGNORED = new Set<EntityRef['ref']>(['pc', 'event', 'session'])

/** Everything that already ties two arcs together, to help find a path between them. */
export function relateArcs(
  storylines: readonly Storyline[],
  a: Storyline,
  b: Storyline,
  referencesOf: (line: Storyline) => ReadonlySet<string> = storylineReferences,
): ArcRelation {
  const refs = new Map(storylines.map((line) => [line.key, referencesOf(line)]))
  const refA = refs.get(a.key) ?? referencesOf(a)
  const refB = refs.get(b.key) ?? referencesOf(b)
  const touching = (key: string) => [...refs.values()].filter((set) => set.has(key)).length
  const common = [...refA]
    .filter((key) => refB.has(key))
    .map((key) => ({ ref: parseFocusKey(key), arcs: touching(key) }))
    .filter((entry): entry is { ref: EntityRef; arcs: number } =>
      Boolean(entry.ref && !IGNORED.has(entry.ref.ref)),
    )
    // Something most arcs touch, like the world or a home base, ties nothing in particular.
    .filter(({ arcs }) => arcs <= Math.max(2, storylines.length / 2))
    .toSorted((x, y) => x.arcs - y.arcs)
  const crossing = (from: Storyline, to: string) =>
    from.crossings.find((c) => c.arcKey === to)?.events ?? []
  const bridges = storylines
    .filter((line) => line.key !== a.key && line.key !== b.key)
    .map((line) => ({ line, viaA: crossing(a, line.key), viaB: crossing(b, line.key) }))
    .filter(({ viaA, viaB }) => viaA.length > 0 && viaB.length > 0)
  const hooks = [a, b].flatMap((from) => {
    const other = from === a ? refB : refA
    return from.next.flatMap((plot) =>
      collectReferences(plot)
        .filter((ref) => !IGNORED.has(ref.ref) && other.has(`${ref.ref}:${ref.key}`))
        .map((ref) => ({ from, plot: plot.name, ref })),
    )
  })
  return { shared: crossing(a, b.key), common, bridges, hooks }
}
