import { Pin, PinOff } from 'lucide-react'

import type { ShipUnderFire } from '#/lib/ship-damage'
import type { RoomFight } from '#/lib/ship-rooms'

import { ActionButton } from './encounter/icon-button'
import { ShipDamageClock } from './ship-damage-clock'
import { usePinnedShipClock } from './use-pinned-ship-clock'
import { useShipRooms } from './use-ship-rooms'

/**
 * A scene's ship-damage clock in its place on the page, or a note that it is pinned to the corner
 * while it runs from there. Only one copy of a clock runs at a time.
 */
export function SceneShipDamage({
  sceneKey,
  vesselName,
  ship,
  onNotes,
}: {
  sceneKey: string
  vesselName: string
  ship: ShipUnderFire
  /** Open the notes of a fight's beat, on a page that shows them. */
  onNotes?: (fight: RoomFight) => void
}) {
  const [pinned, setPinned] = usePinnedShipClock()
  const { rooms, running, load } = useShipRooms(sceneKey, ship)
  if (pinned?.key === sceneKey) {
    return (
      <section
        aria-label={`Ship damage for ${vesselName}`}
        className="border-border bg-card flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border-2 border-dashed p-3"
      >
        <Pin aria-hidden className="text-muted-foreground size-5 shrink-0" />
        <p className="min-w-0 flex-1 font-semibold">
          Ship damage · {vesselName}{' '}
          <span className="text-muted-foreground font-normal">
            is pinned to the bottom of the screen.
          </span>
        </p>
        <ActionButton size="lg" onClick={() => setPinned(undefined)}>
          <PinOff aria-hidden /> Put it back here
        </ActionButton>
      </section>
    )
  }
  return (
    <ShipDamageClock
      sceneKey={sceneKey}
      vesselName={vesselName}
      ship={ship}
      pinned={false}
      onPinChange={(pin) => setPinned(pin ? { ref: 'scene', key: sceneKey } : undefined)}
      roomControls={{ rooms, running, onLoad: load, onNotes }}
    />
  )
}
