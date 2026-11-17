import { Link } from '@tanstack/react-router'
import { Pin } from 'lucide-react'

import { ResponsiveImage } from '#/components/responsive-image'
import { ArcIcon } from '#/lib/arc-icons'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import type { OverviewScene } from '#/lib/dm-scenes-overview'
import { LocationIcon } from '#/lib/location-icons'

import { DmFaces } from './dm-faces'

const locations = SOURCE_REGISTRIES.location as Record<string, { name: string; icon?: string }>

/** One scene in the scenes overview: its picture, name, place, the plots it serves, and its NPCs. */
export function DmOverviewSceneRow({ item }: { item: OverviewScene }) {
  const { scene } = item
  const place = locations[scene.location.key]
  const placeNames = [scene.location, ...scene.alternateLocations]
    .map(({ key }) => locations[key]?.name ?? key)
    .join(' or ')
  return (
    <li>
      <Link
        to="/dm/scenes/$slug"
        params={{ slug: scene.slug }}
        className="hover:bg-muted/50 flex items-center gap-3 rounded-md px-2 py-1.5"
      >
        {scene.illustration ? (
          <ResponsiveImage
            src={scene.illustration}
            alt=""
            sizes="48px"
            maxWidth={160}
            className="size-11 shrink-0 rounded-md object-cover"
          />
        ) : (
          <span className="bg-muted size-11 shrink-0 rounded-md" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 font-medium">
            {item.pinned ? (
              <Pin aria-label="Pinned" className="size-3.5 shrink-0 text-amber-600" />
            ) : null}
            <span className="truncate">{scene.name}</span>
          </p>
          <div className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-xs">
            <span className="flex max-w-[45%] shrink-0 items-center gap-1">
              <LocationIcon icon={place?.icon} />
              <span className="truncate" title={placeNames}>
                {placeNames}
              </span>
            </span>
            <span aria-hidden>·</span>
            {item.plots.length === 0 ? (
              <span className="italic">Not linked to a plot</span>
            ) : (
              <span className="flex min-w-0 items-center gap-2 truncate">
                {item.plots.map(({ arc, arcKey, plot }) => (
                  <span key={`${arcKey}:${plot.slug}`} className="flex min-w-0 items-center gap-1">
                    <ArcIcon icon={arc.icon} />
                    <span className="truncate">{plot.name}</span>
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
        <DmFaces people={scene.npcs} />
      </Link>
    </li>
  )
}
