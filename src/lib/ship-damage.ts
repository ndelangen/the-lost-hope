import { SHIP_DAMAGE_DICE, type SceneShipDamage, type ShipDamageDie } from '#/definitions/scene'

/**
 * Where a ship-damage clock stands at the table. Times are epoch milliseconds, so the clock keeps
 * running while the DM is on another page.
 */
export type ShipDamageState = {
  /** Damage per sector: port from bow to stern, then starboard from bow to stern. */
  damage: number[]
  /** When the running timer next fires. Undefined while it is paused. */
  endsAt?: number
  /** Time left on a paused timer. */
  remainingMs: number
  /** Hits that have fired and still need a sector. */
  owed: number
  /** The die the DM rolls a hit's damage on at the table. It starts as the scene's die. */
  damageDie: ShipDamageDie
}

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
export function sliceCount(ship: SceneShipDamage) {
  return ship.port.length
}

function periodMs(ship: SceneShipDamage) {
  return ship.everySeconds * 1000
}

export function initialShipDamage(ship: SceneShipDamage): ShipDamageState {
  return {
    damage: Array.from({ length: sliceCount(ship) * 2 }, () => 0),
    remainingMs: periodMs(ship),
    owed: 0,
    damageDie: ship.damageDie,
  }
}

function isDamageDie(value: unknown): value is ShipDamageDie {
  return SHIP_DAMAGE_DICE.some((sides) => sides === value)
}

/** Read stored state, falling back to a fresh clock when it does not fit this ship. */
export function parseShipDamage(raw: string | null, ship: SceneShipDamage): ShipDamageState {
  const fresh = initialShipDamage(ship)
  if (!raw) return fresh
  try {
    const parsed = JSON.parse(raw) as Partial<ShipDamageState>
    const damage = parsed.damage
    if (
      !Array.isArray(damage) ||
      damage.length !== fresh.damage.length ||
      !damage.every((value) => Number.isInteger(value) && value >= 0) ||
      typeof parsed.remainingMs !== 'number' ||
      typeof parsed.owed !== 'number'
    ) {
      return fresh
    }
    return {
      damage: damage.map((value) => Math.min(value, ship.sectorHitPoints)),
      endsAt: typeof parsed.endsAt === 'number' ? parsed.endsAt : undefined,
      remainingMs: Math.min(Math.max(parsed.remainingMs, 0), periodMs(ship)),
      owed: Math.max(0, Math.trunc(parsed.owed)),
      damageDie: isDamageDie(parsed.damageDie) ? parsed.damageDie : fresh.damageDie,
    }
  } catch {
    return fresh
  }
}

export function startTimer(state: ShipDamageState, now: number): ShipDamageState {
  if (state.endsAt !== undefined) return state
  return { ...state, endsAt: now + state.remainingMs }
}

export function pauseTimer(state: ShipDamageState, now: number): ShipDamageState {
  if (state.endsAt === undefined) return state
  return { ...state, endsAt: undefined, remainingMs: Math.max(0, state.endsAt - now) }
}

/** Time until the next hit. */
export function remainingMs(state: ShipDamageState, now: number) {
  return state.endsAt === undefined ? state.remainingMs : Math.max(0, state.endsAt - now)
}

/**
 * Bring a running timer up to `now`: every interval that has passed owes one hit, and the timer
 * restarts by itself. Returns the same state when nothing fired.
 */
export function advanceTimer(
  state: ShipDamageState,
  ship: SceneShipDamage,
  now: number,
): ShipDamageState {
  if (state.endsAt === undefined || now < state.endsAt) return state
  const fired = Math.floor((now - state.endsAt) / periodMs(ship)) + 1
  return { ...state, endsAt: state.endsAt + fired * periodMs(ship), owed: state.owed + fired }
}

function withDamage(state: ShipDamageState, ship: SceneShipDamage, index: number, delta: number) {
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
  ship: SceneShipDamage,
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
export function adjustSector(
  state: ShipDamageState,
  ship: SceneShipDamage,
  index: number,
  delta: number,
): ShipDamageState {
  return { ...state, damage: withDamage(state, ship, index, delta) }
}

/** Every sector with its damage: port from bow to stern, then starboard. */
export function shipSectors(ship: SceneShipDamage, state: ShipDamageState): ShipSectorView[] {
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
export function sliceStatuses(ship: SceneShipDamage, state: ShipDamageState): SliceStatus[] {
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
export function brokenSlice(ship: SceneShipDamage, state: ShipDamageState): number | undefined {
  const slice = sliceStatuses(ship, state).indexOf('broken')
  return slice === -1 ? undefined : slice
}

/**
 * Roll the die for the slice that is hit, from 0 at the bow. `random` is a number from 0 up to but
 * not including 1.
 */
export function rollSlice(ship: SceneShipDamage, random: number): number {
  return Math.floor(random * sliceCount(ship))
}

/** `2:05` for a countdown. Rounds up, so the display reaches 0:00 only when the hit fires. */
export function formatCountdown(ms: number) {
  const seconds = Math.ceil(Math.max(0, ms) / 1000)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}
