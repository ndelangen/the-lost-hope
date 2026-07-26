import type { IconType } from 'react-icons'
import { FaAtlas, FaRing } from 'react-icons/fa'
import {
  GiDaggerRose,
  GiDrippingStone,
  GiMaceHead,
  GiMagicBroom,
  GiRoundBottomFlask,
  GiScales,
  GiSwordWound,
} from 'react-icons/gi'

import { cn } from '#/lib/utils'

export const ITEM_ICONS = {
  'fa/FaAtlas': FaAtlas,
  'fa/FaRing': FaRing,
  'gi/GiMagicBroom': GiMagicBroom,
  'gi/GiSwordWound': GiSwordWound,
  'gi/GiDaggerRose': GiDaggerRose,
  'gi/GiDrippingStone': GiDrippingStone,
  'gi/GiMaceHead': GiMaceHead,
  'gi/GiRoundBottomFlask': GiRoundBottomFlask,
  'gi/GiScales': GiScales,
} as const satisfies Record<string, IconType>

export function resolveItemIcon(icon: string): IconType {
  return ITEM_ICONS[icon as keyof typeof ITEM_ICONS] ?? GiDrippingStone
}

export function ItemIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = resolveItemIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
