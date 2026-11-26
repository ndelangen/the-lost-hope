/**
 * Which 5-ft squares an area of effect covers on a battle grid, following the 2024 Dungeon
 * Master's Guide: the point of origin sits on an intersection of squares, and a square is in the
 * area when the area covers at least half of it. Coordinates are in squares; the origin is (0, 0)
 * and square (x, y) spans x..x+1, y..y+1.
 */

export type AreaShape = 'cone' | 'cube' | 'line' | 'sphere' | 'emanation'

export type AreaSize = {
  /** A cone's length, a cube's side, a sphere's radius, an emanation's reach, a line's length. */
  size: number
  /** Lines only. */
  width?: number
  /** Emanations only: how many squares wide its creature stands (1 for Medium or smaller). */
  creature?: number
}

/** Which way a cone points: along a row of squares, or corner to corner. */
export type ConeDirection = 'straight' | 'diagonal'

export type AreaGrid = {
  /** Squares in the area, as `[x, y]`. */
  cells: [number, number][]
  /** Squares the emanation's creature stands in; never part of the area. */
  source: [number, number][]
  /** The true shape, as an SVG path in square units, to draw over the squares. */
  outline: string
  /** The point of origin, for shapes that start at a point. */
  origin?: [number, number]
  /** Squares to draw, including a margin of one square around the area. */
  bounds: { x: number; y: number; width: number; height: number }
}

/** Example sizes for a term explained on its own, without an ability's numbers. */
export const EXAMPLE_AREAS: Record<AreaShape, AreaSize> = {
  cone: { size: 15 },
  cube: { size: 15 },
  line: { size: 30, width: 5 },
  sphere: { size: 20 },
  emanation: { size: 10 },
}

const SQUARE = 5
/** Samples per side of a square when measuring how much of it the area covers. */
const SAMPLES = 16

/** A point test in square units, and the box of squares worth testing. */
type Region = {
  contains: (x: number, y: number) => boolean
  box: [number, number, number, number]
  outline: string
  origin?: [number, number]
  source?: [number, number][]
}

function cone(length: number, direction: ConeDirection): Region {
  // Width at any distance equals that distance: half as wide either side of the axis.
  const inCone = (u: number, v: number) => u >= 0 && u <= length && Math.abs(v) <= u / 2
  if (direction === 'straight')
    return {
      contains: inCone,
      box: [0, -Math.ceil(length / 2), Math.ceil(length), Math.ceil(length / 2)],
      outline: `M0 0 L${length} ${-length / 2} L${length} ${length / 2} Z`,
      origin: [0, 0],
    }
  // Pointing down and to the right, corner to corner.
  const c = Math.SQRT1_2
  const end = (side: number): [number, number] => [
    length * c - (side * length * c) / 2,
    length * c + (side * length * c) / 2,
  ]
  const [ax, ay] = end(1)
  const [bx, by] = end(-1)
  const reach = Math.ceil(Math.max(ax, ay, bx, by))
  return {
    contains: (x, y) => inCone((x + y) * c, (y - x) * c),
    box: [0, 0, reach, reach],
    outline: `M0 0 L${ax} ${ay} L${bx} ${by} Z`,
    origin: [0, 0],
  }
}

function sphere(radius: number): Region {
  const r = Math.ceil(radius)
  return {
    contains: (x, y) => x * x + y * y <= radius * radius,
    box: [-r, -r, r, r],
    outline: `M${-radius} 0 A${radius} ${radius} 0 1 0 ${radius} 0 A${radius} ${radius} 0 1 0 ${-radius} 0 Z`,
    origin: [0, 0],
  }
}

function cube(side: number): Region {
  // The origin lies on one face; on the grid that face runs along a grid line.
  const half = Math.floor(side / 2)
  return {
    contains: (x, y) => x >= 0 && x <= side && y >= -half && y <= side - half,
    box: [0, -half, Math.ceil(side), Math.ceil(side - half)],
    outline: `M0 ${-half} H${side} V${side - half} H0 Z`,
    origin: [0, 0],
  }
}

function line(length: number, width: number): Region {
  // A line sits along a row of squares, its long edge on a grid line, so it fills whole rows.
  return {
    contains: (x, y) => x >= 0 && x <= length && y >= 0 && y <= width,
    box: [0, 0, Math.ceil(length), Math.ceil(width)],
    outline: `M0 0 H${length} V${width} H0 Z`,
    origin: [0, 0],
  }
}

function emanation(reach: number, creature: number): Region {
  // Everything within reach of the creature's space, which is itself left out.
  const r = Math.ceil(reach)
  const distance = (x: number, y: number) => {
    const dx = Math.max(0 - x, 0, x - creature)
    const dy = Math.max(0 - y, 0, y - creature)
    return Math.hypot(dx, dy)
  }
  const source: [number, number][] = []
  for (let x = 0; x < creature; x++) for (let y = 0; y < creature; y++) source.push([x, y])
  const c = creature
  const e = reach
  return {
    contains: (x, y) => distance(x, y) <= reach,
    box: [-r, -r, creature + r, creature + r],
    outline:
      `M0 ${-e} H${c} A${e} ${e} 0 0 1 ${c + e} 0 V${c} A${e} ${e} 0 0 1 ${c} ${c + e} ` +
      `H0 A${e} ${e} 0 0 1 ${-e} ${c} V0 A${e} ${e} 0 0 1 0 ${-e} Z`,
    source,
  }
}

function regionOf(shape: AreaShape, area: AreaSize, direction: ConeDirection): Region {
  const { size, width, creature = 1 } = area
  const squares = size / SQUARE
  switch (shape) {
    case 'cone':
      return cone(squares, direction)
    case 'cube':
      return cube(squares)
    case 'line':
      return line(squares, (width ?? SQUARE) / SQUARE)
    case 'sphere':
      return sphere(squares)
    case 'emanation':
      return emanation(squares, creature)
  }
}

function covered(region: Region, x: number, y: number) {
  let inside = 0
  for (let i = 0; i < SAMPLES; i++)
    for (let j = 0; j < SAMPLES; j++)
      if (region.contains(x + (i + 0.5) / SAMPLES, y + (j + 0.5) / SAMPLES)) inside++
  return inside * 2 >= SAMPLES * SAMPLES
}

/** The squares an area covers. `direction` only matters for a cone. */
export function areaGrid(
  shape: AreaShape,
  area: AreaSize,
  direction: ConeDirection = 'straight',
): AreaGrid {
  const region = regionOf(shape, area, direction)
  const [x0, y0, x1, y1] = region.box
  const source = region.source ?? []
  const isSource = (x: number, y: number) => source.some(([sx, sy]) => sx === x && sy === y)
  const cells: [number, number][] = []
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++) if (!isSource(x, y) && covered(region, x, y)) cells.push([x, y])
  return {
    cells,
    source,
    outline: region.outline,
    origin: region.origin,
    bounds: { x: x0 - 1, y: y0 - 1, width: x1 - x0 + 2, height: y1 - y0 + 2 },
  }
}

/** Squares wide a creature of this size stands in on the grid. */
export const SQUARES_WIDE = { tiny: 1, small: 1, medium: 1, large: 2, huge: 3, gargantuan: 4 }
