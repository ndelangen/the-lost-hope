import { describe, expect, it } from 'vitest'

import { Scene, SceneBeatFight, type SceneBeat } from '#/definitions/scene'

import {
  combatantPlans,
  encounterDifficulty,
  sceneAllies,
  sceneEnemies,
  sceneFights,
} from './dm-encounter'
import { emptyEncounter, fightKey } from './encounter'

const guard = { ref: 'npc', key: 'no-such-guard' } as const
const hound = { ref: 'beast', key: 'no-such-hound' } as const
const captive = { ref: 'npc', key: 'no-such-captive' } as const

const beat = (title: string, extra: Partial<SceneBeat> = {}): SceneBeat => ({
  title,
  lines: [{ do: [[title]] }],
  outcomes: [],
  cleared: [],
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
      fight: SceneBeatFight.parse({ allies: [{ creature: captive, count: 3 }] }),
    }),
  ])

  it('lists the beats that bring a fight, in script order, by their titles', () => {
    expect(parsed.success).toBe(true)
    const fights = sceneFights(parsed.data!)
    expect(fights.map(({ key }) => key)).toEqual(['The gate', 'The cells'])
    expect(fights[1]).toMatchObject({ onlyIf: [['They go down.']] })
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

  it("lists the enemies once each, and creatures only ever at the party's side as allies", () => {
    expect(sceneEnemies(parsed.data!)).toEqual([guard, hound])
    expect([...sceneAllies(parsed.data!)]).toEqual(['npc:no-such-captive'])
  })
})

describe('encounterDifficulty', () => {
  const snatcher = { ref: 'npc', key: 'cloaked_snatcher' } as const
  const roster = [
    { id: 'pc:devan', kind: 'pc', source: { ref: 'pc', key: 'devan' } },
    { id: 'npc:cloaked_snatcher:1', kind: 'creature', source: snatcher, copy: 1 },
    { id: 'npc:cloaked_snatcher:2', kind: 'creature', source: snatcher, copy: 2 },
    { id: 'npc:cloaked_snatcher:3', kind: 'creature', source: snatcher, copy: 3 },
  ] as const

  it('weighs the enemies still standing against the PCs in the fight', () => {
    const { budget, standingXp } = encounterDifficulty(
      roster,
      (id) => id === 'npc:cloaked_snatcher:1',
    )
    expect(budget).toEqual({ low: 500, moderate: 750, high: 1100 })
    expect(standingXp).toBe(200)
  })

  it("leaves out the scene's allies", () => {
    const allies = new Set(['npc:cloaked_snatcher'])
    expect(encounterDifficulty(roster, () => false, allies).standingXp).toBe(0)
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

describe('combatantPlans', () => {
  const cruiser = { ref: 'scene', key: 'taking_back_a_battle_cruiser' } as const
  const breaker = { ref: 'npc', key: 'hand_breaker' } as const

  it('shows the plan of every fight a creature is in until one is brought in', () => {
    const encounter = { ...emptyEncounter(), scene: cruiser }
    expect(combatantPlans(encounter, breaker).map((p) => p.fight)).toEqual([
      'The batteries',
      'The Barracks',
    ])
    const inBarracks = { ...encounter, joined: { [fightKey(cruiser, 'The Barracks')]: 1 } }
    expect(combatantPlans(inBarracks, breaker).map((p) => p.fight)).toEqual(['The Barracks'])
  })

  it('has nothing without a scene', () => {
    expect(combatantPlans(emptyEncounter(), breaker)).toEqual([])
  })
})
