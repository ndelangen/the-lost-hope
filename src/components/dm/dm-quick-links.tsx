import { Link } from '@tanstack/react-router'
import { BookOpen, LayoutDashboard, ScrollText, Swords, Users } from 'lucide-react'

import { entityHref, sortedSessions } from '#/lib/campaign'

const linkClass =
  'border-border hover:bg-muted flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm'

/** Shortcuts the DM keeps within reach on every DM page. */
export function DmQuickLinks() {
  const latestSession = sortedSessions()[0]
  return (
    <nav aria-label="DM shortcuts" className="flex flex-wrap gap-2 lg:flex-col">
      <Link to="/dm" className={linkClass}>
        <LayoutDashboard className="size-4" /> Dashboard
      </Link>
      <Link to="/dm/scenes" className={linkClass}>
        <Swords className="size-4" /> Scenes
      </Link>
      <Link to="/dm/arcs" className={linkClass}>
        <BookOpen className="size-4" /> Arcs
      </Link>
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
