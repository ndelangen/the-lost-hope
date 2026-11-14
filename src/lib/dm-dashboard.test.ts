import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { create as createArc } from '#/definitions/arc'
import { create as createScene } from '#/definitions/scene'
import { create as createTable } from '#/definitions/table'

import { sourceLocationParent, validateDmReferences } from './dm-campaign'
import { type DashboardLocationNode, buildDashboard, lastKnownLocations } from './dm-dashboard'

const outline = (nodes: readonly DashboardLocationNode[]): unknown[] =>
  nodes.map((node) => [node.location.key, outline(node.children)])

const scene = (name: string, location: typeof refs.locations.nimbus) =>
  createScene({ name, location, setup: [['Setup.']] })

const scenes = {
  stables: scene('Wolfie wants solid ground', refs.locations.skynet_s_second_best_inn),
  harbour: scene('Stealing a ship', refs.locations.nimbus),
  game: scene("The Fiddler's next game", refs.locations.nimbus),
  fortress: scene('The fortress lands', refs.locations.fajanet),
}
const sceneRef = (key: keyof typeof scenes) => ({ ref: 'scene', key }) as const

const arcs = {
  fiddler: createArc({
    name: 'The Fiddler',
    direction: [['Who is the dealer?']],
    plots: [{ name: 'Another game', scene: sceneRef('game') }],
  }),
}

describe('DM dashboard', () => {
  it('finds where each PC was last seen from the newest played event', () => {
    const events = [
      { location: refs.locations.nimbus, refs: [refs.pcs.jim, refs.pcs.swift_starblade] },
      { location: refs.locations.skynet_s_second_best_inn, refs: [refs.pcs.devan, refs.pcs.jim] },
    ]
    const seen = lastKnownLocations([refs.pcs.jim, refs.pcs.devan, refs.pcs.fix], events)
    expect(seen.get('jim')).toEqual(refs.locations.nimbus)
    expect(seen.get('devan')).toEqual(refs.locations.skynet_s_second_best_inn)
    expect(seen.has('fix')).toBe(false)
  })

  it('nests selected scenes in the location tree, party branches first, each scene once', () => {
    const table = createTable({
      likely: [sceneRef('fortress'), sceneRef('harbour'), sceneRef('stables')],
      pinned: [sceneRef('game'), sceneRef('harbour')],
    })
    const party = new Map([
      ['devan', refs.locations.skynet],
      ['jim', refs.locations.nimbus],
    ])
    const tree = buildDashboard({ table, scenes, arcs, party, parentOf: sourceLocationParent })

    expect(outline(tree)).toEqual([
      [
        'three_sky_kingdoms',
        [
          ['skynet', [['skynet_s_second_best_inn', []]]],
          ['nimbus', []],
        ],
      ],
      ['ethium', [['reve', [['fajanet', []]]]]],
    ])
    const [skynet, nimbus] = tree[0]!.children
    expect(skynet!.party).toEqual([refs.pcs.devan])
    expect(skynet!.children[0]!.scenes.map((s) => s.key)).toEqual(['stables'])
    expect(nimbus!.party).toEqual([refs.pcs.jim])
    expect(nimbus!.scenes.map((s) => [s.key, s.pinned])).toEqual([
      ['harbour', true],
      ['game', true],
    ])
    expect(nimbus!.scenes[1]!.plots[0]!.plot.name).toBe('Another game')
  })

  it('rejects a table that selects a scene that does not exist', () => {
    const table = createTable({ likely: [sceneRef('stables')] })
    expect(validateDmReferences({}, {}, table)).toEqual(['Table: unknown scene reference stables'])
  })
})
