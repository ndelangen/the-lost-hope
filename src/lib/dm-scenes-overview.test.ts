import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { create as createArc } from '#/definitions/arc'
import { create as createScene } from '#/definitions/scene'
import { create as createTable } from '#/definitions/table'

import { scenesByArc } from './dm-scenes-overview'

const scene = (name: string) =>
  createScene({ name, location: refs.locations.nimbus, setup: [['Setup.']] })

const scenes = {
  stables: scene('Wolfie wants solid ground'),
  harbour: scene('Stealing a ship'),
  game: scene("The Fiddler's next game"),
  fortress: scene('The fortress lands'),
}
const sceneRef = (key: keyof typeof scenes) => ({ ref: 'scene', key }) as const

const arc = (name: string, plots: { name: string; scene: ReturnType<typeof sceneRef> }[]) =>
  createArc({ name, icon: 'gi/GiViolin', direction: [['Direction.']], plots })

const arcs = {
  fiddler: arc('The Fiddler', [{ name: 'Another game', scene: sceneRef('game') }]),
  fortress: arc('The flying fortress', [
    { name: 'Landing', scene: sceneRef('fortress') },
    { name: 'Another game, aboard', scene: sceneRef('game') },
  ]),
}

describe('DM scenes overview', () => {
  it('groups every scene once under its first arc, in running order, unlinked scenes last', () => {
    const table = createTable({
      likely: [sceneRef('stables'), sceneRef('fortress'), sceneRef('game')],
      pinned: [sceneRef('game')],
    })
    const groups = scenesByArc({ table, scenes, arcs })
    expect(groups.map((group) => [group.arc?.key, group.scenes.map((s) => s.key)])).toEqual([
      ['fortress', ['fortress']],
      ['fiddler', ['game']],
      [undefined, ['stables', 'harbour']],
    ])
    const game = groups[1]!.scenes[0]!
    expect(game.pinned).toBe(true)
    expect(game.plots.map(({ plot }) => plot.name)).toEqual([
      'Another game',
      'Another game, aboard',
    ])
  })
})
