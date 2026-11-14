import type { Storyline, StorylineSession } from '#/lib/dm-storylines'

/** Space between arcs that share an event in a session, and between groups that don't. */
export const FLOW_TIGHT = 12
export const FLOW_LOOSE = 26

export type FlowSlot = { key: string; x: number; played: boolean; group: number }
export type FlowRow = { session: StorylineSession | undefined; slots: FlowSlot[] }

/** Arcs that share an event in this session, as groups of keys. Arcs not played stand alone. */
function groupsIn(active: readonly Storyline[], session: number): string[][] {
  const parent = new Map(active.map((line) => [line.key, line.key]))
  const find = (key: string): string => {
    const up = parent.get(key)!
    return up === key ? key : find(up)
  }
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
  for (const line of active) {
    const root = find(line.key)
    groups.set(root, [...(groups.get(root) ?? []), line.key])
  }
  return [...groups.values()]
}

/** Whether an arc is running in a session: started, and either still open or not yet finished. */
function runs(line: Storyline, session: number) {
  return (
    line.first !== undefined &&
    session >= line.first &&
    (line.next.length > 0 || session <= (line.last ?? -1))
  )
}

/**
 * Storyline layout as in xkcd's movie narrative charts. Session by session, the arcs that are
 * running keep their previous order where they can, arcs that share an event are pulled into one
 * tight group at their average position, and groups with nothing to do with each other sit
 * further apart. Rows come back newest first, with what could happen next on top.
 */
export function layoutFlow(
  storylines: readonly Storyline[],
  sessions: readonly StorylineSession[],
): FlowRow[] {
  let order: string[] = []
  const rows: FlowRow[] = []
  for (const session of [...sessions, undefined]) {
    const active = storylines.filter((line) =>
      session ? runs(line, session.number) : line.next.length > 0,
    )
    const activeKeys = new Set(active.map((line) => line.key))
    order = order.filter((key) => activeKeys.has(key))
    for (const line of active) if (!order.includes(line.key)) order.push(line.key)

    const rank = new Map(order.map((key, index) => [key, index]))
    const groups = session ? groupsIn(active, session.number) : active.map((line) => [line.key])
    const placed = groups
      .map((group) => ({
        group: group.toSorted((a, b) => rank.get(a)! - rank.get(b)!),
        at: group.reduce((sum, key) => sum + rank.get(key)!, 0) / group.length,
      }))
      .toSorted((a, b) => a.at - b.at)
    order = placed.flatMap(({ group }) => group)

    let x = 0
    const slots: FlowSlot[] = []
    for (const [groupIndex, { group }] of placed.entries()) {
      if (groupIndex > 0) x += FLOW_LOOSE
      for (const [i, key] of group.entries()) {
        if (i > 0) x += FLOW_TIGHT
        const line = active.find((l) => l.key === key)!
        slots.push({
          key,
          x,
          group: groupIndex,
          played: session ? line.stops.some((s) => s.session === session.number) : true,
        })
      }
    }
    rows.push({ session, slots })
  }
  return rows.toReversed()
}
