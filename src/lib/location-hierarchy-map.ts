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

export const LOCATION_MAP_EDGE_INSET_RATIO = 0.08
export const LOCATION_MAP_MIN_POINT_SEPARATION_RATIO = 0.15

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

export function coordinatesWithinMapInset(
  coordinates: readonly [number, number],
  map: Location['map'],
): boolean {
  const [x, y] = coordinates
  const horizontalInset = map.width * LOCATION_MAP_EDGE_INSET_RATIO
  const verticalInset = map.height * LOCATION_MAP_EDGE_INSET_RATIO

  return (
    x >= horizontalInset &&
    x <= map.width - horizontalInset &&
    y >= verticalInset &&
    y <= map.height - verticalInset
  )
}

export function normalizedMapCoordinateDistance(
  first: readonly [number, number],
  second: readonly [number, number],
  map: Location['map'],
): number {
  return Math.hypot((first[0] - second[0]) / map.width, (first[1] - second[1]) / map.height)
}
