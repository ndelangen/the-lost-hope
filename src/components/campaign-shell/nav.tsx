import { Link } from '@tanstack/react-router'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { entityLink, type EntityKind } from '#/lib/campaign'
import { cn } from '#/lib/utils'

type NavLinkProps = {
  to: string
  active: boolean
  title?: string
  collapsed?: boolean
  onNavigate?: () => void
  className?: string
  children: ReactNode
}

export function NavLink({
  to,
  active,
  title,
  collapsed,
  onNavigate,
  className,
  children,
}: NavLinkProps) {
  return (
    <Link
      to={to}
      title={title}
      onClick={onNavigate}
      className={cn(
        'flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
        collapsed ? 'justify-center' : 'gap-2',
        active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      {children}
    </Link>
  )
}

type EntityNavRowProps = {
  kind: EntityKind
  slug: string
  name: string
  active: boolean
  avatar?: string
  onNavigate?: () => void
}

export function EntityNavRow({ kind, slug, name, active, avatar, onNavigate }: EntityNavRowProps) {
  return (
    <li>
      <Link
        {...entityLink(kind, slug)}
        title={name}
        onClick={onNavigate}
        className={cn(
          'flex items-center gap-2 truncate rounded-md px-2 py-1 text-sm transition-colors',
          active
            ? 'bg-accent font-medium text-accent-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        {avatar ? <Avatar src={avatar} className="size-5" /> : null}
        <span className="truncate">{name}</span>
      </Link>
    </li>
  )
}

type SectionHeaderProps = {
  icon: ComponentType<{ className?: string }>
  label: string
  count?: number
  sticky?: boolean
  expanded?: boolean
  onToggle?: () => void
  collapsed?: boolean
}

export function SectionHeader({
  icon: Icon,
  label,
  count,
  sticky,
  expanded,
  onToggle,
  collapsed,
}: SectionHeaderProps) {
  if (collapsed) {
    return (
      <div className="flex justify-center py-1" title={label}>
        <Icon className="text-muted-foreground size-4" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'text-muted-foreground mb-2 flex items-center gap-2 px-2 text-xs font-semibold tracking-wider uppercase',
        // Sticks just below the group label (which pins at top-0 with height h-7).
        sticky && 'bg-background sticky top-7 z-10 py-1',
      )}
    >
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground rounded-md p-0.5"
          aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </button>
      ) : null}
      <Icon className="size-3.5" />
      <span>{label}</span>
      {count !== undefined ? (
        <Badge variant="secondary" className="ml-auto">
          {count}
        </Badge>
      ) : null}
    </div>
  )
}
