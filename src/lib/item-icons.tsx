import type { IconType } from 'react-icons'
import { FaAtlas, FaPrescriptionBottleAlt, FaRing } from 'react-icons/fa'
import {
  GiBackpack,
  GiCardDraw,
  GiClothes,
  GiDaggerRose,
  GiDrippingStone,
  GiEmeraldNecklace,
  GiFeather,
  GiHornInternal,
  GiMaceHead,
  GiMagicBroom,
  GiMolotov,
  GiMetalDisc,
  GiLockedChest,
  GiPassport,
  GiRoundBottomFlask,
  GiScales,
  GiSlaveryWhip,
  GiSwordWound,
} from 'react-icons/gi'

import { cn } from '#/lib/utils'

export const ITEM_ICONS = {
  'fa/FaAtlas': FaAtlas,
  'fa/FaPrescriptionBottleAlt': FaPrescriptionBottleAlt,
  'fa/FaRing': FaRing,
  'gi/GiBackpack': GiBackpack,
  'gi/GiCardDraw': GiCardDraw,
  'gi/GiClothes': GiClothes,
  'gi/GiMagicBroom': GiMagicBroom,
  'gi/GiMetalDisc': GiMetalDisc,
  'gi/GiLockedChest': GiLockedChest,
  'gi/GiPassport': GiPassport,
  'gi/GiSwordWound': GiSwordWound,
  'gi/GiDaggerRose': GiDaggerRose,
  'gi/GiDrippingStone': GiDrippingStone,
  'gi/GiEmeraldNecklace': GiEmeraldNecklace,
  'gi/GiFeather': GiFeather,
  'gi/GiHornInternal': GiHornInternal,
  'gi/GiMaceHead': GiMaceHead,
  'gi/GiMolotov': GiMolotov,
  'gi/GiRoundBottomFlask': GiRoundBottomFlask,
  'gi/GiScales': GiScales,
  'gi/GiSlaveryWhip': GiSlaveryWhip,
} as const satisfies Record<string, IconType>

export function resolveItemIcon(icon: string): IconType {
  return ITEM_ICONS[icon as keyof typeof ITEM_ICONS] ?? GiDrippingStone
}

export function ItemIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = resolveItemIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
