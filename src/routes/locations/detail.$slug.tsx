import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import { LocationReference } from '#/components/location-reference'
import { LocationMapImage } from '#/components/map-placeholder'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { DEFAULT_LOCATION_ILLUSTRATION } from '#/definitions/media'
import {
  getEntity,
  locationAbsolutePosition,
  locationAncestors,
  locationChildren,
  locationTypeOf,
} from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'
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
  const illustrationAlt =
    location.illustration === DEFAULT_LOCATION_ILLUSTRATION
      ? `Location illustration forthcoming for ${location.name}`
      : `Illustration of ${location.name}`

  return (
    <EntityDetail
      kind="location"
      title={location.name}
      visual={false}
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
        <Stack as="section" gap="md" data-location-section="illustration">
          <SectionLabel>Location illustration</SectionLabel>
          <ImageViewer
            src={location.illustration}
            alt={illustrationAlt}
            title={location.name}
            eyebrow="Location illustration"
            accessibleLabel={`illustration of ${location.name}`}
            className="aspect-[16/7] min-h-64 w-full"
          />
        </Stack>
        <Grid gap="2xl" lgTemplate="content-aside" align="start">
          <Stack as="section" gap="md" data-location-section="about">
            <SectionLabel>About this place</SectionLabel>
            {location.notes ? (
              <ContentRenderer content={location.notes} />
            ) : (
              <p className="text-muted-foreground text-sm">No description recorded yet.</p>
            )}
          </Stack>
          <Stack as="aside" gap="md" data-location-section="map">
            <SectionLabel>Map</SectionLabel>
            <LocationMapImage
              src={location.map?.url ?? ''}
              alt={location.name}
              coordinates={coordinates}
            />
          </Stack>
        </Grid>
        {children.length > 0 ? (
          <Stack as="section" gap="md">
            <SectionLabel>Places within</SectionLabel>
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
      </Stack>
    </EntityDetail>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
      {children}
    </h2>
  )
}
