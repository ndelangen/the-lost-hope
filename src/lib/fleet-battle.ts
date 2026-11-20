import type { FleetMarker, FleetRoster } from './fleet-roster'
import { fleetShips } from './fleet-sequence'

/** A point on the battle map, in the pixels of the region map it is drawn over. */
export type Vec = { x: number; y: number }

export type BattleGeometry = {
  /** Where the fleet launches from. */
  home: Vec
  /** Where the radar is centred. */
  centre: Vec
  /** Where the flying fortress is when the fleet sights it. */
  fortress: Vec
  /** Where the fortress flees to; it is gone from the radar when it gets there. */
  escape: Vec
}

/** The key volleys use for the flying fortress, as a shooter or a target. */
export const FORTRESS = '@fortress'

export type BattleShip = {
  key: string
  name: string
  icon: string
  /** 0 for the owner's side, then each rival side, at the end of the battle. */
  side: number
  lost: boolean
  launchAt: number
  /** When it breaks formation to join the side that takes it; absent for ships that stay. */
  turnAt?: number
  lostAt?: number
  /** Its place in the chasing formation, relative to the formation's anchor. */
  slot: Vec
  /** Its place in its side's line once the fleet has split, relative to the fortress. */
  line: Vec
  markers: FleetMarker[]
  /** A small phase offset so the lines do not bob in step. */
  phase: number
}

export type Volley = {
  /** A ship's key, or FORTRESS. */
  from: string
  /** A ship's key, or FORTRESS. */
  to: string
  at: number
  flight: number
  kind: 'hail' | 'heavy' | 'beam'
  /** How many shots a hail throws, spread around the target. */
  count: number
  seed: number
}

/** One portrait crossing from one ship to another during the battle, such as a boarder. */
export type Crossing = {
  marker: string
  avatar: string
  from: string
  to: string
  at: number
  duration: number
}

export type BattleCaption = { at: number; text: string }

export type BattlePlan = {
  geometry: BattleGeometry
  ships: BattleShip[]
  volleys: Volley[]
  crossings: Crossing[]
  captions: BattleCaption[]
  times: {
    /** The first ship leaves home. */
    launch: number
    /** The leading ships are in range of the fortress and open fire. */
    assault: number
    /** The first ship turns. */
    advanceEnd: number
    /** The last ship has turned and the sides are even. */
    split: number
    /** The lines are formed and the fight between the ships begins. */
    battle: number
    ceaseFire: number
    end: number
  }
}

export const BATTLE_TIMING = {
  boot: 2.2,
  launchStagger: 0.2,
  launchFlight: 3.2,
  assaultAfterLaunch: 2.6,
  assaultHold: 3,
  turnStagger: 0.8,
  turnFlight: 2,
  formLines: 1.5,
  lossStagger: 1.15,
  firstLoss: 1.5,
  heavyFlight: 1.3,
  hailFlight: 0.55,
  beamFlight: 0.35,
  boardingFlight: 2.2,
  boardingStagger: 1.1,
  hold: 5,
} as const

/**
 * The fleet battle as a chase: the fleet launches from home and opens fire on the flying fortress,
 * which is hit and starts to break away. The ships that change hands turn one by one and fall back
 * to cover its escape until the sides are even. The lines fight on as the fortress flees, and the
 * lost ships go down, alternating sides, until the fortress is gone. Everything is drawn from the
 * plan by time alone.
 */
export function battlePlan(roster: FleetRoster, geometry: BattleGeometry, seed = 7): BattlePlan {
  const random = mulberry32(seed)
  const t = BATTLE_TIMING
  const entries = fleetShips(roster)

  const launch = t.boot
  const assault = launch + t.assaultAfterLaunch
  const advanceEnd = launch + entries.length * t.launchStagger + t.launchFlight + t.assaultHold
  const turning = entries.filter(({ side }) => side > 0)
  const split = advanceEnd + turning.length * t.turnStagger + t.turnFlight
  const battle = split + t.formLines

  const turnOrder = shuffle(turning, random).map(({ ship }) => ship.key)
  const lines = roster.sides.map((_, side) =>
    entries.filter((entry) => entry.side === side).map(({ ship }) => ship.key),
  )
  const lossOrder = interleave(
    roster.sides.map((_, side) =>
      shuffle(
        entries.filter((entry) => entry.side === side && entry.ship.status === 'destroyed'),
        random,
      ).map(({ ship }) => ship.key),
    ),
  )
  const lostAt = new Map(
    lossOrder.map((key, index) => [key, battle + t.firstLoss + index * t.lossStagger]),
  )
  const lastLoss = Math.max(battle, ...lostAt.values())
  const ceaseFire = lastLoss + 1.2
  const end = ceaseFire + t.hold

  const { along, across } = axes(geometry)
  const ships: BattleShip[] = entries.map(({ ship, side }, index) => {
    const turnIndex = turnOrder.indexOf(ship.key)
    const lineIndex = lines[side]!.indexOf(ship.key)
    return {
      key: ship.key,
      name: ship.name,
      icon: ship.icon,
      side,
      lost: ship.status === 'destroyed',
      launchAt: launch + index * t.launchStagger,
      turnAt: turnIndex < 0 ? undefined : advanceEnd + turnIndex * t.turnStagger,
      lostAt: lostAt.get(ship.key),
      slot: formationSlot(index, along, across),
      line: lineSlot(side, lineIndex, lines[side]!.length, along, across),
      markers: ship.aboard,
      phase: random() * Math.PI * 2,
    }
  })

  const plan: BattlePlan = {
    geometry,
    ships,
    volleys: [],
    crossings: [],
    captions: [],
    times: { launch, assault, advanceEnd, split, battle, ceaseFire, end },
  }
  plan.volleys = planVolleys(plan, random)
  plan.crossings = planCrossings(plan)
  plan.captions = planCaptions(plan, roster)
  return plan
}

/** The chase runs from home toward the escape point; across is square to it. */
function axes(geometry: BattleGeometry): { along: Vec; across: Vec } {
  const along = unit(sub(geometry.escape, geometry.home))
  return { along, across: { x: -along.y, y: along.x } }
}

const FORMATION_COLUMNS = 4
const FORMATION_SPACING = { along: 58, across: 66 }
const LINE_SPACING = { along: 70, across: 104 }
/** How far behind the fortress each side's line holds: the Hand close in, the owner beyond. */
const LINE_DEPTH = { rival: 170, owner: 400 }
/** How far behind the fortress the chasing formation holds while it is under fire. */
const STANDOFF = 300

function formationSlot(index: number, along: Vec, across: Vec): Vec {
  const row = Math.floor(index / FORMATION_COLUMNS)
  const column = (index % FORMATION_COLUMNS) - (FORMATION_COLUMNS - 1) / 2
  return add(
    scale(along, -row * FORMATION_SPACING.along),
    scale(across, column * FORMATION_SPACING.across),
  )
}

function lineSlot(side: number, index: number, count: number, along: Vec, across: Vec): Vec {
  const perRow = Math.ceil(count / 2)
  const row = Math.floor(index / perRow)
  const column = (index % perRow) - (perRow - 1) / 2 + (row === 1 ? 0.5 : 0)
  const depth =
    side === 0
      ? LINE_DEPTH.owner + row * LINE_SPACING.along
      : LINE_DEPTH.rival - row * LINE_SPACING.along * 0.8
  return add(scale(along, -depth), scale(across, column * LINE_SPACING.across))
}

/**
 * Where the fortress is: it drifts away slowly while the fleet closes in and fires on it, then,
 * once its new escort is in place, it pulls away for good and is gone by the end.
 */
export function fortressAt(plan: BattlePlan, time: number): Vec {
  const { fortress, escape } = plan.geometry
  const { split, end } = plan.times
  const drift = 0.1 * clamp01(time / split)
  const flight = 0.9 * easeIn(clamp01((time - split) / (end - split)))
  return lerp(fortress, escape, drift + flight)
}

/** Where the chasing formation is centred: it sails out from home and settles behind the fortress. */
export function formationAnchor(plan: BattlePlan, time: number): Vec {
  const { home } = plan.geometry
  const { along } = axes(plan.geometry)
  const behind = sub(fortressAt(plan, time), scale(along, STANDOFF))
  const progress = clamp01(
    (time - plan.times.launch) / (plan.times.assault + 1.5 - plan.times.launch),
  )
  return lerp(add(home, scale(along, 120)), behind, easeInOut(progress))
}

export type ShipPose = {
  pos: Vec
  /** Unit vector the bow points along. */
  heading: Vec
  /** Which side's colours it flies at this moment. */
  side: number
  state: 'hidden' | 'sailing' | 'wreck'
  /** 0 to 1 while it fades into a wreck. */
  sinking: number
}

/** Where a ship is and which colours it flies at a moment of the battle. */
export function shipPose(plan: BattlePlan, ship: BattleShip, time: number): ShipPose {
  const pos = shipPosition(plan, ship, time)
  const before = shipPosition(plan, ship, time - 0.08)
  const motion = sub(pos, before)
  const { along } = axes(plan.geometry)
  const turned = ship.turnAt !== undefined && time >= ship.turnAt + 0.25
  // The fleet chases toward the fortress; the turned ships face back at their pursuers.
  const facing = turned ? scale(along, -1) : along
  const heading = length(motion) > 0.6 && !turned ? unit(motion) : facing
  const side = ship.turnAt === undefined || turned ? ship.side : 0
  const state =
    time < ship.launchAt
      ? 'hidden'
      : ship.lostAt !== undefined && time >= ship.lostAt
        ? 'wreck'
        : 'sailing'
  const sinking = ship.lostAt === undefined ? 0 : clamp01((time - ship.lostAt) / 1.6)
  return { pos, heading, side, state, sinking }
}

function shipPosition(plan: BattlePlan, ship: BattleShip, time: number): Vec {
  // A wreck stays where it went down, falling away below the chase.
  if (ship.lostAt !== undefined && time > ship.lostAt) {
    const fall = time - ship.lostAt
    return add(shipPosition(plan, ship, ship.lostAt), { x: fall * 4, y: fall * fall * 6 })
  }
  const t = BATTLE_TIMING
  const { times } = plan
  const inFormation = add(formationAnchor(plan, time), ship.slot)
  let pos =
    time < ship.launchAt + t.launchFlight
      ? lerp(
          plan.geometry.home,
          inFormation,
          easeOut(clamp01((time - ship.launchAt) / t.launchFlight)),
        )
      : inFormation
  // The owner's ships give up the chase when the shooting stops; the escort sails on with it.
  const pursuit = ship.turnAt === undefined ? Math.min(time, times.ceaseFire - 0.5) : time
  const inLine = add(fortressAt(plan, pursuit), ship.line)
  if (ship.turnAt !== undefined && time >= ship.turnAt) {
    pos = curve(pos, inLine, easeInOut(clamp01((time - ship.turnAt) / t.turnFlight)), 0.8)
  } else if (ship.turnAt === undefined && time >= times.split) {
    pos = lerp(pos, inLine, easeInOut(clamp01((time - times.split) / t.formLines)))
  }
  if (time >= times.assault) {
    const sway = Math.min(1, (time - times.assault) / 2)
    pos = add(pos, {
      x: Math.sin(time * 0.9 + ship.phase) * 7 * sway,
      y: Math.cos(time * 0.7 + ship.phase) * 5 * sway,
    })
  }
  return pos
}

/** Where a volley's shooter or target is at a moment: a ship, or the fortress. */
export function pointOf(plan: BattlePlan, key: string, time: number): Vec {
  if (key === FORTRESS) return fortressAt(plan, time)
  const ship = plan.ships.find((entry) => entry.key === key)
  return ship ? shipPose(plan, ship, time).pos : fortressAt(plan, time)
}

/** Every ship still fighting at a moment. */
export function aliveAt(plan: BattlePlan, time: number): BattleShip[] {
  return plan.ships.filter(
    (ship) => time >= ship.launchAt && (ship.lostAt === undefined || time < ship.lostAt),
  )
}

/** How many ships fly each side's colours, and how many are lost, at a moment. */
export function battleCounts(
  plan: BattlePlan,
  time: number,
  sides: number,
): { flying: number[]; lost: number } {
  const flying = Array.from({ length: sides }, () => 0)
  let lost = 0
  for (const ship of plan.ships) {
    const pose = shipPose(plan, ship, time)
    if (pose.state === 'wreck') lost += 1
    else if (pose.state === 'sailing') flying[pose.side]! += 1
  }
  return { flying, lost }
}

export type LegendStatus = 'docked' | 'in service' | 'destroyed'

export type LegendRow = {
  key: string
  name: string
  icon: string
  /** The side whose colours it flies now, or flew when it went down. */
  side: number
  /** Whether it has changed hands by now. */
  turned: boolean
  status: LegendStatus
}

/**
 * The legend at a moment: every ship with the side it flies for and whether it is still in the
 * fight. Each side's ships in service come first, then its losses, each in launch order.
 */
export function legendAt(plan: BattlePlan, time: number): LegendRow[] {
  const rank: Record<LegendStatus, number> = { 'in service': 0, docked: 1, destroyed: 2 }
  return plan.ships
    .map((ship): LegendRow => {
      const pose = shipPose(plan, ship, time)
      const status: LegendStatus =
        pose.state === 'hidden' ? 'docked' : pose.state === 'wreck' ? 'destroyed' : 'in service'
      return {
        key: ship.key,
        name: ship.name,
        icon: ship.icon,
        side: pose.side,
        turned: pose.side !== 0,
        status,
      }
    })
    .map((row, order) => ({ row, order }))
    .toSorted(
      (a, b) =>
        a.row.side - b.row.side || rank[a.row.status] - rank[b.row.status] || a.order - b.order,
    )
    .map(({ row }) => row)
}

/** The caption on screen at a moment: the latest that has started. */
export function captionAt(plan: BattlePlan, time: number): BattleCaption | undefined {
  return plan.captions.findLast((caption) => caption.at <= time)
}

function planVolleys(plan: BattlePlan, random: () => number): Volley[] {
  const t = BATTLE_TIMING
  const { assault, battle, ceaseFire } = plan.times
  const volleys: Volley[] = []
  const sideAt = (ship: BattleShip, at: number) =>
    ship.turnAt !== undefined && at >= ship.turnAt + 0.25 ? ship.side : 0
  const fire = (from: string, to: string, at: number, heavy: boolean) =>
    volleys.push({
      from,
      to,
      at,
      flight: heavy ? t.heavyFlight : t.hailFlight + random() * 0.2,
      kind: heavy ? 'heavy' : 'hail',
      count: heavy ? 1 : 7 + Math.floor(random() * 8),
      seed: Math.floor(random() * 1e9),
    })

  for (const ship of plan.ships) {
    const stop = Math.min(ceaseFire, ship.lostAt ?? Infinity)
    const start = Math.max(assault, ship.launchAt + t.launchFlight) + random()
    for (let at = start; at < stop; at += 0.6 + random() * 0.7) {
      const side = sideAt(ship, at)
      // Before the sides are formed, the fleet's guns are on the fortress; after, mostly on ships.
      const enemies = aliveAt(plan, at + t.heavyFlight).filter(
        (other) => sideAt(other, at) !== side && sideAt(other, at + t.heavyFlight) !== side,
      )
      const onFortress = side === 0 && (at < battle ? random() < 0.75 : random() < 0.3)
      if (onFortress || enemies.length === 0) {
        if (side === 0) fire(ship.key, FORTRESS, at, random() < 0.3)
        continue
      }
      fire(ship.key, enemies[Math.floor(random() * enemies.length)]!.key, at, random() < 0.2)
    }
  }
  // The fortress answers with beams at the ships closing on it.
  for (let at = assault + 1; at < ceaseFire; at += 1.4 + random() * 1.2) {
    const targets = aliveAt(plan, at).filter((ship) => sideAt(ship, at) === 0)
    const target = targets[Math.floor(random() * targets.length)]
    if (!target) continue
    volleys.push({
      from: FORTRESS,
      to: target.key,
      at,
      flight: t.beamFlight,
      kind: 'beam',
      count: 1,
      seed: Math.floor(random() * 1e9),
    })
  }
  // The killing blow: a heavy shot from the other side lands as each lost ship goes down.
  for (const ship of plan.ships) {
    if (ship.lostAt === undefined) continue
    const shooters = aliveAt(plan, ship.lostAt).filter(
      (other) => sideAt(other, ship.lostAt!) !== ship.side,
    )
    const shooter = shooters[Math.floor(random() * shooters.length)]
    if (!shooter) continue
    for (const offset of [0, 0.18]) {
      volleys.push({
        from: shooter.key,
        to: ship.key,
        at: ship.lostAt - t.heavyFlight - offset,
        flight: t.heavyFlight,
        kind: 'heavy',
        count: 1,
        seed: Math.floor(random() * 1e9),
      })
    }
  }
  return volleys.toSorted((a, b) => a.at - b.at)
}

function planCrossings(plan: BattlePlan): Crossing[] {
  const owners = plan.ships.filter((ship) => ship.side === 0)
  const flagship = owners.find((ship) => ship.markers.length > 0) ?? owners[0]
  if (!flagship) return []
  // Boarders cross one at a time, each leaving as the one before is halfway over.
  const boarders = plan.ships.flatMap((ship) =>
    ship.side === 0
      ? []
      : ship.markers.flatMap((marker) =>
          marker.avatars.map((avatar) => ({ marker: marker.id, avatar, to: ship.key })),
        ),
  )
  return boarders.map((boarder, index) => ({
    ...boarder,
    from: flagship.key,
    at: plan.times.battle + 0.4 + index * BATTLE_TIMING.boardingStagger,
    duration: BATTLE_TIMING.boardingFlight,
  }))
}

function planCaptions(plan: BattlePlan, roster: FleetRoster): BattleCaption[] {
  const { launch, assault, advanceEnd, split, battle, ceaseFire } = plan.times
  const rivals = roster.sides.slice(1)
  const turned = plan.ships.filter((ship) => ship.turnAt !== undefined).length
  const remaining = plan.ships.filter((ship) => !ship.lost).length
  const captions: BattleCaption[] = [
    { at: 0.4, text: 'Contact: the flying fortress' },
    { at: launch, text: `${roster.owner.name} fleet launching: ${plan.ships.length} contacts` },
    { at: assault, text: 'Fleet engaging the fortress' },
    { at: assault + 3.5, text: 'The fortress is hit and breaking away' },
  ]
  if (turned > 0) {
    captions.push({
      at: advanceEnd,
      text: `Contacts turning: ${rivals.map((side) => side.name).join(', ')}`,
    })
    captions.push({
      at: advanceEnd + (split - advanceEnd) / 2,
      text: `${rivals.map((side) => side.name).join(', ')} covering the fortress`,
    })
    captions.push({
      at: split,
      text: `The fleet is split: ${roster.sides.map((side) => side.ships.length).join(' against ')}`,
    })
  }
  if (plan.crossings.length > 0) captions.push({ at: battle + 0.4, text: 'Boarding party away' })
  captions.push({ at: battle + 4, text: 'The fortress is getting away' })
  if (turned > 0) {
    captions.push({
      at: ceaseFire - 0.5,
      text: `${rivals.map((side) => side.name).join(', ')} escorting the fortress away`,
    })
  }
  captions.push({
    at: ceaseFire + 2.5,
    text: `The fortress escaped · ${remaining} contacts remain`,
  })
  return captions.toSorted((a, b) => a.at - b.at)
}

/** A seeded random number generator, so the battle plays the same way every time. */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1))
    ;[copy[index], copy[other]] = [copy[other]!, copy[index]!]
  }
  return copy
}

function interleave<T>(lists: readonly (readonly T[])[]): T[] {
  const longest = Math.max(0, ...lists.map((list) => list.length))
  return Array.from({ length: longest }, (_, index) =>
    lists.flatMap((list) => (index < list.length ? [list[index]!] : [])),
  ).flat()
}

export const add = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
export const sub = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y })
export const scale = (a: Vec, k: number): Vec => ({ x: a.x * k, y: a.y * k })
export const length = (a: Vec): number => Math.hypot(a.x, a.y)
export const unit = (a: Vec): Vec => {
  const size = length(a)
  return size === 0 ? { x: 1, y: 0 } : scale(a, 1 / size)
}
export const lerp = (a: Vec, b: Vec, k: number): Vec => add(a, scale(sub(b, a), k))
export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))
export const easeOut = (k: number): number => 1 - (1 - k) ** 3
export const easeIn = (k: number): number => k ** 2
export const easeInOut = (k: number): number => (k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2)

/** A path from a to b that bows out sideways, for ships wheeling round and shots arcing. */
export function curve(a: Vec, b: Vec, k: number, bow: number): Vec {
  const straight = lerp(a, b, k)
  const span = sub(b, a)
  const normal = unit({ x: -span.y, y: span.x })
  return add(straight, scale(normal, Math.sin(Math.PI * k) * length(span) * 0.25 * bow))
}
