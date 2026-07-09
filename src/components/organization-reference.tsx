import { Link } from '@tanstack/react-router'

import { contentToText, entityLink, getEntity } from '#/lib/campaign'
import { OrganizationIcon } from '#/lib/organization-icons'
import { cn } from '#/lib/utils'

/**
 * The single, canonical way to reference an organization anywhere in the UI: its
 * icon plus name, linking to the detail page, with a hover/focus popover showing
 * the organization's summary. Mirrors {@link LocationReference} so entity
 * mentions stay visually consistent across kinds.
 */
export function OrganizationReference({
  slug,
  label,
  className,
  onNavigate,
}: {
  slug: string
  label?: string
  className?: string
  onNavigate?: () => void
}) {
  const organization = getEntity('organization', slug)?.data
  const name = label ?? organization?.name ?? slug
  const summary = organization?.summary ? contentToText(organization.summary) : undefined

  return (
    <span className="group/orgref relative inline-flex align-baseline">
      <Link
        {...entityLink('organization', slug)}
        onClick={onNavigate}
        className={cn(
          'text-primary inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline',
          className,
        )}
      >
        <OrganizationIcon icon={organization?.icon} className="size-3.5" />
        <span>{name}</span>
      </Link>
      <span
        role="tooltip"
        className="border-border bg-card text-foreground pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-50 flex w-max max-w-[220px] scale-95 flex-col gap-1 rounded-lg border px-3 py-2 text-xs opacity-0 shadow-lg transition-all duration-150 group-focus-within/orgref:scale-100 group-focus-within/orgref:opacity-100 group-hover/orgref:scale-100 group-hover/orgref:opacity-100"
      >
        <span className="flex items-center gap-1.5 font-medium">
          <OrganizationIcon icon={organization?.icon} className="size-3.5" />
          Organization
        </span>
        {summary ? <span className="text-muted-foreground">{summary}</span> : null}
      </span>
    </span>
  )
}
