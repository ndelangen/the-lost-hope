import type { IconType } from 'react-icons'
import {
  GiCastleRuins,
  GiCargoShip,
  GiCrossedSwords,
  GiExitDoor,
  GiGavel,
  GiJourney,
  GiMountainRoad,
  GiOpenGate,
  GiPawPrint,
  GiPartyFlags,
  GiSailboat,
  GiShadowFollower,
} from 'react-icons/gi'

import { cn } from '#/lib/utils'

export const SESSION_ICON_PLACEHOLDER = 'gi/GiJourney'

export const SESSION_ICONS = {
  'gi/GiOpenGate': GiOpenGate,
  'gi/GiPawPrint': GiPawPrint,
  'gi/GiPartyFlags': GiPartyFlags,
  'gi/GiSailboat': GiSailboat,
  'gi/GiShadowFollower': GiShadowFollower,
  'gi/GiGavel': GiGavel,
  'gi/GiCrossedSwords': GiCrossedSwords,
  'gi/GiCastleRuins': GiCastleRuins,
  'gi/GiMountainRoad': GiMountainRoad,
  'gi/GiExitDoor': GiExitDoor,
  'gi/GiCargoShip': GiCargoShip,
  [SESSION_ICON_PLACEHOLDER]: GiJourney,
} as const satisfies Record<string, IconType>

export function resolveSessionIcon(icon?: string): IconType {
  return (
    (icon ? SESSION_ICONS[icon as keyof typeof SESSION_ICONS] : undefined) ??
    SESSION_ICONS[SESSION_ICON_PLACEHOLDER]
  )
}

export function SessionIcon({ icon, className }: { icon?: string; className?: string }) {
  const Icon = resolveSessionIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
