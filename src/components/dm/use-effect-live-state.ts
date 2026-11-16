import { useCallback, useEffect, useState } from 'react'

import { initialLiveState, type EffectLiveState } from '#/lib/effect-reminders'

const STORAGE_KEY = 'the-lost-hope:dm-effects'

function readState(fallbackDay: number): EffectLiveState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as Partial<EffectLiveState>) : undefined
    if (
      parsed &&
      typeof parsed.day === 'number' &&
      parsed.met &&
      typeof parsed.met === 'object' &&
      parsed.ended &&
      typeof parsed.ended === 'object'
    ) {
      return {
        day: Math.max(parsed.day, fallbackDay),
        met: parsed.met,
        ended: parsed.ended,
        fired: parsed.fired,
      }
    }
  } catch {
    // Storage can be unavailable or hold an older shape; start fresh.
  }
  return initialLiveState(fallbackDay)
}

/** The DM's browser-local live effect state, starting from the latest recorded campaign day. */
export function useEffectLiveState(campaignDay: number) {
  const [state, setState] = useState<EffectLiveState>()

  useEffect(() => setState(readState(campaignDay)), [campaignDay])
  useEffect(() => {
    if (!state) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Live state is a convenience; the dashboard keeps working without storage.
    }
  }, [state])

  const update = useCallback(
    (change: (current: EffectLiveState) => EffectLiveState) =>
      setState((current) => (current ? change(current) : current)),
    [],
  )
  const reset = useCallback(() => setState(initialLiveState(campaignDay)), [campaignDay])

  return { state, update, reset }
}
