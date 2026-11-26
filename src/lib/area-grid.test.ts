import { describe, expect, it } from 'vitest'

import { areaGrid } from './area-grid'

const count = (...args: Parameters<typeof areaGrid>) => areaGrid(...args).cells.length

describe('areaGrid', () => {
  it('counts a sphere from a square corner, half-covered squares included', () => {
    expect(count('sphere', { size: 5 })).toBe(4)
    expect(count('sphere', { size: 10 })).toBe(12)
    expect(count('sphere', { size: 20 })).toBe(52)
  })

  it('counts cubes and lines as whole squares', () => {
    expect(count('cube', { size: 15 })).toBe(9)
    expect(count('line', { size: 60, width: 5 })).toBe(12)
    expect(count('line', { size: 30, width: 10 })).toBe(12)
  })

  it('counts a cone by the way it points', () => {
    expect(count('cone', { size: 15 })).toBe(4)
    expect(count('cone', { size: 15 }, 'diagonal')).toBe(6)
    expect(count('cone', { size: 60 })).toBe(72)
  })

  it('measures an emanation from the creature’s space, leaving the creature out', () => {
    const medium = areaGrid('emanation', { size: 10 })
    expect(medium.cells).toHaveLength(20)
    expect(medium.source).toEqual([[0, 0]])
    expect(medium.cells).not.toContainEqual([0, 0])
    expect(count('emanation', { size: 10, creature: 2 })).toBe(28)
  })
})
