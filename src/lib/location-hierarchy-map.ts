import type { Location } from '#/definitions/location'
import type { LocationEntity } from '#/lib/campaign'

export type LocationHierarchyMapPoint = {
  slug: string
  name: string
  icon?: string
  left: number
  top: number
  current: boolean
}

export type LocationHierarchyMapModel = {
  asset: Location['map']
  points: LocationHierarchyMapPoint[]
}

export function buildLocationHierarchyMap(
  owner: Location,
  locations: readonly LocationEntity[],
  currentSlug?: string,
): LocationHierarchyMapModel {
  const points = locations.flatMap((entity) => {
    if (!('at' in entity.data) || !entity.data.at) return []

    return [
      {
        slug: entity.slug,
        name: entity.data.name,
        icon: entity.data.icon,
        left: (entity.data.at[0] / owner.map.width) * 100,
        top: (entity.data.at[1] / owner.map.height) * 100,
        current: entity.slug === currentSlug,
      },
    ]
  })

  return { asset: owner.map, points }
}

export function coordinatesWithinMap(
  coordinates: readonly [number, number],
  map: Location['map'],
): boolean {
  const [x, y] = coordinates
  return x >= 0 && x <= map.width && y >= 0 && y <= map.height
}
