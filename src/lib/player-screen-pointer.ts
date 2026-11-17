import { z } from 'zod'

/**
 * The DM pointing at the picture on the player screen. Pointing is momentary, so it travels
 * between windows as messages and is never stored with what the screen shows.
 */
export const PLAYER_SCREEN_POINTER_CHANNEL = 'dag:player-screen-pointer'

/** How long a ping stays on the player screen. */
export const PLAYER_SCREEN_PING_MS = 2400

/** A spot on the picture, as fractions of its width and height from the top-left corner. */
const PictureSpot = z.strictObject({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
})

export type PictureSpot = z.infer<typeof PictureSpot>

export const PlayerScreenPointer = z.discriminatedUnion('kind', [
  /** A short burst of rings at one spot: "here". */
  z.strictObject({ kind: z.literal('ping'), picture: z.string(), spot: PictureSpot }),
  /** A dot that follows the DM's pointer while they hold it down: "along here". */
  z.strictObject({ kind: z.literal('laser'), picture: z.string(), spot: PictureSpot }),
  /** The DM let go of the laser. */
  z.strictObject({ kind: z.literal('laser-off'), picture: z.string() }),
])

export type PlayerScreenPointer = z.infer<typeof PlayerScreenPointer>

export function parsePlayerScreenPointer(data: unknown): PlayerScreenPointer | undefined {
  const parsed = PlayerScreenPointer.safeParse(data)
  return parsed.success ? parsed.data : undefined
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** Where a pointer at `clientX`/`clientY` falls on a picture drawn in `box`, kept on the picture. */
export function spotOnPicture(
  box: { left: number; top: number; width: number; height: number },
  clientX: number,
  clientY: number,
): PictureSpot {
  return {
    x: box.width > 0 ? clamp((clientX - box.left) / box.width) : 0.5,
    y: box.height > 0 ? clamp((clientY - box.top) / box.height) : 0.5,
  }
}

/** A press held this long, or moved this far, is the laser; anything less is a click, which pings. */
export const POINTER_CLICK_MS = 250
export const POINTER_CLICK_DISTANCE_PX = 6
