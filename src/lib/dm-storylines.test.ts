import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { create as createArc } from '#/definitions/arc'

import { arcs as campaignArcs } from './dm-campaign'
import {
  applyStorylineFilters,
  arcAge,
  assignColumns,
  branchParents,
  buildStorylines,
  campaignSessionsInOrder,
  focusOptions,
  placeOf,
} from './dm-storylines'

const sessions = [
  { key: 'one', number: 1, name: 'One', events: [refs.events.n2_e001, refs.events.n2_e002] },
  { key: 'two', number: 2, name: 'Two', events: [refs.events.n2_e003] },
  { key: 'three', number: 3, name: 'Three', events: [refs.events.n2_e004, refs.events.n2_e005] },
]
const locationOf = () => 'fajanet_guildhall'

const arcs = {
  early: createArc({
    name: 'Early',
    icon: 'gi/GiViolin',
    direction: [['Ends in session two.']],
    plots: [
      { name: 'Start', status: 'closed', events: [refs.events.n2_e001] },
      { name: 'Finish', status: 'closed', events: [refs.events.n2_e003] },
    ],
  }),
  late: createArc({
    name: 'Late',
    icon: 'gi/GiViolin',
    direction: [['Starts in session three and is still open.']],
    plots: [
      { name: 'Meet', status: 'closed', events: [refs.events.n2_e004, refs.events.n2_e003] },
      { name: 'What next', hook: [['Where does it go?']] },
    ],
  }),
  closedLate: createArc({
    name: 'Closed late',
    icon: 'gi/GiViolin',
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

  it('gives open arcs the first columns and lets older arcs reuse a column below its arc', () => {
    const lines = buildStorylines(arcs, sessions, locationOf)
    const columns = assignColumns(lines)
    expect(columns.get('late')).toBe(0)
    expect(columns.get('closedLate')).toBe(1)
    expect(columns.get('early')).toBe(1)
  })

  it('moves an open arc that has gone quiet to the edge', () => {
    const lines = buildStorylines(campaignArcs)
    const columns = assignColumns(lines)
    const open = lines.filter((line) => line.next.length > 0)
    const quietest = open.toSorted((a, b) => (a.last ?? 0) - (b.last ?? 0))[0]!
    expect(columns.get(quietest.key)).toBe(Math.max(...open.map((l) => columns.get(l.key)!)))
  })

  it('splits an arc off the older arc whose event it began at', () => {
    const parents = branchParents(buildStorylines(arcs, sessions, locationOf))
    expect(parents.get('late')).toBe('early')
    expect(parents.has('early')).toBe(false)
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

describe('storyline filters', () => {
  const lines = buildStorylines(campaignArcs)
  const allSessions = campaignSessionsInOrder()

  it('focuses on a person or a place, including places inside it', () => {
    const devan = applyStorylineFilters(lines, allSessions, { focus: refs.pcs.devan }).matching
    expect(devan.has('sarogarth_and_grimgor')).toBe(true)
    expect(devan.has('the_exotic_animal_dealer')).toBe(false)

    const skynet = applyStorylineFilters(lines, allSessions, {
      focus: refs.locations.skynet,
    }).matching
    expect(skynet.has('the_serpent_eclipse')).toBe(true)
    expect(skynet.has('the_mountain_crossing')).toBe(false)
  })

  it('keeps only open storylines, and only recent sessions', () => {
    const open = applyStorylineFilters(lines, allSessions, { openOnly: true }).matching
    expect(open.has('the_exotic_animal_dealer')).toBe(false)
    expect(open.has('the_flying_fortress')).toBe(true)

    const recent = applyStorylineFilters(lines, allSessions, { recent: 3 })
    expect(recent.sessions.map((s) => s.number)).toEqual([15, 16, 17])
    expect(recent.matching.has('the_shadowpeak_mine')).toBe(false)
    expect(recent.matching.has('the_tempest_family')).toBe(true)
  })

  it('finds arcs that have been open long, or left alone long', () => {
    const latest = allSessions.at(-1)!.number
    const long = applyStorylineFilters(lines, allSessions, { longerThan: 10 }).matching
    const quiet = applyStorylineFilters(lines, allSessions, { quietFor: 5 }).matching
    for (const line of lines) {
      const age = arcAge(line, latest)
      expect(long.has(line.key)).toBe(line.next.length > 0 && age.open >= 10)
      expect(quiet.has(line.key)).toBe(line.next.length > 0 && age.quiet >= 5)
    }
    expect(quiet.has('tentacles_and_the_shadow_realm')).toBe(true)
  })

  it('offers people and places to focus on, but not the world', () => {
    const options = focusOptions(lines).map((ref) => `${ref.ref}:${ref.key}`)
    expect(options).toContain('pc:jim')
    expect(options).toContain('location:skynet')
    expect(options).not.toContain('location:world')
  })
})
