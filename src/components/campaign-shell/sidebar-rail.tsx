import { Link } from '@tanstack/react-router'
import { BookOpen, BookOpenText, Clock, Home, ScrollText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { SessionReference } from '#/components/session-reference'
import { HoverPreview } from '#/components/ui/hover-preview'
import { COLLECTION_LABELS, collectionTo, sortedSessions, type EntityKind } from '#/lib/campaign'
import { cn } from '#/lib/utils'

import { sidebarCollections } from './sidebar-data'

/** One square of the rail: the same size and place for every entry, so the icons form a column. */
const TILE =
  'focus-visible:ring-ring/50 flex size-12 items-center justify-center rounded-lg transition-colors outline-none focus-visible:ring-3 [&_svg]:size-5'

function tile(active: boolean) {
  return cn(
    TILE,
    active
      ? 'bg-accent text-accent-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  )
}

/**
 * The navigation folded down to icons: one column of equal squares, each named on hover and
 * focus, with a line between the groups the open sidebar shows under headings.
 */
export function SidebarRail({
  pathname,
  activeKind,
  onNavigate,
}: {
  pathname: string
  activeKind?: EntityKind
  onNavigate?: () => void
}) {
  const currentSession = sortedSessions()[0]

  return (
    <nav aria-label="Campaign" className="grid justify-items-center gap-1">
      <RailLink
        to="/"
        label="Overview"
        icon={Home}
        active={pathname === '/'}
        onNavigate={onNavigate}
      />
      <RailLink
        to="/intro"
        label="Campaign intro"
        icon={BookOpen}
        active={pathname === '/intro'}
        onNavigate={onNavigate}
      />
      <RailLink
        to="/novel"
        label="Novel"
        icon={BookOpenText}
        active={pathname === '/novel'}
        onNavigate={onNavigate}
      />
      {currentSession ? (
        <SessionReference
          slug={currentSession.slug}
          previewSide="right"
          unstyled
          className={tile(false)}
          onNavigate={onNavigate}
        >
          {({ label }) => (
            <>
              <Clock aria-hidden />
              <span className="sr-only">Now: {label}</span>
            </>
          )}
        </SessionReference>
      ) : null}

      <RailDivider />
      <RailLink
        to={collectionTo('session')}
        label={COLLECTION_LABELS.session}
        icon={ScrollText}
        active={activeKind === 'session' || activeKind === 'event'}
        onNavigate={onNavigate}
      />

      <RailDivider />
      {sidebarCollections.map(({ kind, icon }) => (
        <RailLink
          key={kind}
          to={collectionTo(kind)}
          label={COLLECTION_LABELS[kind]}
          icon={icon}
          active={activeKind === kind}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
}

function RailLink({
  to,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  to: string
  label: string
  icon: LucideIcon
  active: boolean
  onNavigate?: () => void
}) {
  return (
    <RailTip label={label}>
      <Link
        to={to}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        onClick={onNavigate}
        className={tile(active)}
      >
        <Icon aria-hidden />
      </Link>
    </RailTip>
  )
}

/** The entry's name beside its icon, straight away on hover or focus. */
function RailTip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <HoverPreview side="right" content={<span className="text-sm font-medium">{label}</span>}>
      {children}
    </HoverPreview>
  )
}

function RailDivider() {
  return <hr className="border-border my-1 w-8" />
}
