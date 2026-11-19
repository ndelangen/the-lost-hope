import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useMemo } from 'react'

import { resolveScene } from '#/lib/dm-campaign'
import { sceneFights, sceneRoster } from '#/lib/dm-encounter'
import { createEncounter, encounterForScene, joinFight, updateEncounter } from '#/lib/encounter'
import { initialHullDamage, shipSectors, type ShipUnderFire } from '#/lib/ship-damage'
import { vesselDecks } from '#/lib/ship-decks'
import { shipRooms, type RoomFight, type ShipRooms } from '#/lib/ship-rooms'

import {
  newEncounterId,
  updateEncounterStore,
  useEncounterStore,
} from './encounter/use-encounter-store'

/**
 * A scene's fights placed in the rooms of its vessel, and the action that runs one: it joins the
 * scene's encounter, which is prepared on the spot when there is none yet, and the DM lands on
 * that encounter in combat focus.
 */
export function useShipRooms(
  sceneKey: string,
  ship: ShipUnderFire,
): { rooms: ShipRooms; run: (fight: RoomFight) => void } {
  const [store] = useEncounterStore()
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const scene = resolveScene({ ref: 'scene', key: sceneKey })
  const fights = useMemo(() => (scene ? sceneFights(scene) : []), [scene])
  const joined = store
    ? encounterForScene(store, { ref: 'scene', key: sceneKey })?.joined
    : undefined

  const rooms = useMemo(
    () =>
      shipRooms(
        shipSectors(ship, initialHullDamage(ship)),
        vesselDecks(ship.vessel.key),
        fights.map((fight) => ({ ...fight, joined: joined?.[fight.key] ?? 0 })),
      ),
    [ship, fights, joined],
  )

  const run = (room: RoomFight) => {
    const fight = fights.find(({ key }) => key === room.key)
    if (!scene || !fight) return
    const ref = { ref: 'scene' as const, key: sceneKey }
    const next = updateEncounterStore((current) => {
      const existing = encounterForScene(current, ref)
      const id = existing?.id ?? newEncounterId()
      const prepared = existing
        ? current
        : createEncounter(current, { id, name: scene.name, scene: ref, build: sceneRoster(scene) })
      return updateEncounter(prepared, id, (encounter) =>
        joinFight(encounter, fight.key, fight.creatures),
      )
    })
    const id = encounterForScene(next, ref)?.id
    if (id && pathname !== `/dm/encounter/${id}`)
      void navigate({ to: '/dm/encounter/$id', params: { id }, search: { combat: true } })
  }

  return { rooms, run }
}
