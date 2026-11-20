import { describe, expect, it } from 'vitest'

import type { FleetRoster, FleetShip } from './fleet-roster'
import { fleetSequence } from './fleet-sequence'

function ship(key: string, extra: Partial<FleetShip> = {}): FleetShip {
  return { key, name: key, icon: `gi/${key}`, aboard: [], ...extra }
}

const roster: FleetRoster = {
  owner: { key: 'navy', name: 'Navy' },
  sides: [
    {
      key: 'navy',
      name: 'Navy',
      ships: [
        ship('flagship', { aboard: [{ id: 'npc:admiral', label: 'Admiral', avatars: [] }] }),
        ship('wreck', { status: 'destroyed' }),
      ],
      inService: 1,
      lost: 1,
    },
    {
      key: 'rebels',
      name: 'The Rebels',
      ships: [
        ship('seized', { aboard: [{ id: 'party', label: 'The party', avatars: [] }] }),
        ship('sunk', { status: 'destroyed' }),
      ],
      inService: 1,
      lost: 1,
    },
  ],
  building: [ship('keel', { status: 'under-construction' })],
}

describe('fleetSequence', () => {
  const frames = fleetSequence(roster)
  const last = frames.at(-1)!

  it('starts with the whole fleet under its owner', () => {
    expect(Object.values(frames[0]!.sideOf)).toEqual([0, 0, 0, 0])
    expect(frames[0]!.caption).toBe('The Navy fleet: 4 battle-cruisers')
  })

  it('ends in the final roster: every side, loss and marker in place', () => {
    expect(last.sideOf).toEqual({ flagship: 0, wreck: 0, seized: 1, sunk: 1 })
    expect(last.ships).toEqual({
      flagship: 'shown',
      wreck: 'destroyed',
      seized: 'shown',
      sunk: 'destroyed',
    })
    expect(last.markers).toEqual({ 'npc:admiral': 'aboard', party: 'aboard' })
    expect(last).toMatchObject({ sidesShown: 2, settled: true, building: true })
  })

  it('tells the story in order: seizure, boarding, war, survivors, the ship being built', () => {
    expect(frames.map((frame) => frame.caption).filter(unique)).toEqual([
      'The Navy fleet: 4 battle-cruisers',
      'The Rebels seizes two',
      'The party boards seized',
      'The fleet turns on itself',
      'Two remain',
      '…and one more is being built',
    ])
  })

  it('stages the party before it boards, and explodes each lost ship before it is gone', () => {
    const party = frames.map((frame) => frame.markers.party).filter(unique)
    expect(party).toEqual(['hidden', 'staged', 'aboard'])
    const wreck = frames.map((frame) => frame.ships.wreck).filter(unique)
    expect(wreck).toEqual(['shown', 'exploding', 'destroyed'])
  })

  it('keeps time moving forward', () => {
    const times = frames.map((frame) => frame.at)
    expect(times).toEqual(times.toSorted((a, b) => a - b))
  })
})

function unique<T>(value: T, index: number, list: readonly T[]): boolean {
  return index === 0 || list[index - 1] !== value
}
