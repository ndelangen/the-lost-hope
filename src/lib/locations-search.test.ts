import { describe, expect, it } from 'vitest'

import { LOCATION_TYPES } from '#/definitions/location.ts'
import {
  locationsSearchFromTypes,
  parseLocationFilter,
} from '#/lib/locations-search.ts'

describe('locations search params', () => {
  it('omits filter when all types are selected', () => {
    expect(locationsSearchFromTypes(new Set(LOCATION_TYPES))).toEqual({})
    expect(parseLocationFilter(undefined).size).toBe(LOCATION_TYPES.length)
  })

  it('round-trips a partial filter', () => {
    const types = new Set(['settlement', 'building'] as const)
    const search = locationsSearchFromTypes(types)
    expect(search).toEqual({ filter: 'settlement,building' })
    expect(parseLocationFilter(search.filter)).toEqual(types)
  })

  it('parses empty filter as no types selected', () => {
    expect(parseLocationFilter('').size).toBe(0)
  })
})
