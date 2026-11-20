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
  fortress: { x: -60, y: -40 },
  course: { x: -0.38, y: -0.92 },
}

describe('battlePlan', () => {
  const plan = battlePlan(roster, geometry)
  const { times } = plan

  it('spawns the ships one by one and engages at once, never faster than the speed cap', () => {
    const launches = plan.ships.map((entry) => entry.launchAt)
    expect(launches).toEqual(launches.toSorted((a, b) => a - b))
    expect(times.chase - times.launch).toBeLessThanOrEqual(BATTLE_TIMING.scatter)
    const dt = 0.05
    let fastest = 0
    for (const entry of plan.ships) {
      for (let at = entry.launchAt + BATTLE_TIMING.spawnSpread; at < times.fire; at += dt) {
        const a = shipPose(plan, entry, at).pos
        const b = shipPose(plan, entry, at + dt).pos
        fastest = Math.max(fastest, Math.hypot(b.x - a.x, b.y - a.y) / dt)
      }
    }
    expect(fastest).toBeLessThan(BATTLE_TIMING.maxSpeed * 1.2)
  })

  it('keeps the fortress on a steady course throughout', () => {
    const a = fortressAt(plan, 10)
    const b = fortressAt(plan, 20)
    const c = fortressAt(plan, 30)
    expect(b.x - a.x).toBeCloseTo(c.x - b.x)
    expect(b.y - a.y).toBeCloseTo(c.y - b.y)
    expect(b.y).toBeLessThan(a.y)
  })

  it('keeps the flagship behind until ships turn, then picks up the party in slow motion', () => {
    const appear = plan.crossings.filter((entry) => entry.kind === 'appear')
    expect(appear.map((entry) => [entry.avatar, entry.to])).toEqual([
      ['/a.png', 'flagship'],
      ['/b.png', 'flagship'],
    ])
    expect(times.pickup!.start).toBe(times.switchStart)
    expect(appear[0]!.at).toBeGreaterThanOrEqual(times.pickup!.start)
    const flagship = plan.ships.find((entry) => entry.key === 'flagship')!
    const held = shipPose(plan, flagship, times.boardEnd).pos
    expect(Math.hypot(held.x - geometry.hold.x, held.y - geometry.hold.y)).toBeLessThan(15)
    expect(times.join!.start).toBeGreaterThanOrEqual(times.boardEnd)
    expect(times.slow.start).toBeGreaterThan(times.join!.end)
    const firing = plan.volleys.filter((volley) => volley.from === 'flagship')
    expect(firing.every((volley) => volley.at >= times.join!.end)).toBe(true)
    const pickupMiddle = (times.pickup!.start + times.pickup!.end) / 2
    expect(cameraAt(plan, pickupMiddle).span).toBeLessThan(cameraAt(plan, times.fire).span)
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

  it('makes the switched ships the priority targets over the fortress', () => {
    const byKey = new Map(plan.ships.map((entry) => [entry.key, entry]))
    const loyal = plan.volleys.filter((volley) => {
      const from = byKey.get(volley.from)
      return from?.side === 0 && volley.at > times.switchEnd && volley.at < times.slow.end
    })
    const onFortress = loyal.filter((volley) => volley.to === FORTRESS).length
    expect(loyal.length).toBeGreaterThan(0)
    expect(onFortress / loyal.length).toBeLessThan(0.2)
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
    expect(battleTimeAt(plan, playbackLength(plan))).toBeCloseTo(times.end)
    const pickup = times.pickup!
    const realAtPickup = pickup.start
    expect(battleTimeAt(plan, realAtPickup + 1)).toBeCloseTo(
      pickup.start + BATTLE_TIMING.slowMotion,
    )
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
    expect(captionAt(plan, times.pickup!.start + 0.5)?.text).toBe(
      'flagship picks up the party over Nimbus',
    )
    expect(captionAt(plan, times.slow.start)?.text).toBe('The party crosses to seized')
    expect(captionAt(plan, times.ceaseFire + 1.5)?.text).toBe('2 contacts remain')
  })

  it('plays the same way every time', () => {
    expect(battlePlan(roster, geometry)).toEqual(plan)
  })

  it('never jolts the ships as the chase gives way to the fight', () => {
    const dt = 0.05
    let sharpest = 0
    for (const entry of plan.ships.filter((ship) => !ship.lost)) {
      const velocity = (at: number) => {
        const a = shipPose(plan, entry, at).pos
        const b = shipPose(plan, entry, at + dt).pos
        return { x: (b.x - a.x) / dt, y: (b.y - a.y) / dt }
      }
      for (let at = times.switchEnd; at < times.end; at += dt) {
        const now = velocity(at)
        const next = velocity(at + dt)
        sharpest = Math.max(sharpest, Math.hypot(next.x - now.x, next.y - now.y) / dt)
      }
    }
    expect(sharpest).toBeLessThan(250)
  })

  it('plays on until the fortress is out of view', () => {
    expect(times.end).toBeGreaterThan(times.fortressGone)
    const camera = cameraAt(plan, times.fortressGone)
    const fortress = fortressAt(plan, times.fortressGone)
    const away = Math.max(
      Math.abs(fortress.x - camera.centre.x) - camera.span / 2,
      Math.abs(fortress.y - camera.centre.y) - camera.span * 0.4,
    )
    expect(away).toBeGreaterThan(0)
    expect(captionAt(plan, times.end)?.text).toBe('Contact lost: the flying fortress')
  })

  it('keeps the ships from overlapping one another', () => {
    let close = 0
    let pairs = 0
    for (let at = times.launch + 3; at < times.end; at += 0.25) {
      const afloat = plan.ships
        .map((entry) => shipPose(plan, entry, at))
        .filter((pose) => pose.state === 'sailing')
      afloat.forEach((a, index) => {
        for (const b of afloat.slice(index + 1)) {
          pairs += 1
          if (Math.hypot(a.pos.x - b.pos.x, a.pos.y - b.pos.y) < 40) close += 1
        }
      })
    }
    expect(close / pairs).toBeLessThan(0.02)
  })

  it('keeps the survivors firing to the very end', () => {
    const lastShot = Math.max(...plan.volleys.map((volley) => volley.at))
    expect(lastShot).toBeGreaterThan(times.end - 2)
  })
})
