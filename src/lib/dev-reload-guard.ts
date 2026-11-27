import { useEffect, useSyncExternalStore } from 'react'

/**
 * In local dev, a full page reload from Vite waits while the DM has unsaved work on the page, and
 * goes through as soon as that work is saved or discarded. Hot updates are never held: they do not
 * disturb the page. Vite waits for every `vite:beforeFullReload` listener, so a pending one holds
 * the reload.
 */
const holders = new Set<symbol>()
let release: (() => void) | undefined
const listeners = new Set<() => void>()

const notify = () => {
  for (const listener of listeners) listener()
}

function letReloadThrough() {
  const pending = release
  release = undefined
  notify()
  pending?.()
}

import.meta.hot?.on('vite:beforeFullReload', () => {
  if (holders.size === 0) return undefined
  if (release) return undefined
  return new Promise<void>((resolve) => {
    release = resolve
    notify()
  })
})

/** Keeps Vite from reloading the page while `unsaved` is true. */
export function useHoldReloadWhile(unsaved: boolean) {
  useEffect(() => {
    if (!unsaved || !import.meta.hot) return
    const holder = Symbol('unsaved work')
    holders.add(holder)
    return () => {
      holders.delete(holder)
      if (holders.size === 0) letReloadThrough()
    }
  }, [unsaved])
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Whether a reload is waiting for unsaved work, and a way to let it through now. */
export function useHeldReload(): { waiting: boolean; reloadNow: () => void } {
  const waiting = useSyncExternalStore(
    subscribe,
    () => release !== undefined,
    () => false,
  )
  return { waiting, reloadNow: letReloadThrough }
}
