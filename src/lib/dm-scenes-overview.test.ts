import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { create as createArc } from '#/definitions/arc'
import { create as createScene } from '#/definitions/scene'
import { create as createTable } from '#/definitions/table'

import { sourceLocationParent } from './dm-campaign'
import {
  groupScenesByArc,
  groupScenesByPlace,
  placeTrail,
  scenesInRunningOrder,
  trailBelow,
} from './dm-scenes-overview'

const scene = (name: string, location: typeof refs.locations.nimbus) =>
  createScene({ name, location, setup: [['Setup.']] })

const scenes = {
  stables: scene('Wolfie wants solid ground', refs.locations.skynet_s_second_best_inn),
  harbour: scene('Stealing a ship', refs.locations.nimbus),
  game: scene("The Fiddler's next game", refs.locations.skynet),
}
const sceneRef = (key: keyof typeof scenes) => ({ ref: 'scene', key }) as const

const arcs = {
  fiddler: createArc({
    name: 'The Fiddler',
    icon: 'gi/GiViolin',
    direction: [['Who is the dealer?']],
    plots: [{ name: 'Another game', scene: sceneRef('game') }],
  }),
}

const table = createTable({ likely: [sceneRef('game'), sceneRef('stables')] })
const all = scenesInRunningOrder({ table, scenes, arcs, parentOf: sourceLocationParent })

describe('DM scenes overview', () => {
  it('lists every scene once, the selection first, numbered in running order', () => {
    expect(all.map((item) => [item.position, item.key, item.likely])).toEqual([
      [1, 'game', true],
      [2, 'stables', true],
      [3, 'harbour', false],
    ])
  })

  it('traces a place from its region down, leaving out the world', () => {
    expect(
      placeTrail(refs.locations.skynet_s_second_best_inn, sourceLocationParent).map((l) => l.key),
    ).toEqual(['three_sky_kingdoms', 'skynet', 'skynet_s_second_best_inn'])
  })

  it('groups by arc in running order, with unlinked scenes last', () => {
    expect(
      groupScenesByArc(all).map((group) => [group.arc?.key, group.scenes.map((s) => s.key)]),
    ).toEqual([
      ['fiddler', ['game']],
      [undefined, ['stables', 'harbour']],
    ])
  })

  it('groups rooms with their town and keeps the room as the detail', () => {
    const groups = groupScenesByPlace(all)
    expect(groups.map((group) => [group.place.key, group.scenes.map((s) => s.key)])).toEqual([
      ['skynet', ['game', 'stables']],
      ['nimbus', ['harbour']],
    ])
    const stables = groups[0]!.scenes[1]!
    expect(trailBelow(stables, refs.locations.skynet).map((l) => l.key)).toEqual([
      'skynet_s_second_best_inn',
    ])
  })
})
