import { describe, expect, it } from 'vitest'

import dragon from '#/data/npcs/dragon-of-the-mountain'
import onana from '#/data/npcs/onana-tempest'
import type { StatBlock } from '#/definitions/stat-block'

import { abilityAnchor, abilityGroups, abilityIndex } from './ability-index'
import { resolveStatBlock } from './dm-campaign'

const stats = (npc: { stats: unknown }) => resolveStatBlock(npc.stats as never) as StatBlock

describe('ability index', () => {
  it('lists every ability once, traits first, in the order of the stat block', () => {
    const index = abilityIndex(stats(onana))
    expect(index.map((group) => group.label)).toEqual([
      'Traits',
      'Actions',
      'Bonus actions',
      'Reactions',
    ])
    const keys = index.flatMap((group) => group.entries.map((entry) => entry.key))
    expect(keys).toHaveLength(stats(onana).abilities.length)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('carries what a button needs: name, icon, kind, uses and where to jump', () => {
    const entries = abilityIndex(stats(onana)).flatMap((group) => group.entries)
    expect(entries.find((entry) => entry.key === 'silence')).toEqual({
      key: 'silence',
      name: 'Silence',
      icon: 'gi/GiSilence',
      kind: 'other',
      uses: 3,
      anchor: abilityAnchor('silence'),
    })
    expect(entries.find((entry) => entry.key === 'rapier')).toMatchObject({ kind: 'melee' })
    expect(entries.find((entry) => entry.key === 'rapier')).not.toHaveProperty('uses')
  })

  it('adds the legendary pool with its rule, and leaves out empty groups', () => {
    const groups = abilityGroups(stats(dragon))
    const legendary = groups.find((group) => group.key === 'legendary')
    expect(legendary?.note).toMatch(/per round/)
    expect(groups.every((group) => group.abilities.length > 0)).toBe(true)
  })

  it('names lair actions as their own group', () => {
    const [first] = stats(onana).abilities
    const groups = abilityGroups({ ...stats(onana), lairActions: [first!] })
    expect(groups.at(-1)).toMatchObject({ key: 'lair', label: 'Lair actions' })
  })
})
