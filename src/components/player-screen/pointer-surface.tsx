import { type CSSProperties, useRef } from 'react'

import { GridOverlay } from '#/components/player-screen/grid-overlay'
import { PointerMarksOverlay } from '#/components/player-screen/pointer-marks'
import {
  usePlayerScreenPointer,
  usePlayerScreenPointerSender,
} from '#/components/player-screen/use-player-screen'
import { ResponsiveImage } from '#/components/responsive-image'
import type { PlayerScreenGrid } from '#/lib/player-screen-grid'
import {
  POINTER_CLICK_DISTANCE_PX,
  POINTER_CLICK_MS,
  spotOnPicture,
  type PictureSpot,
} from '#/lib/player-screen-pointer'
import { cn } from '#/lib/utils'

function spotFor(event: React.PointerEvent<HTMLDivElement>) {
  return spotOnPicture(event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY)
}

/**
 * The DM's copy of the picture on the player screen, to point at: a click pings that spot for the
 * players, and holding the button down draws a laser dot that follows the pointer.
 */
export function PointerSurface({
  picture,
  src,
  width,
  height,
  grid,
  markSize,
  className,
  style,
}: {
  /** The id of the picture on the player screen, so pointing at a stale copy goes nowhere. */
  picture: string
  src: string
  width: number
  height: number
  grid: PlayerScreenGrid
  /** How big the DM's own echo of the marks is drawn. */
  markSize: string
  className?: string
  style?: CSSProperties
}) {
  const send = usePlayerScreenPointerSender()
  const marks = usePlayerScreenPointer(picture)
  // A press becomes the laser once it is held or moved; until then it may still be a click.
  const press = useRef<{
    x: number
    y: number
    spot: PictureSpot
    laser: boolean
    timer: number
  } | null>(null)

  const startLaser = () => {
    const current = press.current
    if (!current || current.laser) return
    current.laser = true
    window.clearTimeout(current.timer)
    send({ kind: 'laser', picture, spot: current.spot })
  }

  // A press let go before it became the laser was a click, which pings.
  const release = (cancelled: boolean) => {
    const start = press.current
    if (!start) return
    press.current = null
    window.clearTimeout(start.timer)
    if (start.laser) send({ kind: 'laser-off', picture })
    else if (!cancelled) send({ kind: 'ping', picture, spot: start.spot })
  }

  return (
    <div
      className={cn('relative cursor-crosshair touch-none overflow-hidden select-none', className)}
      style={{ ...style, aspectRatio: `${width} / ${height}` }}
      title="Click to ping a spot for the players. Hold and drag for a laser pointer."
      onPointerDown={(event) => {
        if (event.button !== 0) return
        event.currentTarget.setPointerCapture(event.pointerId)
        press.current = {
          x: event.clientX,
          y: event.clientY,
          spot: spotFor(event),
          laser: false,
          timer: window.setTimeout(startLaser, POINTER_CLICK_MS),
        }
      }}
      onPointerMove={(event) => {
        const current = press.current
        if (!current) return
        current.spot = spotFor(event)
        const moved = Math.hypot(event.clientX - current.x, event.clientY - current.y)
        if (current.laser) send({ kind: 'laser', picture, spot: current.spot })
        else if (moved >= POINTER_CLICK_DISTANCE_PX) startLaser()
      }}
      onPointerUp={() => release(false)}
      onPointerCancel={() => release(true)}
    >
      <ResponsiveImage
        src={src}
        alt=""
        sizes="(min-width: 64rem) 70vw, 100vw"
        maxWidth={1536}
        draggable={false}
        className="absolute inset-0 size-full"
      />
      {grid.on ? <GridOverlay grid={grid} width={width} height={height} strokeWidth={1} /> : null}
      <PointerMarksOverlay marks={marks} size={markSize} />
    </div>
  )
}
