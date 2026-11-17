import { useCallback, useEffect, useRef, useState } from 'react'

import {
  advanceTimer,
  brokenSlice,
  initialShipDamage,
  parseShipDamage,
  pauseTimer,
  type ShipDamageState,
  type ShipUnderFire,
} from '#/lib/ship-damage'

const STORAGE_PREFIX = 'the-lost-hope:dm-ship-damage:'
const TICK_MS = 250

function readState(key: string, ship: ShipUnderFire): ShipDamageState {
  try {
    return parseShipDamage(localStorage.getItem(STORAGE_PREFIX + key), ship)
  } catch {
    return initialShipDamage(ship)
  }
}

/**
 * One scene's ship-damage clock, kept in the DM's browser so the scene page and its encounter show
 * the same ship. While the timer runs it advances itself and calls `onHitDue` whenever a new hit
 * fires. State loads after mount, so `state` is undefined on the first frame.
 */
export function useShipDamage(sceneKey: string, ship: ShipUnderFire, onHitDue: () => void) {
  const [state, setState] = useState<ShipDamageState>()
  const [now, setNow] = useState(() => Date.now())
  const hitDue = useRef(onHitDue)
  hitDue.current = onHitDue

  useEffect(() => setState(readState(sceneKey, ship)), [sceneKey, ship])
  useEffect(() => {
    if (!state) return
    try {
      localStorage.setItem(STORAGE_PREFIX + sceneKey, JSON.stringify(state))
    } catch {
      // The clock still runs for this visit without storage.
    }
  }, [sceneKey, state])

  const running = state?.endsAt !== undefined
  useEffect(() => {
    if (!running) return
    const tick = () => {
      const at = Date.now()
      setNow(at)
      setState((current) => {
        if (!current) return current
        const advanced = advanceTimer(current, ship, at)
        if (advanced.owed > current.owed) hitDue.current()
        return advanced
      })
    }
    tick()
    const timer = setInterval(tick, TICK_MS)
    return () => clearInterval(timer)
  }, [running, ship])

  // A ship that is cut in two takes no more hits.
  const broken = state ? brokenSlice(ship, state) !== undefined : false
  useEffect(() => {
    if (broken) setState((current) => (current ? pauseTimer(current, Date.now()) : current))
  }, [broken])

  const update = useCallback(
    (change: (current: ShipDamageState, now: number) => ShipDamageState) => {
      const at = Date.now()
      setNow(at)
      setState((current) => (current ? change(current, at) : current))
    },
    [],
  )
  const reset = useCallback(() => setState(initialShipDamage(ship)), [ship])

  return { state, now, update, reset }
}
