import type { IconType } from 'react-icons'
import { FaUserSecret } from 'react-icons/fa'
import {
  GiBackwardTime,
  GiBottledShadow,
  GiGoblinHead,
  GiHolySymbol,
  GiHoodedFigure,
  GiLaurels,
  GiMagicPortal,
  GiPawPrint,
  GiSiegeTower,
  GiTentaclesSkull,
  GiVelociraptorTracks,
} from 'react-icons/gi'

import { cn } from '#/lib/utils'

export const QUEST_ICONS = {
  'fa/FaUserSecret': FaUserSecret,
  'gi/GiBackwardTime': GiBackwardTime,
  'gi/GiBottledShadow': GiBottledShadow,
  'gi/GiGoblinHead': GiGoblinHead,
  'gi/GiHolySymbol': GiHolySymbol,
  'gi/GiHoodedFigure': GiHoodedFigure,
  'gi/GiLaurels': GiLaurels,
  'gi/GiMagicPortal': GiMagicPortal,
  'gi/GiPawPrint': GiPawPrint,
  'gi/GiSiegeTower': GiSiegeTower,
  'gi/GiTentaclesSkull': GiTentaclesSkull,
  'gi/GiVelociraptorTracks': GiVelociraptorTracks,
} as const satisfies Record<string, IconType>

const DEFAULT_ICON = GiMagicPortal

export function resolveQuestIcon(icon: string): IconType {
  return QUEST_ICONS[icon as keyof typeof QUEST_ICONS] ?? DEFAULT_ICON
}

export function QuestIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = resolveQuestIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
