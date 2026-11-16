import { z } from 'zod'

/**
 * A square grid laid over a picture on the player screen, for battle maps. Every length is a
 * fraction of the picture's width, so the grid stays put on the art whatever size the screen
 * draws it at, and whichever responsive candidate the browser loads.
 */
export const PlayerScreenGrid = z.strictObject({
  on: z.boolean(),
  /** One square's side. */
  cell: z.number().min(0.005).max(0.5),
  /** Where the grid's lines start from the picture's left and top edges, within one square. */
  x: z.number().nonnegative(),
  y: z.number().nonnegative(),
})

export type PlayerScreenGrid = z.infer<typeof PlayerScreenGrid>

export const MIN_GRID_CELL = 0.005
export const MAX_GRID_CELL = 0.5

/** A grid the DM has not aligned yet: 24 squares across, starting at the top-left corner. */
export const DEFAULT_PLAYER_SCREEN_GRID: PlayerScreenGrid = { on: false, cell: 1 / 24, x: 0, y: 0 }

function wrap(offset: number, cell: number): number {
  const wrapped = ((offset % cell) + cell) % cell
  // Floating-point wrap can land on the cell itself; that is the same line as 0.
  return wrapped >= cell - 1e-9 ? 0 : wrapped
}

/** Moves the grid by a number of squares across (dx) and down (dy). */
export function moveGrid(grid: PlayerScreenGrid, dx: number, dy: number): PlayerScreenGrid {
  return {
    ...grid,
    x: wrap(grid.x + dx * grid.cell, grid.cell),
    y: wrap(grid.y + dy * grid.cell, grid.cell),
  }
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
