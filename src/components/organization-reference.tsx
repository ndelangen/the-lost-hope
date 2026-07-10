import { EntityReference } from '#/components/ui/entity-reference'
import { contentToText, getEntity } from '#/lib/campaign'
import { OrganizationIcon } from '#/lib/organization-icons'

/**
 * The single, canonical way to reference an organization anywhere in the UI: its
 * icon plus name, linking to the detail page, with a hover/focus popover showing
 * the organization's notes. Mirrors {@link LocationReference} so entity
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
  const notes = organization?.notes ? contentToText(organization.notes) : undefined

  return (
    <EntityReference
      kind="organization"
      slug={slug}
      label={name}
      icon={<OrganizationIcon icon={organization?.icon} className="size-3.5" />}
      className={className}
      onNavigate={onNavigate}
      tooltip={
        <>
          <span className="flex items-center gap-1.5 font-medium">
            <OrganizationIcon icon={organization?.icon} className="size-3.5" />
            Organization
          </span>
          {notes ? <span className="text-muted-foreground">{notes}</span> : null}
        </>
      }
    />
  )
}
