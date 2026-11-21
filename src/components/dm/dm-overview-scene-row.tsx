import { Link } from '@tanstack/react-router'
import { Pin } from 'lucide-react'
import type { ReactNode } from 'react'

import { ResponsiveImage } from '#/components/responsive-image'
import { ArcIcon } from '#/lib/arc-icons'
import type { OverviewScene } from '#/lib/dm-scenes-overview'
import { cn } from '#/lib/utils'

import { DmFaces } from './dm-faces'

/** One scene in the scenes overview: its picture, name, a detail line chosen by the layout, and its NPCs. */
export function DmOverviewSceneRow({
  item,
  detail,
  leading,
}: {
  item: OverviewScene
  detail: ReactNode
  leading?: ReactNode
}) {
  const { scene } = item
  return (
    <li>
      <Link
        to="/dm/scenes/$slug"
        params={{ slug: scene.slug }}
        className="hover:bg-muted/50 flex items-center gap-3 rounded-md px-2 py-1.5"
      >
        {leading}
        {scene.illustrations[0] ? (
          <ResponsiveImage
            src={scene.illustrations[0]}
            alt=""
            sizes="48px"
            maxWidth={160}
            className="size-11 shrink-0 rounded-md object-cover"
          />
        ) : (
          <span className="bg-muted size-11 shrink-0 rounded-md" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate font-medium">
            {item.pinned ? (
              <Pin aria-label="Pinned" className="size-3.5 shrink-0 text-amber-600" />
            ) : null}
            <span className="truncate">{scene.name}</span>
          </p>
          <div className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-xs">
            {detail}
          </div>
        </div>
        <DmFaces people={scene.npcs} max={5} />
      </Link>
    </li>
  )
}

/** The plots a scene serves, each with its arc's symbol. */
export function DmScenePlots({ item, withArc = true }: { item: OverviewScene; withArc?: boolean }) {
  if (item.plots.length === 0) return <span className="italic">Not linked to a plot</span>
  return (
    <span className="flex min-w-0 items-center gap-2 truncate">
      {item.plots.map(({ arc, arcKey, plot }) => (
        <span key={`${arcKey}:${plot.slug}`} className={cn('flex min-w-0 items-center gap-1')}>
          <ArcIcon icon={arc.icon} />
          <span className="truncate">{withArc ? `${arc.name} › ${plot.name}` : plot.name}</span>
        </span>
      ))}
    </span>
  )
}
