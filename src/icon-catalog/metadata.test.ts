import { describe, expect, it } from 'vitest'

import { buildIconCatalogEntry } from './metadata'

describe('icon catalog metadata', () => {
  it('uses an upstream visual description and stores associated terms separately', () => {
    const entry = buildIconCatalogEntry(
      {
        id: 'gi/GiDragonBreath',
        source: 'gi',
        componentName: 'GiDragonBreath',
        sourceDescription: 'Flames erupting from a dragon.',
        keywords: ['fire'],
      },
      [],
    )

    expect(entry.description).toBe('Flames erupting from a dragon.')
    expect(entry.associatedTerms).toEqual(
      expect.arrayContaining(['fire', 'beast', 'monster', 'wyrm']),
    )
  })

  it('describes possible uses instead of repeating the icon name', () => {
    const entry = buildIconCatalogEntry(
      {
        id: 'lucide/ArrowLeft',
        source: 'lucide',
        componentName: 'ArrowLeft',
      },
      [],
    )

    expect(entry.description).toBe(
      'Useful for navigation controls, directional actions, and sorting or moving content.',
    )
    expect(entry.description).not.toContain('visual symbol depicting')
    expect(entry.associatedTerms).toEqual(
      expect.arrayContaining(['direction', 'navigation', 'back', 'previous']),
    )
  })
})
