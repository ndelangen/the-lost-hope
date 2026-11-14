import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { create as createArc } from '#/definitions/arc'

import { arcs as campaignArcs } from './dm-campaign'
import { assignColumns, buildStorylines, placeOf } from './dm-storylines'

const sessions = [
  { key: 'one', number: 1, name: 'One', events: [refs.events.n2_e001, refs.events.n2_e002] },
  { key: 'two', number: 2, name: 'Two', events: [refs.events.n2_e003] },
  { key: 'three', number: 3, name: 'Three', events: [refs.events.n2_e004, refs.events.n2_e005] },
]
const locationOf = () => 'fajanet_guildhall'

const arcs = {
  early: createArc({
    name: 'Early',
    direction: [['Ends in session two.']],
    plots: [
      { name: 'Start', status: 'closed', events: [refs.events.n2_e001] },
      { name: 'Finish', status: 'closed', events: [refs.events.n2_e003] },
    ],
  }),
  late: createArc({
    name: 'Late',
    direction: [['Starts in session three and is still open.']],
    plots: [
      { name: 'Meet', status: 'closed', events: [refs.events.n2_e004, refs.events.n2_e003] },
      { name: 'What next', hook: [['Where does it go?']] },
    ],
  }),
  closedLate: createArc({
    name: 'Closed late',
    direction: [['Only session three.']],
    plots: [{ name: 'Once', status: 'closed', events: [refs.events.n2_e005] }],
  }),
}

describe('storyline map', () => {
  it('derives stops, crossings and next plots from arcs and sessions', () => {
    const [early, late, closedLate] = buildStorylines(arcs, sessions, locationOf)

    expect([early!.key, late!.key, closedLate!.key]).toEqual(['early', 'late', 'closedLate'])
    expect(early!.stops.map((stop) => [stop.session, stop.plots])).toEqual([
      [1, ['Start']],
      [2, ['Finish']],
    ])
    expect(late!.stops.map((stop) => stop.session)).toEqual([2, 3])
    expect(late!.stops[0]!.place).toBe('fajanet')
    expect(early!.crossings).toEqual([{ arcKey: 'late', events: ['n2_e003'] }])
    expect(late!.crossings).toEqual([{ arcKey: 'early', events: ['n2_e003'] }])
    expect(late!.next.map((plot) => plot.name)).toEqual(['What next'])
    expect(new Set([early!.color, late!.color, closedLate!.color]).size).toBe(3)
  })

  it('reuses a column once a storyline has ended, but never one still open', () => {
    const lines = buildStorylines(arcs, sessions, locationOf)
    const columns = assignColumns(lines)
    expect(columns.get('early')).toBe(0)
    expect(columns.get('late')).toBe(1)
    expect(columns.get('closedLate')).toBe(0)
  })

  it('places events in their settlement and maps every campaign arc', () => {
    expect(placeOf('skynet_s_second_best_inn')).toBe('skynet')
    expect(placeOf('serpent_eclipse_flooded_cavern')).toBe('skynet')
    expect(placeOf('badesh_forest')).toBe('badesh_forest')
    const lines = buildStorylines(campaignArcs)
    expect(lines).toHaveLength(Object.keys(campaignArcs).length)
    expect(lines.every((line) => line.stops.length > 0)).toBe(true)
  })
})
