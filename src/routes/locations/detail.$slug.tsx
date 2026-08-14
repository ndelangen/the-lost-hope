import { createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import { LocationMapLegend, LocationMapPlot } from '#/components/location-hierarchy-map'
import { LocationReference } from '#/components/location-reference'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
import { DEFAULT_LOCATION_ILLUSTRATION } from '#/definitions/media'
import {
  getEntity,
  locationAncestors,
  locationChildren,
  locationParent,
  locationTypeOf,
} from '#/lib/campaign'
import { referencedByItems } from '#/lib/entity-page-data'
import { buildLocationHierarchyMap } from '#/lib/location-hierarchy-map'
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
  const parent = locationParent(location)
  const siblings = parent ? locationChildren(parent.slug) : []
  const children = locationChildren(slug)
  const hasChildren = children.length > 0
  const contextMap = parent ? buildLocationHierarchyMap(parent, siblings, location.slug) : undefined
  const destinationMap = buildLocationHierarchyMap(location, children)
  const locationType = locationTypeOf(location)
  const illustrationAlt =
    location.illustration === DEFAULT_LOCATION_ILLUSTRATION
      ? `Location illustration forthcoming for ${location.name}`
      : `Illustration of ${location.name}`
  const about = (
    <Stack as="section" gap="md" data-location-section="about">
      <SectionLabel>About this place</SectionLabel>
      {location.notes ? (
        <ContentRenderer content={location.notes} />
      ) : (
        <p className="text-muted-foreground text-sm">No description recorded yet.</p>
      )}
    </Stack>
  )

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
        {parent && contextMap ? (
          <Grid gap="2xl" lgTemplate="content-aside" align="start">
            {about}
            <Stack
              as="aside"
              gap="md"
              className="border-border bg-background/85 rounded-xl border p-4 shadow-lg backdrop-blur-[10px] lg:relative lg:-top-24 lg:z-10 lg:mr-5"
              data-location-section="context-map"
            >
              <MapSectionHeading
                eyebrow="Where you are"
                title={`Within ${parent.name}`}
                description={`${location.name} in context with the other places recorded within ${parent.name}.`}
              />
              <LocationMapPlot map={contextMap} label={`${location.name} within ${parent.name}`} />
              <LocationMapLegend map={contextMap} currentOnly />
              <LocationReference
                slug={parent.slug}
                label={`Open ${parent.name}`}
                unstyled
                className="text-primary group inline-flex min-h-9 items-center gap-2 self-start text-sm font-medium hover:underline"
              >
                {() => (
                  <>
                    Open parent location
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </>
                )}
              </LocationReference>
            </Stack>
          </Grid>
        ) : (
          about
        )}
        <Stack
          as="section"
          gap="lg"
          className="border-border border-t pt-8"
          data-location-section="destination-map"
        >
          <Inline gap="xl" align="end" justify="between" wrap>
            <MapSectionHeading
              eyebrow={hasChildren ? 'Where you can go' : 'Location map'}
              title={hasChildren ? `Explore ${location.name}` : `Map of ${location.name}`}
              description={
                hasChildren
                  ? `Choose a place recorded directly within ${location.name}.`
                  : `No places are currently recorded within ${location.name}.`
              }
            />
            {hasChildren ? (
              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Next step ↓
              </p>
            ) : null}
          </Inline>
          <LocationMapPlot
            map={destinationMap}
            label={hasChildren ? `Places within ${location.name}` : `Map of ${location.name}`}
          />
          {hasChildren ? <LocationMapLegend map={destinationMap} compact /> : null}
        </Stack>
      </Stack>
    </EntityDetail>
  )
}

function MapSectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <Stack gap="2xs">
      <p className="text-primary text-xs font-semibold tracking-wider uppercase">{eyebrow}</p>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Stack>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
      {children}
    </h2>
  )
}
