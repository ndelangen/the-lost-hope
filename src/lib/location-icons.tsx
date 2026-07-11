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
import type { IconType } from 'react-icons'
import { FaMapMarkerAlt } from 'react-icons/fa'
import {
  GiByzantinTemple,
  GiCastle,
  GiCaveEntrance,
  GiCliffCrossing,
  GiEarthAmerica,
  GiFamilyHouse,
  GiFairyWand,
  GiForest,
  GiBeerStein,
  GiLighthouse,
  GiModernCity,
  GiMineWagon,
  GiMountaintop,
  GiNestBirds,
  GiPuzzle,
  GiSailboat,
  GiStoneTower,
  GiSpectre,
  GiSwordsEmblem,
  GiVillage,
  GiWoodenDoor,
  GiWorld,
} from 'react-icons/gi'

import { LOCATION_TYPE_LABELS, type LocationType } from '#/definitions/location.ts'
import { cn } from '#/lib/utils'

export const LOCATION_TYPE_ICONS: Record<LocationType, LucideIcon> = {
  settlement: Building2,
  district: Building2,
  building: House,
  wilderness: Trees,
  dungeon: Castle,
  landmark: Mountain,
  realm: Sparkles,
  route: Route,
}

export function LocationTypeIcon({ type, className }: { type: LocationType; className?: string }) {
  const Icon = LOCATION_TYPE_ICONS[type]
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}

export function locationTypeLabel(type: LocationType, plural = false): string {
  return plural ? LOCATION_TYPE_LABELS[type] : LOCATION_TYPE_LABELS[type].replace(/s$/, '')
}

/** Placeholder shown when a location has no `icon`. */
export const LOCATION_ICON_PLACEHOLDER = 'fa/FaMapMarkerAlt'

/**
 * Curated react-icons registry for per-location avatars. Keys use `set/IconName`,
 * matching the event-icons convention. Each location picks a unique key via its
 * `icon` field; unknown/omitted keys fall back to the placeholder.
 */
export const LOCATION_ICONS: Record<string, IconType> = {
  'gi/GiWorld': GiWorld,
  'gi/GiEarthAmerica': GiEarthAmerica,
  'gi/GiFamilyHouse': GiFamilyHouse,
  'gi/GiVillage': GiVillage,
  'gi/GiFairyWand': GiFairyWand,
  'gi/GiMineWagon': GiMineWagon,
  'gi/GiBeerStein': GiBeerStein,
  'gi/GiForest': GiForest,
  'gi/GiModernCity': GiModernCity,
  'gi/GiCastle': GiCastle,
  'gi/GiStoneTower': GiStoneTower,
  'gi/GiCaveEntrance': GiCaveEntrance,
  'gi/GiSwordsEmblem': GiSwordsEmblem,
  'gi/GiByzantinTemple': GiByzantinTemple,
  'gi/GiCliffCrossing': GiCliffCrossing,
  'gi/GiMountaintop': GiMountaintop,
  'gi/GiPuzzle': GiPuzzle,
  'gi/GiSpectre': GiSpectre,
  'gi/GiSailboat': GiSailboat,
  'gi/GiLighthouse': GiLighthouse,
  'gi/GiNestBirds': GiNestBirds,
  'gi/GiWoodenDoor': GiWoodenDoor,
  [LOCATION_ICON_PLACEHOLDER]: FaMapMarkerAlt,
}

export function resolveLocationIcon(icon?: string): IconType {
  return (icon ? LOCATION_ICONS[icon] : undefined) ?? LOCATION_ICONS[LOCATION_ICON_PLACEHOLDER]
}

/** Inline location glyph for tree rows and map pins. */
export function LocationIcon({ icon, className }: { icon?: string; className?: string }) {
  const Icon = resolveLocationIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}

/** Framed location avatar for detail-page headers. */
export function LocationAvatar({ icon, className }: { icon?: string; className?: string }) {
  const Icon = resolveLocationIcon(icon)
  return (
    <span
      className={cn(
        'border-border bg-muted text-primary flex size-14 shrink-0 items-center justify-center rounded-xl border',
        className,
      )}
    >
      <Icon className="size-7" aria-hidden />
    </span>
  )
}
