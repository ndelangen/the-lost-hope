import { describe, expect, it } from 'vitest'

import { Scene, SceneBeatFight, type SceneBeat } from '#/definitions/scene'

import { sceneFights } from './dm-encounter'

const guard = { ref: 'npc', key: 'no-such-guard' } as const
const hound = { ref: 'beast', key: 'no-such-hound' } as const
const captive = { ref: 'npc', key: 'no-such-captive' } as const

const beat = (title: string, extra: Partial<SceneBeat> = {}): SceneBeat => ({
  title,
  lines: [{ do: [[title]] }],
  outcomes: [],
  ...extra,
})

const scene = (beats: SceneBeat[]) =>
  Scene.safeParse({
    name: 'The keep',
    location: { ref: 'location', key: 'keep' },
    setup: [['A keep.']],
    beats,
  })

describe('sceneFights', () => {
  const parsed = scene([
    beat('The gate', {
      fight: SceneBeatFight.parse({
        opponents: [
          { creature: guard, count: 2 },
          { creature: hound, count: 1 },
        ],
        tactics: [['They hold the gate.']],
      }),
    }),
    beat('The yard'),
    beat('The cells', {
      onlyIf: [['They go down.']],
      fight: SceneBeatFight.parse({ allies: [{ creature: captive, count: 3 }], repeats: true }),
    }),
  ])

  it('lists the beats that bring a fight, in script order, by their titles', () => {
    expect(parsed.success).toBe(true)
    const fights = sceneFights(parsed.data!)
    expect(fights.map(({ key }) => key)).toEqual(['The gate', 'The cells'])
    expect(fights[1]).toMatchObject({ onlyIf: [['They go down.']], repeats: true })
  })

  it('counts every creature that joins the roster, enemies first', () => {
    const [gate, cells] = sceneFights(parsed.data!)
    expect(gate?.creatures).toEqual([guard, guard, hound])
    expect(gate?.opponents).toEqual([
      { creature: guard, name: 'no-such-guard', count: 2 },
      { creature: hound, name: 'no-such-hound', count: 1 },
    ])
    expect(cells?.allies.map(({ count }) => count)).toEqual([3])
    expect(cells?.creatures).toHaveLength(3)
  })
})

describe('a beat’s fight', () => {
  it('needs someone in it', () => {
    expect(SceneBeatFight.safeParse({ tactics: [['Nobody is here.']] }).success).toBe(false)
  })

  it('needs a title of its own within the scene', () => {
    const fight = SceneBeatFight.parse({ opponents: [{ creature: guard }] })
    expect(scene([beat('The gate', { fight }), beat('The gate', { fight })]).success).toBe(false)
    expect(scene([beat('The gate', { fight }), beat('The gate')]).success).toBe(true)
  })
})
