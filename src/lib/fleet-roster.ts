import type { Item, ItemStatus } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'

export type FleetShip = {
  key: string
  name: string
  icon: string
  status?: ItemStatus
}

/** One side of a fleet: the ships a single commander controls, in service and lost. */
export type FleetSide = {
  key: string
  name: string
  icon?: string
  ships: FleetShip[]
  inService: number
  lost: number
}

export type FleetRoster = {
  owner: { key: string; name: string; icon?: string }
  /** The owner's own side first, then each side that has taken ships from it. */
  sides: FleetSide[]
  /** Ships still being built, which no side has yet. */
  building: FleetShip[]
}

type Named = { name: string; icon?: string }

/** Looks up a referenced record's name and icon, so the roster stays independent of registries. */
export type ResolveNamed = (ref: EntityRef) => Named | undefined

/**
 * An organization's fleet: every vessel it owns, grouped by who controls it, with ships under
 * construction set apart. Ships in service come before lost ones, each by name.
 */
export function fleetRoster(
  ownerKey: string,
  items: Readonly<Record<string, Item>>,
  resolve: ResolveNamed,
): FleetRoster | undefined {
  const owner = resolve({ ref: 'organization', key: ownerKey })
  if (!owner) return undefined

  const owned = Object.entries(items).filter(
    ([, item]) =>
      item.vessel &&
      item.currentOwner?.ref === 'organization' &&
      item.currentOwner.key === ownerKey,
  )
  const building: FleetShip[] = []
  const sides = new Map<string, FleetSide>()
  const ownSideId = `organization:${ownerKey}`
  sides.set(ownSideId, side(ownerKey, owner))

  for (const [key, item] of owned) {
    const ship: FleetShip = { key, name: item.name, icon: item.icon, status: item.status }
    if (item.status === 'under-construction') {
      building.push(ship)
      continue
    }
    const controller = item.controlledBy ?? { ref: 'organization', key: ownerKey }
    const id = `${controller.ref}:${controller.key}`
    if (!sides.has(id)) {
      const named = resolve(controller)
      if (!named) continue
      sides.set(id, side(controller.key, named))
    }
    const entry = sides.get(id)!
    entry.ships.push(ship)
    if (item.status === 'destroyed') entry.lost += 1
    else entry.inService += 1
  }

  const [own, ...others] = [...sides.values()]
  return {
    owner: { key: ownerKey, ...owner },
    sides: [own!, ...others.toSorted((a, b) => a.name.localeCompare(b.name))].map((entry) => ({
      ...entry,
      ships: entry.ships.toSorted(byServiceThenName),
    })),
    building: building.toSorted(byServiceThenName),
  }
}

/** Organizations with a fleet worth a roster: they own more than one vessel. */
export function fleetOwners(items: Readonly<Record<string, Item>>): string[] {
  const counts = new Map<string, number>()
  for (const item of Object.values(items)) {
    if (!item.vessel || item.currentOwner?.ref !== 'organization') continue
    counts.set(item.currentOwner.key, (counts.get(item.currentOwner.key) ?? 0) + 1)
  }
  return [...counts].filter(([, count]) => count > 1).map(([key]) => key)
}

function side(key: string, named: Named): FleetSide {
  return { key, name: named.name, icon: named.icon, ships: [], inService: 0, lost: 0 }
}

function byServiceThenName(a: FleetShip, b: FleetShip): number {
  return (
    Number(a.status === 'destroyed') - Number(b.status === 'destroyed') ||
    a.name.localeCompare(b.name)
  )
}
