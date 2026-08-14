import { createFileRoute, notFound } from '@tanstack/react-router'
import { useCallback } from 'react'
import { z } from 'zod'

import { AvatarViewer } from '#/components/avatar-viewer'
import { ContentRenderer } from '#/components/content-renderer'
import { EntityCorrectionSubmission } from '#/components/entity-correction-submission'
import { EntityDetail } from '#/components/entity-page'
import { LocationReference } from '#/components/location-reference'
import { LocationMapImage } from '#/components/map-placeholder'
import {
  PrototypeSwitcher,
  type PrototypeIllustrationState,
  type PrototypeVariantKey,
} from '#/components/prototype-switcher'
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
import { cn } from '#/lib/utils'

const PROTOTYPE_VARIANTS = [
  { key: 'A', label: 'Portrait header' },
  { key: 'B', label: 'Cinematic lead' },
  { key: 'C', label: 'Illustrated atlas' },
] as const

const prototypeSearchSchema = z.object({
  variant: z.enum(['A', 'B', 'C']).optional().catch(undefined),
  art: z.enum(['illustrated', 'placeholder']).optional().catch(undefined),
})

const ILLUSTRATION_STAND_IN =
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85'
const PLACEHOLDER_STAND_IN =
  'https://placehold.co/1200x1200/1c1917/c8a969?text=Location+illustration+forthcoming'

export const Route = createFileRoute('/locations/detail/$slug')({
  loader: ({ params }) => {
    const entity = getEntity('location', params.slug)
    if (!entity) throw notFound()
    return entity
  },
  head: ({ params }) => publicEntityPageHead('location', params.slug),
  validateSearch: prototypeSearchSchema,
  component: LocationDetailPage,
})

function LocationDetailPage() {
  const { slug } = Route.useParams()
  const entity = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const location = entity.data
  const ancestors = locationAncestors(location)
  const children = locationChildren(slug)
  const coordinates = locationAbsolutePosition(location)
  const locationType = locationTypeOf(location)
  const variant = search.variant ?? 'A'
  const illustrationState = search.art ?? 'illustrated'

  const setVariant = useCallback(
    (nextVariant: PrototypeVariantKey) => {
      void navigate({
        search: (current) => ({
          ...current,
          variant: nextVariant === 'A' ? undefined : nextVariant,
        }),
        replace: true,
        resetScroll: false,
      })
    },
    [navigate],
  )

  const setIllustrationState = useCallback(
    (nextState: PrototypeIllustrationState) => {
      void navigate({
        search: (current) => ({
          ...current,
          art: nextState === 'illustrated' ? undefined : nextState,
        }),
        replace: true,
        resetScroll: false,
      })
    },
    [navigate],
  )

  const headerContext =
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

  const headerContent = (
    <Stack gap="sm">
      {location.aliases?.length ? (
        <p className="text-muted-foreground text-sm">Also known as {location.aliases.join(', ')}</p>
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
  )

  const placesWithin =
    children.length > 0 ? (
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
    ) : null

  const commonDetailProps = {
    kind: 'location' as const,
    title: location.name,
    headerContext,
    headerContent,
    correction: <EntityCorrectionSubmission entity={entity} />,
    referencedBy: referencedByItems('location' as const, slug),
  }

  const map = (
    <LocationMapImage src={location.map?.url ?? ''} alt={location.name} coordinates={coordinates} />
  )

  const page =
    variant === 'A' ? (
      <EntityDetail
        {...commonDetailProps}
        visual={{
          variant: 'avatar',
          content: (
            <PrototypeIllustration
              name={location.name}
              state={illustrationState}
              className="size-full"
            />
          ),
        }}
      >
        <Stack gap="2xl">
          <Stack as="section" gap="md">
            <SectionLabel>Map</SectionLabel>
            {map}
          </Stack>
          {placesWithin}
          {location.notes ? <ContentRenderer content={location.notes} /> : null}
        </Stack>
      </EntityDetail>
    ) : variant === 'B' ? (
      <EntityDetail {...commonDetailProps} visual={false}>
        <Stack gap="2xl">
          <Stack as="section" gap="md">
            <Inline justify="between" wrap>
              <SectionLabel>Location illustration</SectionLabel>
              <PrototypeAssetNote state={illustrationState} />
            </Inline>
            <PrototypeIllustration
              name={location.name}
              state={illustrationState}
              className="aspect-[16/7] min-h-64 w-full"
            />
          </Stack>

          <Grid gap="2xl" lgTemplate="content-aside" align="start">
            <Stack as="section" gap="md">
              <SectionLabel>About this place</SectionLabel>
              {location.notes ? (
                <ContentRenderer content={location.notes} />
              ) : (
                <p className="text-muted-foreground text-sm">No description recorded yet.</p>
              )}
            </Stack>
            <Stack as="section" gap="md">
              <SectionLabel>Map</SectionLabel>
              {map}
            </Stack>
          </Grid>
          {placesWithin}
        </Stack>
      </EntityDetail>
    ) : (
      <EntityDetail
        {...commonDetailProps}
        visual={{
          variant: 'icon',
          content: <LocationIcon icon={location.icon} className="size-10" />,
        }}
      >
        <Stack gap="2xl">
          <Grid gap="xl" lgTemplate={2} align="start">
            <Stack as="section" gap="md">
              <Inline justify="between" wrap>
                <SectionLabel>Illustration</SectionLabel>
                <PrototypeAssetNote state={illustrationState} />
              </Inline>
              <PrototypeIllustration
                name={location.name}
                state={illustrationState}
                className="aspect-[4/3] w-full"
              />
            </Stack>
            <Stack as="section" gap="md">
              <SectionLabel>Map</SectionLabel>
              {map}
            </Stack>
          </Grid>
          {placesWithin}
          {location.notes ? <ContentRenderer content={location.notes} /> : null}
        </Stack>
      </EntityDetail>
    )

  return (
    <>
      {page}
      <PrototypeSwitcher
        variants={PROTOTYPE_VARIANTS}
        current={variant}
        illustrationState={illustrationState}
        onVariantChange={setVariant}
        onIllustrationStateChange={setIllustrationState}
      />
    </>
  )
}

function PrototypeIllustration({
  name,
  state,
  className,
}: {
  name: string
  state: PrototypeIllustrationState
  className?: string
}) {
  const src = state === 'illustrated' ? ILLUSTRATION_STAND_IN : PLACEHOLDER_STAND_IN

  return (
    <div className={cn('relative overflow-hidden rounded-2xl', className)}>
      <AvatarViewer src={src} name={name} eyebrow="Location illustration" />
      <span className="pointer-events-none absolute top-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
        Prototype stand-in
      </span>
    </div>
  )
}

function PrototypeAssetNote({ state }: { state: PrototypeIllustrationState }) {
  return (
    <span className="text-muted-foreground text-xs">
      {state === 'illustrated' ? 'Artwork supplied' : 'Dedicated fallback'}
    </span>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
      {children}
    </h2>
  )
}
