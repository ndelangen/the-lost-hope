// PROTOTYPE — three hierarchy-map compositions, switchable via ?variant= on location details.
import type { ReactNode } from 'react'

import { LocationReference } from '#/components/location-reference'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import type { Location } from '#/definitions/location'
import type { LocationEntity } from '#/lib/campaign'
import { LocationIcon } from '#/lib/location-icons'
import { hasPublicAsset } from '#/lib/public-media'
import { cn } from '#/lib/utils'

export type HierarchyMapVariant = 'A' | 'B' | 'C'

export const HIERARCHY_MAP_VARIANTS = ['A', 'B', 'C'] as const

export const HIERARCHY_MAP_VARIANT_LABELS: Record<HierarchyMapVariant, string> = {
  A: 'Stacked atlas',
  B: 'Twin charts',
  C: 'Journey layout',
}

type MapPoint = {
  slug: string
  name: string
  icon?: string
  at: [number, number]
  current: boolean
}

type MapSpec = {
  owner: Location
  points: MapPoint[]
}

type HierarchyMapsProps = {
  variant: HierarchyMapVariant
  location: Location
  parent?: Location
  siblings: LocationEntity[]
  childLocations: LocationEntity[]
  about: ReactNode
}

function pointsFrom(entities: LocationEntity[], currentSlug?: string): MapPoint[] {
  return entities.flatMap((entity) => {
    if (!('at' in entity.data) || !entity.data.at) return []
    return [
      {
        slug: entity.slug,
        name: entity.data.name,
        icon: entity.data.icon,
        at: entity.data.at,
        current: entity.slug === currentSlug,
      },
    ]
  })
}

function MapPlot({ map, label }: { map: MapSpec; label: string }) {
  const { width, height, url } = map.owner.map
  const hasArtwork = !url.includes('placehold') && hasPublicAsset(url)

  return (
    <figure
      className={cn(
        'border-border relative aspect-[10/7] min-h-64 overflow-hidden rounded-xl border bg-amber-50/80 dark:bg-amber-950/20',
        !hasArtwork &&
          'bg-[linear-gradient(to_right,rgba(120,90,45,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,90,45,0.12)_1px,transparent_1px)] bg-[size:32px_32px]',
      )}
      aria-label={label}
      style={
        hasArtwork
          ? {
              backgroundImage: `url(${url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : undefined
      }
    >
      {map.points.map((point) => (
        <LocationReference
          key={point.slug}
          slug={point.slug}
          label={point.name}
          unstyled
          wrapperClassName="group absolute -translate-x-1/2 -translate-y-1/2"
          wrapperStyle={{
            left: `${(point.at[0] / width) * 100}%`,
            top: `${(point.at[1] / height) * 100}%`,
          }}
          className="block rounded-full focus-visible:ring-4 focus-visible:ring-sky-500/50 focus-visible:outline-none"
        >
          {() => (
            <span
              className={cn(
                'bg-background text-primary flex size-9 items-center justify-center rounded-full border-2 shadow-md transition-transform group-hover:scale-110',
                point.current ? 'border-sky-500 ring-4 ring-sky-500/30' : 'border-primary/70',
              )}
              title={point.current ? `${point.name} — You are here` : point.name}
            >
              <LocationIcon icon={point.icon} className="size-4" />
            </span>
          )}
        </LocationReference>
      ))}
      {!hasArtwork ? (
        <p className="text-muted-foreground bg-background/85 border-border absolute right-2 bottom-2 rounded border px-2 py-1 text-[10px] font-medium tracking-wider uppercase">
          Schematic map
        </p>
      ) : null}
    </figure>
  )
}

function MapLegend({ map, compact = false }: { map: MapSpec; compact?: boolean }) {
  return (
    <Stack gap="sm" className="min-w-0">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Legend</p>
      <ul className={cn('grid gap-2', compact && 'sm:grid-cols-2')}>
        {map.points.map((point) => (
          <li key={point.slug}>
            <LocationReference
              slug={point.slug}
              label={point.name}
              unstyled
              className={cn(
                'border-border hover:border-primary/50 hover:bg-accent/30 flex min-h-11 items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors',
                point.current && 'border-sky-500/50 bg-sky-500/5',
              )}
            >
              {() => (
                <>
                  <span
                    className={cn(
                      'border-primary/40 text-primary flex size-7 shrink-0 items-center justify-center rounded-full border',
                      point.current && 'border-sky-500 text-sky-600 dark:text-sky-400',
                    )}
                  >
                    <LocationIcon icon={point.icon} className="size-3.5" />
                  </span>
                  <span className="min-w-0 flex-1 font-medium">{point.name}</span>
                  {point.current ? (
                    <span className="text-[10px] font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-300">
                      You are here
                    </span>
                  ) : (
                    <span className="text-muted-foreground" aria-hidden>
                      →
                    </span>
                  )}
                </>
              )}
            </LocationReference>
          </li>
        ))}
      </ul>
    </Stack>
  )
}

function MapHeading({
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

function contextCopy(location: Location, parent: Location) {
  return {
    eyebrow: 'Where you are',
    title: `Within ${parent.name}`,
    description: `${location.name} in context with the other places recorded within ${parent.name}.`,
  }
}

function destinationCopy(location: Location) {
  return {
    eyebrow: 'Where you can go',
    title: `Explore ${location.name}`,
    description: `Choose a place recorded directly within ${location.name}.`,
  }
}

export function VariantA({
  location,
  parent,
  contextMap,
  destinationMap,
  about,
}: Omit<HierarchyMapsProps, 'variant' | 'siblings' | 'childLocations'> & {
  contextMap?: MapSpec
  destinationMap?: MapSpec
}) {
  return (
    <Stack gap="2xl">
      {about}
      {parent && contextMap ? (
        <Stack as="section" gap="lg">
          <MapHeading {...contextCopy(location, parent)} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(15rem,0.7fr)]">
            <MapPlot map={contextMap} label={`${location.name} within ${parent.name}`} />
            <MapLegend map={contextMap} />
          </div>
        </Stack>
      ) : null}
      {destinationMap ? (
        <Stack as="section" gap="lg">
          <MapHeading {...destinationCopy(location)} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(15rem,0.7fr)]">
            <MapPlot map={destinationMap} label={`Places within ${location.name}`} />
            <MapLegend map={destinationMap} />
          </div>
        </Stack>
      ) : null}
    </Stack>
  )
}

export function VariantB({
  location,
  parent,
  contextMap,
  destinationMap,
  about,
}: Omit<HierarchyMapsProps, 'variant' | 'siblings' | 'childLocations'> & {
  contextMap?: MapSpec
  destinationMap?: MapSpec
}) {
  return (
    <Stack gap="2xl">
      {about}
      <Grid gap="xl" lgTemplate={2} align="start">
        {parent && contextMap ? (
          <Stack as="section" gap="md" className="border-border rounded-2xl border p-4 sm:p-5">
            <MapHeading {...contextCopy(location, parent)} />
            <MapPlot map={contextMap} label={`${location.name} within ${parent.name}`} />
            <MapLegend map={contextMap} compact />
          </Stack>
        ) : null}
        {destinationMap ? (
          <Stack as="section" gap="md" className="border-border rounded-2xl border p-4 sm:p-5">
            <MapHeading {...destinationCopy(location)} />
            <MapPlot map={destinationMap} label={`Places within ${location.name}`} />
            <MapLegend map={destinationMap} compact />
          </Stack>
        ) : null}
      </Grid>
    </Stack>
  )
}

export function VariantC({
  location,
  parent,
  contextMap,
  destinationMap,
  about,
}: Omit<HierarchyMapsProps, 'variant' | 'siblings' | 'childLocations'> & {
  contextMap?: MapSpec
  destinationMap?: MapSpec
}) {
  return (
    <Stack gap="2xl">
      <Grid gap="2xl" lgTemplate="content-aside" align="start">
        {about}
        {parent && contextMap ? (
          <Stack as="aside" gap="md" className="border-border rounded-xl border p-4">
            <MapHeading {...contextCopy(location, parent)} />
            <MapPlot map={contextMap} label={`${location.name} within ${parent.name}`} />
            <MapLegend map={contextMap} />
          </Stack>
        ) : null}
      </Grid>
      {destinationMap ? (
        <Stack as="section" gap="lg" className="border-border border-t pt-8">
          <Inline gap="xl" align="end" justify="between" wrap>
            <MapHeading {...destinationCopy(location)} />
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Next step ↓
            </p>
          </Inline>
          <MapPlot map={destinationMap} label={`Places within ${location.name}`} />
          <MapLegend map={destinationMap} compact />
        </Stack>
      ) : null}
    </Stack>
  )
}

export function LocationHierarchyMapsPrototype({
  variant,
  location,
  parent,
  siblings,
  childLocations,
  about,
}: HierarchyMapsProps) {
  const contextMap = parent
    ? { owner: parent, points: pointsFrom(siblings, location.slug) }
    : undefined
  const destinationMap =
    childLocations.length > 0 ? { owner: location, points: pointsFrom(childLocations) } : undefined
  const props = { location, parent, contextMap, destinationMap, about }

  if (variant === 'B') return <VariantB {...props} />
  if (variant === 'C') return <VariantC {...props} />
  return <VariantA {...props} />
}
