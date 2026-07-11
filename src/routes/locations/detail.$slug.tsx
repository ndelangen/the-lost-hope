import { createFileRoute } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityDetail, EntityNotFound } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { LocationMapImage } from '#/components/map-placeholder'
import { Badge } from '#/components/ui/badge'
import { Grid, Inline, Stack } from '#/components/ui/layout'
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
      <Stack as="header" gap="lg">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Location
        </p>
        {ancestors.length > 0 ? (
          <Inline as="p" gap="xs" wrap className="text-muted-foreground text-sm">
            {ancestors.map((ancestor, index) => (
              <Inline as="span" inline gap="xs" key={ancestor.slug}>
                {index > 0 ? <span className="opacity-50">›</span> : null}
                <LocationReference slug={ancestor.slug} />
              </Inline>
            ))}
          </Inline>
        ) : null}
        <Inline gap="lg">
          <LocationAvatar icon={location.icon} />
          <Stack gap="sm">
            <h1 className="text-4xl font-bold tracking-tight">{location.name}</h1>
            {location.aliases?.length ? (
              <p className="text-muted-foreground text-sm">
                Also known as {location.aliases.join(', ')}
              </p>
            ) : null}
            {locationType ? (
              <Badge variant="secondary">
                <Inline as="span" inline gap="2xs">
                  <LocationTypeIcon type={locationType} className="size-3" />
                  {locationTypeLabel(locationType, true)}
                </Inline>
              </Badge>
            ) : null}
          </Stack>
        </Inline>
        <LocationMapImage
          src={location.map?.url ?? ''}
          alt={location.name}
          coordinates={coordinates}
        />
      </Stack>

      <Stack gap="2xl">
        {children.length > 0 ? (
          <Stack as="section" gap="md">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Places within
            </h2>
            <Grid as="ul" gap="sm" smColumns={2}>
              {children.map((child) => (
                <li
                  key={child.slug}
                  className="border-border hover:border-primary/40 hover:bg-accent/20 rounded-md border px-3 py-2 text-sm transition-colors"
                >
                  <LocationReference slug={child.slug} />
                </li>
              ))}
            </Grid>
          </Stack>
        ) : null}
        {location.notes ? <ContentRenderer content={location.notes} /> : null}
      </Stack>
    </EntityDetail>
  )
}
