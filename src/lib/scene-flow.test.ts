import { describe, expect, it } from 'vitest'

import { Scene } from '#/definitions/scene'
import { Table } from '#/definitions/table'

import { nextScenes } from './scene-flow'

const ref = (key: string) => ({ ref: 'scene', key }) as const

const scene = (name: string, extra: object = {}) =>
  Scene.parse({
    name,
    location: { ref: 'location', key: 'keep' },
    setup: [['…']],
    ...extra,
  })

const toTheYard = [['They climb the wall.']]
const alsoToTheYard = [['They bribe the guard.']]

const scenes = {
  gate: scene('The gate', {
    setup: [['This follows ', ref('road'), '.']],
    beats: [
      {
        title: 'The guard',
        lines: [{ do: [['If it comes to blows, run ', ref('fight'), '.']] }],
        outcomes: [
          {
            when: toTheYard,
            response: [['Run ', ref('yard'), '.']],
            followUps: [{ when: alsoToTheYard, response: [['Run ', ref('yard'), '.']] }],
          },
          { when: [['They turn back.']], response: [['Back to ', ref('road'), '.']] },
        ],
      },
    ],
  }),
  road: scene('The road'),
  yard: scene('The yard'),
  fight: scene('The fight'),
  cellar: scene('The cellar'),
}
const table = Table.parse({ likely: [ref('road'), ref('gate'), ref('yard'), ref('cellar')] })

describe('nextScenes', () => {
  it('lists the planned scene first, then the later scenes the script points at, with their ifs', () => {
    expect(nextScenes('gate', { scenes, table })).toEqual([
      { scene: ref('yard'), when: [toTheYard, alsoToTheYard], planned: true },
      { scene: ref('fight'), when: [], planned: false },
    ])
  })

  it('leaves out scenes that come earlier in the running order, and the setup', () => {
    const keys = nextScenes('gate', { scenes, table }).map(({ scene: next }) => next.key)
    expect(keys).not.toContain('road')
  })

  it('lists the next scene selected for the session even when the script does not name it', () => {
    expect(nextScenes('yard', { scenes, table })).toEqual([
      { scene: ref('cellar'), when: [], planned: true },
    ])
  })

  it('knows no next scene after the last selected one, or for a scene that was not selected', () => {
    expect(nextScenes('cellar', { scenes, table })).toEqual([])
    expect(nextScenes('fight', { scenes, table })).toEqual([])
  })
})
