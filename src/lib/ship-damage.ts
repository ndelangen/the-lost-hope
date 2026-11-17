import type { ShipHull } from '#/definitions/item'
import { SHIP_DAMAGE_DICE, type SceneShipDamage, type ShipDamageDie } from '#/definitions/scene'

/** A scene's damage pacing together with the hull of the vessel it is fought aboard. */
export type ShipUnderFire = SceneShipDamage & ShipHull

/**
 * How damaged a vessel's sectors are: port from bow to stern, then starboard from bow to stern.
 * It belongs to the vessel, so the scene clock, the player-screen dock and the deck map on the
 * player screen all show the same ship.
 */
export type HullDamage = {
  damage: number[]
}

/**
 * Where a scene's ship-damage clock stands at the table. Times are epoch milliseconds, so the
 * clock keeps running while the DM is on another page.
 */
export type ShipClockState = {
  /** When the running timer next fires. Undefined while it is paused. */
  endsAt?: number
  /** Time left on a paused timer. */
  remainingMs: number
  /** Hits that have fired and still need a sector. */
  owed: number
  /** The die the DM rolls a hit's damage on at the table. It starts as the scene's die. */
  damageDie: ShipDamageDie
}

/** A ship under fire as the clock sees it: its hull damage together with the scene's clock. */
export type ShipDamageState = HullDamage & ShipClockState

export type ShipSide = 'port' | 'starboard'

export type ShipSectorView = {
  /** Where this sector's damage is stored. */
  index: number
  name: string
  side: ShipSide
  /** Position from bow to stern, from 0. The die shows this plus one. */
  slice: number
  escapePods: boolean
  damage: number
  destroyed: boolean
}

/** How many slices the ship has from bow to stern, which is also the size of the die. */
export function sliceCount(ship: ShipHull) {
  return ship.port.length
}

function periodMs(ship: ShipUnderFire) {
  return ship.everySeconds * 1000
}

export function initialHullDamage(hull: ShipHull): HullDamage {
  return { damage: Array.from({ length: sliceCount(hull) * 2 }, () => 0) }
}

export function initialShipClock(ship: ShipUnderFire): ShipClockState {
  return { remainingMs: periodMs(ship), owed: 0, damageDie: ship.damageDie }
}

export function initialShipDamage(ship: ShipUnderFire): ShipDamageState {
  return { ...initialHullDamage(ship), ...initialShipClock(ship) }
}

function isDamageDie(value: unknown): value is ShipDamageDie {
  return SHIP_DAMAGE_DICE.some((sides) => sides === value)
}

/** Read stored hull damage, falling back to an undamaged hull when it does not fit this ship. */
export function parseHullDamage(raw: string | null, hull: ShipHull): HullDamage {
  const fresh = initialHullDamage(hull)
  if (!raw) return fresh
  try {
    const { damage } = JSON.parse(raw) as Partial<HullDamage>
    if (
      !Array.isArray(damage) ||
      damage.length !== fresh.damage.length ||
      !damage.every((value) => Number.isInteger(value) && value >= 0)
    ) {
      return fresh
    }
    return { damage: damage.map((value) => Math.min(value, hull.sectorHitPoints)) }
  } catch {
    return fresh
  }
}

/** Read a stored clock, falling back to a fresh one when it does not fit this scene. */
export function parseShipClock(raw: string | null, ship: ShipUnderFire): ShipClockState {
  const fresh = initialShipClock(ship)
  if (!raw) return fresh
  try {
    const parsed = JSON.parse(raw) as Partial<ShipClockState>
    if (typeof parsed.remainingMs !== 'number' || typeof parsed.owed !== 'number') return fresh
    return {
      endsAt: typeof parsed.endsAt === 'number' ? parsed.endsAt : undefined,
      remainingMs: Math.min(Math.max(parsed.remainingMs, 0), periodMs(ship)),
      owed: Math.max(0, Math.trunc(parsed.owed)),
      damageDie: isDamageDie(parsed.damageDie) ? parsed.damageDie : fresh.damageDie,
    }
  } catch {
    return fresh
  }
}

export function startTimer<T extends ShipClockState>(state: T, now: number): T {
  if (state.endsAt !== undefined) return state
  return { ...state, endsAt: now + state.remainingMs }
}

export function pauseTimer<T extends ShipClockState>(state: T, now: number): T {
  if (state.endsAt === undefined) return state
  return { ...state, endsAt: undefined, remainingMs: Math.max(0, state.endsAt - now) }
}

/** Time until the next hit. */
export function remainingMs(state: ShipClockState, now: number) {
  return state.endsAt === undefined ? state.remainingMs : Math.max(0, state.endsAt - now)
}

/**
 * Bring a running timer up to `now`: every interval that has passed owes one hit, and the timer
 * restarts by itself. Returns the same state when nothing fired.
 */
export function advanceTimer<T extends ShipClockState>(
  state: T,
  ship: ShipUnderFire,
  now: number,
): T {
  if (state.endsAt === undefined || now < state.endsAt) return state
  const fired = Math.floor((now - state.endsAt) / periodMs(ship)) + 1
  return { ...state, endsAt: state.endsAt + fired * periodMs(ship), owed: state.owed + fired }
}

function withDamage(state: HullDamage, ship: ShipHull, index: number, delta: number) {
  const current = state.damage[index]
  if (current === undefined) return state.damage
  const next = Math.min(ship.sectorHitPoints, Math.max(0, current + delta))
  return state.damage.map((value, at) => (at === index ? next : value))
}

/** Pick the die that hits are rolled on from now on. */
export function setDamageDie(state: ShipDamageState, damageDie: ShipDamageDie): ShipDamageState {
  return { ...state, damageDie }
}

/**
 * Roll a hit's damage on a die with this many sides. `random` is a number from 0 up to but not
 * including 1.
 */
export function rollDamage(die: ShipDamageDie, random: number): number {
  return Math.floor(random * die) + 1
}

/** One hit lands on a sector: it takes the rolled damage and settles one owed hit. */
export function hitSector(
  state: ShipDamageState,
  ship: ShipUnderFire,
  index: number,
  damage: number,
): ShipDamageState {
  return {
    ...state,
    damage: withDamage(state, ship, index, damage),
    owed: Math.max(0, state.owed - 1),
  }
}

/** Correct a sector by hand, without settling a hit. */
export function adjustSector<T extends HullDamage>(
  state: T,
  ship: ShipHull,
  index: number,
  delta: number,
): T {
  return { ...state, damage: withDamage(state, ship, index, delta) }
}

/** Set a sector's damage by hand, from nothing up to its hit points. */
export function setSectorDamage<T extends HullDamage>(
  state: T,
  ship: ShipHull,
  index: number,
  value: number,
): T {
  const current = state.damage[index]
  if (current === undefined || !Number.isFinite(value)) return state
  return adjustSector(state, ship, index, Math.trunc(value) - current)
}

/**
 * Mark a sector destroyed, which fills its damage, or standing again, which leaves it one hit
 * point short. Destroyed is never stored apart from the damage, so the two cannot disagree.
 */
export function setSectorDestroyed<T extends HullDamage>(
  state: T,
  ship: ShipHull,
  index: number,
  destroyed: boolean,
): T {
  const current = state.damage[index]
  if (current === undefined) return state
  const standing = current < ship.sectorHitPoints
  if (destroyed === !standing) return state
  return setSectorDamage(
    state,
    ship,
    index,
    destroyed ? ship.sectorHitPoints : ship.sectorHitPoints - 1,
  )
}

/** Every sector with its damage: port from bow to stern, then starboard. */
export function shipSectors(ship: ShipHull, state: HullDamage): ShipSectorView[] {
  return (['port', 'starboard'] as const).flatMap((side, row) =>
    ship[side].map((sector, slice) => {
      const index = row * ship.port.length + slice
      const damage = state.damage[index] ?? 0
      return {
        index,
        name: sector.name,
        side,
        slice,
        escapePods: sector.escapePods,
        damage,
        destroyed: damage >= ship.sectorHitPoints,
      }
    }),
  )
}

/** How worn a sector looks, from 0 (untouched) to 1 (destroyed). */
export function sectorWear(sector: ShipSectorView, hitPoints: number) {
  return sector.destroyed ? 1 : Math.min(1, sector.damage / hitPoints)
}

export type SliceStatus =
  /** Both sectors stand. */
  | 'intact'
  /** One sector is destroyed, and the other survives the next hit whatever the die shows. */
  | 'holding'
  /** One sector is destroyed, and a high roll on the next hit destroys the other. */
  | 'threatened'
  /** One sector is destroyed, and the next hit destroys the other whatever the die shows. */
  | 'critical'
  /** Both sectors are destroyed: the ship is cut in two here. */
  | 'broken'

/** How each slice holds together, from bow to stern. */
export function sliceStatuses(ship: ShipHull, state: ShipDamageState): SliceStatus[] {
  const sectors = shipSectors(ship, state)
  return ship.port.map((_, slice) => {
    const pair = sectors.filter((sector) => sector.slice === slice)
    const standing = pair.filter((sector) => !sector.destroyed)
    if (standing.length === 0) return 'broken'
    if (standing.length === pair.length) return 'intact'
    const fallsTo = (damage: number) =>
      standing.every((sector) => sector.damage + damage >= ship.sectorHitPoints)
    if (fallsTo(1)) return 'critical'
    return fallsTo(state.damageDie) ? 'threatened' : 'holding'
  })
}

/** The slice where the ship is cut in two, from 0 at the bow. Undefined while it holds together. */
export function brokenSlice(ship: ShipHull, state: HullDamage): number | undefined {
  const sectors = shipSectors(ship, state)
  const slice = ship.port.findIndex((_, at) =>
    sectors.every((sector) => sector.slice !== at || sector.destroyed),
  )
  return slice === -1 ? undefined : slice
}

/**
 * Roll the die for the slice that is hit, from 0 at the bow. `random` is a number from 0 up to but
 * not including 1.
 */
export function rollSlice(ship: ShipHull, random: number): number {
  return Math.floor(random * sliceCount(ship))
}

/** `2:05` for a countdown. Rounds up, so the display reaches 0:00 only when the hit fires. */
export function formatCountdown(ms: number) {
  const seconds = Math.ceil(Math.max(0, ms) / 1000)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

/**
 * Roughly how many minutes of play a fresh ship lasts on a damage die, when the DM spreads the
 * hits to keep it afloat: each hit goes to the weaker-hit side of the rolled slice. Averaged over
 * a fixed set of simulated fights.
 */
export function estimatedMinutesToBreak(ship: ShipUnderFire, die: ShipDamageDie, runs = 2000) {
  // mulberry32, seeded, so every render gives the same estimate.
  let seed = 1
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const slices = sliceCount(ship)
  let totalHits = 0
  for (let run = 0; run < runs; run += 1) {
    const damage = Array.from({ length: slices * 2 }, () => 0)
    const down = (index: number) => damage[index]! >= ship.sectorHitPoints
    for (;;) {
      totalHits += 1
      const slice = rollSlice(ship, random())
      const port = slice
      const starboard = slices + slice
      const target = down(port)
        ? starboard
        : down(starboard) || damage[port]! <= damage[starboard]!
          ? port
          : starboard
      damage[target] = damage[target]! + rollDamage(die, random())
      if (down(port) && down(starboard)) break
    }
  }
  return Math.round(((totalHits / runs) * ship.everySeconds) / 60)
}
