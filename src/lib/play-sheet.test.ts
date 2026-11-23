import { describe, expect, it } from 'vitest'

import pcs from '#/data/pcs/_index'

import {
  addPc,
  emptyEncounter,
  liveStats,
  setConcentration,
  setExhaustion,
  setTemp,
} from './encounter'
import {
  heal,
  longRest,
  playTracks,
  setPlayStat,
  shortRest,
  spendHitDie,
  spendTrack,
  takeDamage,
  trackCount,
} from './play-sheet'
import type { PlayablePcStats } from './stat-block'

const id = 'pc:devan'
const start = { maxHp: 60, ac: 21 }
const fresh = () => addPc(emptyEncounter(), { ref: 'pc', key: 'devan' })
const statsOf = (key: keyof typeof pcs): PlayablePcStats => ({
  ...pcs[key].stats!,
  level: pcs[key].level!,
})
const devan = playTracks(statsOf('devan'))
const track = (name: string) => devan.find((candidate) => candidate.name === name)!

describe('play sheet tracks', () => {
  it('names a PC’s slots, features, pools and Hit Point Dice', () => {
    expect(devan.map(({ name, max, group }) => `${group}: ${name} ×${max}`)).toEqual([
      'slots: Level 1 ×4',
      'slots: Level 2 ×2',
      'features: Relentless Endurance ×1',
      'features: Lay on Hands ×25',
      'features: Channel Divinity: Divine Sense ×2',
      'hit-dice: d10 ×5',
    ])
    expect(track('Lay on Hands').pool).toBe(true)
  })

  it('gives a warlock pact slots that return on a short rest', () => {
    const pact = playTracks(statsOf('cassian_veyl')).find(
      (candidate) => candidate.group === 'slots',
    )
    expect(pact).toMatchObject({ name: 'Pact Magic, level 3', max: 2, shortRest: 'all' })
  })

  it('spends and returns within what a track holds', () => {
    const slot = track('Level 1')
    const spent = spendTrack(spendTrack(fresh(), id, slot), id, slot)
    expect(trackCount(slot, spent.values[id]).uses).toBe(2)
    expect(trackCount(slot, spendTrack(spent, id, slot, -5).values[id]).uses).toBe(4)
    expect(trackCount(slot, spendTrack(spent, id, slot, 9).values[id]).uses).toBe(0)
  })
})

describe('play sheet hit points', () => {
  it('takes temporary hit points first', () => {
    const hurt = takeDamage(setTemp(fresh(), id, 7), id, start, 20)
    expect(liveStats(start, hurt.values[id])).toMatchObject({ hp: 47, temp: undefined })
  })

  it('starts death saves and ends concentration at 0 HP', () => {
    const down = takeDamage(setConcentration(fresh(), id, 'Bless'), id, start, 99)
    expect(down.values[id]).toMatchObject({ hp: 0, dying: { successes: 0, failures: 0 } })
    expect(down.values[id]?.concentration).toBeUndefined()
  })

  it('counts damage while dying as a failed death save', () => {
    const down = takeDamage(fresh(), id, start, 99)
    expect(takeDamage(down, id, start, 3).values[id]?.dying).toEqual({ successes: 0, failures: 1 })
  })

  it('ends the death saves on any healing', () => {
    const up = heal(takeDamage(fresh(), id, start, 99), id, start, 4)
    expect(up.values[id]).toMatchObject({ hp: 4 })
    expect(up.values[id]?.dying).toBeUndefined()
  })

  it('follows a hand-corrected HP into and out of dying', () => {
    const down = setPlayStat(fresh(), id, 'hp', 0)
    expect(down.values[id]?.dying).toBeDefined()
    expect(setPlayStat(down, id, 'hp', 12).values[id]?.dying).toBeUndefined()
  })
})

describe('play sheet rests', () => {
  const spentAll = () =>
    devan.reduce((current, each) => spendTrack(current, id, each, each.max), fresh())

  it('returns only what a short rest brings back', () => {
    const rested = shortRest(spentAll(), id, devan)
    expect(devan.map((each) => trackCount(each, rested.values[id]).uses)).toEqual([
      0, 0, 0, 0, 1, 0,
    ])
  })

  it('heals with a Hit Point Die and uses it up', () => {
    const die = track('d10')
    const healed = spendHitDie(takeDamage(fresh(), id, start, 30), id, start, die, 8)
    expect(liveStats(start, healed.values[id]).hp).toBe(38)
    expect(trackCount(die, healed.values[id]).uses).toBe(4)
  })

  it('restores everything on a long rest and lowers exhaustion by one', () => {
    const worn = setExhaustion(setTemp(takeDamage(spentAll(), id, start, 30), id, 5), id, 2)
    const rested = longRest(worn, id)
    expect(liveStats(start, rested.values[id])).toMatchObject({ hp: 60, temp: undefined })
    expect(devan.every((each) => trackCount(each, rested.values[id]).uses === each.max)).toBe(true)
    expect(rested.values[id]?.exhaustion).toBe(1)
  })
})
