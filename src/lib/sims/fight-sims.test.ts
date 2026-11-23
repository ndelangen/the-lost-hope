import { describe, expect, it } from 'vitest'

import { resolveSourceRef } from '#/lib/dm-campaign'

import {
  type SimAct,
  type SimRosterEntry,
  REPLAY_PARTY,
  deathSaves,
  fightSummary,
  findReplays,
  flowOf,
  keyedLines,
  lossRooms,
  outcomeMatrix,
  percent,
  rideTheLightningSims as sims,
  scenarioFlow,
  turnsOf,
} from './fight-sims'
import { flowLayout } from './flow-layout'

const roster: SimRosterEntry[] = [
  { name: 'Devan', side: 'pc', who: { ref: 'pc', key: 'devan' } },
  { name: 'Soldier1', side: 'ally', who: { ref: 'npc', key: 'tempest_soldier' } },
  { name: 'Breaker1', side: 'foe', who: { ref: 'npc', key: 'hand_breaker' } },
]

const acts: SimAct[] = [
  { k: 'turn', who: 'Devan' },
  { k: 'dmg', by: 'Devan', to: 'Breaker1', what: 'Mace', dmg: 12 },
  { k: 'dmg', by: 'Devan', to: 'Breaker1', what: 'Mace', dmg: 20, crit: true },
  { k: 'turn', who: 'Breaker1' },
  { k: 'miss', by: 'Breaker1', to: 'Devan', what: 'Chain Flail', how: 'miss' },
  { k: 'dmg', by: 'Breaker1', to: 'Soldier1', what: 'Chain Flail', dmg: 15 },
  { k: 'down', who: 'Soldier1', by: 'Breaker1' },
  { k: 'turn', who: 'Soldier1' },
  { k: 'death', who: 'Devan', roll: 4, ok: 0, fail: 1, result: 'fail' },
]

describe('Ride the Lightning fight sims', () => {
  it('has every route and crystal-room timing for every setting', () => {
    for (const foes of sims.foes) {
      for (const party of sims.party) {
        for (const mistakes of sims.mistakes) {
          const cells = outcomeMatrix(sims, { foes: foes.key, party: party.key, mistakes }).flatMap(
            (row) => row.cells,
          )
          expect(cells).toHaveLength(sims.routes.length * sims.crystal.length)
          for (const { scenario } of cells) {
            expect(scenario).toBeDefined()
            expect(scenario!.win + scenario!.tpk + scenario!.stall).toBeCloseTo(1, 6)
          }
        }
      }
    }
  })

  it('keeps a replay for every route and crystal-room timing', () => {
    for (const route of sims.routes) {
      for (const crystal of sims.crystal) {
        expect(findReplays(sims, route.key, crystal.key, REPLAY_PARTY).length).toBeGreaterThan(0)
      }
    }
  })

  it('names every combatant by a record that exists', () => {
    const missing = sims.replays
      .flatMap((replay) => replay.rooms.flatMap((room) => room.roster))
      .filter((entry) => !resolveSourceRef(entry.who))
      .map((entry) => `${entry.who.ref}:${entry.who.key}`)
    expect([...new Set(missing)]).toEqual([])
  })

  it('records hit points for the whole roster and names only roster members in events', () => {
    const strangers = new Set<string>()
    for (const replay of sims.replays) {
      for (const room of replay.rooms) {
        const names = new Set(room.roster.map((entry) => entry.name))
        for (const frame of room.frames) {
          expect(frame.hp).toHaveLength(room.roster.length)
          for (const act of frame.acts) {
            const named = [
              'by' in act ? act.by : undefined,
              'to' in act ? act.to : undefined,
              'who' in act ? act.who : undefined,
            ]
            for (const name of named) if (name && !names.has(name)) strangers.add(name)
          }
        }
      }
    }
    expect([...strangers]).toEqual([])
  })

  it('orders losses worst room first and formats shares', () => {
    const scenario = { lostAt: { 'The Helm': 0.1, 'Korrag, just before the bridge': 0.3 } }
    expect(lossRooms(scenario).map((l) => l.room)).toEqual([
      'Korrag, just before the bridge',
      'The Helm',
    ])
    expect(percent(0.004)).toBe('<1%')
    expect(percent(0)).toBe('0%')
    expect(percent(0.876)).toBe('88%')
    expect(keyedLines(['a', 'b', 'a']).map((l) => l.key)).toEqual(['a#1', 'b#1', 'a#2'])
  })

  it('sums a round: damage, crits, misses and who went down, with soldiers on the party side', () => {
    const summary = fightSummary(acts, roster)
    expect(summary.party).toMatchObject({ damage: 32, hits: 2, crits: 1, misses: 0 })
    expect(summary.foes).toMatchObject({ damage: 15, hits: 1, crits: 0, misses: 1 })
    expect(summary.downs).toEqual(['Soldier1'])
  })

  it('groups events by turn and keeps death saves until healed', () => {
    expect(turnsOf(acts).map((t) => [t.who, t.acts.length])).toEqual([
      ['Devan', 2],
      ['Breaker1', 3],
      ['Soldier1', 1],
    ])
    expect(deathSaves(acts).get('Devan')).toEqual({ ok: 0, fail: 1, result: 'fail' })
    const healed: SimAct[] = [
      ...acts,
      { k: 'heal', by: 'Soldier1', to: 'Devan', what: 'potion', amt: 7 },
    ]
    expect(deathSaves(healed).has('Devan')).toBe(false)
  })

  it('builds who-hit-whom links and lays them out by damage', () => {
    const links = flowOf(acts, roster)
    expect(links).toEqual([
      {
        from: 'Devan',
        to: 'Breaker1',
        fromSide: 'pc',
        toSide: 'foe',
        value: 32,
        hits: 2,
        crits: 1,
      },
      {
        from: 'Breaker1',
        to: 'Soldier1',
        fromSide: 'foe',
        toSide: 'ally',
        value: 15,
        hits: 1,
        crits: 0,
      },
    ])
    const layout = flowLayout(links)
    expect(layout.left.map((n) => n.name)).toEqual(['Devan', 'Breaker1'])
    expect(layout.right.map((n) => n.name)).toEqual(['Breaker1', 'Soldier1'])
    const [big, small] = layout.paths
    expect(big.w / small.w).toBeCloseTo(32 / 15, 5)
    expect(scenarioFlow({ flow: [['Soldier', 'Breaker', 4]] })[0]).toMatchObject({
      fromSide: 'ally',
      toSide: 'foe',
    })
  })
})
