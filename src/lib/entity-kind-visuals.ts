import {
  Building2,
  CalendarRange,
  Dog,
  MapPin,
  Scroll,
  ScrollText,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { EntityKind } from '#/definitions/kind'

type EntityKindVisual = {
  icon: LucideIcon
  accentClassName: string
  hoverClassName: string
}

export const ENTITY_KIND_VISUALS: Record<EntityKind, EntityKindVisual> = {
  session: {
    icon: ScrollText,
    accentClassName: 'text-blue-600 dark:text-blue-300',
    hoverClassName:
      'hover:border-blue-300 hover:bg-blue-50/70 focus-visible:ring-blue-500/40 dark:hover:border-blue-800 dark:hover:bg-blue-950/20',
  },
  event: {
    icon: CalendarRange,
    accentClassName: 'text-amber-600 dark:text-amber-300',
    hoverClassName:
      'hover:border-amber-300 hover:bg-amber-50/70 focus-visible:ring-amber-500/40 dark:hover:border-amber-800 dark:hover:bg-amber-950/20',
  },
  location: {
    icon: MapPin,
    accentClassName: 'text-emerald-600 dark:text-emerald-300',
    hoverClassName:
      'hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:ring-emerald-500/40 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20',
  },
  npc: {
    icon: Users,
    accentClassName: 'text-violet-600 dark:text-violet-300',
    hoverClassName:
      'hover:border-violet-300 hover:bg-violet-50/70 focus-visible:ring-violet-500/40 dark:hover:border-violet-800 dark:hover:bg-violet-950/20',
  },
  beast: {
    icon: Dog,
    accentClassName: 'text-orange-600 dark:text-orange-300',
    hoverClassName:
      'hover:border-orange-300 hover:bg-orange-50/70 focus-visible:ring-orange-500/40 dark:hover:border-orange-800 dark:hover:bg-orange-950/20',
  },
  pc: {
    icon: User,
    accentClassName: 'text-cyan-600 dark:text-cyan-300',
    hoverClassName:
      'hover:border-cyan-300 hover:bg-cyan-50/70 focus-visible:ring-cyan-500/40 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20',
  },
  quest: {
    icon: Scroll,
    accentClassName: 'text-rose-600 dark:text-rose-300',
    hoverClassName:
      'hover:border-rose-300 hover:bg-rose-50/70 focus-visible:ring-rose-500/40 dark:hover:border-rose-800 dark:hover:bg-rose-950/20',
  },
  organization: {
    icon: Building2,
    accentClassName: 'text-teal-600 dark:text-teal-300',
    hoverClassName:
      'hover:border-teal-300 hover:bg-teal-50/70 focus-visible:ring-teal-500/40 dark:hover:border-teal-800 dark:hover:bg-teal-950/20',
  },
}
