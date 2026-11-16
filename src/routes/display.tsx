import { createFileRoute } from '@tanstack/react-router'
import { Maximize } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'

import {
  useAnnouncePlayerScreen,
  usePlayerScreen,
} from '#/components/player-screen/use-player-screen'
import { ResponsiveImage } from '#/components/responsive-image'
import { resolvePlayerScreenImage } from '#/lib/player-screen'
import { playerScreenImageId, playerScreenShowing } from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

const JimsLetterOnScreen = lazy(() =>
  import('#/components/player-screen/jims-letter-on-screen').then((module) => ({
    default: module.JimsLetterOnScreen,
  })),
)

/** The player-facing screen: a bare, full-window picture the DM picks from another window. */
export const Route = createFileRoute('/display')({
  head: () => ({
    meta: [{ title: 'Player screen' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: PlayerScreenPage,
})

function PlayerScreenPage() {
  const [state] = usePlayerScreen()
  const showing = playerScreenShowing(state)
  const captions = state.captions
  useAnnouncePlayerScreen()
  const image = showing ? resolvePlayerScreenImage(showing) : undefined
  const caption = captions ? image?.playerCaption : undefined
  const idle = useIdleCursor()
  const fullscreen = useIsFullscreen()
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-0 overflow-hidden bg-black text-white select-none',
        idle && 'cursor-none',
      )}
      onDoubleClick={toggleFullscreen}
    >
      {image && showing ? (
        <figure
          key={playerScreenImageId(showing)}
          className={cn(
            'animate-in fade-in absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 duration-700',
            state.rotation === 0 ? 'h-dvh w-dvw' : 'h-dvw w-dvh',
          )}
          style={state.rotation === 0 ? undefined : { rotate: `${state.rotation}deg` }}
        >
          {image.src ? (
            <ResponsiveImage
              src={image.src}
              alt={caption ?? ''}
              sizes="100vw"
              loading="eager"
              className="absolute inset-0 size-full object-contain"
            />
          ) : (
            <Suspense fallback={null}>
              <JimsLetterOnScreen />
            </Suspense>
          )}
          {caption ? (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-[4vw] pt-24 pb-[3vw]">
              <span className="text-[clamp(2rem,4.5vw,5rem)] font-bold tracking-tight [text-shadow:0_4px_24px_rgb(0_0_0/0.8)]">
                {caption}
              </span>
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {fullscreen ? null : (
        <button
          type="button"
          onClick={toggleFullscreen}
          className={cn(
            'absolute top-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-lg font-medium text-white ring-1 ring-white/20 backdrop-blur transition-opacity hover:bg-white/20',
            idle && 'opacity-0',
          )}
        >
          <Maximize className="size-5" aria-hidden />
          Go full screen (F)
        </button>
      )}
    </div>
  )
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'f' || event.key === 'F') toggleFullscreen()
}

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen()
  else void document.documentElement.requestFullscreen().catch(() => {})
}

function useIsFullscreen(): boolean {
  const [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    const update = () => setFullscreen(!!document.fullscreenElement)
    update()
    document.addEventListener('fullscreenchange', update)
    return () => document.removeEventListener('fullscreenchange', update)
  }, [])
  return fullscreen
}

/** Hides the pointer and controls once the mouse rests, so players see only the picture. */
function useIdleCursor(delay = 2500): boolean {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), delay)
    const wake = () => {
      setIdle(false)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setIdle(true), delay)
    }
    window.addEventListener('pointermove', wake)
    window.addEventListener('keydown', wake)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('keydown', wake)
    }
  }, [delay])
  return idle
}
