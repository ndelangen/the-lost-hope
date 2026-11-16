import { describe, expect, it } from 'vitest'

import { SceneShipDamage } from '#/definitions/scene'

import {
  adjustSector,
  advanceTimer,
  brokenSlice,
  formatCountdown,
  hitSector,
  initialShipDamage,
  parseShipDamage,
  pauseTimer,
  remainingMs,
  rollSlice,
  shipSectors,
  sliceStatuses,
  startTimer,
} from './ship-damage'

const sector = (name: string, escapePods = true) => ({ name, escapePods })

const ship = SceneShipDamage.parse({
  vessel: { ref: 'item', key: 'cruiser' },
  everySeconds: 180,
  hitDamage: 1,
  sectorHitPoints: 5,
  port: [
    sector('Port bow'),
    sector('Port battery'),
    sector('Crystal chamber', false),
    sector('Helm', false),
  ],
  starboard: [
    sector('Starboard bow'),
    sector('Starboard battery'),
    sector('Barracks'),
    sector('Stern hold'),
  ],
})

/** Sector indexes: port 0 to 3 from the bow, then starboard 4 to 7. */
function hits(indexes: number[], from = initialShipDamage(ship)) {
  return indexes.reduce((state, index) => hitSector(state, ship, index), from)
}

describe('ship damage', () => {
  it('lists the sectors port first, each in its slice from the bow', () => {
    const sectors = shipSectors(ship, initialShipDamage(ship))
    expect(sectors.map((s) => [s.index, s.name, s.side, s.slice])).toEqual([
      [0, 'Port bow', 'port', 0],
      [1, 'Port battery', 'port', 1],
      [2, 'Crystal chamber', 'port', 2],
      [3, 'Helm', 'port', 3],
      [4, 'Starboard bow', 'starboard', 0],
      [5, 'Starboard battery', 'starboard', 1],
      [6, 'Barracks', 'starboard', 2],
      [7, 'Stern hold', 'starboard', 3],
    ])
  })

  it('destroys a sector once it has taken all its hit points, and no further', () => {
    const chamber = shipSectors(ship, hits([2, 2, 2, 2, 2, 2]))[2]
    expect(chamber).toMatchObject({ damage: 5, destroyed: true, escapePods: false })
  })

  it('is cut in two only when port and starboard of the same slice are both destroyed', () => {
    const port = hits([1, 1, 1, 1, 1])
    expect(brokenSlice(ship, port)).toBeUndefined()
    const diagonal = hits([6, 6, 6, 6, 6], port)
    expect(brokenSlice(ship, diagonal)).toBeUndefined()
    const across = hits([5, 5, 5, 5, 5], diagonal)
    expect(brokenSlice(ship, across)).toBe(1)
  })

  it('warns as a slice goes from intact to holding by one side to one hit from breaking', () => {
    const oneSide = hits([1, 1, 1, 1, 1])
    expect(sliceStatuses(ship, oneSide)).toEqual(['intact', 'holding', 'intact', 'intact'])
    const nearly = hits([5, 5, 5, 5], oneSide)
    expect(sliceStatuses(ship, nearly)).toEqual(['intact', 'critical', 'intact', 'intact'])
    expect(sliceStatuses(ship, hits([5], nearly))[1]).toBe('broken')
  })

  it('refuses a ship whose sides differ in length', () => {
    expect(SceneShipDamage.safeParse({ ...ship, starboard: ship.starboard.slice(1) }).success).toBe(
      false,
    )
  })

  it('runs the timer on repeat and owes one hit for every interval that passed', () => {
    const started = startTimer(initialShipDamage(ship), 1_000)
    expect(remainingMs(started, 61_000)).toBe(120_000)
    expect(advanceTimer(started, ship, 180_999)).toBe(started)

    const once = advanceTimer(started, ship, 181_000)
    expect(once).toMatchObject({ owed: 1, endsAt: 361_000 })

    const away = advanceTimer(started, ship, 181_000 + 2 * 180_000 + 5_000)
    expect(away.owed).toBe(3)
    expect(remainingMs(away, 181_000 + 2 * 180_000 + 5_000)).toBe(175_000)
  })

  it('keeps the time left when paused and resumes from it', () => {
    const paused = pauseTimer(startTimer(initialShipDamage(ship), 0), 30_000)
    expect(paused.endsAt).toBeUndefined()
    expect(remainingMs(paused, 999_999)).toBe(150_000)
    expect(advanceTimer(paused, ship, 999_999)).toBe(paused)
    expect(startTimer(paused, 1_000_000).endsAt).toBe(1_150_000)
  })

  it('settles an owed hit when a sector is hit, but not on a manual correction', () => {
    const owing = { ...initialShipDamage(ship), owed: 2 }
    expect(hitSector(owing, ship, 0)).toMatchObject({ owed: 1, damage: [1, 0, 0, 0, 0, 0, 0, 0] })
    expect(adjustSector(owing, ship, 0, 1).owed).toBe(2)
    expect(adjustSector(owing, ship, 0, -1).damage[0]).toBe(0)
  })

  it('rolls the die for a slice', () => {
    expect(rollSlice(ship, 0)).toBe(0)
    expect(rollSlice(ship, 0.25)).toBe(1)
    expect(rollSlice(ship, 0.999)).toBe(3)
  })

  it('starts fresh when stored state does not fit the ship', () => {
    const fresh = initialShipDamage(ship)
    expect(parseShipDamage(null, ship)).toEqual(fresh)
    expect(parseShipDamage('not json', ship)).toEqual(fresh)
    expect(parseShipDamage(JSON.stringify({ ...fresh, damage: [1, 2] }), ship)).toEqual(fresh)
    const stored = { damage: [1, 9, 0, 0, 0, 0, 0, 0], endsAt: 5, remainingMs: 10, owed: 1 }
    expect(parseShipDamage(JSON.stringify(stored), ship)).toEqual({
      ...stored,
      damage: [1, 5, 0, 0, 0, 0, 0, 0],
    })
  })

  it('formats the countdown, rounding up', () => {
    expect(formatCountdown(180_000)).toBe('3:00')
    expect(formatCountdown(64_001)).toBe('1:05')
    expect(formatCountdown(1)).toBe('0:01')
    expect(formatCountdown(0)).toBe('0:00')
  })
})
