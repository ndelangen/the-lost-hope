import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

import {
  EMPTY_PLAYER_SCREEN,
  PLAYER_SCREEN_CHANNEL,
  PLAYER_SCREEN_HEARTBEAT_MS,
  PLAYER_SCREEN_STORAGE_KEY,
  parsePlayerScreenState,
  type PlayerScreenState,
} from '#/lib/player-screen-state'

const listeners = new Set<() => void>()
let cachedRaw: string | null | undefined
let cachedState = EMPTY_PLAYER_SCREEN

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(PLAYER_SCREEN_STORAGE_KEY)
  } catch {
    return null
  }
}

function snapshot(): PlayerScreenState {
  const raw = readRaw()
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedState = parsePlayerScreenState(raw)
  }
  return cachedState
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  // Other windows of this app (the player screen, or the DM's) write to the same storage.
  const onStorage = (event: StorageEvent) => {
    if (event.key === PLAYER_SCREEN_STORAGE_KEY || event.key === null) listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/** What the player screen shows, shared by every window of the app on this computer. */
export function usePlayerScreen() {
  const state = useSyncExternalStore(subscribe, snapshot, () => EMPTY_PLAYER_SCREEN)
  const update = useCallback((change: (current: PlayerScreenState) => PlayerScreenState) => {
    const next = change(snapshot())
    try {
      window.localStorage.setItem(PLAYER_SCREEN_STORAGE_KEY, JSON.stringify(next))
    } catch {
      return
    }
    for (const listener of listeners) listener()
  }, [])
  return [state, update] as const
}

/** The player screen calls this so DM controls can tell that a screen is open. */
export function useAnnouncePlayerScreen(): void {
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const channel = new BroadcastChannel(PLAYER_SCREEN_CHANNEL)
    /* oxlint-disable unicorn/require-post-message-target-origin -- BroadcastChannel has no target origin */
    const announce = () => channel.postMessage('present')
    announce()
    const timer = window.setInterval(announce, PLAYER_SCREEN_HEARTBEAT_MS)
    const onUnload = () => channel.postMessage('gone')
    /* oxlint-enable unicorn/require-post-message-target-origin */
    window.addEventListener('pagehide', onUnload)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('pagehide', onUnload)
      onUnload()
      channel.close()
    }
  }, [])
}

/** Whether a player screen window is open on this computer right now. */
export function usePlayerScreenPresent(): boolean {
  const [present, setPresent] = useState(false)
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const channel = new BroadcastChannel(PLAYER_SCREEN_CHANNEL)
    let timeout: number | undefined
    channel.addEventListener('message', (event: MessageEvent) => {
      window.clearTimeout(timeout)
      if (event.data === 'present') {
        setPresent(true)
        timeout = window.setTimeout(() => setPresent(false), PLAYER_SCREEN_HEARTBEAT_MS * 3)
      } else {
        setPresent(false)
      }
    })
    return () => {
      window.clearTimeout(timeout)
      channel.close()
    }
  }, [])
  return present
}

export const PLAYER_SCREEN_WINDOW_NAME = 'lost-hope-player-screen'

type ScreenArea = { availLeft: number; availTop: number; availWidth: number; availHeight: number }
type ScreenDetails = { screens: readonly ScreenArea[]; currentScreen: ScreenArea }
type WindowWithScreens = Window & { getScreenDetails?: () => Promise<ScreenDetails> }

/** The screen the DM is not using, when the browser can tell (Chromium browsers such as Brave). */
async function otherScreen(): Promise<ScreenArea | undefined> {
  const getScreenDetails = (window as WindowWithScreens).getScreenDetails
  if (!getScreenDetails) return undefined
  try {
    const details = await getScreenDetails.call(window)
    return details.screens.find((screen) => screen !== details.currentScreen)
  } catch {
    // The DM declined window management, or the browser does not offer it.
    return undefined
  }
}

/**
 * Opens the player screen on the other monitor, filling it, or brings the open one forward. Where
 * the browser cannot place windows, it opens a window for the DM to drag across.
 */
export async function openPlayerScreen(): Promise<void> {
  const screen = await otherScreen()
  const features = screen
    ? `popup,left=${screen.availLeft},top=${screen.availTop},width=${screen.availWidth},height=${screen.availHeight}`
    : 'popup,width=1280,height=800'
  window.open('/display', PLAYER_SCREEN_WINDOW_NAME, features)
}
