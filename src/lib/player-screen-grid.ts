import { z } from 'zod'

/**
 * A square grid laid over a picture on the player screen, for battle maps. Every length is a
 * fraction of the picture's width, so the grid stays put on the art whatever size the screen
 * draws it at, and whichever responsive candidate the browser loads.
 */
export const PlayerScreenGrid = z.strictObject({
  on: z.boolean(),
  /** One square's side. */
  cell: z.number().min(0.01).max(0.5),
  /** Where the grid's lines start from the picture's left and top edges, within one square. */
  x: z.number().nonnegative(),
  y: z.number().nonnegative(),
  /** How strongly the lines show, from barely there (0.05) to solid (1). */
  opacity: z.number().min(0.05).max(1).default(0.35),
})

export type PlayerScreenGrid = z.infer<typeof PlayerScreenGrid>

const MIN_GRID_CELL = 0.01
export const MAX_GRID_CELL = 0.5

/** A grid the DM has not aligned yet: 24 squares across, starting at the top-left corner. */
export const DEFAULT_PLAYER_SCREEN_GRID: PlayerScreenGrid = {
  on: false,
  cell: 1 / 24,
  x: 0,
  y: 0,
  opacity: 0.35,
}

export const MIN_SQUARES_ACROSS = 1 / MAX_GRID_CELL
export const MAX_SQUARES_ACROSS = 1 / MIN_GRID_CELL

function wrap(offset: number, cell: number): number {
  const wrapped = ((offset % cell) + cell) % cell
  // Floating-point wrap can land on the cell itself; that is the same line as 0.
  return wrapped >= cell - 1e-9 ? 0 : wrapped
}

/**
 * Places the grid's lines a fraction of a square in from the picture's left (`across`) and top
 * (`down`) edges, as the DM's sliders do. A whole square is the same as none.
 */
export function placeGrid(grid: PlayerScreenGrid, across: number, down: number): PlayerScreenGrid {
  return { ...grid, x: wrap(across * grid.cell, grid.cell), y: wrap(down * grid.cell, grid.cell) }
}

/** How far into a square the grid's lines start, across and down, for the DM's sliders. */
export function gridPlacement(grid: PlayerScreenGrid): { across: number; down: number } {
  return { across: grid.x / grid.cell, down: grid.y / grid.cell }
}

/** Moves the grid by a distance in picture widths, as when the DM drags it on the preview. */
export function shiftGrid(grid: PlayerScreenGrid, dx: number, dy: number): PlayerScreenGrid {
  return { ...grid, x: wrap(grid.x + dx, grid.cell), y: wrap(grid.y + dy, grid.cell) }
}

/**
 * Grows (factor > 1) or shrinks the squares around the middle of the picture, so the line the DM
 * is looking at stays where it is. `aspect` is the picture's width over its height.
 */
export function scaleGrid(
  grid: PlayerScreenGrid,
  factor: number,
  aspect: number,
): PlayerScreenGrid {
  const cell = Math.min(MAX_GRID_CELL, Math.max(MIN_GRID_CELL, grid.cell * factor))
  const ratio = cell / grid.cell
  const centerX = 0.5
  const centerY = 0.5 / aspect
  return {
    ...grid,
    cell,
    x: wrap(centerX - (centerX - grid.x) * ratio, cell),
    y: wrap(centerY - (centerY - grid.y) * ratio, cell),
  }
}

/** How many squares fit across the picture, for the DM's controls. */
export function gridSquaresAcross(grid: PlayerScreenGrid): number {
  return 1 / grid.cell
}

/** Fits `squares` squares across the picture, keeping the middle of the picture still. */
export function sizeGrid(
  grid: PlayerScreenGrid,
  squares: number,
  aspect: number,
): PlayerScreenGrid {
  return scaleGrid(grid, 1 / squares / grid.cell, aspect)
}

/**
 * Where to draw the grid's lines on a picture of `width` by `height` pixels: every vertical line
 * position from left to right and every horizontal one from top to bottom, in pixels.
 */
export function gridLines(
  grid: PlayerScreenGrid,
  width: number,
  height: number,
): { xs: number[]; ys: number[] } {
  const cell = grid.cell * width
  const lines = (start: number, end: number) => {
    const positions: number[] = []
    for (let position = wrap(start, cell); position <= end; position += cell) {
      positions.push(position)
    }
    return positions
  }
  return { xs: lines(grid.x * width, width), ys: lines(grid.y * width, height) }
}
