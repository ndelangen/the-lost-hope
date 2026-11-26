import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { DmModeContext } from '#/components/dm-mode'
import { DmReference } from '#/components/dm/dm-reference'
import { NewPlaceOnMap } from '#/components/dm/new-place-on-map'
import { ShopPanel } from '#/components/dm/shop/shop-panel'
import { getEntity } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { sourceLocationMap } from '#/lib/location-hierarchy-map'
import { locationTypeLabel } from '#/lib/location-icons'

const locations: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.location)[keyof typeof SOURCE_REGISTRIES.location]>
> = SOURCE_REGISTRIES.location

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
 * A location as the DM prepares it, met by the party or not: where it is, its shop, and its map,
 * where the DM can add new places.
 */
function DmLocationRoute() {
  const { key } = Route.useLoaderData()
  const location = locations[key]!
  const met = getEntity('location', location.slug) !== undefined

  return (
    <DmModeContext value={true}>
      <div className="grid max-w-5xl gap-6">
        <header className="grid gap-2">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {'type' in location && location.type ? locationTypeLabel(location.type) : 'Location'} ·
            DM view
          </p>
          <h1 className="text-3xl font-bold">{location.name}</h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {'parent' in location && location.parent ? (
              <span>
                Within <DmReference reference={location.parent} />
              </span>
            ) : null}
            {met ? (
              <Link
                to="/locations/detail/$slug"
                params={{ slug: location.slug }}
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                Open the player page →
              </Link>
            ) : (
              <span>The party has not been here yet.</span>
            )}
          </div>
        </header>
        {location.notes ? <ContentRenderer content={location.notes} /> : null}
        <ShopPanel locationKey={key} shop={location.shop} />
        <section className="grid gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Map of {location.name}</h2>
          <NewPlaceOnMap
            parentKey={key}
            map={sourceLocationMap(
              location,
              locations,
              (slug) => getEntity('location', slug) !== undefined,
            )}
            label={`Map of ${location.name}`}
          />
        </section>
      </div>
    </DmModeContext>
  )
}
