import { Captions, CaptionsOff, Grid3x3, ListOrdered, RotateCcw, RotateCw } from 'lucide-react'
import type { ReactNode } from 'react'

import { GridOverlay } from '#/components/player-screen/grid-overlay'
import { PointerSurface } from '#/components/player-screen/pointer-surface'
import { ResponsiveImage } from '#/components/responsive-image'
import type { ResolvedPlayerScreenImage } from '#/lib/player-screen'
import type { NameOnScreen } from '#/lib/player-screen-dock'
import type { PlayerScreenRotation } from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

import { PlayerScreenThumb } from './parts'
import type { PictureSurface } from './use-dock-controller'

/**
 * The DM's small copy of a screen: the live one, which can be pointed at, or a picture waiting on
 * deck. It spells out what else the players get with the picture: its name, a grid, a turn, the
 * turn order.
 */
export function ScreenMonitor({
  tone,
  picture,
  surface,
  name,
  rotation = 0,
  turnOrder = false,
  empty,
  className,
}: {
  /** `live` is what the players see and takes pointing; `deck` is only the DM's. */
  tone: 'live' | 'deck'
  picture: ResolvedPlayerScreenImage | undefined
  /** Present when the picture is real art; absent for screens the display draws itself. */
  surface: PictureSurface | undefined
  /** What the players read under the picture. */
  name: NameOnScreen | undefined
  rotation?: PlayerScreenRotation
  turnOrder?: boolean
  /** What to say when there is no picture. */
  empty: string
  className?: string
}) {
  const live = tone === 'live'
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-black ring-2',
        live ? 'ring-emerald-500' : 'ring-amber-400/80',
        !picture && 'ring-border',
        className,
      )}
    >
      <div className="[container-type:size] absolute inset-0 grid place-items-center">
        {surface ? (
          live ? (
            <PointerSurface
              picture={surface.picture}
              src={surface.src}
              width={surface.width}
              height={surface.height}
              grid={surface.grid}
              markSize="1.75rem"
              style={{ width: `min(100cqw, 100cqh * ${surface.width / surface.height})` }}
            />
          ) : (
            <div
              className="relative"
              style={{
                width: `min(100cqw, 100cqh * ${surface.width / surface.height})`,
                aspectRatio: `${surface.width} / ${surface.height}`,
              }}
            >
              <ResponsiveImage
                src={surface.src}
                alt=""
                sizes="32rem"
                maxWidth={1024}
                draggable={false}
                className="absolute inset-0 size-full"
              />
              {surface.grid.on ? (
                <GridOverlay
                  grid={surface.grid}
                  width={surface.width}
                  height={surface.height}
                  strokeWidth={1}
                />
              ) : null}
            </div>
          )
        ) : picture ? (
          <PlayerScreenThumb
            src={undefined}
            group={picture.group}
            alt=""
            sizes="1px"
            className="size-full"
          />
        ) : (
          <p className="px-4 text-center text-sm text-white/60">{empty}</p>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start gap-1 p-1.5">
        <span
          className={cn(
            'rounded px-1.5 py-0.5 text-[11px] font-bold tracking-wider uppercase',
            live ? 'bg-emerald-600 text-white' : 'bg-amber-400 text-black',
            !picture && live && 'bg-zinc-700 text-white',
          )}
        >
          {live ? (picture ? 'Live' : 'Blank') : 'On deck'}
        </span>
        <span className="flex-1" />
        {picture && surface?.grid.on ? <MonitorBadge Icon={Grid3x3}>Grid</MonitorBadge> : null}
        {picture && rotation !== 0 ? (
          <MonitorBadge Icon={rotation === 90 ? RotateCw : RotateCcw}>
            Turned {rotation === 90 ? 'right' : 'left'}
          </MonitorBadge>
        ) : null}
        {turnOrder ? <MonitorBadge Icon={ListOrdered}>Turn order</MonitorBadge> : null}
      </div>

      {picture && name ? (
        <p
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-black/90 to-transparent px-2 pt-5 pb-1.5 text-xs',
            name.kind === 'shown' ? 'text-white' : 'text-white/70',
          )}
        >
          {name.kind === 'shown' ? (
            <>
              <Captions className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">
                {live ? 'Players read' : 'Players will read'}{' '}
                <span className="font-semibold">“{name.name}”</span>
              </span>
            </>
          ) : (
            <>
              <CaptionsOff className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">
                {name.kind === 'off' ? 'No name: names are off' : 'No name on screen'}
              </span>
            </>
          )}
        </p>
      ) : null}
    </div>
  )
}

function MonitorBadge({ Icon, children }: { Icon: typeof Grid3x3; children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white ring-1 ring-white/20">
      <Icon className="size-3" aria-hidden />
      {children}
    </span>
  )
}
