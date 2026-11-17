import type { EntityRef } from '#/definitions/kind'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { LocationIcon } from '#/lib/location-icons'
import { cn } from '#/lib/utils'

const locations = SOURCE_REGISTRIES.location as Record<string, { name: string; icon?: string }>

/** Where something happens as a compact breadcrumb, Skynet › Second-Best Inn, including unmet places. */
export function DmPlaceTrail({
  trail,
  className,
}: {
  trail: readonly EntityRef<'location'>[]
  className?: string
}) {
  const last = trail.at(-1)
  if (!last) return null
  return (
    <span className={cn('inline-flex min-w-0 items-center gap-1', className)}>
      <LocationIcon icon={locations[last.key]?.icon} />
      <span className="truncate">
        {trail.map((step) => locations[step.key]?.name ?? step.key).join(' › ')}
      </span>
    </span>
  )
}
