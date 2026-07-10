import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { entityLink, type EntityKind } from '#/lib/campaign'
import { cn } from '#/lib/utils'

export function EntityReference({
  kind,
  slug,
  label,
  icon,
  tooltip,
  className,
  onNavigate,
}: {
  kind: EntityKind
  slug: string
  label: string
  icon: ReactNode
  tooltip: ReactNode
  className?: string
  onNavigate?: () => void
}) {
  return (
    <span className="group/reference relative inline-flex align-baseline">
      <Link
        {...entityLink(kind, slug)}
        onClick={onNavigate}
        className={cn(
          'text-primary inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline',
          className,
        )}
      >
        {icon}
        <span>{label}</span>
      </Link>
      <span
        role="tooltip"
        className="border-border bg-card text-foreground pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-50 flex w-max max-w-[220px] scale-95 flex-col gap-1 rounded-lg border px-3 py-2 text-xs opacity-0 shadow-lg transition-all duration-150 group-focus-within/reference:scale-100 group-focus-within/reference:opacity-100 group-hover/reference:scale-100 group-hover/reference:opacity-100"
      >
        {tooltip}
      </span>
    </span>
  )
}
