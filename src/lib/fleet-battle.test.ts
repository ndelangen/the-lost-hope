import { describe, expect, it } from 'vitest'

import {
  battleCounts,
  battlePlan,
  battleTimeAt,
  BATTLE_TIMING,
  cameraAt,
  captionAt,
  FORTRESS,
  fortressAt,
  legendAt,
  playbackLength,
  PICKUP,
  shipPose,
} from './fleet-battle'
import type { FleetRoster, FleetShip } from './fleet-roster'

function ship(key: string, extra: Partial<FleetShip> = {}): FleetShip {
  return { key, name: key, icon: `gi/${key}`, aboard: [], ...extra }
}

const party = { id: 'party', label: 'The party', avatars: ['/a.png', '/b.png'] }
const admiral = { id: 'npc:admiral', label: 'Admiral', avatars: ['/admiral.png'] }
const roster: FleetRoster = {
  owner: { key: 'navy', name: 'Navy' },
  sides: [
    {
      key: 'navy',
      name: 'Navy',
      ships: [
        ship('flagship', { aboard: [admiral] }),
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
  home: { x: 1200, y: 800 },
  hold: { x: 600, y: 330 },
  pickup: { x: 340, y: 170 },
  fortress: { x: -60, y: -40 },
  course: { x: -0.38, y: -0.92 },
}

describe('battlePlan', () => {
  const plan = battlePlan(roster, geometry)
  const { times } = plan

  it('deploys the whole fleet under its owner and holds it over the hold point', () => {
    expect(battleCounts(plan, times.arrive, 2)).toEqual({ flying: [6, 0], lost: 0 })
    for (const entry of plan.ships) {
      const { pos } = shipPose(plan, entry, times.boardStart)
      expect(Math.hypot(pos.x - geometry.hold.x, pos.y - geometry.hold.y)).toBeLessThan(260)
    }
  })

  it('keeps the fortress on a steady course throughout', () => {
    const a = fortressAt(plan, 10)
    const b = fortressAt(plan, 20)
    const c = fortressAt(plan, 30)
    expect(b.x - a.x).toBeCloseTo(c.x - b.x)
    expect(b.y - a.y).toBeCloseTo(c.y - b.y)
    expect(b.y).toBeLessThan(a.y)
  })

  it('boards the party onto the flagship in order while the fleet holds', () => {
    const boards = plan.crossings.filter((entry) => entry.kind === 'board')
    expect(boards.map((entry) => [entry.avatar, entry.from, entry.to])).toEqual([
      ['/a.png', PICKUP, 'flagship'],
      ['/b.png', PICKUP, 'flagship'],
    ])
    expect(boards[1]!.at).toBeGreaterThan(boards[0]!.at)
    expect(boards.at(-1)!.at + boards.at(-1)!.duration).toBeLessThanOrEqual(times.chase)
  })

  it('opens fire on the fortress once the chase is on, before any ship switches', () => {
    expect(plan.volleys.every((volley) => volley.at >= times.fire)).toBe(true)
    const early = plan.volleys.filter((volley) => volley.at < times.switchStart)
    expect(early.length).toBeGreaterThan(0)
    expect(early.every((volley) => volley.to === FORTRESS || volley.from === FORTRESS)).toBe(true)
  })

  it('switches ships in quick succession, and has them fire on their old side', () => {
    const turns = plan.ships.flatMap((entry) => entry.turnAt ?? []).toSorted((a, b) => a - b)
    expect(turns).toHaveLength(3)
    expect(turns.at(-1)! - turns[0]!).toBeLessThan(1)
    const byKey = new Map(plan.ships.map((entry) => [entry.key, entry]))
    const fromTurned = plan.volleys.filter((volley) => {
      const from = byKey.get(volley.from)
      return from?.turnAt !== undefined && volley.at > from.turnAt + 0.2
    })
    expect(fromTurned.length).toBeGreaterThan(0)
    expect(fromTurned.every((volley) => volley.to !== FORTRESS)).toBe(true)
  })

  it('fires the party across from the flagship to their ship in slow motion', () => {
    const shots = plan.crossings.filter((entry) => entry.kind === 'shot')
    expect(shots.map((entry) => [entry.avatar, entry.from, entry.to])).toEqual([
      ['/a.png', 'flagship', 'seized'],
      ['/b.png', 'flagship', 'seized'],
    ])
    for (const shot of shots) {
      expect(shot.at).toBeGreaterThanOrEqual(times.slow.start)
      expect(shot.at + shot.duration).toBeLessThanOrEqual(times.slow.end)
    }
    expect(battleTimeAt(plan, times.slow.start + 1)).toBeCloseTo(
      times.slow.start + BATTLE_TIMING.slowMotion,
    )
    expect(battleTimeAt(plan, playbackLength(plan))).toBeCloseTo(times.end)
  })

  it('loses ships only after the crossing, alternating sides, and they fall away', () => {
    const losses = plan.ships
      .filter((entry) => entry.lostAt !== undefined)
      .toSorted((a, b) => a.lostAt! - b.lostAt!)
    expect(losses.map((entry) => entry.side)).toEqual([0, 1, 0, 1])
    expect(losses[0]!.lostAt).toBeGreaterThan(times.slow.end)
    const first = losses[0]!
    const down = shipPose(plan, first, first.lostAt!)
    const later = shipPose(plan, first, first.lostAt! + 1)
    expect(later.pos.y).toBeGreaterThan(down.pos.y)
    expect(shipPose(plan, first, first.lostAt! + BATTLE_TIMING.sink + 0.01).sinking).toBe(1)
  })

  it('ends in the roster: every lost ship gone, the survivors on their side', () => {
    expect(battleCounts(plan, times.end, 2)).toEqual({ flying: [1, 1], lost: 4 })
    const seized = plan.ships.find((entry) => entry.key === 'seized')!
    expect(shipPose(plan, seized, times.end).side).toBe(1)
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
  })

  it('closes the camera in for the crossing', () => {
    const middle = (times.slow.start + times.slow.end) / 2
    expect(cameraAt(plan, middle).span).toBeLessThan(cameraAt(plan, times.fire).span)
  })

  it('captions the battle from first contact to the survivors', () => {
    expect(captionAt(plan, 0.5)?.text).toBe(
      'Contact: the flying fortress, heading north-north-west',
    )
    expect(captionAt(plan, times.boardStart)?.text).toBe('The party boards flagship')
    expect(captionAt(plan, times.slow.start)?.text).toBe('The party crosses to seized')
    expect(captionAt(plan, times.end)?.text).toBe('2 contacts remain')
  })

  it('plays the same way every time', () => {
    expect(battlePlan(roster, geometry)).toEqual(plan)
  })
})
