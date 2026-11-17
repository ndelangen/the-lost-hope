import { useCallback, useEffect, useRef, useState } from 'react'

import { useHullDamage } from '#/components/ship/use-hull-damage'
import {
  advanceTimer,
  brokenSlice,
  initialHullDamage,
  initialShipClock,
  parseShipClock,
  pauseTimer,
  type ShipClockState,
  type ShipDamageState,
  type ShipUnderFire,
} from '#/lib/ship-damage'

const STORAGE_PREFIX = 'the-lost-hope:dm-ship-clock:'
const TICK_MS = 250

function readClock(key: string, ship: ShipUnderFire): ShipClockState {
  try {
    return parseShipClock(localStorage.getItem(STORAGE_PREFIX + key), ship)
  } catch {
    return initialShipClock(ship)
  }
}

function clockOf({ endsAt, remainingMs, owed, damageDie }: ShipDamageState): ShipClockState {
  return { endsAt, remainingMs, owed, damageDie }
}

/**
 * One scene's ship-damage clock over its vessel's hull. The countdown is the scene's, kept in the
 * DM's browser so the scene page and its encounter agree. The damage is the vessel's, shared live
 * with the player-screen dock and the deck map. While the timer runs it advances itself and calls
 * `onHitDue` whenever a new hit fires. The clock loads after mount, so `state` is undefined on the
 * first frame.
 */
export function useShipDamage(sceneKey: string, ship: ShipUnderFire, onHitDue: () => void) {
  const [hull, updateHull] = useHullDamage(ship.vessel.key, ship)
  const [clock, setClock] = useState<ShipClockState>()
  const clockNow = useRef(clock)
  clockNow.current = clock
  const [now, setNow] = useState(() => Date.now())
  const hitDue = useRef(onHitDue)
  hitDue.current = onHitDue

  useEffect(() => setClock(readClock(sceneKey, ship)), [sceneKey, ship])
  useEffect(() => {
    if (!clock) return
    try {
      localStorage.setItem(STORAGE_PREFIX + sceneKey, JSON.stringify(clock))
    } catch {
      // The clock still runs for this visit without storage.
    }
  }, [sceneKey, clock])

  const running = clock?.endsAt !== undefined
  useEffect(() => {
    if (!running) return
    const tick = () => {
      const at = Date.now()
      setNow(at)
      setClock((current) => {
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
  const broken = brokenSlice(ship, hull) !== undefined
  useEffect(() => {
    if (broken) setClock((current) => (current ? pauseTimer(current, Date.now()) : current))
  }, [broken])

  const update = useCallback(
    (change: (current: ShipDamageState, now: number) => ShipDamageState) => {
      const current = clockNow.current
      if (!current) return
      const at = Date.now()
      setNow(at)
      let next = current
      updateHull((damage) => {
        const changed = change({ ...damage, ...current }, at)
        next = clockOf(changed)
        return { damage: changed.damage }
      })
      setClock(next)
    },
    [updateHull],
  )
  const reset = useCallback(() => {
    setClock(initialShipClock(ship))
    updateHull(() => initialHullDamage(ship))
  }, [ship, updateHull])

  return { state: clock ? { ...hull, ...clock } : undefined, now, update, reset }
}
