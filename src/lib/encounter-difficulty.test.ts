import { describe, expect, it } from 'vitest'

import { difficultyBand, partyBudget, xpForCr } from './encounter-difficulty'

describe('encounter difficulty', () => {
  it('values enemies by challenge rating', () => {
    expect(xpForCr('1/2')).toBe(100)
    expect(xpForCr('3')).toBe(700)
    expect(xpForCr(undefined)).toBe(0)
  })

  it('adds up the budgets of the party, skipping unknown levels', () => {
    expect(partyBudget([5, 5, 5, 5, undefined])).toEqual({ low: 2000, moderate: 3000, high: 4400 })
  })

  it('places an XP total against the budget', () => {
    const budget = partyBudget([5, 5, 5, 5])
    expect(difficultyBand(0, budget)).toBe('none')
    expect(difficultyBand(1300, budget)).toBe('below-low')
    expect(difficultyBand(2000, budget)).toBe('low')
    expect(difficultyBand(3000, budget)).toBe('moderate')
    expect(difficultyBand(4400, budget)).toBe('high')
    expect(difficultyBand(6601, budget)).toBe('beyond-high')
  })
})
