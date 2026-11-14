import type { IconType } from 'react-icons'
import {
  GiBoltEye,
  GiCastleRuins,
  GiCrystalWand,
  GiDonkey,
  GiElvenCastle,
  GiEyeball,
  GiFloatingTentacles,
  GiGriffinShield,
  GiHawkEmblem,
  GiHeraldicSun,
  GiMagicBroom,
  GiMiner,
  GiMountainCave,
  GiOrcHead,
  GiRelicBlade,
  GiSeaSerpent,
  GiShop,
  GiViolin,
  GiWolfHowl,
} from 'react-icons/gi'

import { cn } from '#/lib/utils'

/** The icons arcs can use. Each arc picks its own, so it can be told apart without its colour. */
export const ARC_ICONS = {
  'gi/GiBoltEye': GiBoltEye,
  'gi/GiCastleRuins': GiCastleRuins,
  'gi/GiCrystalWand': GiCrystalWand,
  'gi/GiDonkey': GiDonkey,
  'gi/GiElvenCastle': GiElvenCastle,
  'gi/GiEyeball': GiEyeball,
  'gi/GiFloatingTentacles': GiFloatingTentacles,
  'gi/GiGriffinShield': GiGriffinShield,
  'gi/GiHawkEmblem': GiHawkEmblem,
  'gi/GiHeraldicSun': GiHeraldicSun,
  'gi/GiMagicBroom': GiMagicBroom,
  'gi/GiMiner': GiMiner,
  'gi/GiMountainCave': GiMountainCave,
  'gi/GiOrcHead': GiOrcHead,
  'gi/GiRelicBlade': GiRelicBlade,
  'gi/GiSeaSerpent': GiSeaSerpent,
  'gi/GiShop': GiShop,
  'gi/GiViolin': GiViolin,
  'gi/GiWolfHowl': GiWolfHowl,
} as const satisfies Record<string, IconType>

const DEFAULT_ICON = GiCrystalWand

export function resolveArcIcon(icon: string): IconType {
  return ARC_ICONS[icon as keyof typeof ARC_ICONS] ?? DEFAULT_ICON
}

export function ArcIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = resolveArcIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
