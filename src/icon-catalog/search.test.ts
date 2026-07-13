import { describe, expect, it } from 'vitest'

import catalogJson from './catalog.json'
import { searchIconCatalog } from './search'
import type { IconCatalog } from './types'

const catalog = catalogJson as IconCatalog

describe('searchIconCatalog', () => {
  it('ranks the canonical Lucide icon above duplicate generic UI icons', () => {
    const results = searchIconCatalog(catalog.entries, { query: 'arrow left' })

    expect(results[0]?.id).toBe('lucide/ArrowLeft')
  })

  it('finds fantasy concepts through enriched metadata', () => {
    const results = searchIconCatalog(catalog.entries, {
      query: 'wyrm monster',
      classifications: ['useful'],
    })

    expect(results.some(({ id }) => id === 'gi/GiDragonBreath')).toBe(true)
  })

  it('tolerates missing letters and adjacent transpositions', () => {
    const results = searchIconCatalog(catalog.entries, {
      query: 'dragn breth',
      sources: ['gi'],
    })

    expect(results.some(({ id }) => id === 'gi/GiDragonBreath')).toBe(true)
  })

  it('can omit entries marked for deletion', () => {
    const results = searchIconCatalog(catalog.entries, {
      query: 'facebook',
      classifications: ['useful', 'questionable'],
    })

    expect(results).toEqual([])
  })
})
