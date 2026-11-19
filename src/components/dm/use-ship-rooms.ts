import { useMemo } from 'react'

import { resolveScene } from '#/lib/dm-campaign'
import { fightPreset, sceneFights } from '#/lib/dm-encounter'
import { fightKey, isRunning } from '#/lib/encounter'
import { initialHullDamage, shipSectors, type ShipUnderFire } from '#/lib/ship-damage'
import { vesselDecks } from '#/lib/ship-decks'
import { shipRooms, type RoomFight, type ShipRooms } from '#/lib/ship-rooms'

import { useEncounter } from './encounter/use-encounter-store'
import { useLoadPreset } from './use-load-preset'

/**
 * A scene's fights placed in the rooms of its vessel, and the action that loads one into the
 * encounter: added to the running fight, or replacing it.
 */
export function useShipRooms(
  sceneKey: string,
  ship: ShipUnderFire,
): {
  rooms: ShipRooms
  running: boolean
  load: (fight: RoomFight, mode: 'add' | 'replace') => void
} {
  const [encounter] = useEncounter()
  const loadPreset = useLoadPreset()
  const sceneRef = useMemo(() => ({ ref: 'scene' as const, key: sceneKey }), [sceneKey])
  const scene = resolveScene(sceneRef)
  const fights = useMemo(() => (scene ? sceneFights(scene) : []), [scene])
  const joined = encounter?.joined

  const rooms = useMemo(
    () =>
      shipRooms(
        shipSectors(ship, initialHullDamage(ship)),
        vesselDecks(ship.vessel.key),
        fights.map((fight) => ({
          ...fight,
          joined: joined?.[fightKey(sceneRef, fight.key)] ?? 0,
        })),
      ),
    [ship, fights, joined, sceneRef],
  )

  const load = (room: RoomFight, mode: 'add' | 'replace') => {
    const fight = fights.find(({ key }) => key === room.key)
    if (fight) loadPreset(fightPreset(sceneRef, fight), mode)
  }

  return { rooms, running: encounter ? isRunning(encounter) : false, load }
}
