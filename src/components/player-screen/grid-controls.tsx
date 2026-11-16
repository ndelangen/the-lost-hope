import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Grid3x3,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { type ReactNode, useEffect, useRef } from 'react'

import { GridOverlay } from '#/components/player-screen/grid-overlay'
import { ResponsiveImage } from '#/components/responsive-image'
import {
  DEFAULT_PLAYER_SCREEN_GRID,
  gridSquaresAcross,
  moveGrid,
  scaleGrid,
  shiftGrid,
  type PlayerScreenGrid,
} from '#/lib/player-screen-grid'
import { cn } from '#/lib/utils'

/** How far one press (or one repeat while held) nudges the grid. */
const NUDGE_SQUARES = 0.05
const SCALE_STEP = 1.01

/**
 * The DM's controls for the battle grid over the picture on the player screen: turn it on, drag it
 * into place on a preview, and size and nudge it with buttons that repeat while held.
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
            'flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border text-sm font-medium',
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
            className="border-border hover:bg-muted flex h-12 items-center gap-2 rounded-lg border px-3 text-sm font-medium"
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
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-12 shrink-0 text-xs font-semibold uppercase">
              Size
            </span>
            <RepeatButton
              label="Smaller squares"
              onRepeat={() => onChange((current) => scaleGrid(current, 1 / SCALE_STEP, aspect))}
            >
              <Minus className="size-5" aria-hidden />
            </RepeatButton>
            <span className="min-w-0 flex-1 text-center text-sm tabular-nums">
              {squares.toFixed(1)} across
            </span>
            <RepeatButton
              label="Bigger squares"
              onRepeat={() => onChange((current) => scaleGrid(current, SCALE_STEP, aspect))}
            >
              <Plus className="size-5" aria-hidden />
            </RepeatButton>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-12 shrink-0 text-xs font-semibold uppercase">
              Move
            </span>
            {NUDGES.map(({ label, dx, dy, Icon }) => (
              <RepeatButton
                key={label}
                label={`Move the grid ${label}`}
                className="flex-1"
                onRepeat={() =>
                  onChange((current) => moveGrid(current, dx * NUDGE_SQUARES, dy * NUDGE_SQUARES))
                }
              >
                <Icon className="size-5" aria-hidden />
              </RepeatButton>
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}

const NUDGES = [
  { label: 'left', dx: -1, dy: 0, Icon: ArrowLeft },
  { label: 'up', dx: 0, dy: -1, Icon: ArrowUp },
  { label: 'down', dx: 0, dy: 1, Icon: ArrowDown },
  { label: 'right', dx: 1, dy: 0, Icon: ArrowRight },
] as const

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
        style={{ aspectRatio: `${width} / ${height}`, height: '10rem' }}
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

/** A button that acts once when pressed and keeps acting, faster and faster, while held. */
function RepeatButton({
  label,
  onRepeat,
  className,
  children,
}: {
  label: string
  onRepeat: () => void
  className?: string
  children: ReactNode
}) {
  const action = useRef(onRepeat)
  action.current = onRepeat
  const timer = useRef<number | undefined>(undefined)
  const stop = () => window.clearTimeout(timer.current)
  useEffect(() => stop, [])

  const start = () => {
    stop()
    action.current()
    let delay = 400
    const tick = () => {
      action.current()
      delay = Math.max(30, delay * 0.8)
      timer.current = window.setTimeout(tick, delay)
    }
    timer.current = window.setTimeout(tick, delay)
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onPointerDown={(event) => {
        if (event.button === 0) start()
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      // Keyboard presses arrive as clicks with no pointer; pointer presses already acted above.
      onClick={(event) => {
        if (event.detail === 0) action.current()
      }}
      className={cn(
        'border-border hover:bg-muted grid h-12 min-w-12 place-items-center rounded-lg border',
        className,
      )}
    >
      {children}
    </button>
  )
}
