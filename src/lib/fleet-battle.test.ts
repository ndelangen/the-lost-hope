import { describe, expect, it } from 'vitest'

import {
  battleCounts,
  battlePlan,
  captionAt,
  FORTRESS,
  fortressAt,
  legendAt,
  shipPose,
} from './fleet-battle'
import type { FleetRoster, FleetShip } from './fleet-roster'

function ship(key: string, extra: Partial<FleetShip> = {}): FleetShip {
  return { key, name: key, icon: `gi/${key}`, aboard: [], ...extra }
}

const party = { id: 'party', label: 'The party', avatars: ['/a.png', '/b.png'] }
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
const geometry = {
  home: { x: 1000, y: 800 },
  centre: { x: 600, y: 450 },
  fortress: { x: 500, y: 300 },
  escape: { x: -300, y: -250 },
}

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

  it('opens fire on the fortress before the ships turn, and the fortress fires back', () => {
    const early = plan.volleys.filter((volley) => volley.at < times.advanceEnd)
    expect(early.length).toBeGreaterThan(0)
    expect(early.every((volley) => volley.to === FORTRESS || volley.from === FORTRESS)).toBe(true)
    expect(plan.volleys.some((volley) => volley.from === FORTRESS && volley.kind === 'beam')).toBe(
      true,
    )
  })

  it('has the turned ships fire on their old side, never on the fortress', () => {
    const byKey = new Map(plan.ships.map((entry) => [entry.key, entry]))
    const fromTurned = plan.volleys.filter((volley) => {
      const from = byKey.get(volley.from)
      return from?.turnAt !== undefined && volley.at > from.turnAt + 0.25 && volley.kind !== 'beam'
    })
    expect(fromTurned.length).toBeGreaterThan(0)
    expect(fromTurned.every((volley) => volley.to !== FORTRESS)).toBe(true)
    for (const volley of plan.volleys) {
      const from = byKey.get(volley.from)
      expect(volley.at).toBeLessThan(from?.lostAt ?? Infinity)
    }
  })

  it('lets the fortress drift while it is under fire, then flee to the escape point', () => {
    const sighted = fortressAt(plan, 0)
    const split = fortressAt(plan, times.split)
    const gone = fortressAt(plan, times.end)
    expect(sighted).toEqual(geometry.fortress)
    expect(Math.hypot(split.x - sighted.x, split.y - sighted.y)).toBeLessThan(120)
    expect(gone).toEqual(geometry.escape)
  })

  it('sends the boarding party across from the flagship one by one', () => {
    expect(plan.crossings).toEqual([
      expect.objectContaining({ avatar: '/a.png', from: 'flagship', to: 'seized' }),
      expect.objectContaining({ avatar: '/b.png', from: 'flagship', to: 'seized' }),
    ])
    const [first, second] = plan.crossings
    expect(second!.at).toBeGreaterThan(first!.at)
  })

  it('plays the same way every time', () => {
    expect(battlePlan(roster, geometry)).toEqual(plan)
  })

  it('captions the battle from launch to the survivors', () => {
    expect(captionAt(plan, times.launch + 0.1)?.text).toBe('Navy fleet launching: 6 contacts')
    expect(captionAt(plan, times.split + 0.1)?.text).toBe('The fleet is split: 3 against 3')
    expect(captionAt(plan, times.end)?.text).toBe('The fortress escaped · 2 contacts remain')
  })

  it('lists every ship in the legend with its side and whether it is still fighting', () => {
    expect(legendAt(plan, 0).every((row) => row.status === 'docked')).toBe(true)
    const end = legendAt(plan, times.end)
    expect(end.map((row) => [row.key, row.side, row.status])).toEqual([
      ['flagship', 0, 'in service'],
      ['wreck', 0, 'destroyed'],
      ['sunk', 0, 'destroyed'],
      ['seized', 1, 'in service'],
      ['burnt', 1, 'destroyed'],
      ['scuttled', 1, 'destroyed'],
    ])
    expect(end.find((row) => row.key === 'seized')?.turned).toBe(true)
  })
})
