import { resolveScene, resolveSourceRef, sceneShipUnderFire } from '#/lib/dm-campaign'
import type { ShipUnderFire } from '#/lib/ship-damage'

import { ShipDamageClock } from './ship-damage-clock'
import { usePinnedShipClock } from './use-pinned-ship-clock'
import { useShipRooms } from './use-ship-rooms'

/** The pinned clock with the scene's fights in its rooms, so a fight can be run from any page. */
function PinnedClock({
  sceneKey,
  vesselName,
  ship,
  onUnpin,
}: {
  sceneKey: string
  vesselName: string
  ship: ShipUnderFire
  onUnpin: () => void
}) {
  const { rooms, running, load } = useShipRooms(sceneKey, ship)
  return (
    <ShipDamageClock
      sceneKey={sceneKey}
      vesselName={vesselName}
      ship={ship}
      pinned
      onPinChange={(pin) => {
        if (!pin) onUnpin()
      }}
      roomControls={{ rooms, running, onLoad: load }}
    />
  )
}

/**
 * The pinned ship-damage clock, floating at the bottom of every page, combat focus included, so
 * the timer and its alarm keep running wherever the DM is.
 */
export function ShipDamageDock() {
  const [pinned, setPinned] = usePinnedShipClock()
  const scene = pinned ? resolveScene(pinned) : undefined
  const ship = scene ? sceneShipUnderFire(scene) : undefined
  const vesselName = ship ? resolveSourceRef(ship.vessel)?.name : undefined
  if (!pinned || !ship || !vesselName) return null

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[140] flex max-h-[calc(100dvh-2rem)] flex-col items-start justify-end">
      <div className="pointer-events-auto min-h-0 overflow-y-auto overscroll-contain rounded-2xl">
        <PinnedClock
          key={pinned.key}
          sceneKey={pinned.key}
          vesselName={vesselName}
          ship={ship}
          onUnpin={() => setPinned(undefined)}
        />
      </div>
    </div>
  )
}
