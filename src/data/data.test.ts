import { describe, expect, it } from 'vitest'

import {
  BEASTS_KEYS,
  EVENTS_KEYS,
  LOCATIONS_KEYS,
  NPCS_KEYS,
  ORGANIZATIONS_KEYS,
  PCS_KEYS,
  QUESTS_KEYS,
  SESSIONS_KEYS,
} from '#/data/registry-keys.ts'
import { ENTITY_KINDS } from '#/definitions/kind.ts'
import {
  allEntities,
  beasts,
  campaignEvents,
  COLLECTIONS,
  events,
  locationParent,
  locations,
  npcs,
  organizations,
  pcs,
  quests,
  sessionDays,
  sessions,
  sortedEvents,
  validateReferences,
} from '#/lib/campaign.ts'

describe('location import order', () => {
  it('loads world directly', async () => {
    const world = await import('#/data/locations/world.ts')
    expect(world.default.slug).toBe('world')
  })

  it('loads badesh-forest directly', async () => {
    const forest = await import('#/data/locations/badesh-forest.ts')
    const parent = locationParent(forest.default)
    expect(parent?.slug).toBe('world')
  })

  it('loads locations index', async () => {
    const locationRegistry = await import('#/data/locations/_index.ts')
    expect(locationRegistry.default.world.slug).toBe('world')
  })
})

describe('registry integrity', () => {
  it('keeps typed ref keys synchronized with registries', () => {
    expect(Object.keys(beasts).toSorted()).toEqual([...BEASTS_KEYS].toSorted())
    expect(Object.keys(events).toSorted()).toEqual([...EVENTS_KEYS].toSorted())
    expect(Object.keys(locations).toSorted()).toEqual([...LOCATIONS_KEYS].toSorted())
    expect(Object.keys(npcs).toSorted()).toEqual([...NPCS_KEYS].toSorted())
    expect(Object.keys(organizations).toSorted()).toEqual([...ORGANIZATIONS_KEYS].toSorted())
    expect(Object.keys(pcs).toSorted()).toEqual([...PCS_KEYS].toSorted())
    expect(Object.keys(quests).toSorted()).toEqual([...QUESTS_KEYS].toSorted())
    expect(Object.keys(sessions).toSorted()).toEqual([...SESSIONS_KEYS].toSorted())
  })

  it('includes every entity kind in shared collection operations', () => {
    expect(new Set(COLLECTIONS)).toEqual(new Set(ENTITY_KINDS))
  })

  it('has globally unique slugs', () => {
    const owners = new Map<string, string>()
    const collisions: string[] = []

    for (const kind of ENTITY_KINDS) {
      for (const entity of allEntities(kind)) {
        const owner = owners.get(entity.slug)
        if (owner) collisions.push(`${entity.slug}: ${owner}, ${kind}`)
        else owners.set(entity.slug, kind)
      }
    }

    expect(collisions).toEqual([])
  })
})

describe('reference integrity', () => {
  it('has no dangling entity refs', async () => {
    await import('#/data/index.ts')
    const errors = validateReferences()
    expect(errors).toEqual([])
  })
})

describe('campaign chronology', () => {
  it('uses positive integer campaign days for every event', () => {
    for (const event of Object.values(events)) {
      expect(Number.isInteger(event.day)).toBe(true)
      expect(event.day).toBeGreaterThan(0)
    }
  })

  it('groups a session by campaign day while preserving its event order', () => {
    expect(sessionDays(sessions.the_fajanet_festival)).toEqual([
      { day: 3, events: [events.n2_e023, events.n2_e024] },
      { day: 4, events: [events.n2_e025] },
    ])
  })

  it('includes every registered event exactly once in campaign chronology', () => {
    const timelineSlugs = campaignEvents().map((event) => event.slug)
    const registrySlugs = Object.values(events).map((event) => event.slug)

    expect(new Set(timelineSlugs).size).toBe(timelineSlugs.length)
    expect(timelineSlugs.toSorted()).toEqual(registrySlugs.toSorted())
  })

  it('returns the latest event first', () => {
    expect(sortedEvents()[0]?.data).toBe(events.n2_e043)
  })
})
