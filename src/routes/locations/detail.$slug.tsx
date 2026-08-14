import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { ImageViewer } from '#/components/image-viewer'
import {
  HIERARCHY_MAP_VARIANTS,
  HIERARCHY_MAP_VARIANT_LABELS,
  LocationHierarchyMapsPrototype,
  type HierarchyMapVariant,
} from '#/components/location-hierarchy-maps.prototype'
import { LocationReference } from '#/components/location-reference'
import { PrototypeSwitcher } from '#/components/prototype-switcher'
import { Inline, Stack } from '#/components/ui/layout'
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
import { LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'
import { publicEntityPageHead } from '#/lib/public-page-metadata'

export const Route = createFileRoute('/locations/detail/$slug')({
  validateSearch: (search: Record<string, unknown>) => ({
    variant: ['A', 'B', 'C'].includes(String(search.variant))
      ? (search.variant as HierarchyMapVariant)
      : 'A',
  }),
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
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const entity = Route.useLoaderData()

  const location = entity.data
  const ancestors = locationAncestors(location)
  const parent = locationParent(location)
  const siblings = parent ? locationChildren(parent.slug) : []
  const children = locationChildren(slug)
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

  const setVariant = (variant: HierarchyMapVariant) => {
    void navigate({
      search: (current) => ({ ...current, variant }),
      replace: true,
      resetScroll: false,
    })
  }

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
        <LocationHierarchyMapsPrototype
          variant={search.variant}
          location={location}
          parent={parent}
          siblings={siblings}
          childLocations={children}
          about={about}
        />
      </Stack>
      <PrototypeSwitcher
        variants={HIERARCHY_MAP_VARIANTS}
        current={search.variant}
        labels={HIERARCHY_MAP_VARIANT_LABELS}
        onChange={setVariant}
      />
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
