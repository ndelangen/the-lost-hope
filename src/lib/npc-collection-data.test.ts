import { describe, expect, it } from 'vitest'

import type { EntityCardItem } from '#/lib/entity-page-data'

import { buildNpcCollectionItems, npcCollectionItems } from './npc-collection-data'

function npc(name: string): EntityCardItem {
  return { kind: 'npc', slug: name, name }
}

describe('NPC collection order', () => {
  it('uses campaign days, event order within a day, and the earliest repeated mention', () => {
    const items = ['Alpha', 'Beta', 'Zulu'].map(npc)
    const result = buildNpcCollectionItems(
      items,
      [
        { day: 3, npcSlugs: ['Alpha', 'Zulu'] },
        { day: 1, npcSlugs: ['Zulu'] },
        { day: 1, npcSlugs: ['Beta'] },
      ],
      'appearance',
    )

    expect(result.map(({ name }) => name)).toEqual(['Zulu', 'Beta', 'Alpha'])
    expect(result.map(({ meta }) => meta)).toEqual([
      'First recorded: Day 1',
      'First recorded: Day 1',
      'First recorded: Day 3',
    ])
    expect(items.map(({ name }) => name)).toEqual(['Alpha', 'Beta', 'Zulu'])
  })

  it('breaks shared-event ties by name and places unrecorded NPCs last', () => {
    const result = buildNpcCollectionItems(
      ['Unknown Z', 'Beta', 'Alpha', 'Unknown A'].map(npc),
      [{ day: 2, npcSlugs: ['Beta', 'Alpha'] }],
      'appearance',
    )

    expect(result.map(({ name }) => name)).toEqual(['Alpha', 'Beta', 'Unknown A', 'Unknown Z'])
    expect(result.at(-1)?.meta).toBe('No recorded appearance')
  })

  it('offers the existing alphabetical order, ignoring a leading article', () => {
    const result = buildNpcCollectionItems(
      ['Zulu', 'The Alpha', 'Beta'].map(npc),
      [{ day: 1, npcSlugs: ['Zulu'] }],
      'name',
    )

    expect(result.map(({ name }) => name)).toEqual(['The Alpha', 'Beta', 'Zulu'])
  })

  it('uses session chronology rather than event filename numbers in the campaign', () => {
    const items = npcCollectionItems('appearance')
    const position = (slug: string) => items.findIndex((item) => item.slug === slug)

    expect(items[0].slug).toBe('light-13th-marshal')
    expect(position('bob-the-merchant')).toBeLessThan(position('misha'))
    expect(items.find((item) => item.slug === 'celeste')?.meta).toBe('First recorded: Day 12')
    expect(items.find((item) => item.slug === 'celeste-tempest')?.meta).toBe(
      'First recorded: Day 24',
    )
    expect(items.some((item) => item.slug === 'mystery-girl')).toBe(false)
  })
})
