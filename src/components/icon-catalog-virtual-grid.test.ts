import { describe, expect, it } from 'vitest'

import {
  ICON_GRID_ROW_HEIGHT,
  iconGridColumnCount,
  visibleIconGridRows,
} from './icon-catalog-virtual-grid'

describe('icon catalog virtual grid', () => {
  it('uses the requested six desktop columns with compact mobile fallbacks', () => {
    expect(iconGridColumnCount(1280)).toBe(6)
    expect(iconGridColumnCount(800)).toBe(3)
    expect(iconGridColumnCount(500)).toBe(2)
  })

  it('mounts only rows around the viewport', () => {
    expect(
      visibleIconGridRows({
        rowCount: 1_000,
        scrollY: 100 * ICON_GRID_ROW_HEIGHT,
        viewportHeight: 800,
        containerTop: 0,
        totalHeight: 1_000 * ICON_GRID_ROW_HEIGHT,
      }),
    ).toEqual({ start: 97, end: 109 })
  })

  it('mounts no cards when the grid is outside the viewport', () => {
    expect(
      visibleIconGridRows({
        rowCount: 100,
        scrollY: 0,
        viewportHeight: 800,
        containerTop: 10_000,
        totalHeight: 100 * ICON_GRID_ROW_HEIGHT,
      }),
    ).toEqual({ start: 0, end: 0 })
  })
})
