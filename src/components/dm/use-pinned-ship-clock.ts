import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { entityRefOf, type EntityRef } from '#/definitions/kind'

const STORAGE_KEY = 'the-lost-hope:dm-pinned-ship-clock'
/** Tells the page and the dock in this window that the pin moved; `storage` only reaches others. */
const CHANGE_EVENT = 'the-lost-hope:dm-pinned-ship-clock'
const SceneRef = entityRefOf('scene')

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function subscribe(onChange: () => void) {
  addEventListener('storage', onChange)
  addEventListener(CHANGE_EVENT, onChange)
  return () => {
    removeEventListener('storage', onChange)
    removeEventListener(CHANGE_EVENT, onChange)
  }
}

function parsePinned(raw: string | null): EntityRef<'scene'> | undefined {
  if (!raw) return undefined
  try {
    const parsed = SceneRef.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : undefined
  } catch {
    return undefined
  }
}

/**
 * The scene whose ship-damage clock the DM pinned to the corner of the screen, kept in this
 * browser. A pinned clock runs from the dock on every page, so the scene and encounter pages hand
 * their copy over while it is pinned.
 */
export function usePinnedShipClock(): [
  EntityRef<'scene'> | undefined,
  (scene: EntityRef<'scene'> | undefined) => void,
] {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null)
  const pinned = useMemo(() => parsePinned(raw), [raw])
  const setPinned = useCallback((scene: EntityRef<'scene'> | undefined) => {
    try {
      if (scene) localStorage.setItem(STORAGE_KEY, JSON.stringify(scene))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Without storage the clock stays where it is.
    }
    dispatchEvent(new Event(CHANGE_EVENT))
  }, [])
  return [pinned, setPinned]
}
