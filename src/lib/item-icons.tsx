import type { IconType } from 'react-icons'
import { GiDrippingStone, GiMagicBroom, GiRoundBottomFlask, GiSwordWound } from 'react-icons/gi'

import { cn } from '#/lib/utils'

export const ITEM_ICONS = {
  'gi/GiMagicBroom': GiMagicBroom,
  'gi/GiSwordWound': GiSwordWound,
  'gi/GiDrippingStone': GiDrippingStone,
  'gi/GiRoundBottomFlask': GiRoundBottomFlask,
} as const satisfies Record<string, IconType>

export function resolveItemIcon(icon: string): IconType {
  return ITEM_ICONS[icon as keyof typeof ITEM_ICONS] ?? GiDrippingStone
}

export function ItemIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = resolveItemIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
