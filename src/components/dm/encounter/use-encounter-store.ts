import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { ENCOUNTER_STORAGE_KEY, parseStore, type EncounterStore } from '#/lib/encounter'

/** Tells every reader in this window that the encounters changed; `storage` only reaches others. */
const CHANGE_EVENT = 'lost-hope:dm-encounters'
/** What the server and the first client frame see, before the browser's storage is read. */
const NOT_LOADED = Symbol('not loaded')

function readRaw(): string | null {
  try {
    return localStorage.getItem(ENCOUNTER_STORAGE_KEY)
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

/** Change the saved encounters from anywhere in this window. Every reader follows. */
export function updateEncounterStore(change: (current: EncounterStore) => EncounterStore) {
  const next = change(parseStore(readRaw()))
  try {
    localStorage.setItem(ENCOUNTER_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Private windows or blocked storage: nothing is kept.
  }
  dispatchEvent(new Event(CHANGE_EVENT))
  return next
}

/**
 * The DM's prepared encounters and combatant values, kept in this browser and shared by everything
 * on the page that reads them. State loads after mount so server and client render the same first
 * frame; `store` is undefined until then.
 */
export function useEncounterStore() {
  const raw = useSyncExternalStore<string | null | typeof NOT_LOADED>(
    subscribe,
    readRaw,
    () => NOT_LOADED,
  )
  const store = useMemo(() => (raw === NOT_LOADED ? undefined : parseStore(raw)), [raw])
  const update = useCallback(
    (change: (current: EncounterStore) => EncounterStore) => void updateEncounterStore(change),
    [],
  )
  return [store, update] as const
}

export function newEncounterId() {
  return crypto.randomUUID().slice(0, 8)
}
