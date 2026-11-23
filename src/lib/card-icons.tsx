import { Star } from 'lucide-react'
import type { ComponentType } from 'react'
import { GiCastleRuins, GiJesterHat, GiKey, GiScales } from 'react-icons/gi'

import type { CardSuit } from '#/definitions/card'

/** The glyph of each suit, shared by card faces and inline card references. */
export const CARD_SUIT_ICONS: Record<CardSuit, ComponentType<{ className?: string }>> = {
  Key: GiKey,
  Ruin: GiCastleRuins,
  Star,
  Jester: GiJesterHat,
  Balance: GiScales,
}

export function CardSuitIcon({ suit, className }: { suit: CardSuit; className?: string }) {
  const Icon = CARD_SUIT_ICONS[suit]
  return <Icon className={className} />
}
