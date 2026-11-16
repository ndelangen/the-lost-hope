import { gridLines, type PlayerScreenGrid } from '#/lib/player-screen-grid'
import { cn } from '#/lib/utils'

/**
 * Draws a square grid over a picture of `width` by `height` pixels. It fills its box, which must
 * have the picture's shape. Each line is light with a dark edge so it reads on any art, at the grid's own opacity.
 */
export function GridOverlay({
  grid,
  width,
  height,
  strokeWidth = 2,
  className,
}: {
  grid: PlayerScreenGrid
  width: number
  height: number
  /** On-screen line width in CSS pixels, whatever size the picture is drawn at. */
  strokeWidth?: number
  className?: string
}) {
  const { xs, ys } = gridLines(grid, width, height)
  const path = [...xs.map((x) => `M${x} 0V${height}`), ...ys.map((y) => `M0 ${y}H${width}`)].join(
    '',
  )
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden
      style={{ opacity: grid.opacity }}
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
    >
      <path
        d={path}
        fill="none"
        stroke="rgb(0 0 0 / 0.6)"
        strokeWidth={strokeWidth + 2}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
