import { useCallback, useEffect, useState } from 'react'

import { ENCOUNTER_STORAGE_KEY, parseStore, type EncounterStore } from '#/lib/encounter'

function readStore(): EncounterStore {
  try {
    return parseStore(localStorage.getItem(ENCOUNTER_STORAGE_KEY))
  } catch {
    return parseStore(null)
  }
}

function writeStore(store: EncounterStore) {
  try {
    localStorage.setItem(ENCOUNTER_STORAGE_KEY, JSON.stringify(store))
  } catch {
    // Private windows or blocked storage: encounters still run for this visit.
  }
}

/**
 * The DM's prepared encounters and combatant values, kept in this browser. State loads after
 * mount so server and client render the same first frame; `store` is undefined until then.
 */
export function useEncounterStore() {
  const [store, setStore] = useState<EncounterStore>()

  useEffect(() => setStore(readStore()), [])
  useEffect(() => {
    if (store) writeStore(store)
  }, [store])

  const update = useCallback(
    (change: (current: EncounterStore) => EncounterStore) =>
      setStore((current) => (current ? change(current) : current)),
    [],
  )

  return [store, update] as const
}

export function newEncounterId() {
  return crypto.randomUUID().slice(0, 8)
}
