import type { IconType } from 'react-icons'
import { FaBuilding } from 'react-icons/fa'
import { GiCrossedSwords, GiDwarfFace, GiHand, GiJusticeStar, GiMagicPalm } from 'react-icons/gi'

import { cn } from '#/lib/utils'

/** Placeholder shown when an organization has no `icon`. */
export const ORGANIZATION_ICON_PLACEHOLDER = 'fa/FaBuilding'

/**
 * Curated react-icons registry for per-organization glyphs. Keys use
 * `set/IconName`, matching the location-icons convention. Each organization
 * picks a unique key via its `icon` field; unknown/omitted keys fall back to the
 * placeholder.
 */
export const ORGANIZATION_ICONS: Record<string, IconType> = {
  'gi/GiCrossedSwords': GiCrossedSwords,
  'gi/GiDwarfFace': GiDwarfFace,
  'gi/GiHand': GiHand,
  'gi/GiJusticeStar': GiJusticeStar,
  'gi/GiMagicPalm': GiMagicPalm,
  [ORGANIZATION_ICON_PLACEHOLDER]: FaBuilding,
}

export function resolveOrganizationIcon(icon?: string): IconType {
  return (
    (icon ? ORGANIZATION_ICONS[icon] : undefined) ??
    ORGANIZATION_ICONS[ORGANIZATION_ICON_PLACEHOLDER]
  )
}

/** Inline organization glyph for reference rows. */
export function OrganizationIcon({ icon, className }: { icon?: string; className?: string }) {
  const Icon = resolveOrganizationIcon(icon)
  return <Icon className={cn('size-3.5 shrink-0', className)} aria-hidden />
}
