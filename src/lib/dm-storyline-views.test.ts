import { describe, expect, it } from 'vitest'

import { relateArcs } from './dm-arc-relation'
import { arcs } from './dm-campaign'
import { buildCast } from './dm-cast'
import { FLOW_TIGHT, layoutFlow } from './dm-storyline-flow'
import { buildStorylines, campaignSessionsInOrder } from './dm-storylines'

const lines = buildStorylines(arcs)
const sessions = campaignSessionsInOrder()
const line = (key: string) => lines.find((l) => l.key === key)!

describe('relating two arcs', () => {
  it('finds the arc and records that tie the broom to Sarogarth', () => {
    const relation = relateArcs(lines, line('swift_s_demon_broom'), line('sarogarth_and_grimgor'))
    expect(relation.bridges.map((bridge) => bridge.line.key)).toContain(
      'the_fiddler_and_the_party_s_possible_futures',
    )
    expect(relation.common.map(({ ref }) => `${ref.ref}:${ref.key}`)).toContain('npc:sarogarth')
    expect(relation.common.every(({ ref }) => ref.ref !== 'pc')).toBe(true)
  })

  it('lists shared events for arcs that crossed', () => {
    const a = lines.find((l) => l.crossings.length > 0)!
    const b = line(a.crossings[0]!.arcKey)
    expect(relateArcs(lines, a, b).shared).toEqual(a.crossings[0]!.events)
  })
})

describe('flow layout', () => {
  it('puts arcs that shared an event side by side, and next plots on top', () => {
    const rows = layoutFlow(lines, sessions)
    expect(rows[0]!.session).toBeUndefined()
    expect(rows.at(-1)!.session?.number).toBe(sessions[0]!.number)
    for (const row of rows.filter((r) => r.session)) {
      const groups = new Map<number, number[]>()
      for (const slot of row.slots)
        groups.set(slot.group, [...(groups.get(slot.group) ?? []), slot.x])
      for (const xs of groups.values()) {
        for (const [i, x] of xs.slice(1).entries()) expect(x - xs[i]!).toBe(FLOW_TIGHT)
      }
    }
  })
})

describe('cast', () => {
  it('lists who turned up in which sessions, busiest first', () => {
    const cast = buildCast(sessions)
    const sarogarth = cast.find((m) => m.person.ref === 'npc' && m.person.key === 'sarogarth')!
    expect(sarogarth.appearances.length).toBeGreaterThan(0)
    expect(sarogarth.last).toBeGreaterThanOrEqual(sarogarth.first)
    expect(cast[0]!.events).toBeGreaterThanOrEqual(cast.at(-1)!.events)
  })
})
