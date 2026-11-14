import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { Arc, create as createArc } from '#/definitions/arc'
import { create as createScene } from '#/definitions/scene'
import { create as createTable } from '#/definitions/table'
import { resolveRef, sessionEvents, sessions } from '#/lib/campaign'

import { arcs, scenes, sessionsForArc, validateDmReferences } from './dm-campaign'

const NO_TABLE = createTable({})
const vipRoom = { ref: 'scene', key: 'game_in_the_vip_room' } as const
const scene = createScene({
  name: 'Game in the VIP room',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.the_fiddler],
  setup: [[refs.npcs.the_fiddler, ' offers another game.']],
  outcomes: [
    { when: [['A player takes the wager.']], response: [['Agree on the stakes.']] },
    { when: [['A player declines.']], response: [['Continue with the willing players.']] },
  ],
})

describe('DM campaign model', () => {
  it('keeps the DM registries and generated refs in sync and resolves their references', () => {
    expect(Object.keys(arcs)).toEqual(Object.keys(refs.arcs))
    expect(Object.keys(scenes)).toEqual(Object.keys(refs.scenes))
    expect(validateDmReferences()).toEqual([])
  })

  it('allows the same event in several arcs while the session owns play order', () => {
    const fiddler = createArc({
      name: 'The Fiddler and the party’s possible futures',
      direction: [['Explore how the dealer knows the party.']],
      quests: [refs.quests.find_the_fiddler],
      sessions: [refs.sessions.the_ghost_and_the_gambler],
      plots: [
        {
          name: 'Another game in the Nimbus casino',
          scene: vipRoom,
          events: [refs.events.n2_e188],
        },
        { name: 'The second smoke trail', events: [refs.events.n2_e178, refs.events.n2_e203] },
      ],
    })
    const jim = createArc({
      name: 'Jim and the Eyeless Hand',
      direction: [['Follow the implications of the Fiddler’s questions.']],
      plots: [{ name: 'The hint to Jim', events: [refs.events.n2_e198] }],
    })
    const game = fiddler.plots[0]!
    game.events.push(refs.events.n2_e198)

    expect(game.status).toBe('open')
    expect(game.scene).toEqual(vipRoom)
    expect(jim.plots[0]?.events).toEqual([game.events[1]])
    expect(
      validateDmReferences({ fiddler, jim }, { game_in_the_vip_room: scene }, NO_TABLE),
    ).toEqual([])
    expect(sessionsForArc(fiddler).map(({ data }) => data.number)).toEqual([16, 17])
    expect(sessionsForArc(jim).map(({ data }) => data.number)).toEqual([17])
    expect(sessionEvents(sessions.the_ghost_and_the_gambler).map(({ slug }) => slug)).toEqual(
      sessions.the_ghost_and_the_gambler.events.map((ref) => resolveRef(ref)?.slug),
    )
  })

  it('rejects a reference to the wrong kind and reports dangling scene refs', () => {
    const input = {
      name: 'The Fiddler and the party’s possible futures',
      direction: [['Explore how the dealer knows the party.']],
      plots: [{ name: 'Another game in the Nimbus casino', scene: vipRoom }],
    }
    expect(
      Arc.safeParse({ ...input, plots: [{ ...input.plots[0], events: [refs.npcs.the_fiddler] }] })
        .success,
    ).toBe(false)
    expect(validateDmReferences({ fiddler: createArc(input) }, {}, NO_TABLE)).toEqual([
      'The Fiddler and the party’s possible futures / Another game in the Nimbus casino: unknown scene reference game_in_the_vip_room',
    ])
  })

  it('keeps the prepared location when play takes place somewhere else', () => {
    const arc = createArc({
      name: 'The Fiddler and the party’s possible futures',
      direction: [['Explore the second smoke trail.']],
      plots: [{ name: 'Follow the smoke', scene: vipRoom, events: [refs.events.n2_e178] }],
    })
    const plot = arc.plots[0]!
    const played = resolveRef(plot.events[0]!)

    expect(played?.kind).toBe('event')
    if (played?.kind !== 'event') throw new Error('Expected the tracking ritual event')
    expect(played.data.location).toEqual(refs.locations.skynet)
    expect(scene.location).toEqual(refs.locations.nimbus)
    expect(plot.scene).toEqual(vipRoom)
    expect(plot.status).toBe('open')
  })
})
