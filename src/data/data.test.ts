import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs.ts'
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
    expect(Object.keys(beasts).toSorted()).toEqual(Object.keys(refs.beasts).toSorted())
    expect(Object.keys(events).toSorted()).toEqual(Object.keys(refs.events).toSorted())
    expect(Object.keys(locations).toSorted()).toEqual(Object.keys(refs.locations).toSorted())
    expect(Object.keys(npcs).toSorted()).toEqual(Object.keys(refs.npcs).toSorted())
    expect(Object.keys(organizations).toSorted()).toEqual(
      Object.keys(refs.organizations).toSorted(),
    )
    expect(Object.keys(pcs).toSorted()).toEqual(Object.keys(refs.pcs).toSorted())
    expect(Object.keys(quests).toSorted()).toEqual(Object.keys(refs.quests).toSorted())
    expect(Object.keys(sessions).toSorted()).toEqual(Object.keys(refs.sessions).toSorted())
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

describe('player-character status', () => {
  it('preserves occasional and missing campaign states', () => {
    expect(pcs.mr_peace.status).toBe('occasional')
    expect(pcs.victor_the_badesh_lumberjack.status).toBe('missing-presumed-dead')
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
