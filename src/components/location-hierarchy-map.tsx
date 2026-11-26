import { Link } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'

import { LocationReference } from '#/components/location-reference'
import { ResponsiveImage } from '#/components/responsive-image'
import { Stack } from '#/components/ui/layout'
import type { LocationHierarchyMapModel } from '#/lib/location-hierarchy-map'
import { locationMapPointLabel } from '#/lib/location-hierarchy-map'
import { LocationIcon } from '#/lib/location-icons'
import { hasPublicAsset } from '#/lib/public-media'
import { cn } from '#/lib/utils'

export function LocationMapPlot({
  map,
  label,
  overlay,
}: {
  map: LocationHierarchyMapModel
  label: string
  /** Drawn over the map, in the same box as its markers, such as a layer that places a new one. */
  overlay?: ReactNode
}) {
  const [failedSource, setFailedSource] = useState<string>()
  const { url, width, height, schematicPositions } = map.asset
  const hasArtwork = failedSource !== url && !url.includes('placehold') && hasPublicAsset(url)

  return (
    <figure aria-label={label} className="border-border overflow-hidden rounded-xl border">
      <div
        className={cn(
          'relative bg-amber-50/80 dark:bg-amber-950/20',
          !hasArtwork &&
            'bg-[linear-gradient(to_right,rgba(120,90,45,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,90,45,0.12)_1px,transparent_1px)] bg-[size:32px_32px]',
        )}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {hasArtwork ? (
          <ResponsiveImage
            src={url}
            alt=""
            width={width}
            height={height}
            sizes="auto, (min-width: 1024px) 720px, calc(100vw - 2rem)"
            loading="lazy"
            className="absolute inset-0 size-full object-contain"
            onError={() => setFailedSource(url)}
          />
        ) : null}

        {map.points.map((point) =>
          point.unmet ? (
            <Link
              key={point.id}
              to="/dm/locations/$slug"
              params={{ slug: point.slug }}
              title={`${point.name} — the party has not been here`}
              className="group absolute block -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:ring-4 focus-visible:ring-sky-500/50 focus-visible:outline-none"
              style={{ left: `${point.left}%`, top: `${point.top}%` }}
            >
              <span className="bg-background/90 text-muted-foreground flex size-9 items-center justify-center rounded-full border-2 border-dashed border-amber-500 shadow-md transition-transform group-hover:scale-110">
                <LocationIcon icon={point.icon} className="size-4" />
                <span className="sr-only">{point.name}, not yet met</span>
              </span>
            </Link>
          ) : (
            <LocationReference
              key={point.id}
              slug={point.slug}
              label={locationMapPointLabel(point)}
              unstyled
              wrapperClassName="group absolute -translate-x-1/2 -translate-y-1/2"
              wrapperStyle={{ left: `${point.left}%`, top: `${point.top}%` }}
              className="block rounded-full focus-visible:ring-4 focus-visible:ring-sky-500/50 focus-visible:outline-none"
            >
              {() => (
                <span
                  className={cn(
                    'bg-background text-primary flex size-9 items-center justify-center rounded-full border-2 shadow-md transition-transform group-hover:scale-110',
                    point.current ? 'border-sky-500 ring-4 ring-sky-500/30' : 'border-primary/70',
                    point.connection?.type === 'portal' &&
                      'border-violet-500 ring-2 ring-violet-500/30',
                  )}
                  title={
                    point.current ? `${point.name} — You are here` : locationMapPointLabel(point)
                  }
                >
                  <LocationIcon icon={point.icon} className="size-4" />
                  <span className="sr-only">
                    {locationMapPointLabel(point)}
                    {point.current ? ' — You are here' : ''}
                  </span>
                </span>
              )}
            </LocationReference>
          ),
        )}
        {overlay}
      </div>
      {!hasArtwork || schematicPositions ? (
        <figcaption className="text-muted-foreground border-border border-t px-3 py-2 text-xs">
          {hasArtwork ? 'Some markers have approximate positions.' : 'Schematic map'}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function LocationMapLegend({
  map,
  compact = false,
  currentOnly = false,
}: {
  map: LocationHierarchyMapModel
  compact?: boolean
  currentOnly?: boolean
}) {
  const points = currentOnly ? map.points.filter((point) => point.current) : map.points

  return (
    <Stack gap="sm" className="min-w-0">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Legend</p>
      <ul className={cn('grid gap-2', compact && 'sm:grid-cols-2')}>
        {points.map((point) => (
          <li key={point.id}>
            <LocationReference
              slug={point.slug}
              label={locationMapPointLabel(point)}
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
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{locationMapPointLabel(point)}</span>
                    <span className="text-muted-foreground block text-xs">
                      {point.connection
                        ? `${point.connection.type === 'portal' ? 'Portal' : point.connection.type === 'door' ? 'Door' : 'Passage'} · Travel from this location`
                        : 'Contained location'}
                    </span>
                  </span>
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
