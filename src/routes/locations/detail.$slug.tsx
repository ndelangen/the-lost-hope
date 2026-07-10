import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { LocationMapImage } from '#/components/map-placeholder'
import { Badge } from '#/components/ui/badge'
import {
  getEntity,
  locationAbsolutePosition,
  locationAncestors,
  locationChildren,
  locationTypeOf,
} from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { LocationAvatar, LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'

export const Route = createFileRoute('/locations/detail/$slug')({
  component: LocationDetailPage,
})

function LocationDetailPage() {
  const { slug } = Route.useParams()
  const entity = getEntity('location', slug)
  if (!entity) return <EntityNotFound kind="location" />

  const location = entity.data
  const ancestors = locationAncestors(location)
  const children = locationChildren(slug)
  const coordinates = locationAbsolutePosition(location)
  const locationType = locationTypeOf(location)

  return (
    <EntityDetail kind="location" referencedBy={referencedByItems('location', slug)}>
      <header className="space-y-4">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Location
        </p>
        {ancestors.length > 0 ? (
          <p className="text-muted-foreground flex flex-wrap items-center text-sm">
            {ancestors.map((ancestor, index) => (
              <span key={ancestor.slug} className="inline-flex items-center">
                {index > 0 ? <span className="mx-1.5 opacity-50">›</span> : null}
                <LocationReference slug={ancestor.slug} />
              </span>
            ))}
          </p>
        ) : null}
        <div className="flex items-center gap-4">
          <LocationAvatar icon={location.icon} />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{location.name}</h1>
            {location.aliases?.length ? (
              <p className="text-muted-foreground text-sm">
                Also known as {location.aliases.join(', ')}
              </p>
            ) : null}
            {locationType ? (
              <Badge variant="secondary" className="gap-1">
                <LocationTypeIcon type={locationType} className="size-3" />
                {locationTypeLabel(locationType, true)}
              </Badge>
            ) : null}
          </div>
        </div>
        <LocationMapImage
          src={location.map?.url ?? ''}
          alt={location.name}
          coordinates={coordinates}
        />
      </header>

      <div className="space-y-8">
        {children.length > 0 ? (
          <section className="space-y-3">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Places within
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {children.map((child) => (
                <li
                  key={child.slug}
                  className="border-border hover:border-primary/40 hover:bg-accent/20 rounded-md border px-3 py-2 text-sm transition-colors"
                >
                  <LocationReference slug={child.slug} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {location.notes ? <ContentRenderer content={location.notes} /> : null}
      </div>
    </EntityDetail>
  )
}
