import {
  Building2,
  CalendarRange,
  Dog,
  MapPin,
  Package,
  Scroll,
  ScrollText,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { EntityKind } from '#/definitions/kind'

export type EntityKindColor =
  | 'blue'
  | 'amber'
  | 'emerald'
  | 'violet'
  | 'orange'
  | 'cyan'
  | 'rose'
  | 'teal'
  | 'fuchsia'

export type EntityKindVisual = {
  color: EntityKindColor
  icon: LucideIcon
  accentClassName: string
  pillClassName: string
  borderClassName: string
  surfaceClassName: string
  ringClassName: string
  hoverClassName: string
}

export const ENTITY_KIND_VISUALS: Record<EntityKind, EntityKindVisual> = {
  session: {
    color: 'blue',
    icon: ScrollText,
    accentClassName: 'text-blue-600 dark:text-blue-300',
    pillClassName: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
    borderClassName: 'border-blue-300/80 dark:border-blue-800',
    surfaceClassName: 'bg-blue-50/60 dark:bg-blue-950/20',
    ringClassName: 'ring-blue-500/40',
    hoverClassName:
      'hover:border-blue-300 hover:bg-blue-50/70 focus-visible:ring-blue-500/40 dark:hover:border-blue-800 dark:hover:bg-blue-950/20',
  },
  event: {
    color: 'amber',
    icon: CalendarRange,
    accentClassName: 'text-amber-600 dark:text-amber-300',
    pillClassName: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
    borderClassName: 'border-amber-300/80 dark:border-amber-300/40',
    surfaceClassName: 'bg-amber-50/60 dark:bg-amber-950/20',
    ringClassName: 'ring-amber-500/40',
    hoverClassName:
      'hover:border-amber-300 hover:bg-amber-50/70 focus-visible:ring-amber-500/40 dark:hover:border-amber-800 dark:hover:bg-amber-950/20',
  },
  location: {
    color: 'emerald',
    icon: MapPin,
    accentClassName: 'text-emerald-600 dark:text-emerald-300',
    pillClassName: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    borderClassName: 'border-emerald-300/80 dark:border-emerald-800',
    surfaceClassName: 'bg-emerald-50/60 dark:bg-emerald-950/20',
    ringClassName: 'ring-emerald-500/40',
    hoverClassName:
      'hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:ring-emerald-500/40 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20',
  },
  npc: {
    color: 'violet',
    icon: Users,
    accentClassName: 'text-violet-600 dark:text-violet-300',
    pillClassName: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
    borderClassName: 'border-violet-300/80 dark:border-violet-800',
    surfaceClassName: 'bg-violet-50/60 dark:bg-violet-950/20',
    ringClassName: 'ring-violet-500/40',
    hoverClassName:
      'hover:border-violet-300 hover:bg-violet-50/70 focus-visible:ring-violet-500/40 dark:hover:border-violet-800 dark:hover:bg-violet-950/20',
  },
  beast: {
    color: 'orange',
    icon: Dog,
    accentClassName: 'text-orange-600 dark:text-orange-300',
    pillClassName: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300',
    borderClassName: 'border-orange-300/80 dark:border-orange-800',
    surfaceClassName: 'bg-orange-50/60 dark:bg-orange-950/20',
    ringClassName: 'ring-orange-500/40',
    hoverClassName:
      'hover:border-orange-300 hover:bg-orange-50/70 focus-visible:ring-orange-500/40 dark:hover:border-orange-800 dark:hover:bg-orange-950/20',
  },
  pc: {
    color: 'cyan',
    icon: User,
    accentClassName: 'text-cyan-600 dark:text-cyan-300',
    pillClassName: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300',
    borderClassName: 'border-cyan-300/80 dark:border-cyan-800',
    surfaceClassName: 'bg-cyan-50/60 dark:bg-cyan-950/20',
    ringClassName: 'ring-cyan-500/40',
    hoverClassName:
      'hover:border-cyan-300 hover:bg-cyan-50/70 focus-visible:ring-cyan-500/40 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20',
  },
  quest: {
    color: 'rose',
    icon: Scroll,
    accentClassName: 'text-rose-600 dark:text-rose-300',
    pillClassName: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
    borderClassName: 'border-rose-300/80 dark:border-rose-800',
    surfaceClassName: 'bg-rose-50/60 dark:bg-rose-950/20',
    ringClassName: 'ring-rose-500/40',
    hoverClassName:
      'hover:border-rose-300 hover:bg-rose-50/70 focus-visible:ring-rose-500/40 dark:hover:border-rose-800 dark:hover:bg-rose-950/20',
  },
  organization: {
    color: 'teal',
    icon: Building2,
    accentClassName: 'text-teal-600 dark:text-teal-300',
    pillClassName: 'bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300',
    borderClassName: 'border-teal-300/80 dark:border-teal-800',
    surfaceClassName: 'bg-teal-50/60 dark:bg-teal-950/20',
    ringClassName: 'ring-teal-500/40',
    hoverClassName:
      'hover:border-teal-300 hover:bg-teal-50/70 focus-visible:ring-teal-500/40 dark:hover:border-teal-800 dark:hover:bg-teal-950/20',
  },
  item: {
    color: 'fuchsia',
    icon: Package,
    accentClassName: 'text-fuchsia-600 dark:text-fuchsia-300',
    pillClassName: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300',
    borderClassName: 'border-fuchsia-300/80 dark:border-fuchsia-800',
    surfaceClassName: 'bg-fuchsia-50/60 dark:bg-fuchsia-950/20',
    ringClassName: 'ring-fuchsia-500/40',
    hoverClassName:
      'hover:border-fuchsia-300 hover:bg-fuchsia-50/70 focus-visible:ring-fuchsia-500/40 dark:hover:border-fuchsia-800 dark:hover:bg-fuchsia-950/20',
  },
}
