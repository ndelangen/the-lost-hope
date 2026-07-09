import {
  Building2,
  Castle,
  House,
  Mountain,
  Route,
  Sparkles,
  Trees,
  type LucideIcon,
} from 'lucide-react'

import { LOCATION_TYPE_LABELS, type LocationType } from '#/definitions/location.ts'
import { cn } from '@/lib/utils'

export const LOCATION_TYPE_ICONS: Record<LocationType, LucideIcon> = {
  settlement: Building2,
  building: House,
  wilderness: Trees,
  dungeon: Castle,
  landmark: Mountain,
  realm: Sparkles,
  route: Route,
}

export function LocationTypeIcon({
  type,
  className,
}: {
  type: LocationType
  className?: string
}) {
  const Icon = LOCATION_TYPE_ICONS[type]
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}

export function locationTypeLabel(type: LocationType, plural = false): string {
  return plural ? LOCATION_TYPE_LABELS[type] : LOCATION_TYPE_LABELS[type].replace(/s$/, '')
}
