import {
  NOVEL_ROW_LAYOUTS,
  blockHeight,
  isSpan,
  type NovelBlock,
  type NovelCell,
} from '#/definitions/novel'

/** Page geometry in SVG units: a 2:3 sheet, its margin, the gutter between panels, the frame. */
export const PAGE = { width: 1000, height: 1500, margin: 36, gutter: 18, frame: 5 } as const

export type Point = readonly [number, number]
export type Box = { x: number; y: number; width: number; height: number }

export function boundingBox(points: readonly Point[]): Box {
  const xs = points.map(([x]) => x)
  const ys = points.map(([, y]) => y)
  const x = Math.min(...xs)
  const y = Math.min(...ys)
  return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y }
}

/** A cell's width over height, from its bounding box in a row of the given aspect. */
export function cellAspect(cell: NovelCell, rowAspect: number): number {
  const box = boundingBox(cell.points)
  return (box.width * rowAspect) / box.height
}

/**
 * Moves every edge of a clockwise convex polygon inward by its own distance (negative moves it
 * out) and returns the polygon the moved edges enclose. Distances are measured square to each
 * edge, so a slanted gutter comes out exactly as wide as a straight one.
 */
export function insetPolygon(points: readonly Point[], distances: readonly number[]): Point[] {
  const lines = points.map((from, index) => {
    const to = points[(index + 1) % points.length]!
    const dx = to[0] - from[0]
    const dy = to[1] - from[1]
    const length = Math.hypot(dx, dy)
    const normal = [-dy / length, dx / length] as const
    const shift = distances[index] ?? 0
    return {
      point: [from[0] + normal[0] * shift, from[1] + normal[1] * shift] as const,
      direction: [dx, dy] as const,
    }
  })
  return lines.map((line, index) => {
    const previous = lines[(index - 1 + lines.length) % lines.length]!
    return intersect(previous, line)
  })
}

type Line = { point: readonly [number, number]; direction: readonly [number, number] }

function intersect(a: Line, b: Line): Point {
  const cross = a.direction[0] * b.direction[1] - a.direction[1] * b.direction[0]
  if (Math.abs(cross) < 1e-9) return b.point
  const t =
    ((b.point[0] - a.point[0]) * b.direction[1] - (b.point[1] - a.point[1]) * b.direction[0]) /
    cross
  return [a.point[0] + a.direction[0] * t, a.point[1] + a.direction[1] * t]
}

export type PanelShape = {
  /** The panel including its black frame. */
  outer: Point[]
  /** The picture inside the frame. */
  inner: Point[]
  /** A white margin around an inset panel, separating it from the panel beneath. */
  halo?: Point[]
  box: Box
}

/**
 * Places a cell on the page. Edges shared with a neighbouring panel give up half a gutter each;
 * edges on the row's border are left alone, since rows are already a gutter apart and the page
 * margin frames the sides. A bleeding cell pushes its outer edges past the margin to the paper's
 * edge, and off the top or bottom when its row is the page's first or last.
 */
export function panelShape(
  cell: NovelCell,
  band: Box,
  position: { first: boolean; last: boolean },
): PanelShape {
  const onBorder = (a: Point, b: Point) =>
    a[0] === 0 && b[0] === 0
      ? 'left'
      : a[0] === 1 && b[0] === 1
        ? 'right'
        : a[1] === 0 && b[1] === 0
          ? 'top'
          : a[1] === 1 && b[1] === 1
            ? 'bottom'
            : undefined
  const bleedOut = -(PAGE.margin + 4)
  const distances = cell.points.map((from, index) => {
    if (cell.inset) return 0
    const side = onBorder(from, cell.points[(index + 1) % cell.points.length]!)
    if (!side) return PAGE.gutter / 2
    if (!cell.bleed) return 0
    if (side === 'left' || side === 'right') return bleedOut
    if ((side === 'top' && position.first) || (side === 'bottom' && position.last)) return bleedOut
    return 0
  })
  const placed = cell.points.map(([x, y]): Point => [
    band.x + x * band.width,
    band.y + y * band.height,
  ])
  const outer = insetPolygon(placed, distances)
  const inner = insetPolygon(
    outer,
    outer.map(() => PAGE.frame),
  )
  return {
    outer,
    inner,
    halo: cell.inset
      ? insetPolygon(
          outer,
          outer.map(() => -PAGE.gutter),
        )
      : undefined,
    box: boundingBox(inner),
  }
}

export const svgPoints = (points: readonly Point[]) =>
  points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')

export type PlacedPanel = { cell: NovelCell; shape: PanelShape }

/**
 * Lays out a page's blocks in reading order. Blocks keep their natural proportions, stretched
 * evenly so together they fill the page between its margins with a gutter between each. A
 * spanning block puts its tall panel on one side and stacks its rows in the rest of the width.
 */
export function layoutPage(blocks: readonly NovelBlock[]): PlacedPanel[] {
  const innerWidth = PAGE.width - 2 * PAGE.margin
  const heights = fitHeights(
    blocks.map((block) => blockHeight(block)),
    PAGE.height - 2 * PAGE.margin,
  )
  const whole: NovelCell = {
    points: [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  }
  let y = PAGE.margin

  return blocks.flatMap((block, index) => {
    const position = { first: index === 0, last: index === blocks.length - 1 }
    const height = heights[index]!
    const top = y
    y += height + PAGE.gutter

    if (!isSpan(block)) {
      const band = { x: PAGE.margin, y: top, width: innerWidth, height }
      return NOVEL_ROW_LAYOUTS[block.layout].cells.map((cell) => ({
        cell,
        shape: panelShape(cell, band, position),
      }))
    }

    const { side, width, rows } = block.span
    const tallWidth = width * innerWidth - PAGE.gutter / 2
    const stackWidth = innerWidth - tallWidth - PAGE.gutter
    const tallX = side === 'left' ? PAGE.margin : PAGE.margin + stackWidth + PAGE.gutter
    const stackX = side === 'left' ? PAGE.margin + tallWidth + PAGE.gutter : PAGE.margin
    const tall: PlacedPanel = {
      cell: whole,
      shape: panelShape(whole, { x: tallX, y: top, width: tallWidth, height }, position),
    }
    const rowHeights = fitHeights(
      rows.map((row) => 1 / NOVEL_ROW_LAYOUTS[row.layout].aspect),
      height,
    )
    let rowY = top
    const stacked = rows.flatMap((row, rowIndex) => {
      const band = { x: stackX, y: rowY, width: stackWidth, height: rowHeights[rowIndex]! }
      rowY += band.height + PAGE.gutter
      return NOVEL_ROW_LAYOUTS[row.layout].cells.map((cell) => ({
        cell,
        shape: panelShape(cell, band, { first: false, last: false }),
      }))
    })
    return side === 'left' ? [tall, ...stacked] : [...stacked, tall]
  })
}

/** Shares out `total` minus the gutters between parts, in proportion to each part's height. */
function fitHeights(natural: readonly number[], total: number): number[] {
  const available = total - PAGE.gutter * (natural.length - 1)
  const sum = natural.reduce((acc, height) => acc + height, 0)
  return natural.map((height) => (available * height) / sum)
}
