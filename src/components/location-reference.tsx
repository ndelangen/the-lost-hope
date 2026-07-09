import { Link } from '@tanstack/react-router'

import { entityLink, getEntity, locationParent, locationTypeOf } from '#/lib/campaign'
import { LocationIcon, LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'
import { cn } from '#/lib/utils'

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
    <span className="group/locref relative inline-flex align-baseline">
      <Link
        {...entityLink('location', slug)}
        onClick={onNavigate}
        className={cn(
          'text-primary inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline',
          className,
        )}
      >
        <LocationIcon icon={location?.icon} className="size-3.5" />
        <span>{name}</span>
      </Link>
      <span
        role="tooltip"
        className="border-border bg-card text-foreground pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-50 flex w-max max-w-[220px] scale-95 flex-col gap-1 rounded-lg border px-3 py-2 text-xs opacity-0 shadow-lg transition-all duration-150 group-focus-within/locref:scale-100 group-focus-within/locref:opacity-100 group-hover/locref:scale-100 group-hover/locref:opacity-100"
      >
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
      </span>
    </span>
  )
}
