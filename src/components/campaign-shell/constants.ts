import { BookOpen, Building2, MapPin, Scroll, ScrollText, User, Users } from 'lucide-react'
import type { ComponentType } from 'react'

import type { EntityKind } from '#/lib/campaign'

export const ICONS: Record<EntityKind, ComponentType<{ className?: string }>> = {
  session: ScrollText,
  event: BookOpen,
  location: MapPin,
  npc: Users,
  pc: User,
  quest: Scroll,
  organization: Building2,
}

export const SIDEBAR_COLLECTIONS = [
  'pc',
  'npc',
  'location',
  'quest',
  'organization',
] as const satisfies EntityKind[]

export type SidebarCollection = (typeof SIDEBAR_COLLECTIONS)[number]

export const STORAGE_KEYS = {
  expandedSessions: 'dag:sidebar:expanded-sessions',
  expandedCollections: 'dag:sidebar:expanded-collections',
  sidebarCollapsed: 'dag:sidebar:collapsed',
  formerPcsExpanded: 'dag:sidebar:former-pcs',
} as const

export function formatDayDate(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
