import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { ENCOUNTER_STORAGE_KEY, parseEncounter, type Encounter } from '#/lib/encounter'

/** Tells every reader in this window that the encounter changed; `storage` only reaches others. */
const CHANGE_EVENT = 'lost-hope:dm-encounter'
/** What the server and the first client frame see, before the browser's storage is read. */
const NOT_LOADED = Symbol('not loaded')

function readRaw(key = ENCOUNTER_STORAGE_KEY): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeRaw(key: string, encounter: Encounter) {
  try {
    localStorage.setItem(key, JSON.stringify(encounter))
  } catch {
    // Private windows or blocked storage: nothing is kept.
  }
  dispatchEvent(new Event(CHANGE_EVENT))
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
  writeRaw(ENCOUNTER_STORAGE_KEY, next)
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

/**
 * A fight kept under its own key in this browser, apart from the DM's: a player's play sheet is
 * the encounter of one character. Undefined until the browser's storage is read.
 */
export function useEncounterAt(storageKey: string) {
  const raw = useSyncExternalStore<string | null | typeof NOT_LOADED>(
    subscribe,
    () => readRaw(storageKey),
    () => NOT_LOADED,
  )
  const encounter = useMemo(() => (raw === NOT_LOADED ? undefined : parseEncounter(raw)), [raw])
  const update = useCallback(
    (change: (current: Encounter) => Encounter) =>
      writeRaw(storageKey, change(parseEncounter(readRaw(storageKey)))),
    [storageKey],
  )
  return [encounter, update] as const
}

/** A fresh id for something the DM adds during the fight, such as a condition. */
export function newConditionId() {
  return crypto.randomUUID().slice(0, 8)
}
