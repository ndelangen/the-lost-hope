import { describe, expect, it } from 'vitest'

import { resolveSourceRef } from '#/lib/dm-campaign'

import {
  findReplays,
  keyedLines,
  lossRooms,
  outcomeMatrix,
  percent,
  rideTheLightningSims as sims,
} from './fight-sims'

describe('Ride the Lightning fight sims', () => {
  it('has every route and crystal-room timing for every tactic and mistake rate', () => {
    for (const foes of sims.foes) {
      for (const mistakes of sims.mistakes) {
        const cells = outcomeMatrix(sims, foes.key, mistakes).flatMap((row) => row.cells)
        expect(cells).toHaveLength(sims.routes.length * sims.crystal.length)
        for (const { scenario } of cells) {
          expect(scenario).toBeDefined()
          expect(scenario!.win + scenario!.tpk + scenario!.stall).toBeCloseTo(1, 6)
        }
      }
    }
  })

  it('keeps a replay for every route and crystal-room timing', () => {
    for (const route of sims.routes) {
      for (const crystal of sims.crystal) {
        expect(findReplays(sims, route.key, crystal.key).length).toBeGreaterThan(0)
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

  it('records hit points for the whole roster on every frame', () => {
    for (const replay of sims.replays) {
      for (const room of replay.rooms) {
        for (const frame of room.frames) expect(frame.hp).toHaveLength(room.roster.length)
      }
    }
  })

  it('orders losses worst room first and formats shares', () => {
    const scenario = { lostAt: { 'The Helm': 0.1, 'Korrag, just before the bridge': 0.3 } }
    expect(lossRooms(scenario as never).map((l) => l.room)).toEqual([
      'Korrag, just before the bridge',
      'The Helm',
    ])
    expect(percent(0.004)).toBe('<1%')
    expect(percent(0)).toBe('0%')
    expect(percent(0.876)).toBe('88%')
    expect(keyedLines(['a', 'b', 'a']).map((l) => l.key)).toEqual(['a#1', 'b#1', 'a#2'])
  })
})
