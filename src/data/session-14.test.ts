import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs.ts'
import {
  beasts,
  events,
  items,
  locationChildren,
  locationParent,
  locations,
  sessionDays,
  sessionPcs,
  sessions,
} from '#/lib/campaign.ts'
import { buildLocationHierarchyMap } from '#/lib/location-hierarchy-map'

describe('Session 14 transcript import', () => {
  it('keeps the real play date separate from the next campaign morning', () => {
    const session = sessions.the_serpent_lake
    expect(session.number).toBe(14)
    expect(session.date.toISOString()).toBe('2026-09-03T00:00:00.000Z')
    expect(sessionDays(session)).toEqual([
      {
        day: 22,
        events: [
          events.n2_e135,
          events.n2_e136,
          events.n2_e137,
          events.n2_e138,
          events.n2_e139,
          events.n2_e140,
          events.n2_e141,
          events.n2_e142,
          events.n2_e143,
          events.n2_e144,
          events.n2_e145,
          events.n2_e146,
          events.n2_e147,
          events.n2_e148,
        ],
      },
    ])
    expect(sessionPcs(session).map((pc) => pc.slug)).toEqual([
      'cassian-veyl',
      'devan',
      'jim',
      'swift-starblade',
    ])
  })

  it('records Jim eating the apple without guessing the Mage Hand caster', () => {
    const [apple, intervention] = events.n2_e141.notes
    expect(apple).toEqual([
      'Despite warnings from the fairies near the tree, ',
      refs.pcs.jim,
      ' ate a golden apple and became compelled to eat another. The fairies warned that another apple could kill him.',
    ])
    expect(intervention[0]).toBe(
      'A Mage Hand took the next apple away and returned it to the tree, where its stem reattached. That did not stop ',
    )
    expect(intervention).toContainEqual(refs.pcs.cassian_veyl)
    expect(intervention.at(-1)).toBe(
      ' cast Suggestion to keep him from eating the apples for up to eight hours.',
    )
    expect(events.n2_e141.notes.flat()).not.toContainEqual(refs.pcs.swift_starblade)
  })

  it('keeps Swift and his familiar distinct from Jim and Crowy', () => {
    expect(beasts.captain_squawk.name).toBe('Captain Squawk')
    expect(beasts.captain_squawk.avatar).toBe('/assets/beasts/captain-squawk.jpg')
    expect(beasts.captain_squawk.notes?.flat()).toContainEqual(refs.pcs.swift_starblade)
    expect(events.n2_e136.notes.flat()).toContainEqual(refs.beasts.captain_squawk)
    expect(events.n2_e136.notes.flat()).not.toContainEqual(refs.pcs.jim)
    expect(events.n2_e146.notes[0]).toEqual([
      refs.pcs.swift_starblade,
      ' sent ',
      refs.beasts.captain_squawk,
      ' to carry a rope to ',
      refs.pcs.jim,
      '. The party used ropes and helping hands to pull one another toward the bank while the ',
      refs.beasts.serpent_eclipse_lake_serpent,
      ' battered them with whirlpools and jets of water.',
    ])
    expect(events.n2_e146.notes[1]).toContainEqual(refs.npcs.crowy)
  })

  it('nests the new trial in the existing dungeon and clears unconfirmed disk custody', () => {
    expect(locationParent(locations.serpent_eclipse_maze)).toBe(
      locations.temple_of_the_serpent_eclipse,
    )
    expect(locationParent(locations.serpent_eclipse_flooded_cavern)).toBe(
      locations.serpent_eclipse_maze,
    )
    expect(beasts.serpent_eclipse_lake_serpent.location).toEqual(
      refs.locations.serpent_eclipse_flooded_cavern,
    )
    expect(items.serpent_eclipse_trial_disk.carriedBy).toBeNull()
    expect(events.n2_e140.notes.flat()).toContainEqual(refs.items.serpent_eclipse_trial_disk)
  })

  it('ends with a short rest and an unfinished trial, not a slain serpent', () => {
    expect(events.n2_e147.notes.flat()).toContainEqual(refs.pcs.devan)
    expect(events.n2_e147.notes.flat()).toContainEqual(refs.items.steve_mace_of_returning)
    expect(events.n2_e147.notes.flat()).toContainEqual(refs.beasts.serpent_eclipse_lake_serpent)
    expect(events.n2_e147.location).toEqual(refs.locations.serpent_eclipse_far_landing)
    expect(events.n2_e148.location).toEqual(refs.locations.serpent_eclipse_rest_chamber)
    expect(events.n2_e148.notes.flat()).toContainEqual(refs.events.n2_e147)
    expect(events.n2_e148.notes.flat().at(-1)).toBe(
      ' gathered around the campfire and took a short rest. The flag remained unfound and the maze trial unfinished.',
    )
  })

  it('places each dungeon event in its scene instead of the whole maze', () => {
    expect(
      [
        events.n2_e140,
        events.n2_e141,
        events.n2_e142,
        events.n2_e143,
        events.n2_e144,
        events.n2_e145,
        events.n2_e146,
        events.n2_e147,
        events.n2_e148,
      ].map((event) => event.location),
    ).toEqual([
      refs.locations.serpent_eclipse_three_door_chamber,
      refs.locations.serpent_eclipse_golden_tree_chamber,
      refs.locations.serpent_eclipse_pillar_chamber,
      refs.locations.serpent_eclipse_waterfall_descent,
      refs.locations.serpent_eclipse_flooded_cavern,
      refs.locations.serpent_eclipse_flooded_cavern,
      refs.locations.serpent_eclipse_flooded_cavern,
      refs.locations.serpent_eclipse_far_landing,
      refs.locations.serpent_eclipse_rest_chamber,
    ])
  })

  it('anchors every explored scene to the matching region of the approved artwork', () => {
    const maze = locations.serpent_eclipse_maze
    expect(maze.map).toEqual({
      url: '/assets/maps/serpent-eclipse-maze.jpg',
      width: 1536,
      height: 1024,
    })
    const expectedPoints = [
      [locations.serpent_eclipse_golden_tree_chamber, [1280, 190]],
      [locations.serpent_eclipse_pillar_chamber, [775, 190]],
      [locations.serpent_eclipse_waterfall_descent, [180, 440]],
      [locations.serpent_eclipse_flooded_cavern, [360, 740]],
      [locations.serpent_eclipse_far_landing, [725, 640]],
      [locations.serpent_eclipse_rest_chamber, [1000, 640]],
    ] as const
    const children = locationChildren(maze.slug)
    expect(children).toHaveLength(expectedPoints.length)
    for (const [location, [x, y]] of expectedPoints) {
      expect(locationParent(location)).toBe(maze)
      const model = buildLocationHierarchyMap(maze, children, location.slug)
      const pin = model.points.find((point) => point.slug === location.slug)
      expect(pin?.left).toBeCloseTo((x / 1536) * 100)
      expect(pin?.top).toBeCloseTo((y / 1024) * 100)
      expect(pin?.current).toBe(true)
    }
  })
})
