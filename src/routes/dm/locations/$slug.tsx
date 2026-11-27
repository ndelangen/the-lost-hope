import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowRight, EyeOff, MapPlus, Store } from 'lucide-react'
import { useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmModeContext } from '#/components/dm-mode'
import { DmReference } from '#/components/dm/dm-reference'
import { NewPlaceOnMap } from '#/components/dm/new-place-on-map'
import { ShopPanel } from '#/components/dm/shop/shop-panel'
import { Button } from '#/components/ui/button'
import { Pill } from '#/components/ui/pill'
import { SHOP_TYPE_LABELS } from '#/definitions/shop'
import { getEntity } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { canSaveRecords } from '#/lib/dev-records'
import { sourceLocationMap } from '#/lib/location-hierarchy-map'
import { LocationIcon, locationTypeLabel } from '#/lib/location-icons'
import { cn } from '#/lib/utils'

const locations: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.location)[keyof typeof SOURCE_REGISTRIES.location]>
> = SOURCE_REGISTRIES.location

const isMet = (slug: string) => getEntity('location', slug) !== undefined

/** DM pages use the same slug as the location's player page, so the two addresses match. */
export const Route = createFileRoute('/dm/locations/$slug')({
  loader: ({ params }) => {
    const key = Object.keys(locations).find(
      (candidate) => locations[candidate]?.slug === params.slug,
    )
    if (!key) throw notFound()
    return { key }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData ? locations[loaderData.key]?.name : 'Location'} | DM` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: DmLocationRoute,
})

/**
 * A location as the DM prepares it, met by the party or not: where it is, its shop, its map,
 * where the DM can add new places, and the places already recorded within it.
 */
function DmLocationRoute() {
  const { key } = Route.useLoaderData()
  const location = locations[key]!
  const met = isMet(location.slug)
  const places = Object.values(locations)
    .filter((place) => place.parent?.key === key)
    .toSorted((a, b) => a.name.localeCompare(b.name))
  // An empty map is a large blank, so a place with nothing inside shows it only when asked.
  const [mapOpened, setMapOpened] = useState(false)

  return (
    <DmModeContext value={true}>
      <div className="grid max-w-5xl gap-8">
        <header className="grid gap-2">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {location.type ? locationTypeLabel(location.type) : 'Location'} · DM view
          </p>
          <h1 className="text-3xl font-bold">{location.name}</h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {location.parent ? (
              <span>
                In <DmReference reference={location.parent} />
              </span>
            ) : null}
            {met ? (
              <Link
                to="/locations/detail/$slug"
                params={{ slug: location.slug }}
                className="text-primary inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
              >
                Player page <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            ) : (
              <Pill variant="warning">
                <EyeOff className="mr-1.5 size-3" aria-hidden />
                The party has not been here
              </Pill>
            )}
          </div>
        </header>
        {location.notes ? <ContentRenderer content={location.notes} /> : null}
        <ShopPanel locationKey={key} shop={location.shop} />
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Places in {location.name}</h2>
          {places.length > 0 || mapOpened ? (
            <NewPlaceOnMap
              parentKey={key}
              map={sourceLocationMap(location, locations, isMet)}
              label={`Map of ${location.name}`}
            />
          ) : (
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <p>Nothing is recorded inside {location.name} yet.</p>
              {canSaveRecords ? (
                <Button size="sm" onClick={() => setMapOpened(true)}>
                  <MapPlus className="size-3.5" aria-hidden /> Open its map to add a place
                </Button>
              ) : null}
            </div>
          )}
          {places.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {places.map((place) => (
                <li key={place.slug}>
                  <Link
                    to="/dm/locations/$slug"
                    params={{ slug: place.slug }}
                    className={cn(
                      'border-border hover:border-primary/50 hover:bg-accent/30 flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors',
                      !isMet(place.slug) && 'border-dashed border-amber-500/60',
                    )}
                  >
                    <span className="border-primary/40 text-primary flex size-7 shrink-0 items-center justify-center rounded-full border">
                      <LocationIcon icon={place.icon} className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{place.name}</span>
                      <span className="text-muted-foreground block truncate text-xs">
                        {[
                          place.type ? locationTypeLabel(place.type) : undefined,
                          place.shop ? SHOP_TYPE_LABELS[place.shop.type] : undefined,
                          isMet(place.slug) ? undefined : 'not found by the party',
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>
                    {place.shop ? (
                      <Store className="text-muted-foreground size-4 shrink-0" aria-hidden />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>
    </DmModeContext>
  )
}
