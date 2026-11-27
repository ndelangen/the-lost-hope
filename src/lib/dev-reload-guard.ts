import { useEffect, useSyncExternalStore } from 'react'

/**
 * In local dev the DM chooses when code changes reach the page. Agents edit the checkout while
 * the DM uses the app, so every change Vite sends (a hot update, a build error, a full reload, a
 * dev-server restart) waits until the DM navigates or presses Apply. A full reload also waits
 * while the DM has unsaved work on the page, unless the DM forces it.
 *
 * Vite handles its messages one at a time and waits for every listener before acting on one, so a
 * pending listener holds that message and everything queued behind it.
 */
type Held = { reload: boolean; release: () => void }

/** How long changes keep flowing after the last one let through: enough for a burst to drain. */
const QUIET_MS = 800
/** After the page itself saves, how long to wait for that save's own change to arrive. */
const SAVE_ARRIVAL_MS = 4000

const holders = new Set<symbol>()
const listeners = new Set<() => void>()
let held: Held | undefined
let flowUntil = 0

const notify = () => {
  for (const listener of listeners) listener()
}

const flowing = () => Date.now() < flowUntil

function hold(reload: boolean): Promise<void> | undefined {
  if (flowing() && !(reload && holders.size > 0)) {
    flowUntil = Math.max(flowUntil, Date.now() + QUIET_MS)
    return undefined
  }
  // Only one message is ever waiting: Vite queues the rest behind it.
  return new Promise<void>((resolve) => {
    held = { reload, release: resolve }
    notify()
  })
}

function release() {
  const pending = held
  held = undefined
  notify()
  pending?.release()
}

/**
 * Lets the waiting changes through, and any that follow in the next moments. A full reload still
 * waits for unsaved work unless `force` is set.
 */
export function applyChanges({ force = false, within = QUIET_MS } = {}) {
  flowUntil = Math.max(flowUntil, Date.now() + within)
  if (held && (force || !held.reload || holders.size === 0)) release()
}

/** The page saved to the checkout itself: let that save's change in when it arrives. */
export function expectOwnChange() {
  applyChanges({ within: SAVE_ARRIVAL_MS })
}

import.meta.hot?.on('vite:beforeUpdate', () => hold(false))
import.meta.hot?.on('vite:error', () => hold(false))
import.meta.hot?.on('vite:beforeFullReload', () => hold(true))
// A dev-server restart: Vite reloads the page once the server answers again.
import.meta.hot?.on('vite:ws:disconnect', () => hold(true))

/** Keeps Vite from reloading the page while `unsaved` is true. */
export function useHoldReloadWhile(unsaved: boolean) {
  useEffect(() => {
    if (!unsaved || !import.meta.hot) return
    const holder = Symbol('unsaved work')
    holders.add(holder)
    notify()
    return () => {
      holders.delete(holder)
      // A reload that waited only for this work goes through if changes are flowing anyway.
      if (holders.size === 0 && flowing()) applyChanges()
      notify()
    }
  }, [unsaved])
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** What is waiting: nothing, code changes, or a reload that unsaved work is keeping back. */
export type Waiting = 'nothing' | 'changes' | 'reload-after-unsaved'

const waiting = (): Waiting => {
  if (!held) return 'nothing'
  return held.reload && holders.size > 0 ? 'reload-after-unsaved' : 'changes'
}

/** What is waiting, and ways to let it through now. */
export function useWaitingChanges(): {
  waiting: Waiting
  apply: () => void
  reloadNow: () => void
} {
  return {
    waiting: useSyncExternalStore(subscribe, waiting, () => 'nothing'),
    apply: () => applyChanges(),
    reloadNow: () => applyChanges({ force: true }),
  }
}
