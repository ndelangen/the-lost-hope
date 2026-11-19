import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { ENCOUNTER_STORAGE_KEY, parseEncounter, type Encounter } from '#/lib/encounter'

/** Tells every reader in this window that the encounter changed; `storage` only reaches others. */
const CHANGE_EVENT = 'lost-hope:dm-encounter'
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

/** Change the fight from anywhere in this window. Every reader follows. */
export function updateEncounter(change: (current: Encounter) => Encounter) {
  const next = change(parseEncounter(readRaw()))
  try {
    localStorage.setItem(ENCOUNTER_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Private windows or blocked storage: nothing is kept.
  }
  dispatchEvent(new Event(CHANGE_EVENT))
  return next
}

/**
 * The one fight the DM runs, with its combatant values, kept in this browser and shared by
 * everything on the page that reads it. State loads after mount so server and client render the
 * same first frame; the encounter is undefined until then.
 */
export function useEncounter() {
  const raw = useSyncExternalStore<string | null | typeof NOT_LOADED>(
    subscribe,
    readRaw,
    () => NOT_LOADED,
  )
  const encounter = useMemo(() => (raw === NOT_LOADED ? undefined : parseEncounter(raw)), [raw])
  const update = useCallback(
    (change: (current: Encounter) => Encounter) => void updateEncounter(change),
    [],
  )
  return [encounter, update] as const
}

/** A fresh id for something the DM adds during the fight, such as a condition. */
export function newConditionId() {
  return crypto.randomUUID().slice(0, 8)
}
