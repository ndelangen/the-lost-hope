import type { IconType } from 'react-icons'
import { FaUsersSlash } from 'react-icons/fa'
import {
  GiBottledBolt,
  GiCage,
  GiComa,
  GiCursedStar,
  GiDeadWood,
  GiDominoMask,
  GiFairyWings,
  GiFloatingGhost,
  GiHeartBeats,
  GiHeartShield,
  GiHoodedAssassin,
  GiLightningStorm,
  GiPadlock,
  GiPrettyFangs,
  GiPrisoner,
  GiScrollQuill,
  GiShadowFollower,
  GiWerewolf,
  GiWhiplash,
  GiWingedShield,
} from 'react-icons/gi'

import { cn } from '#/lib/utils'

export const EFFECT_ICONS = {
  'fa/FaUsersSlash': FaUsersSlash,
  'gi/GiBottledBolt': GiBottledBolt,
  'gi/GiCage': GiCage,
  'gi/GiComa': GiComa,
  'gi/GiCursedStar': GiCursedStar,
  'gi/GiDeadWood': GiDeadWood,
  'gi/GiDominoMask': GiDominoMask,
  'gi/GiFairyWings': GiFairyWings,
  'gi/GiFloatingGhost': GiFloatingGhost,
  'gi/GiHeartBeats': GiHeartBeats,
  'gi/GiHeartShield': GiHeartShield,
  'gi/GiHoodedAssassin': GiHoodedAssassin,
  'gi/GiLightningStorm': GiLightningStorm,
  'gi/GiPadlock': GiPadlock,
  'gi/GiPrettyFangs': GiPrettyFangs,
  'gi/GiPrisoner': GiPrisoner,
  'gi/GiScrollQuill': GiScrollQuill,
  'gi/GiShadowFollower': GiShadowFollower,
  'gi/GiWerewolf': GiWerewolf,
  'gi/GiWhiplash': GiWhiplash,
  'gi/GiWingedShield': GiWingedShield,
} as const satisfies Record<string, IconType>

export function resolveEffectIcon(icon: string): IconType {
  return EFFECT_ICONS[icon as keyof typeof EFFECT_ICONS] ?? GiCursedStar
}

export function EffectIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = resolveEffectIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
