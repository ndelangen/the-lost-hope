import { describe, expect, it } from 'vitest'

import {
  allEntities,
  COLLECTIONS,
  entityHref,
  nonActivePcs,
  sessionDays,
  sortedSessions,
} from '#/lib/campaign'

import {
  defaultSidebarExpansions,
  sidebarCollections,
  sidebarRouteState,
  sidebarSessions,
} from './sidebar-data'

describe('sidebar collection data', () => {
  it('includes each non-story entity kind exactly once', () => {
    const expectedKinds = COLLECTIONS.filter((kind) => kind !== 'session' && kind !== 'event')
    const actualKinds = sidebarCollections.map((collection) => collection.kind)

    expect(new Set(actualKinds)).toEqual(new Set(expectedKinds))
    expect(actualKinds).toHaveLength(expectedKinds.length)
  })

  it('provides complete counts from display-ready groups', () => {
    for (const collection of sidebarCollections) {
      const itemCount = collection.groups.reduce((count, group) => count + group.items.length, 0)
      expect(collection.count).toBe(itemCount)
      expect(collection.count).toBe(allEntities(collection.kind).length)
    }
  })
})

describe('sidebar route state', () => {
  it('expands a collection and the active former-PC group', () => {
    const formerPc = nonActivePcs()[0]
    expect(formerPc).toBeDefined()
    if (!formerPc) return

    const state = sidebarRouteState(entityHref('pc', formerPc.slug))

    expect(state.expansionIds).toContain('collection:pc')
    expect(state.expansionIds).toContain('group:pc:former')
  })

  it('expands the session containing the active event', () => {
    const session = sortedSessions()[0]
    expect(session).toBeDefined()
    if (!session) return

    const event = sessionDays(session.data).flatMap((day) => day.events)[0]
    expect(event).toBeDefined()
    if (!event) return

    expect(sidebarRouteState(entityHref('event', event.slug)).expansionIds).toContain(
      `session:${session.slug}`,
    )
  })

  it('opens the latest session by default', () => {
    const latestSession = sidebarSessions[0]
    expect(latestSession).toBeDefined()
    if (!latestSession) return

    expect(defaultSidebarExpansions('/')).toContain(latestSession.expansionId)
  })
})
