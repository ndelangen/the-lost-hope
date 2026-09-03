import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import {
  activePcs,
  allEntities,
  campaignEvents,
  campaignSessions,
  COLLECTIONS,
  getEntity,
  openQuests,
  questProgress,
  resolveRef,
  reverseLinks,
  searchEntities,
  sessionDays,
  sessionEvents,
  sessionSlugForEvent,
  sortedEvents,
} from '#/lib/campaign'

describe('campaign read model', () => {
  it('reuses readonly entity collections and canonical wrappers', () => {
    const jim = resolveRef(refs.pcs.jim)

    for (const kind of COLLECTIONS) {
      const entities = allEntities(kind)
      expect(allEntities(kind)).toBe(entities)
      expect(Object.isFrozen(entities)).toBe(true)
    }
    expect(jim).toBe(getEntity('pc', jim?.slug ?? ''))

    for (const event of campaignEvents()) {
      expect(event).toBe(getEntity('event', event.slug))
    }
  })

  it('derives quest progress from the latest referenced campaign event', () => {
    const quest = getEntity('quest', 'the-dinosaur-migration')
    expect(quest).toBeDefined()
    if (!quest) return

    const progress = questProgress(quest.data)
    expect(progress?.event.slug).toBe('reach-badesh-victor-s-hometown')
    expect(progress?.event.data.day).toBe(10)
    expect(progress?.campaignDaysAgo).toBe(12)
  })

  it('reuses common domain groups', () => {
    expect(activePcs()).toBe(activePcs())
    expect(openQuests()).toBe(openQuests())
    expect(Object.isFrozen(activePcs())).toBe(true)
    expect(Object.isFrozen(openQuests())).toBe(true)
  })

  it('reuses precomputed campaign chronology', () => {
    const session = campaignSessions()[0]
    expect(session).toBeDefined()
    if (!session) return

    const events = sessionEvents(session.data)
    expect(sessionEvents(session.data)).toBe(events)
    expect(sessionDays(session.data)).toBe(sessionDays(session.data))
    expect(campaignEvents()).toBe(campaignEvents())
    expect(sortedEvents()).toBe(sortedEvents())
    expect(Object.isFrozen(events)).toBe(true)

    const event = events[0]!
    expect(event).toBeDefined()
    expect(sessionSlugForEvent(event.slug)).toBe(session.slug)
  })

  it('keeps reverse links and reference-aware search in one index', () => {
    const light = resolveRef(refs.npcs.light_13th_marshal)
    expect(light?.kind).toBe('npc')
    if (!light || light.kind !== 'npc') return

    const incoming = reverseLinks(light.kind, light.slug)
    expect(incoming.length).toBeGreaterThan(0)
    expect(reverseLinks(light.kind, light.slug)).toBe(incoming)
    expect(Object.isFrozen(incoming)).toBe(true)

    const resultKeys = new Set(
      searchEntities(light.data.name, 100).map((entity) => `${entity.kind}:${entity.slug}`),
    )
    const source = incoming[0]!.entity
    expect(source).toBeDefined()
    expect(resultKeys).toContain(`${source.kind}:${source.slug}`)
  })

  it('ranks whole-word name matches before incidental substring matches', () => {
    const visibleResults = searchEntities('ring', 20)

    expect(visibleResults.map((entity) => `${entity.kind}:${entity.slug}`)).toContain(
      'item:wolfie-tracking-ring',
    )
  })
})
