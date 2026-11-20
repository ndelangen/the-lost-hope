import { Link } from '@tanstack/react-router'
import { BookOpen, LayoutDashboard, ScrollText, Swords, Sword, UserPlus, Users } from 'lucide-react'

import { entityHref, sortedSessions } from '#/lib/campaign'
import { cn } from '#/lib/utils'

const linkClass =
  'border-border hover:bg-muted flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm'

/**
 * Shortcuts the DM keeps within reach on every DM page. They stack into a side column from
 * `stackAt`, or stay one wrapping row on pages that need the full width.
 */
export function DmQuickLinks({ stackAt = 'lg' }: { stackAt?: 'lg' | 'xl' | 'never' }) {
  const latestSession = sortedSessions()[0]
  return (
    <nav
      aria-label="DM shortcuts"
      className={cn(
        'flex flex-wrap gap-2',
        stackAt === 'lg' && 'lg:flex-col',
        stackAt === 'xl' && 'xl:flex-col',
      )}
    >
      <Link to="/dm" className={linkClass}>
        <LayoutDashboard className="size-4" /> Dashboard
      </Link>
      <Link to="/dm/scenes" className={linkClass}>
        <Swords className="size-4" /> Scenes
      </Link>
      <Link to="/dm/arcs" className={linkClass}>
        <BookOpen className="size-4" /> Arcs
      </Link>
      <Link to="/dm/encounter" className={linkClass}>
        <Sword className="size-4" /> Encounters
      </Link>
      {import.meta.env.DEV ? (
        <Link to="/dm/npcs/new" className={linkClass}>
          <UserPlus className="size-4" /> New NPC
        </Link>
      ) : null}
      <Link to="/pcs" className={linkClass}>
        <Users className="size-4" /> PCs
      </Link>
      {latestSession ? (
        <a href={entityHref('session', latestSession.slug)} className={linkClass}>
          <ScrollText className="size-4" /> Session {latestSession.data.number}
        </a>
      ) : null}
    </nav>
  )
}
