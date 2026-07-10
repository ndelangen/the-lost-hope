import { EntityReference } from '#/components/ui/entity-reference'
import { getEntity, locationParent, locationTypeOf } from '#/lib/campaign'
import { LocationIcon, LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'

/**
 * The single, canonical way to reference a location anywhere in the UI: its icon
 * plus name, linking to the detail page, with a hover/focus popover showing the
 * location's type and parent. Use this instead of a bare `<Link>` for every
 * location mention so references stay visually consistent.
 */
export function LocationReference({
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
  const location = getEntity('location', slug)?.data
  const type = location ? locationTypeOf(location) : undefined
  const parent = location ? locationParent(location) : undefined
  const name = label ?? location?.name ?? slug

  return (
    <EntityReference
      kind="location"
      slug={slug}
      label={name}
      icon={<LocationIcon icon={location?.icon} className="size-3.5" />}
      className={className}
      onNavigate={onNavigate}
      tooltip={
        <>
          <span className="flex items-center gap-1.5 font-medium">
            {type ? (
              <>
                <LocationTypeIcon type={type} className="size-3.5" />
                {locationTypeLabel(type)}
              </>
            ) : (
              'Location'
            )}
          </span>
          {parent ? (
            <span className="text-muted-foreground flex items-center gap-1.5">
              <LocationIcon icon={parent.icon} className="size-3" />
              in {parent.name}
            </span>
          ) : null}
        </>
      }
    />
  )
}
