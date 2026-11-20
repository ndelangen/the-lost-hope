import type { FleetMarker, FleetRoster } from './fleet-roster'
import { fleetShips } from './fleet-sequence'

/** A point on the battle map, in the pixels of the region map it is drawn over. */
export type Vec = { x: number; y: number }

export type BattleGeometry = {
  /** Where the fleet launches from. */
  home: Vec
  /** Where the two lines meet. */
  centre: Vec
  /** What the fleet sails out to engage. */
  target: Vec
}

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
  /** Its place in the outbound formation, relative to the formation's anchor. */
  slot: Vec
  /** Its place in its side's battle line. */
  line: Vec
  markers: FleetMarker[]
  /** A small phase offset so the battle line does not bob in step. */
  phase: number
}

export type Volley = {
  from: string
  to: string
  at: number
  flight: number
  kind: 'hail' | 'heavy'
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
  /** When the fleet starts launching, the last ship has turned, the lines are formed, and so on. */
  times: {
    launch: number
    advanceEnd: number
    split: number
    battle: number
    ceaseFire: number
    end: number
  }
}

export const BATTLE_TIMING = {
  boot: 2.2,
  launchStagger: 0.2,
  launchFlight: 3.2,
  turnStagger: 0.7,
  turnFlight: 2,
  formLines: 2,
  lossStagger: 1.15,
  firstLoss: 1.6,
  heavyFlight: 1.3,
  hailFlight: 0.55,
  boardingFlight: 2.2,
  boardingStagger: 1.1,
  hold: 4,
} as const

/**
 * The fleet battle as a timed plan: the fleet launches from home toward the target, the ships
 * that change hands turn one by one until the sides are even, the lines form, and the ships that
 * were lost go down, alternating sides. Everything after is drawn from the plan by time alone.
 */
export function battlePlan(roster: FleetRoster, geometry: BattleGeometry, seed = 7): BattlePlan {
  const random = mulberry32(seed)
  const t = BATTLE_TIMING
  const entries = fleetShips(roster)
  const along = unit(sub(geometry.target, geometry.home))
  const across = { x: -along.y, y: along.x }

  const launch = t.boot
  const advanceEnd = launch + entries.length * t.launchStagger + t.launchFlight + 0.6
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
      line: lineSlot(geometry.centre, side, lineIndex, lines[side]!.length, along, across),
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
    times: { launch, advanceEnd, split, battle, ceaseFire, end },
  }
  plan.volleys = planVolleys(plan, random)
  plan.crossings = planCrossings(plan)
  plan.captions = planCaptions(plan, roster)
  return plan
}

const FORMATION_COLUMNS = 4
const FORMATION_SPACING = { along: 58, across: 66 }
const LINE_SPACING = { along: 70, across: 112 }
/** How far ahead of the centre the rival line forms, and how far back the owner's line forms. */
const LINE_OFFSET = { rival: 250, owner: -80 }

function formationSlot(index: number, along: Vec, across: Vec): Vec {
  const row = Math.floor(index / FORMATION_COLUMNS)
  const column = (index % FORMATION_COLUMNS) - (FORMATION_COLUMNS - 1) / 2
  return add(
    scale(along, -row * FORMATION_SPACING.along),
    scale(across, column * FORMATION_SPACING.across),
  )
}

function lineSlot(
  centre: Vec,
  side: number,
  index: number,
  count: number,
  along: Vec,
  across: Vec,
): Vec {
  const perRow = Math.ceil(count / 2)
  const row = Math.floor(index / perRow)
  const column = (index % perRow) - (perRow - 1) / 2 + (row === 1 ? 0.5 : 0)
  const depth =
    side === 0
      ? LINE_OFFSET.owner - row * LINE_SPACING.along
      : LINE_OFFSET.rival + row * LINE_SPACING.along
  return add(centre, add(scale(along, depth), scale(across, column * LINE_SPACING.across)))
}

/** Where the outbound formation is centred at a moment: it sails from home toward the target. */
export function formationAnchor(plan: BattlePlan, time: number): Vec {
  const { home, centre } = plan.geometry
  const along = unit(sub(plan.geometry.target, home))
  const start = add(home, scale(along, 150))
  const finish = add(centre, scale(along, 90))
  const progress = clamp01((time - plan.times.launch) / (plan.times.advanceEnd - plan.times.launch))
  return lerp(start, finish, easeInOut(progress))
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
  const along = unit(sub(plan.geometry.target, plan.geometry.home))
  const turned = ship.turnAt !== undefined && time >= ship.turnAt + 0.25
  const facing = turned ? scale(along, -1) : along
  const heading = length(motion) > 0.4 ? unit(motion) : facing
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
  const t = BATTLE_TIMING
  const { times } = plan
  const inFormation = add(formationAnchor(plan, time), ship.slot)
  let pos: Vec
  if (time < ship.launchAt + t.launchFlight) {
    const progress = easeOut(clamp01((time - ship.launchAt) / t.launchFlight))
    pos = lerp(plan.geometry.home, inFormation, progress)
  } else {
    pos = inFormation
  }
  const formed = add(formationAnchor(plan, times.advanceEnd), ship.slot)
  if (ship.turnAt !== undefined && time >= ship.turnAt) {
    pos = curve(formed, ship.line, easeInOut(clamp01((time - ship.turnAt) / t.turnFlight)), 1)
  } else if (ship.turnAt === undefined && time >= times.split) {
    pos = lerp(formed, ship.line, easeInOut(clamp01((time - times.split) / t.formLines)))
  }
  if (time >= times.battle) {
    const sway = Math.min(1, (time - times.battle) / 2)
    pos = add(pos, {
      x: Math.sin(time * 0.9 + ship.phase) * 7 * sway,
      y: Math.cos(time * 0.7 + ship.phase) * 5 * sway,
    })
  }
  if (ship.lostAt !== undefined && time > ship.lostAt) {
    const fall = time - ship.lostAt
    pos = add(pos, { x: fall * 4, y: fall * fall * 6 })
  }
  return pos
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
  const { battle, ceaseFire } = plan.times
  const volleys: Volley[] = []
  const enemiesOf = (ship: BattleShip, at: number) =>
    aliveAt(plan, at + t.heavyFlight).filter((other) => other.side !== ship.side)

  for (const ship of plan.ships) {
    const stop = Math.min(ceaseFire, ship.lostAt ?? Infinity)
    for (let at = battle + random() * 1; at < stop; at += 0.6 + random() * 0.6) {
      const targets = enemiesOf(ship, at)
      if (targets.length === 0) break
      const target = targets[Math.floor(random() * targets.length)]!
      const heavy = random() < 0.2
      volleys.push({
        from: ship.key,
        to: target.key,
        at,
        flight: heavy ? t.heavyFlight : t.hailFlight + random() * 0.2,
        kind: heavy ? 'heavy' : 'hail',
        count: heavy ? 1 : 7 + Math.floor(random() * 8),
        seed: Math.floor(random() * 1e9),
      })
    }
  }
  // The killing blow: a heavy shot from the other side lands as each lost ship goes down.
  for (const ship of plan.ships) {
    if (ship.lostAt === undefined) continue
    const shooters = aliveAt(plan, ship.lostAt).filter((other) => other.side !== ship.side)
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
  const { launch, advanceEnd, split, battle, ceaseFire } = plan.times
  const rivals = roster.sides.slice(1)
  const turned = plan.ships.filter((ship) => ship.turnAt !== undefined).length
  const remaining = plan.ships.filter((ship) => !ship.lost).length
  const captions: BattleCaption[] = [
    { at: 0.4, text: 'Tracking' },
    { at: launch, text: `${roster.owner.name} fleet launching: ${plan.ships.length} contacts` },
    { at: advanceEnd - 1.5, text: 'Closing on the flying fortress' },
  ]
  if (turned > 0) {
    captions.push({
      at: advanceEnd,
      text: `Contacts turning: ${rivals.map((side) => side.name).join(', ')}`,
    })
    captions.push({
      at: split,
      text: `The fleet is split: ${roster.sides.map((side) => side.ships.length).join(' against ')}`,
    })
  }
  if (plan.crossings.length > 0) captions.push({ at: battle + 0.4, text: 'Boarding party away' })
  captions.push({ at: battle + 3, text: 'Engaged' })
  captions.push({ at: ceaseFire, text: `${remaining} contacts remain` })
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
export const easeInOut = (k: number): number => (k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2)

/** A path from a to b that bows out sideways, for ships wheeling round and shots arcing. */
export function curve(a: Vec, b: Vec, k: number, bow: number): Vec {
  const straight = lerp(a, b, k)
  const span = sub(b, a)
  const normal = unit({ x: -span.y, y: span.x })
  return add(straight, scale(normal, Math.sin(Math.PI * k) * length(span) * 0.25 * bow))
}
