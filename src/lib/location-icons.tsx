import {
  Building2,
  Castle,
  Cloud,
  House,
  Map,
  Mountain,
  MountainSnow,
  Route,
  Sparkles,
  Trees,
  type LucideIcon,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { FaGlobe, FaMap, FaMapMarkerAlt } from 'react-icons/fa'
import {
  GiAncientRuins,
  GiBeerStein,
  GiBirdHouse,
  GiBridge,
  GiBunkBeds,
  GiBubblingFlask,
  GiByzantinTemple,
  GiCaravel,
  GiCastle,
  GiCaveEntrance,
  GiChurch,
  GiCircleForest,
  GiCliffCrossing,
  GiCloudRing,
  GiCargoShip,
  GiCaptainHatProfile,
  GiDeathZone,
  GiFamilyHouse,
  GiFairyWand,
  GiFloatingPlatforms,
  GiFloorHatch,
  GiForest,
  GiGearHammer,
  GiGlowingArtifact,
  GiHarborDock,
  GiHidden,
  GiHutsVillage,
  GiIsland,
  GiMedievalBarracks,
  GiMedievalGate,
  GiMineWagon,
  GiMountains,
  GiMountaintop,
  GiPuzzle,
  GiPokerHand,
  GiSailboat,
  GiStoneTower,
  GiSpectre,
  GiShop,
  GiStable,
  GiSwordsEmblem,
  GiVillage,
  GiWaterFountain,
  GiWaves,
  GiWhirlwind,
} from 'react-icons/gi'

import { LOCATION_TYPE_LABELS, type LocationType } from '#/definitions/location.ts'
import { cn } from '#/lib/utils'

export const LOCATION_TYPE_ICONS: Record<LocationType, LucideIcon> = {
  settlement: Building2,
  region: Map,
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

type LocationGlyph = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

/**
 * Curated react-icons registry for per-location avatars. Keys use `set/IconName`,
 * matching the event-icons convention. Each location picks a unique key via its
 * `icon` field; unknown/omitted keys fall back to the placeholder.
 */
export const LOCATION_ICONS: Record<string, LocationGlyph> = {
  'fa/FaGlobe': FaGlobe,
  'fa/FaMap': FaMap,
  'lucide/Cloud': Cloud,
  'lucide/MountainSnow': MountainSnow,
  'gi/GiAncientRuins': GiAncientRuins,
  'gi/GiBeerStein': GiBeerStein,
  'gi/GiBirdHouse': GiBirdHouse,
  'gi/GiBridge': GiBridge,
  'gi/GiBunkBeds': GiBunkBeds,
  'gi/GiBubblingFlask': GiBubblingFlask,
  'gi/GiByzantinTemple': GiByzantinTemple,
  'gi/GiCaravel': GiCaravel,
  'gi/GiCastle': GiCastle,
  'gi/GiCaveEntrance': GiCaveEntrance,
  'gi/GiChurch': GiChurch,
  'gi/GiCircleForest': GiCircleForest,
  'gi/GiCliffCrossing': GiCliffCrossing,
  'gi/GiCloudRing': GiCloudRing,
  'gi/GiCargoShip': GiCargoShip,
  'gi/GiCaptainHatProfile': GiCaptainHatProfile,
  'gi/GiDeathZone': GiDeathZone,
  'gi/GiFamilyHouse': GiFamilyHouse,
  'gi/GiFairyWand': GiFairyWand,
  'gi/GiFloatingPlatforms': GiFloatingPlatforms,
  'gi/GiFloorHatch': GiFloorHatch,
  'gi/GiForest': GiForest,
  'gi/GiGearHammer': GiGearHammer,
  'gi/GiGlowingArtifact': GiGlowingArtifact,
  'gi/GiHarborDock': GiHarborDock,
  'gi/GiHidden': GiHidden,
  'gi/GiHutsVillage': GiHutsVillage,
  'gi/GiIsland': GiIsland,
  'gi/GiMedievalBarracks': GiMedievalBarracks,
  'gi/GiMedievalGate': GiMedievalGate,
  'gi/GiMineWagon': GiMineWagon,
  'gi/GiMountains': GiMountains,
  'gi/GiMountaintop': GiMountaintop,
  'gi/GiPuzzle': GiPuzzle,
  'gi/GiPokerHand': GiPokerHand,
  'gi/GiSailboat': GiSailboat,
  'gi/GiSpectre': GiSpectre,
  'gi/GiShop': GiShop,
  'gi/GiStable': GiStable,
  'gi/GiStoneTower': GiStoneTower,
  'gi/GiSwordsEmblem': GiSwordsEmblem,
  'gi/GiVillage': GiVillage,
  'gi/GiWaterFountain': GiWaterFountain,
  'gi/GiWaves': GiWaves,
  'gi/GiWhirlwind': GiWhirlwind,
  [LOCATION_ICON_PLACEHOLDER]: FaMapMarkerAlt,
}

export function resolveLocationIcon(icon?: string): LocationGlyph {
  return (icon ? LOCATION_ICONS[icon] : undefined) ?? LOCATION_ICONS[LOCATION_ICON_PLACEHOLDER]
}

/** Inline location glyph for tree rows and map pins. */
export function LocationIcon({ icon, className }: { icon?: string; className?: string }) {
  const Icon = resolveLocationIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
