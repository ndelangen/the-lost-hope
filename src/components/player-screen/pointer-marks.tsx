import type { PointerMarks } from '#/components/player-screen/use-player-screen'
import { PLAYER_SCREEN_PING_MS } from '#/lib/player-screen-pointer'
import { cn } from '#/lib/utils'

/**
 * The DM's laser dot and pings over a picture. It fills its box, which must have the picture's
 * shape. `size` is the dot's diameter in any CSS length, so the player screen and the DM's small
 * copy can each draw it at a size that reads.
 */
export function PointerMarksOverlay({
  marks,
  size,
  className,
}: {
  marks: PointerMarks
  size: string
  className?: string
}) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      {marks.pings.map(({ id, spot }) => (
        <span
          key={id}
          className="absolute"
          style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%` }}
        >
          {[0, 1, 2].map((ring) => (
            <span
              key={ring}
              className="player-screen-ping absolute rounded-full border-amber-300 shadow-[0_0_24px_rgb(251_191_36/0.9),inset_0_0_16px_rgb(251_191_36/0.6)]"
              style={{
                width: size,
                height: size,
                borderWidth: `calc(${size} / 8)`,
                animationDelay: `${ring * 260}ms`,
                animationDuration: `${PLAYER_SCREEN_PING_MS - 2 * 260}ms`,
              }}
            />
          ))}
          <span
            className="player-screen-ping-core absolute rounded-full bg-amber-200 shadow-[0_0_32px_8px_rgb(251_191_36/0.9)]"
            style={{
              width: `calc(${size} / 2.5)`,
              height: `calc(${size} / 2.5)`,
              animationDuration: `${PLAYER_SCREEN_PING_MS}ms`,
            }}
          />
        </span>
      ))}
      {marks.laser ? (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_18px_6px_rgb(239_68_68/0.85),0_0_60px_18px_rgb(239_68_68/0.45)] transition-[left,top] duration-75 ease-out"
          style={{
            left: `${marks.laser.x * 100}%`,
            top: `${marks.laser.y * 100}%`,
            width: `calc(${size} / 2.5)`,
            height: `calc(${size} / 2.5)`,
            boxSizing: 'border-box',
            borderWidth: `calc(${size} / 24)`,
            borderColor: 'white',
          }}
        />
      ) : null}
    </div>
  )
}
