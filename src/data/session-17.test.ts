import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { events, items, quests, sessionDays, sessionPcs, sessions } from '#/lib/campaign'

describe('Session 17 transcript import', () => {
  it('continues the same campaign day while recording the November play date', () => {
    const session = sessions.the_ghost_and_the_gambler
    expect(session.number).toBe(17)
    expect(session.date.toISOString()).toBe('2026-11-05T00:00:00.000Z')
    expect(session.events).toHaveLength(20)
    expect(sessionDays(session).map(({ day }) => day)).toEqual([24])
    expect(session.events.at(-1)).toEqual(refs.events.n2_e204)
    expect(sessionPcs(session).map(({ slug }) => slug)).toEqual([
      'cassian-veyl',
      'devan',
      'jim',
      'swift-starblade',
    ])
  })

  it('separates the lost original bag and equipment from the fully paid replacement', () => {
    for (const item of [
      items.bag_of_holding,
      items.cloak_of_protection,
      items.ring_of_spell_storing,
    ]) {
      expect(item.currentOwner).toBeNull()
      expect(item.carriedBy).toBeNull()
      expect(events.n2_e192.notes.flat()).toContainEqual(
        Object.values(refs.items).find(({ key }) => key.replaceAll('_', '-') === item.slug),
      )
    }
    expect(items.cassian_s_replacement_bag_of_holding.currentOwner).toEqual(refs.pcs.cassian_veyl)
    expect(items.cassian_s_replacement_bag_of_holding.carriedBy).toEqual(refs.pcs.cassian_veyl)
    expect(items.cassian_s_replacement_bag_of_holding.slug).not.toBe(items.bag_of_holding.slug)
    expect(events.n2_e192.notes.flat().join(' ')).toContain('All stored contents were gone')
    expect(events.n2_e193.notes.flat().join(' ')).toContain('no debt remained')
  })

  it('keeps the artifact ring bound but no longer carried', () => {
    expect(items.wolfie_tracking_ring.currentOwner).toEqual(refs.pcs.cassian_veyl)
    expect(items.wolfie_tracking_ring.carriedBy).toBeNull()
    expect(events.n2_e192.notes.flat()).toContainEqual(refs.items.wolfie_tracking_ring)
    expect(events.n2_e204.notes.flat()).toContainEqual(refs.items.wolfie_tracking_ring)
  })

  it("credits the roulette trick to Cassian and Swift, and removes Jim's lost amulet", () => {
    expect(events.n2_e187.notes[0]).toContainEqual(refs.pcs.cassian_veyl)
    expect(events.n2_e187.notes[0]).toContainEqual(refs.pcs.swift_starblade)
    expect(events.n2_e187.notes[0]).not.toContainEqual(refs.pcs.jim)
    expect(items.jaded_amulet.currentOwner).toBeNull()
    expect(items.jaded_amulet.carriedBy).toBeNull()
    expect(events.n2_e197.notes.flat()).toContainEqual(refs.npcs.sylf)
  })

  it('does not reinstate cancelled draws or treat the proposed ship theft as completed', () => {
    expect(events.n2_e189.notes.flat().join(' ')).toContain('alignment change did not remain')
    expect(events.n2_e196.notes.flat().join(' ')).toContain(
      'Voidwalker, Whispers, and Vessel remained',
    )
    expect(events.n2_e203.notes.flat().join(' ')).toContain('before a theft, departure, or arrival')
    expect(events.n2_e204.notes.flat()).toContainEqual(refs.pcs.devan)
    expect(items.devan_s_plate_armour.carriedBy).toBeNull()
    expect(quests.find_the_fiddler.status).toBe('open')
  })
})
