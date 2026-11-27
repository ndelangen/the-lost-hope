import { type RefObject, useEffect, useMemo, useRef, useState } from 'react'

import {
  usePlayerScreen,
  usePlayerScreenPresent,
} from '#/components/player-screen/use-player-screen'
import { resolvePlayerScreenImage } from '#/lib/player-screen'
import { toggleBlankPlayerScreen } from '#/lib/player-screen-dock'
import type { PlayerScreenGrid } from '#/lib/player-screen-grid'
import {
  clearPlayerScreenHistory,
  jumpPlayerScreen,
  playerScreenGridFor,
  playerScreenImageId,
  playerScreenShowing,
  showOnPlayerScreen,
  stepPlayerScreen,
  updatePlayerScreenGrid,
  type PlayerScreenImage,
  type PlayerScreenRotation,
  type PlayerScreenState,
} from '#/lib/player-screen-state'
import { responsiveImageFor } from '#/lib/public-media'

/** A picture with what a monitor needs to draw it at its own shape, with its grid. */
export type PictureSurface = {
  /** The picture's id on the player screen, so pointing at a stale copy goes nowhere. */
  picture: string
  name: string
  src: string
  width: number
  height: number
  grid: PlayerScreenGrid
}

/** The surface for a selection, when it is a real picture and not a screen the display draws. */
export function pictureSurface(
  state: PlayerScreenState,
  selection: PlayerScreenImage | null,
): PictureSurface | undefined {
  const image = selection ? resolvePlayerScreenImage(selection) : undefined
  const size = image?.src ? responsiveImageFor(image.src) : undefined
  if (!selection || !image?.src || !size) return undefined
  return {
    picture: playerScreenImageId(selection),
    name: image.name,
    src: image.src,
    width: size.width,
    height: size.height,
    grid: playerScreenGridFor(state, selection),
  }
}

/**
 * What every panel layout needs from the player screen: what is live, whether a screen is open,
 * and the actions that change it. Each layout decides how to lay these out.
 */
export function useDockController() {
  const [state, update] = usePlayerScreen()
  const present = usePlayerScreenPresent()
  const [pointing, setPointing] = useState(false)
  const showing = playerScreenShowing(state)
  const live = showing ? resolvePlayerScreenImage(showing) : undefined
  const surface = pictureSurface(state, showing)

  const actions = useMemo(
    () => ({
      show: (selection: PlayerScreenImage | null) =>
        update((current) => showOnPlayerScreen(current, selection)),
      toggleBlank: () => update(toggleBlankPlayerScreen),
      step: (direction: -1 | 1) => update((current) => stepPlayerScreen(current, direction)),
      jump: (index: number) => update((current) => jumpPlayerScreen(current, index)),
      clearHistory: () => update(clearPlayerScreenHistory),
      setCaptions: (captions: boolean) => update((current) => ({ ...current, captions })),
      setTurnOrder: (turnOrder: boolean) => update((current) => ({ ...current, turnOrder })),
      setRotation: (rotation: PlayerScreenRotation) =>
        update((current) => ({ ...current, rotation })),
      changeGrid: (
        selection: PlayerScreenImage,
        change: (grid: PlayerScreenGrid) => PlayerScreenGrid,
      ) => update((current) => updatePlayerScreenGrid(current, selection, change)),
    }),
    [update],
  )

  return { state, update, present, showing, live, surface, pointing, setPointing, ...actions }
}

export type DockController = ReturnType<typeof useDockController>

/**
 * Single-key shortcuts that work from anywhere in the DM's window, except while typing. Keys are
 * matched in lower case.
 */
export function useDockShortcuts(keys: Record<string, () => void>) {
  const latest = useRef(keys)
  latest.current = keys
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return
      const key = event.key.toLowerCase()
      if (Object.hasOwn(latest.current, key)) latest.current[key]?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}

/** Closes an open panel on Escape or a press outside `root`. */
export function useDismiss(
  root: RefObject<HTMLElement | null>,
  open: boolean,
  onDismiss: () => void,
) {
  const latest = useRef(onDismiss)
  latest.current = onDismiss
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') latest.current()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) latest.current()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open, root])
}

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}
