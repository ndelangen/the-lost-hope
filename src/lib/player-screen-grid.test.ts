import { describe, expect, it } from 'vitest'

import {
  DEFAULT_PLAYER_SCREEN_GRID,
  MAX_GRID_CELL,
  gridLines,
  moveGrid,
  scaleGrid,
  shiftGrid,
  type PlayerScreenGrid,
} from './player-screen-grid'
import {
  EMPTY_PLAYER_SCREEN,
  parsePlayerScreenState,
  playerScreenGridFor,
  updatePlayerScreenGrid,
  type PlayerScreenImage,
} from './player-screen-state'

const grid: PlayerScreenGrid = { on: true, cell: 0.1, x: 0, y: 0 }
const map: PlayerScreenImage = { image: 'map', ref: { ref: 'location', key: 'somewhere' } }
const other: PlayerScreenImage = { image: 'illustration', ref: { ref: 'location', key: 'else' } }

describe('player screen grid', () => {
  it('draws a line every square across and down the picture', () => {
    const { xs, ys } = gridLines({ ...grid, x: 0.05, y: 0.02 }, 1000, 500)
    expect(xs.map(Math.round)).toEqual([50, 150, 250, 350, 450, 550, 650, 750, 850, 950])
    expect(ys.map(Math.round)).toEqual([20, 120, 220, 320, 420])
  })

  it('wraps a move past a whole square back to the same lines', () => {
    const moved = moveGrid(grid, 1.25, -0.5)
    expect(moved.x).toBeCloseTo(0.025)
    expect(moved.y).toBeCloseTo(0.05)
    expect(shiftGrid(grid, -0.03, 0.13).x).toBeCloseTo(0.07)
  })

  it('keeps the middle of the picture still while resizing the squares', () => {
    // A line runs through the middle of a 3:2 picture: x = 0.5, y = 1/3.
    const centred: PlayerScreenGrid = { on: true, cell: 0.1, x: 0, y: 1 / 3 - 0.3 }
    const bigger = scaleGrid(centred, 1.5, 3 / 2)
    expect(bigger.cell).toBeCloseTo(0.15)
    expect(((0.5 - bigger.x) / bigger.cell) % 1).toBeCloseTo(0)
    expect(((1 / 3 - bigger.y) / bigger.cell) % 1).toBeCloseTo(0)
    expect(scaleGrid(centred, 100, 3 / 2).cell).toBe(MAX_GRID_CELL)
  })

  it('remembers each picture’s grid separately', () => {
    const aligned = updatePlayerScreenGrid(EMPTY_PLAYER_SCREEN, map, (current) => ({
      ...current,
      on: true,
      cell: 0.05,
    }))
    expect(playerScreenGridFor(aligned, map)).toMatchObject({ on: true, cell: 0.05 })
    expect(playerScreenGridFor(aligned, other)).toEqual(DEFAULT_PLAYER_SCREEN_GRID)
    expect(parsePlayerScreenState(JSON.stringify(aligned)).grids).toEqual(aligned.grids)
  })

  it('reads a stored screen saved before grids existed as having none', () => {
    expect(parsePlayerScreenState('{"history":[null],"index":0,"captions":true}').grids).toEqual({})
  })
})
