import { describe, expect, it } from 'vitest'

import {
  DEFAULT_PLAYER_SCREEN_GRID,
  MAX_GRID_CELL,
  MAX_SQUARES_ACROSS,
  gridLines,
  gridPlacement,
  gridSquaresAcross,
  placeGrid,
  scaleGrid,
  shiftGrid,
  sizeGrid,
  type PlayerScreenGrid,
} from './player-screen-grid'
import {
  EMPTY_PLAYER_SCREEN,
  parsePlayerScreenState,
  playerScreenGridFor,
  updatePlayerScreenGrid,
  type PlayerScreenImage,
} from './player-screen-state'

const grid: PlayerScreenGrid = { on: true, cell: 0.1, x: 0, y: 0, opacity: 0.5 }
const map: PlayerScreenImage = { image: 'map', ref: { ref: 'location', key: 'somewhere' } }
const other: PlayerScreenImage = { image: 'illustration', ref: { ref: 'location', key: 'else' } }

describe('player screen grid', () => {
  it('draws a line every square across and down the picture', () => {
    const { xs, ys } = gridLines({ ...grid, x: 0.05, y: 0.02 }, 1000, 500)
    expect(xs.map(Math.round)).toEqual([50, 150, 250, 350, 450, 550, 650, 750, 850, 950])
    expect(ys.map(Math.round)).toEqual([20, 120, 220, 320, 420])
  })

  it('places the lines within one square, and a whole square is the same as none', () => {
    const placed = placeGrid(grid, 0.25, 1)
    expect(placed.x).toBeCloseTo(0.025)
    expect(placed.y).toBe(0)
    expect(gridPlacement(placed).across).toBeCloseTo(0.25)
    expect(shiftGrid(grid, -0.03, 0.13).x).toBeCloseTo(0.07)
  })

  it('sizes the grid by how many squares fit across', () => {
    expect(gridSquaresAcross(sizeGrid(grid, 30, 3 / 2))).toBeCloseTo(30)
    expect(gridSquaresAcross(sizeGrid(grid, 1000, 3 / 2))).toBeCloseTo(MAX_SQUARES_ACROSS)
  })

  it('keeps the middle of the picture still while resizing the squares', () => {
    // A line runs through the middle of a 3:2 picture: x = 0.5, y = 1/3.
    const centred: PlayerScreenGrid = { ...grid, y: 1 / 3 - 0.3 }
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

  it('gives a grid stored without an opacity the default one', () => {
    const stored = {
      history: [map],
      index: 0,
      captions: true,
      grids: { [`map:location:somewhere`]: { on: true, cell: 0.1, x: 0, y: 0 } },
    }
    expect(playerScreenGridFor(parsePlayerScreenState(JSON.stringify(stored)), map).opacity).toBe(
      DEFAULT_PLAYER_SCREEN_GRID.opacity,
    )
  })
})
