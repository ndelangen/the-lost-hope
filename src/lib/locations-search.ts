import { z } from 'zod'

import { LOCATION_TYPES, type LocationType } from '#/definitions/location.ts'

export const locationsSearchSchema = z.object({
  filter: z.string().optional(),
  variant: z.enum(['A', 'B', 'C']).optional(),
})

export type LocationsSearch = z.infer<typeof locationsSearchSchema>

export function parseLocationFilter(filter?: string): Set<LocationType> {
  if (filter === undefined) return new Set(LOCATION_TYPES)
  if (filter === '') return new Set()
  const parsed = filter
    .split(',')
    .map((part) => part.trim())
    .filter((part): part is LocationType => (LOCATION_TYPES as readonly string[]).includes(part))
  return parsed.length > 0 ? new Set(parsed) : new Set(LOCATION_TYPES)
}

export function locationsSearchFromTypes(activeTypes: Set<LocationType>): LocationsSearch {
  if (activeTypes.size === 0) return { filter: '' }
  if (activeTypes.size >= LOCATION_TYPES.length) return {}
  const selected = LOCATION_TYPES.filter((type) => activeTypes.has(type))
  return { filter: selected.join(',') }
}
