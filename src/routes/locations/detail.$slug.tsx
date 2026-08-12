import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { LocationMapImage } from '#/components/map-placeholder'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import {
  getEntity,
  locationAbsolutePosition,
  locationAncestors,
  locationChildren,
  locationTypeOf,
} from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { LocationIcon, LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/locations/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('location', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('location', params.slug),
  component: LocationDetailPage,
})

function LocationDetailPage() {
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()

  const location = entity.data
  const ancestors = locationAncestors(location)
  const children = locationChildren(slug)
  const coordinates = locationAbsolutePosition(location)
  const locationType = locationTypeOf(location)

  return (
    <EntityDetail
      kind="location"
      title={location.name}
      visual={{
        variant: 'icon',
        content: <LocationIcon icon={location.icon} className="size-10" />,
      }}
      headerContext={
        ancestors.length > 0 ? (
          <Inline as="p" gap="xs" wrap className="text-muted-foreground text-sm">
            {ancestors.map((ancestor, index) => (
              <Inline as="span" inline gap="xs" key={ancestor.slug}>
                {index > 0 ? <span className="opacity-50">›</span> : null}
                <LocationReference slug={ancestor.slug} />
              </Inline>
            ))}
          </Inline>
        ) : null
      }
      headerContent={
        <Stack gap="sm">
          {location.aliases?.length ? (
            <p className="text-muted-foreground text-sm">
              Also known as {location.aliases.join(', ')}
            </p>
          ) : null}
          {locationType ? (
            <Pill variant="secondary">
              <Inline as="span" inline gap="2xs">
                <LocationTypeIcon type={locationType} className="size-3" />
                {locationTypeLabel(locationType, true)}
              </Inline>
            </Pill>
          ) : null}
        </Stack>
      }
      correction={<EntityCorrectionSubmission entity={entity} />}
      referencedBy={referencedByItems('location', slug)}
    >
      <Stack gap="2xl">
        <LocationMapImage
          src={location.map?.url ?? ''}
          alt={location.name}
          coordinates={coordinates}
        />
        {children.length > 0 ? (
          <Stack as="section" gap="md">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Places within
            </h2>
            <Grid as="ul" gap="sm" smTemplate={2}>
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
