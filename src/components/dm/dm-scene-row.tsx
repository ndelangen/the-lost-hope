import { Link } from '@tanstack/react-router'
import { Pin } from 'lucide-react'

import type { EntityRef } from '#/definitions/kind'
import type { Scene } from '#/definitions/scene'
import type { ScenePlot } from '#/lib/dm-dashboard'
import { cn } from '#/lib/utils'

import { DmFaces } from './dm-faces'

/** One compact, scannable scene line: pin state, name, the plots it serves, and who is in it. */
export function DmSceneRow({
  scene,
  pinned,
  plots,
  present,
}: {
  scene: Scene
  pinned: boolean
  plots: readonly ScenePlot[]
  present?: readonly EntityRef[]
}) {
  return (
    <li>
      <Link
        to="/dm/scenes/$slug"
        params={{ slug: scene.slug }}
        className="hover:bg-muted/50 flex items-center gap-3 rounded-md px-1 py-2"
      >
        <Pin
          aria-label={pinned ? 'Pinned' : undefined}
          aria-hidden={!pinned}
          className={cn('size-4 shrink-0', pinned ? 'text-amber-600' : 'text-muted-foreground/30')}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{scene.name}</p>
          <p className="text-muted-foreground truncate text-xs">
            {plots.length > 0
              ? plots.map(({ arc, plot }) => `${arc.name} › ${plot.name}`).join(' · ')
              : 'Not linked to a plot'}
          </p>
        </div>
        <DmFaces people={[...(present ?? []), ...scene.npcs]} />
      </Link>
    </li>
  )
}
