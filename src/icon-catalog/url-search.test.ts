import { describe, expect, it } from 'vitest'

import { iconCatalogUrlSearchSchema } from './url-search'

describe('icon catalog URL search', () => {
  it('parses shareable icon filters', () => {
    expect(
      iconCatalogUrlSearchSchema.parse({
        q: 'dragon fire',
        group: 'questionable',
        source: 'gi',
        category: 'entity/creature',
      }),
    ).toEqual({
      q: 'dragon fire',
      group: 'questionable',
      source: 'gi',
      category: 'entity/creature',
    })
  })

  it('drops unsupported enum filters', () => {
    expect(iconCatalogUrlSearchSchema.parse({ group: 'archived', source: 'unknown' })).toEqual({
      group: undefined,
      source: undefined,
    })
  })
})
