import { LOCATION_TYPE_LABELS, type LocationType } from '#/definitions/location'
import {
  contentToText,
  locationAbsolutePosition,
  locationActivityCount,
  locationParent,
  locationTree,
  locationTypeOf,
  locations,
  mapPlottableLocations,
  type LocationTreeNode,
} from '#/lib/campaign'

const MAP_WIDTH = 1000
const MAP_HEIGHT = 500
const MAP_PADDING = 48

export type LocationMapModel = {
  width: number
  height: number
  connectors: {
    key: string
    x1: number
    y1: number
    x2: number
    y2: number
  }[]
  pins: {
    slug: string
    name: string
    icon?: string
    left: number
    top: number
  }[]
}

export function locationMapModel(activeTypes: Set<LocationType>): LocationMapModel {
  const plottable = mapPlottableLocations().filter((entity) => {
    const type = locationTypeOf(entity.data)
    return type ? activeTypes.has(type) : true
  })
  const visibleSlugs = new Set(plottable.map((entity) => entity.slug))
  const positions = plottable
    .map((entity) => locationAbsolutePosition(entity.data))
    .filter((position): position is [number, number] => position !== undefined)

  const xs = positions.map(([x]) => x)
  const ys = positions.map(([, y]) => y)
  const bounds =
    positions.length === 0
      ? { minX: 0, minY: 0, maxX: 900, maxY: 400 }
      : {
          minX: Math.min(...xs),
          minY: Math.min(...ys),
          maxX: Math.max(...xs),
          maxY: Math.max(...ys),
        }

  const scaleX = (x: number) => {
    const range = bounds.maxX - bounds.minX || 1
    return MAP_PADDING + ((x - bounds.minX) / range) * (MAP_WIDTH - MAP_PADDING * 2)
  }
  const scaleY = (y: number) => {
    const range = bounds.maxY - bounds.minY || 1
    return MAP_PADDING + ((y - bounds.minY) / range) * (MAP_HEIGHT - MAP_PADDING * 2)
  }

  const connectors = plottable.flatMap((entity) => {
    const parent = locationParent(entity.data)
    if (!parent || parent.slug === locations.world.slug || !visibleSlugs.has(parent.slug)) return []

    const childPosition = locationAbsolutePosition(entity.data)
    const parentPosition = locationAbsolutePosition(parent)
    if (!childPosition || !parentPosition) return []

    return [
      {
        key: `${parent.slug}-${entity.slug}`,
        x1: scaleX(parentPosition[0]),
        y1: scaleY(parentPosition[1]),
        x2: scaleX(childPosition[0]),
        y2: scaleY(childPosition[1]),
      },
    ]
  })

  const pins = plottable.flatMap((entity) => {
    const type = locationTypeOf(entity.data)
    const position = locationAbsolutePosition(entity.data)
    if (!position || !type) return []

    return [
      {
        slug: entity.slug,
        name: entity.data.name,
        icon: entity.data.icon,
        left: (scaleX(position[0]) / MAP_WIDTH) * 100,
        top: (scaleY(position[1]) / MAP_HEIGHT) * 100,
      },
    ]
  })

  return { width: MAP_WIDTH, height: MAP_HEIGHT, connectors, pins }
}

export type LocationDirectoryNode = {
  slug: string
  name: string
  icon?: string
  type?: LocationType
  teaser: string
  activityCount: number
  children: LocationDirectoryNode[]
}

function directoryNode(node: LocationTreeNode): LocationDirectoryNode {
  return {
    slug: node.slug,
    name: node.data.name,
    icon: node.data.icon,
    type: locationTypeOf(node.data),
    teaser: node.data.notes ? contentToText(node.data.notes) : '',
    activityCount: locationActivityCount(node.slug),
    children: node.children.map(directoryNode),
  }
}

export function locationDirectoryTree(): LocationDirectoryNode[] {
  return locationTree().map(directoryNode)
}

export function filterLocationDirectory(
  nodes: LocationDirectoryNode[],
  query: string,
  activeTypes: Set<LocationType>,
): LocationDirectoryNode[] {
  const normalizedQuery = query.trim().toLowerCase()

  return nodes.flatMap((node) => {
    const typeLabel = node.type ? LOCATION_TYPE_LABELS[node.type] : ''
    const typeMatch = node.type ? activeTypes.has(node.type) : true
    const textMatch =
      !normalizedQuery ||
      node.name.toLowerCase().includes(normalizedQuery) ||
      node.teaser.toLowerCase().includes(normalizedQuery) ||
      typeLabel.toLowerCase().includes(normalizedQuery)
    const children = filterLocationDirectory(node.children, query, activeTypes)

    return (typeMatch && textMatch) || children.length > 0 ? [{ ...node, children }] : []
  })
}
