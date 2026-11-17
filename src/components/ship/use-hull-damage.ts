import { useCallback, useMemo, useSyncExternalStore } from 'react'

import type { ShipHull } from '#/definitions/item'
import { type HullDamage, parseHullDamage } from '#/lib/ship-damage'

const STORAGE_PREFIX = 'the-lost-hope:hull-damage:'
/** Tells other hooks in this window that a hull changed; `storage` events only reach other windows. */
const CHANGE_EVENT = 'the-lost-hope:hull-damage'

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(STORAGE_PREFIX + key)
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

/**
 * A vessel's hull damage, kept in this browser so the scene clock, the player-screen dock and the
 * player screen follow the same ship live. Every change starts from what is stored, so two places
 * editing the same ship never undo each other.
 */
export function useHullDamage(
  vesselKey: string,
  hull: ShipHull,
): [HullDamage, (change: (current: HullDamage) => HullDamage) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(vesselKey),
    () => null,
  )
  const state = useMemo(() => parseHullDamage(raw, hull), [raw, hull])

  const update = useCallback(
    (change: (current: HullDamage) => HullDamage) => {
      const next = change(parseHullDamage(readRaw(vesselKey), hull))
      try {
        localStorage.setItem(STORAGE_PREFIX + vesselKey, JSON.stringify(next))
      } catch {
        // Without storage nothing can be shared between windows.
      }
      dispatchEvent(new Event(CHANGE_EVENT))
    },
    [vesselKey, hull],
  )

  return [state, update]
}
