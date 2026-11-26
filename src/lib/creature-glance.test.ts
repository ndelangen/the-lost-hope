import { describe, expect, it } from 'vitest'

import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'

import { creatureGlance } from './creature-glance'

const beastNamed = (name: string) =>
  Object.values(SOURCE_REGISTRIES.beast).find((beast) => beast.name === name)!

describe('creature glance', () => {
  it('sums up the Hand Breaker: numbers, then Multiattack, attacks, reaction and trait', () => {
    const glance = creatureGlance(SOURCE_REGISTRIES.npc.hand_breaker!.stats)!
    expect(glance).toMatchObject({
      kind: 'Medium humanoid',
      cr: '5',
      xp: '1,800',
      ac: 16,
      hp: 112,
      speed: '30 ft.',
      initiative: '+2',
      defences: [],
      overflow: { rows: 0, legendary: 0, lair: 0 },
    })
    expect(glance.shared).toBeUndefined()
    expect(glance.rows).toEqual([
      {
        group: 'turn',
        name: 'Multiattack',
        summary: 'Two Chain Flail attacks and one Shield Bash.',
      },
      { group: 'turn', name: 'Chain Flail', summary: '+7, 11 bludgeoning' },
      {
        group: 'turn',
        name: 'Shield Bash',
        summary: '+7, 9 bludgeoning · A Large or smaller target is Prone.',
      },
      {
        group: 'reaction',
        name: 'Parry',
        summary: 'When a melee attack would hit it, it adds 3 to its AC against that attack.',
      },
      {
        group: 'trait',
        name: 'Take Them Alive',
        summary: 'When it drops a creature to 0 HP, it can knock it out instead of killing it.',
      },
    ])
  })

  it('puts a recharging breath with the limited abilities, with its save and average damage', () => {
    const glance = creatureGlance(beastNamed('Dragon Children').stats)!
    expect(glance.rows.find((row) => row.name === 'Fire Breath')).toEqual({
      group: 'limited',
      name: 'Fire Breath',
      summary: 'Recharge 5–6 · DC 13 Dex save, 22 fire',
    })
    expect(glance.rows.map((row) => row.group)).toEqual(['turn', 'turn', 'limited', 'trait'])
    expect(glance.defences).toEqual(['Immune to fire'])
  })

  it('keeps every creature to a card of at most eight rows, counting the rest', () => {
    for (const record of [
      ...Object.values(SOURCE_REGISTRIES.npc),
      ...Object.values(SOURCE_REGISTRIES.beast),
    ]) {
      const glance = 'stats' in record ? creatureGlance(record.stats) : undefined
      if (!glance) continue
      expect(glance.rows.length).toBeLessThanOrEqual(8)
      // Rows are only left out once the card is full.
      expect(glance.overflow.rows === 0 || glance.rows.length === 8).toBe(true)
    }
  })

  it('names the shared creature a record borrows its numbers from', () => {
    const borrower = Object.values(SOURCE_REGISTRIES.npc).find(
      (npc) => npc.stats && 'ref' in npc.stats,
    )!
    expect(creatureGlance(borrower.stats)?.shared).toBeTruthy()
  })

  it('has nothing to show without a stat block', () => {
    expect(creatureGlance(undefined)).toBeUndefined()
  })
})
