import { describe, expect, it } from 'vitest'

import tokenRecord from '#/data/dm/tokens'
import { pcs } from '#/lib/campaign'

import { adjustTokens, tokenRows, tokensSource, withCounts } from './pc-tokens'

describe('PC tokens', () => {
  it('adjusts one kind and never goes below zero', () => {
    expect(adjustTokens(undefined, 'dm', 1)).toEqual({ dm: 1, curse: 0 })
    expect(adjustTokens({ dm: 0, curse: 2 }, 'curse', -1)).toEqual({ dm: 0, curse: 1 })
    expect(adjustTokens({ dm: 0, curse: 0 }, 'dm', -1)).toEqual({ dm: 0, curse: 0 })
  })

  it('keeps one sorted holding per PC and drops PCs who hold nothing', () => {
    const one = withCounts({ holdings: [] }, 'jim', { dm: 2, curse: 0 })
    const two = withCounts(one, 'devan', { dm: 0, curse: 1 })
    expect(two.holdings.map(({ pc }) => pc.key)).toEqual(['devan', 'jim'])
    expect(withCounts(two, 'jim', { dm: 0, curse: 0 }).holdings).toHaveLength(1)
  })

  it('writes the record as source', () => {
    expect(tokensSource({ holdings: [] })).toContain('  holdings: [],\n')
    const source = tokensSource(withCounts({ holdings: [] }, 'jim', { dm: 2, curse: 1 }))
    expect(source).toContain("import { refs } from '#/data/generated/refs.ts'")
    expect(source).toContain('    { pc: refs.pcs.jim, dm: 2, curse: 1 },\n')
  })

  it('lists active PCs before occasional ones and leaves out retired PCs', () => {
    const pc = (name: string, status: 'active' | 'occasional' | 'retired') =>
      ({ name, status, avatar: '/a.jpg' }) as never
    const rows = tokenRows(
      { b: pc('Bo', 'occasional'), a: pc('Al', 'retired'), c: pc('Cy', 'active') },
      withCounts({ holdings: [] }, 'b', { dm: 1, curse: 0 }),
    )
    expect(rows.map((row) => [row.name, row.counts.dm])).toEqual([
      ['Cy', 0],
      ['Bo', 1],
    ])
  })

  it('only holds tokens for PCs in the campaign', () => {
    for (const { pc } of tokenRecord.holdings) expect(Object.hasOwn(pcs, pc.key)).toBe(true)
  })
})
