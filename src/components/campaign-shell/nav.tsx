import { Link } from '@tanstack/react-router'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { EntityKindPill } from '#/components/entity-kind-pill'
import { EntityReference } from '#/components/entity-reference'
import { Avatar } from '#/components/ui/avatar'
import { Inline, Stack } from '#/components/ui/layout'
import { COLLECTION_LABELS, collectionTo, type EntityKind } from '#/lib/campaign'
import { cn } from '#/lib/utils'

import type { SidebarCollection } from './sidebar-data'

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
        'block rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      <Inline as="span" inline gap="sm" justify={collapsed ? 'center' : 'start'}>
        {children}
      </Inline>
    </Link>
  )
}

type EntityNavRowProps = {
  kind: EntityKind
  slug: string
  name: string
  active: boolean
  avatar?: string
  meta?: string
  onNavigate?: () => void
}

export function EntityNavRow({
  kind,
  slug,
  name,
  active,
  avatar,
  meta,
  onNavigate,
}: EntityNavRowProps) {
  return (
    <li>
      <EntityReference
        kind={kind}
        slug={slug}
        label={name}
        onNavigate={onNavigate}
        previewSide="right"
        wrapperClassName="block"
        unstyled
        className={cn(
          'block truncate rounded-md px-2 py-1 text-sm transition-colors',
          active
            ? 'bg-accent font-medium text-accent-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        {() => (
          <Inline as="span" justify="between" gap="sm">
            <Inline as="span" gap="sm" className="min-w-0">
              {avatar ? <Avatar src={avatar} className="size-5" /> : null}
              <span className="min-w-0 truncate">{name}</span>
            </Inline>
            {meta ? (
              <span className="text-muted-foreground/80 max-w-20 shrink-0 truncate text-[10px] font-medium">
                {meta}
              </span>
            ) : null}
          </Inline>
        )}
      </EntityReference>
    </li>
  )
}

export function EntityNavCollection({
  collection,
  expanded,
  onToggle,
  expandedItems,
  onToggleItem,
  activeKind,
  activeSlug,
  onNavigate,
}: {
  collection: SidebarCollection
  expanded: boolean
  onToggle: () => void
  expandedItems: ReadonlySet<string>
  onToggleItem: (id: string) => void
  activeKind?: EntityKind
  activeSlug?: string
  onNavigate?: () => void
}) {
  const { kind, icon, count, groups } = collection

  return (
    <Stack gap="sm">
      <SectionHeader
        kind={kind}
        icon={icon}
        count={count}
        sticky
        expanded={expanded}
        onToggle={onToggle}
        onNavigate={onNavigate}
      />
      {expanded ? (
        <Stack as="ul" gap="3xs">
          {groups.map((group) => {
            const expansionId = group.expansionId
            const groupExpanded = group.expansionId ? expandedItems.has(group.expansionId) : true
            return (
              <Stack as="li" gap="3xs" key={group.id}>
                {group.label ? (
                  expansionId ? (
                    <button
                      type="button"
                      onClick={() => onToggleItem(expansionId)}
                      aria-label={`${groupExpanded ? 'Collapse' : 'Expand'} ${group.label}`}
                      className="text-muted-foreground hover:text-foreground w-full px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase"
                      aria-expanded={groupExpanded}
                    >
                      <Inline as="span" justify="between" gap="2xs">
                        <Inline as="span" gap="2xs">
                          {groupExpanded ? (
                            <ChevronDown className="size-3" />
                          ) : (
                            <ChevronRight className="size-3" />
                          )}
                          {group.label}
                        </Inline>
                      </Inline>
                    </button>
                  ) : (
                    <Inline
                      as="p"
                      justify="between"
                      gap="sm"
                      className="text-muted-foreground px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase"
                    >
                      {group.label}
                    </Inline>
                  )
                ) : null}
                {groupExpanded ? (
                  <Stack as="ul" gap="3xs">
                    {group.items.map((item) => (
                      <EntityNavRow
                        key={item.slug}
                        kind={kind}
                        slug={item.slug}
                        name={item.name}
                        avatar={item.avatar}
                        meta={item.meta}
                        active={activeKind === kind && activeSlug === item.slug}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </Stack>
                ) : null}
              </Stack>
            )
          })}
          <li>
            <Link
              to={collectionTo(kind)}
              className="text-primary block px-2 py-1 text-xs hover:underline"
              onClick={onNavigate}
            >
              Browse all →
            </Link>
          </li>
        </Stack>
      ) : null}
    </Stack>
  )
}

type SectionHeaderProps = {
  kind: EntityKind
  icon: LucideIcon
  count?: number
  sticky?: boolean
  expanded?: boolean
  onToggle?: () => void
  collapsed?: boolean
  onNavigate?: () => void
}

export function SectionHeader({
  kind,
  icon: Icon,
  count,
  sticky,
  expanded,
  onToggle,
  collapsed,
  onNavigate,
}: SectionHeaderProps) {
  const label = COLLECTION_LABELS[kind]

  if (collapsed) {
    return (
      <Link
        to={collectionTo(kind)}
        onClick={onNavigate}
        className="text-muted-foreground hover:text-foreground hover:bg-muted block rounded-md py-2 transition-colors"
        title={label}
      >
        <Inline as="span" inline gap="none" justify="center">
          <Icon className="text-muted-foreground size-4" />
        </Inline>
      </Link>
    )
  }

  return (
    <Inline
      gap="2xs"
      className={cn(
        'text-muted-foreground px-1 text-xs font-semibold tracking-wider uppercase',
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
      <Link
        to={collectionTo(kind)}
        onClick={onNavigate}
        className="hover:text-foreground hover:bg-muted block w-full min-w-0 rounded-md px-1 py-0.5 transition-colors"
      >
        <Inline as="span" justify="between" gap="sm">
          <Inline as="span" gap="sm">
            <Icon className="size-3.5" />
            <span>{label}</span>
          </Inline>
          {count !== undefined ? <EntityKindPill kind={kind}>{count}</EntityKindPill> : null}
        </Inline>
      </Link>
    </Inline>
  )
}
