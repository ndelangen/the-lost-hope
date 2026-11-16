import { Grid3x3, RotateCcw } from 'lucide-react'
import { useId, useRef } from 'react'

import { GridOverlay } from '#/components/player-screen/grid-overlay'
import { ResponsiveImage } from '#/components/responsive-image'
import {
  DEFAULT_PLAYER_SCREEN_GRID,
  MAX_SQUARES_ACROSS,
  MIN_SQUARES_ACROSS,
  gridPlacement,
  gridSquaresAcross,
  placeGrid,
  shiftGrid,
  sizeGrid,
  type PlayerScreenGrid,
} from '#/lib/player-screen-grid'
import { cn } from '#/lib/utils'

/**
 * The DM's controls for the battle grid over the picture on the player screen: turn it on, then
 * line it up and tone it down with sliders, or drag it into place on a preview.
 */
export function GridControls({
  grid,
  src,
  width,
  height,
  onChange,
}: {
  grid: PlayerScreenGrid
  src: string
  width: number
  height: number
  onChange: (change: (grid: PlayerScreenGrid) => PlayerScreenGrid) => void
}) {
  const aspect = width / height
  const squares = gridSquaresAcross(grid)
  const { across, down } = gridPlacement(grid)

  return (
    <section aria-label="Grid" className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-12 shrink-0 text-xs font-semibold uppercase">
          Grid
        </span>
        <button
          type="button"
          onClick={() => onChange((current) => ({ ...current, on: !current.on }))}
          aria-pressed={grid.on}
          className={cn(
            'flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border text-sm font-medium',
            grid.on
              ? 'border-primary bg-primary/10 text-foreground'
              : 'border-border hover:bg-muted',
          )}
        >
          <Grid3x3 className="size-4" aria-hidden />
          {grid.on ? 'Grid on' : 'Show a grid'}
        </button>
        {grid.on ? (
          <button
            type="button"
            onClick={() => onChange(() => ({ ...DEFAULT_PLAYER_SCREEN_GRID, on: true }))}
            className="border-border hover:bg-muted flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium"
          >
            <RotateCcw className="size-4" aria-hidden />
            Reset
          </button>
        ) : null}
      </div>

      {grid.on ? (
        <>
          <GridPreview
            grid={grid}
            src={src}
            width={width}
            height={height}
            onShift={(dx, dy) => onChange((current) => shiftGrid(current, dx, dy))}
          />
          {/* Size runs on a log scale, so small grids get as much slider travel as big ones. */}
          <GridSlider
            label="Size"
            value={Math.log(squares)}
            min={Math.log(MIN_SQUARES_ACROSS)}
            max={Math.log(MAX_SQUARES_ACROSS)}
            step={0.001}
            display={`${squares.toFixed(1)} across`}
            onChange={(value) => onChange((current) => sizeGrid(current, Math.exp(value), aspect))}
          />
          <GridSlider
            label="Left–right"
            value={across}
            min={0}
            max={1}
            step={0.005}
            display={`${Math.round(across * 100)}%`}
            onChange={(value) =>
              onChange((current) => placeGrid(current, value, gridPlacement(current).down))
            }
          />
          <GridSlider
            label="Up–down"
            value={down}
            min={0}
            max={1}
            step={0.005}
            display={`${Math.round(down * 100)}%`}
            onChange={(value) =>
              onChange((current) => placeGrid(current, gridPlacement(current).across, value))
            }
          />
          <GridSlider
            label="Opacity"
            value={grid.opacity}
            min={0.05}
            max={1}
            step={0.05}
            display={`${Math.round(grid.opacity * 100)}%`}
            onChange={(value) => onChange((current) => ({ ...current, opacity: value }))}
          />
        </>
      ) : null}
    </section>
  )
}

/** One labelled slider row, with its current value spelled out beside it. */
function GridSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (value: number) => void
}) {
  const id = useId()
  return (
    <div className="flex h-9 items-center gap-3">
      <label htmlFor={id} className="w-20 shrink-0 text-xs font-medium">
        {label}
      </label>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className="accent-primary h-9 min-w-0 flex-1 cursor-pointer"
      />
      <output
        htmlFor={id}
        className="text-muted-foreground w-20 shrink-0 text-right text-xs whitespace-nowrap tabular-nums"
      >
        {display}
      </output>
    </div>
  )
}

/** A small copy of the picture with its grid, which the DM drags to line the grid up. */
function GridPreview({
  grid,
  src,
  width,
  height,
  onShift,
}: {
  grid: PlayerScreenGrid
  src: string
  width: number
  height: number
  onShift: (dx: number, dy: number) => void
}) {
  const last = useRef<{ x: number; y: number } | null>(null)
  return (
    <div className="grid place-items-center rounded-lg bg-black p-1">
      <div
        className="relative max-w-full cursor-move touch-none overflow-hidden"
        style={{ aspectRatio: `${width} / ${height}`, height: '7rem' }}
        title="Drag to move the grid"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          last.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerMove={(event) => {
          if (!last.current) return
          const box = event.currentTarget.getBoundingClientRect()
          const dx = (event.clientX - last.current.x) / box.width
          const dy = (event.clientY - last.current.y) / box.width
          last.current = { x: event.clientX, y: event.clientY }
          if (dx || dy) onShift(dx, dy)
        }}
        onPointerUp={() => {
          last.current = null
        }}
        onPointerCancel={() => {
          last.current = null
        }}
      >
        <ResponsiveImage
          src={src}
          alt=""
          sizes="28rem"
          maxWidth={1024}
          draggable={false}
          className="absolute inset-0 size-full select-none"
        />
        <GridOverlay grid={grid} width={width} height={height} strokeWidth={1} />
      </div>
    </div>
  )
}
