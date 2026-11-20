import { describe, expect, it } from 'vitest'

import { battleCounts, battlePlan, captionAt, shipPose } from './fleet-battle'
import type { FleetRoster, FleetShip } from './fleet-roster'

function ship(key: string, extra: Partial<FleetShip> = {}): FleetShip {
  return { key, name: key, icon: `gi/${key}`, aboard: [], ...extra }
}

const party = { id: 'party', label: 'The party', avatars: ['/party.png'] }
const roster: FleetRoster = {
  owner: { key: 'navy', name: 'Navy' },
  sides: [
    {
      key: 'navy',
      name: 'Navy',
      ships: [
        ship('flagship'),
        ship('wreck', { status: 'destroyed' }),
        ship('sunk', { status: 'destroyed' }),
      ],
      inService: 1,
      lost: 2,
    },
    {
      key: 'rebels',
      name: 'Rebels',
      ships: [
        ship('seized', { aboard: [party] }),
        ship('burnt', { status: 'destroyed' }),
        ship('scuttled', { status: 'destroyed' }),
      ],
      inService: 1,
      lost: 2,
    },
  ],
  building: [],
}
const geometry = { home: { x: 1000, y: 800 }, centre: { x: 600, y: 450 }, target: { x: 0, y: 0 } }

describe('battlePlan', () => {
  const plan = battlePlan(roster, geometry)
  const { times } = plan

  it('launches the whole fleet under its owner', () => {
    expect(battleCounts(plan, times.advanceEnd - 0.1, 2)).toEqual({ flying: [6, 0], lost: 0 })
  })

  it('turns the rival ships one at a time until the sides are even', () => {
    const turns = plan.ships.flatMap((entry) => (entry.turnAt === undefined ? [] : [entry.turnAt]))
    expect(turns).toHaveLength(3)
    expect(new Set(turns).size).toBe(3)
    const halfway = turns.toSorted((a, b) => a - b)[1]! + 0.5
    expect(battleCounts(plan, halfway, 2).flying).toEqual([4, 2])
    expect(battleCounts(plan, times.split, 2).flying).toEqual([3, 3])
  })

  it('loses ships alternating between the sides', () => {
    const losses = plan.ships
      .filter((entry) => entry.lostAt !== undefined)
      .toSorted((a, b) => a.lostAt! - b.lostAt!)
      .map((entry) => entry.side)
    expect(losses).toEqual([0, 1, 0, 1])
  })

  it('ends in the roster: every lost ship wrecked, the survivors on their side', () => {
    expect(battleCounts(plan, times.end, 2)).toEqual({ flying: [1, 1], lost: 4 })
    const seized = plan.ships.find((entry) => entry.key === 'seized')!
    expect(shipPose(plan, seized, times.end).side).toBe(1)
  })

  it('fires only between the sides, and only from ships still afloat', () => {
    const byKey = new Map(plan.ships.map((entry) => [entry.key, entry]))
    for (const volley of plan.volleys) {
      const from = byKey.get(volley.from)!
      expect(from.side).not.toBe(byKey.get(volley.to)!.side)
      expect(volley.at).toBeGreaterThanOrEqual(times.battle - 2)
      expect(volley.at).toBeLessThan(from.lostAt ?? Infinity)
    }
    expect(plan.volleys.some((volley) => volley.kind === 'heavy')).toBe(true)
    expect(plan.volleys.some((volley) => volley.kind === 'hail')).toBe(true)
  })

  it('sends the boarding party across from the flagship', () => {
    expect(plan.crossings).toEqual([
      expect.objectContaining({ marker: 'party', from: 'flagship', to: 'seized' }),
    ])
  })

  it('plays the same way every time', () => {
    expect(battlePlan(roster, geometry)).toEqual(plan)
  })

  it('captions the battle from launch to the survivors', () => {
    expect(captionAt(plan, times.launch + 0.1)?.text).toBe('Navy fleet launching: 6 contacts')
    expect(captionAt(plan, times.split + 0.1)?.text).toBe('The fleet is split: 3 against 3')
    expect(captionAt(plan, times.end)?.text).toBe('2 contacts remain')
  })
})
