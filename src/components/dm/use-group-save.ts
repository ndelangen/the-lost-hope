import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { parseGroupSaveState, type GroupSave, type GroupSaveState } from '#/lib/group-save'

const STORAGE_PREFIX = 'the-lost-hope:dm-group-save:'
/** Tells other hooks in this window that rolls changed; `storage` events only reach other windows. */
const CHANGE_EVENT = 'the-lost-hope:dm-group-save'

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
 * The rolls of one group save, kept in this browser so a reload does not lose them and the player
 * screen follows the DM's tracker live. Every change starts from what is stored.
 */
export function useGroupSave(
  storageKey: string,
  save: GroupSave,
): [GroupSaveState, (change: (current: GroupSaveState) => GroupSaveState) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(storageKey),
    () => null,
  )
  const state = useMemo(() => parseGroupSaveState(raw, save), [raw, save])

  const update = useCallback(
    (change: (current: GroupSaveState) => GroupSaveState) => {
      const next = change(parseGroupSaveState(readRaw(storageKey), save))
      try {
        localStorage.setItem(STORAGE_PREFIX + storageKey, JSON.stringify(next))
      } catch {
        // Without storage nothing can be shared with the player screen.
      }
      dispatchEvent(new Event(CHANGE_EVENT))
    },
    [storageKey, save],
  )

  return [state, update]
}
