import { useState } from 'react'

import { areaGrid, type AreaShape, type AreaSize, type ConeDirection } from '#/lib/area-grid'

const MAX_WIDTH = 240
const MAX_HEIGHT = 200
const MAX_CELL = 18

/** How an area reads in a caption: "20-ft. sphere", "60-ft. by 5-ft. line". */
function areaLabel(shape: AreaShape, { size, width }: AreaSize) {
  return shape === 'line' ? `${size}-ft. by ${width ?? 5}-ft. line` : `${size}-ft. ${shape}`
}

/**
 * An area of effect drawn on 5-ft squares: which squares it catches and how many, by the 2024
 * grid rules. A cone can be turned straight or corner to corner, since that changes the count.
 */
export function AreaDiagram({
  shape,
  area,
  example = false,
}: {
  shape: AreaShape
  area: AreaSize
  /** The numbers are an illustration, not the ability's own. */
  example?: boolean
}) {
  const [direction, setDirection] = useState<ConeDirection>('straight')
  const grid = areaGrid(shape, area, direction)
  const { bounds } = grid
  const cell = Math.min(MAX_CELL, MAX_WIDTH / bounds.width, MAX_HEIGHT / bounds.height)
  const viewBox = `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`
  const count = grid.cells.length
  const stroke = 1 / cell

  return (
    <span className="grid gap-1.5">
      <svg
        viewBox={viewBox}
        width={bounds.width * cell}
        height={bounds.height * cell}
        className="bg-muted mx-auto block max-w-full rounded-sm"
      >
        <title>{`${areaLabel(shape, area)} on a 5-foot grid: ${count} squares`}</title>
        {grid.cells.map(([x, y]) => (
          <rect
            key={`${x},${y}`}
            x={x}
            y={y}
            width={1}
            height={1}
            className="fill-primary/30 dark:fill-primary/50"
          />
        ))}
        <GridLines bounds={bounds} stroke={stroke} />
        <path
          d={grid.outline}
          fill="none"
          strokeWidth={stroke * 1.5}
          strokeDasharray={`${stroke * 4} ${stroke * 3}`}
          className="stroke-primary"
        />
        {grid.source.length > 0 ? <Creature squares={grid.source} /> : null}
        {grid.origin ? (
          <circle
            cx={grid.origin[0]}
            cy={grid.origin[1]}
            r={Math.max(0.12, 3 / cell)}
            className="fill-primary"
          />
        ) : null}
      </svg>
      <span className="flex items-baseline justify-between gap-3 text-xs">
        <span>
          <strong className="font-semibold tabular-nums">{count} squares</strong>
          <span className="text-muted-foreground">
            {' '}
            {example ? 'for an example ' : 'for this '}
            {areaLabel(shape, area)}
          </span>
        </span>
        {shape === 'cone' ? (
          <button
            type="button"
            onClick={() => setDirection(direction === 'straight' ? 'diagonal' : 'straight')}
            className="text-primary shrink-0 font-medium underline underline-offset-2"
          >
            {direction === 'straight' ? 'Point diagonally' : 'Point straight'}
          </button>
        ) : null}
      </span>
      <span className="text-muted-foreground text-xs">
        {grid.origin
          ? 'The dot is the point of origin, on a corner of a square. '
          : 'The creature in the middle isn’t caught. '}
        A square counts when at least half of it is covered.
      </span>
    </span>
  )
}

function GridLines({
  bounds,
  stroke,
}: {
  bounds: { x: number; y: number; width: number; height: number }
  stroke: number
}) {
  const xs = Array.from({ length: bounds.width + 1 }, (_, i) => bounds.x + i)
  const ys = Array.from({ length: bounds.height + 1 }, (_, i) => bounds.y + i)
  return (
    <g strokeWidth={stroke} className="stroke-muted-foreground/40">
      {xs.map((x) => (
        <line key={`x${x}`} x1={x} x2={x} y1={bounds.y} y2={bounds.y + bounds.height} />
      ))}
      {ys.map((y) => (
        <line key={`y${y}`} y1={y} y2={y} x1={bounds.x} x2={bounds.x + bounds.width} />
      ))}
    </g>
  )
}

/** The creature an emanation comes from, as a token on its squares. */
function Creature({ squares }: { squares: [number, number][] }) {
  const side = Math.sqrt(squares.length)
  const [x, y] = squares[0] ?? [0, 0]
  return (
    <circle
      cx={x + side / 2}
      cy={y + side / 2}
      r={side * 0.4}
      className="fill-background stroke-primary"
      strokeWidth={0.08}
    />
  )
}
