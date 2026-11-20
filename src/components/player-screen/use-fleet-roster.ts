import { useMemo } from 'react'

import { refs } from '#/data/generated/refs'
import type { EntityRef } from '#/definitions/kind'
import { activePcs, sortedEvents } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import {
  fleetRoster,
  lastSeenAt,
  markersAboard,
  type FleetRoster,
  type FleetSighting,
} from '#/lib/fleet-roster'

/** Who the fleet screens pin to a ship: the party, and the fleet's commander. */
const TRACKED_NPCS = [refs.npcs.onana_tempest]

/** A record's name, icon and portrait, read from the campaign source. */
export function resolveNamed(ref: EntityRef) {
  const registry: Readonly<Record<string, object>> = SOURCE_REGISTRIES[ref.ref]
  const record = Object.hasOwn(registry, ref.key)
    ? (registry[ref.key] as { name: string; icon?: string; avatar?: string })
    : undefined
  return record ? { name: record.name, icon: record.icon, avatar: record.avatar } : undefined
}

function fleetSightings(): FleetSighting[] {
  const events = sortedEvents().map((event) => event.data)
  const sightings: FleetSighting[] = []
  const partyAt = events[0]?.location
  if (partyAt?.ref === 'location') {
    sightings.push({
      id: 'party',
      label: 'The party',
      avatars: activePcs().map((pc) => pc.data.avatar),
      location: partyAt.key,
    })
  }
  for (const ref of TRACKED_NPCS) {
    const npc = resolveNamed(ref)
    const location = lastSeenAt(ref, events)
    if (npc && location) {
      sightings.push({
        id: `npc:${ref.key}`,
        label: npc.name,
        avatars: npc.avatar ? [npc.avatar] : [],
        location,
      })
    }
  }
  return sightings
}

/** An organization's fleet, with the party and the commander pinned to the ships they are on. */
export function useFleetRoster(owner: string): FleetRoster | undefined {
  return useMemo(
    () =>
      fleetRoster(
        owner,
        SOURCE_REGISTRIES.item,
        resolveNamed,
        markersAboard(fleetSightings(), SOURCE_REGISTRIES.location),
      ),
    [owner],
  )
}
