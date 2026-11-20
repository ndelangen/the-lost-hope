import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { BondOutcomes } from '#/definitions/event'
import { bondConnections, severedBearers } from '#/lib/bond-outcomes'
import { effects, events, getEntity, resolveRef, reverseLinks } from '#/lib/campaign'
import { entityContextData } from '#/lib/entity-context-data'
import { eventNarrative, eventProse } from '#/lib/foretold'
import { sessionJournalData } from '#/lib/session-journal-data'

const pulse = events.n2_e207
const bonds = pulse.bondOutcomes!
const connections = () =>
  bondConnections(bonds, (ref) => {
    const entity = resolveRef(ref)
    if (!entity || !('avatar' in entity.data)) throw new Error('Expected a character')
    return { ref, name: entity.data.name, slug: entity.slug, avatar: entity.data.avatar }
  })

describe('Jim’s confirmed bond outcomes', () => {
  it('shows the exact surviving and broken bonds, including the two different Bobs', () => {
    const groups = connections()
    expect(groups.retained.map((e) => e.ref)).toEqual(
      expect.arrayContaining([
        refs.pcs.cassian_veyl,
        refs.pcs.devan,
        refs.npcs.crowy,
        refs.npcs.borris,
        refs.npcs.gruumsh_high_priest,
        refs.npcs.sylvia,
        refs.npcs.penelope,
        refs.npcs.bob_the_gate_troll,
        refs.npcs.light_13th_marshal,
        refs.npcs.the_father,
      ]),
    )
    expect(groups.retained).toHaveLength(10)
    expect(groups.severed.map((e) => e.ref)).toEqual(
      expect.arrayContaining([
        refs.pcs.swift_starblade,
        refs.pcs.fix,
        refs.npcs.abraham,
        refs.beasts.wolfie,
        refs.npcs.sarogarth,
        refs.npcs.the_fiddler,
        refs.beasts.phoenix_chick,
        refs.npcs.bob_the_merchant,
        refs.npcs.bessy,
      ]),
    )
    expect(groups.severed).toHaveLength(9)
    expect(
      [...groups.retained, ...groups.severed].some((e) => e.ref.key === refs.pcs.auren.key),
    ).toBe(false)
    expect(groups.effect).toEqual(refs.effects.severed_bond_with_jim)
    expect(severedBearers(bonds)).toBe(effects.severed_bond_with_jim.on)
    expect(effects.severed_bond_with_jim.began).toEqual(refs.events.n2_e207)
    expect(() =>
      severedBearers({ ...bonds, retained: [...bonds.retained, refs.pcs.swift_starblade] }),
    ).toThrow('both kept and lost')
  })

  it('rejects conflicting outcomes and self-bonds', () => {
    expect(
      BondOutcomes.safeParse({ ...bonds, retained: [bonds.retained[0], bonds.retained[0]] })
        .success,
    ).toBe(false)
    expect(
      BondOutcomes.safeParse({
        toward: refs.pcs.jim,
        retained: [refs.pcs.jim],
        severed: bonds.severed,
      }).success,
    ).toBe(false)
  })

  it('keeps the roster in event prose, the session journal and character backlinks', () => {
    const narrative = eventNarrative(pulse)
    const bearers = severedBearers(bonds)
    const references = [bonds.toward, ...bonds.retained, bonds.severed, ...bearers]
    expect(new Set(references.map((ref) => `${ref.ref}:${ref.key}`)).size).toBe(21)
    for (const reference of references) {
      expect(narrative.flat()).toContainEqual(reference)
    }
    for (const reference of [bonds.toward, ...bonds.retained, bonds.severed]) {
      const entity = resolveRef(reference)!
      expect(
        reverseLinks(entity.kind, entity.slug).some(
          (link) => link.entity.kind === 'event' && link.entity.slug === pulse.slug,
        ),
      ).toBe(true)
    }
    for (const bearer of bearers) {
      const entity = resolveRef(bearer)!
      expect(
        reverseLinks(entity.kind, entity.slug).some(
          (link) => link.entity.kind === 'effect' && link.entity.slug === 'severed-bond-with-jim',
        ),
      ).toBe(true)
      expect(entityContextData(entity).history.map((entry) => entry.event.slug)).toContain(
        pulse.slug,
      )
    }
    const pulseEntity = getEntity('event', pulse.slug)!
    const sourceRefs = entityContextData(pulseEntity).sources.map(
      (source) => `${source.entity.kind}:${source.entity.slug}`,
    )
    for (const ref of references) {
      const entity = resolveRef(ref)!
      expect(sourceRefs).toContain(`${entity.kind}:${entity.slug}`)
    }
    const session = getEntity('session', 'the-pulse-and-the-boarding')!
    const journal = sessionJournalData(session.data)
      .flatMap((d) => d.events)
      .find((e) => e.slug === pulse.slug)!
    expect(journal.notes).toEqual(narrative)
    expect(journal.references).toHaveLength(20)
    const foretold = [{ what: [['A bond returns.']] }]
    const withPromise = { ...pulse, foretold }
    expect(eventNarrative(withPromise)).toEqual(narrative)
    expect(eventProse({ ...pulse, foretold })).toEqual([...narrative, ['A bond returns.']])
  })
})
