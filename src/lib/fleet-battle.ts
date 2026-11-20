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
  /** Open sky away from the islands, where the cruisers fight it out once the fortress is gone. */
  arena: Vec
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
    /** The whole fleet is in formation behind the fortress, waiting to attack. */
    formed: number
    /** The attack begins: the fleet opens fire and the fortress starts to run. */
    assault: number
    /** The first ship turns, as the chase begins. */
    advanceEnd: number
    /** The last ship has turned and the sides are even. */
    split: number
    /** The lines are formed and the fight between the ships begins. */
    battle: number
    /** The fortress is out of sight. */
    fortressGone: number
    /** When the boarding party starts and finishes crossing, played in slow motion. */
    boarding: { start: number; end: number } | undefined
    ceaseFire: number
    end: number
  }
}

export const BATTLE_TIMING = {
  boot: 2.2,
  launchStagger: 0.2,
  launchFlight: 3.2,
  formHold: 2.6,
  firstTurn: 0.8,
  turnStagger: 0.8,
  turnFlight: 2,
  formLines: 2.5,
  fortressLead: 2.5,
  orbitBlend: 3,
  lossStagger: 1.15,
  firstLoss: 1.5,
  heavyFlight: 1.3,
  hailFlight: 0.55,
  beamFlight: 0.35,
  boardingFlight: 1.8,
  boardingStagger: 0.9,
  boardingDelay: 0.5,
  /** How fast battle time runs while the boarding party crosses. */
  slowMotion: 0.3,
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
  const formed = launch + entries.length * t.launchStagger + t.launchFlight
  const assault = formed + t.formHold
  const advanceEnd = assault + t.firstTurn
  const turning = entries.filter(({ side }) => side > 0)
  const split = advanceEnd + turning.length * t.turnStagger + t.turnFlight
  const battle = split + t.formLines
  // The party boards as the fortress slips out of view; it is gone as the last boarder lands.
  const boarders = entries
    .filter(({ side }) => side > 0)
    .reduce((count, { ship }) => count + ship.aboard.reduce((n, m) => n + m.avatars.length, 0), 0)
  const boardingEnd =
    boarders > 0
      ? battle + t.boardingDelay + (boarders - 1) * t.boardingStagger + t.boardingFlight
      : battle
  const fortressGone = Math.max(battle + t.fortressLead, boardingEnd)

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
    lossOrder.map((key, index) => [key, fortressGone + t.firstLoss + index * t.lossStagger]),
  )
  const lastLoss = Math.max(fortressGone, ...lostAt.values())
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
    times: {
      launch,
      formed,
      assault,
      advanceEnd,
      split,
      battle,
      fortressGone,
      boarding: boarders > 0 ? { start: battle + t.boardingDelay, end: boardingEnd } : undefined,
      ceaseFire,
      end,
    },
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
 * Where the fortress is: it holds still while the fleet forms up, starts to run when the attack
 * begins, and, once its new escort has turned, pulls away and is out of sight while the cruisers
 * are still fighting.
 */
export function fortressAt(plan: BattlePlan, time: number): Vec {
  const { fortress, escape } = plan.geometry
  const { assault, split, fortressGone } = plan.times
  const start = 0.15 * easeInOut(clamp01((time - assault) / (split - assault)))
  const flight = 0.85 * easeIn(clamp01((time - split) / (fortressGone - split)))
  return lerp(fortress, escape, start + flight)
}

/**
 * Where the fight is centred: with the fortress while the Hand covers it, then out over the open
 * sky once the cruisers break away to fight each other.
 */
export function fightAnchor(plan: BattlePlan, time: number): Vec {
  const { split, fortressGone } = plan.times
  const progress = easeInOut(clamp01((time - fortressGone) / BATTLE_TIMING.formLines))
  return lerp(fortressAt(plan, Math.min(time, split)), plan.geometry.arena, progress)
}

/**
 * Battle time for a moment of real playback: the clock runs at full speed, except while the
 * boarding party crosses, which plays in slow motion. Easing in and out of it keeps it smooth.
 */
export function battleTimeAt(plan: BattlePlan, real: number): number {
  const boarding = plan.times.boarding
  if (!boarding) return Math.min(real, plan.times.end)
  const slow = BATTLE_TIMING.slowMotion
  const span = boarding.end - boarding.start
  if (real <= boarding.start) return real
  if (real <= boarding.start + span / slow) return boarding.start + (real - boarding.start) * slow
  return Math.min(plan.times.end, boarding.end + (real - boarding.start - span / slow))
}

/** How long the whole battle takes to play, slow motion included, in real seconds. */
export function playbackLength(plan: BattlePlan): number {
  const boarding = plan.times.boarding
  if (!boarding) return plan.times.end
  const span = boarding.end - boarding.start
  return plan.times.end + span / BATTLE_TIMING.slowMotion - span
}

/** Where the camera looks and how much of the map it takes in, in map pixels across. */
export type Camera = { centre: Vec; span: number }

/** The wide view of the whole region, and the close one on the cruisers' fight. */
export const CAMERA = { wide: { x: 740, y: 490, span: 2760 }, close: { span: 1250 } } as const

/** The camera starts wide on the islands, then closes in on the fight as the fortress leaves. */
export function cameraAt(plan: BattlePlan, time: number): Camera {
  const { fortressGone, boarding } = plan.times
  const wide: Camera = { centre: { x: CAMERA.wide.x, y: CAMERA.wide.y }, span: CAMERA.wide.span }
  const close: Camera = { centre: plan.geometry.arena, span: CAMERA.close.span }
  const toClose = easeInOut(clamp01((time - fortressGone) / (BATTLE_TIMING.formLines + 1)))
  const first = plan.crossings[0]
  if (!boarding || !first) return blendCamera(wide, close, toClose)
  // During the boarding the camera closes in on the two ships, so each crossing is easy to follow.
  const from = pointOf(plan, first.from, time)
  const to = pointOf(plan, first.to, time)
  const board: Camera = {
    centre: lerp(from, to, 0.5),
    span: Math.min(1400, Math.max(760, length(sub(to, from)) * 2.6)),
  }
  const toBoard = easeInOut(clamp01((time - (boarding.start - 1.2)) / 1.2))
  return blendCamera(blendCamera(wide, board, toBoard), close, toClose)
}

function blendCamera(a: Camera, b: Camera, k: number): Camera {
  return { centre: lerp(a.centre, b.centre, k), span: a.span + (b.span - a.span) * k }
}

/** Where the formation is centred: it sails out from home and forms up behind the fortress. */
export function formationAnchor(plan: BattlePlan, time: number): Vec {
  const { home } = plan.geometry
  const { along } = axes(plan.geometry)
  const behind = sub(fortressAt(plan, time), scale(along, STANDOFF))
  const progress = clamp01((time - plan.times.launch) / (plan.times.formed - plan.times.launch))
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
  const circling = time >= plan.times.fortressGone + 0.5
  const heading = length(motion) > 0.6 && (!turned || circling) ? unit(motion) : facing
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
  // A wreck stays where it went down, falling away below the fight.
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
  const inLine = add(
    time < times.split ? fortressAt(plan, time) : fightAnchor(plan, time),
    ship.line,
  )
  if (ship.turnAt !== undefined && time >= ship.turnAt) {
    pos = curve(pos, inLine, easeInOut(clamp01((time - ship.turnAt) / t.turnFlight)), 0.8)
  } else if (ship.turnAt === undefined && time >= times.split) {
    pos = lerp(pos, inLine, easeInOut(clamp01((time - times.split) / t.formLines)))
  }
  if (time >= times.fortressGone) {
    pos = lerp(
      pos,
      orbitPosition(plan, ship, time),
      easeInOut(clamp01((time - times.fortressGone) / t.orbitBlend)),
    )
  }
  if (time >= times.assault) {
    const sway = Math.min(1, (time - times.assault) / 2)
    pos = add(pos, {
      x: Math.sin(time * 0.9 + ship.phase) * 6 * sway,
      y: Math.cos(time * 0.7 + ship.phase) * 4 * sway,
    })
  }
  return pos
}

/**
 * Where a ship is in the dogfight: every ship circles the arena, the two sides wheeling in
 * opposite directions so they keep crossing each other's paths.
 */
function orbitPosition(plan: BattlePlan, ship: BattleShip, time: number): Vec {
  const index = plan.ships.indexOf(ship)
  // Each ship wheels round its own point near the middle of the fight, so the circles overlap
  // and cross rather than nest; a second, faster wobble keeps the paths ragged.
  const centre = add(plan.geometry.arena, {
    x: Math.cos(ship.phase * 2) * 120,
    y: Math.sin(ship.phase * 3) * 80,
  })
  const radius = 90 + (index % 6) * 34
  const direction = ship.side === 0 ? 1 : -1
  const speed = direction * (0.38 + (index % 4) * 0.06)
  const angle = ship.phase + speed * (time - plan.times.fortressGone)
  const wobble = 1 + 0.18 * Math.sin(angle * 2.3 + index)
  return add(centre, {
    x: Math.cos(angle) * radius * wobble,
    y: Math.sin(angle) * radius * 0.75 * wobble,
  })
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
  const { assault, ceaseFire } = plan.times
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
      const fortressInRange = at < plan.times.fortressGone - 1.5
      const onFortress =
        side === 0 && fortressInRange && (at < plan.times.split ? random() < 0.75 : random() < 0.3)
      if (onFortress || enemies.length === 0) {
        if (side === 0 && fortressInRange) fire(ship.key, FORTRESS, at, random() < 0.3)
        continue
      }
      fire(ship.key, enemies[Math.floor(random() * enemies.length)]!.key, at, random() < 0.2)
    }
  }
  // The fortress answers with beams at the ships closing on it.
  for (let at = assault + 1; at < plan.times.fortressGone - 1.5; at += 1.4 + random() * 1.2) {
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
    at: plan.times.battle + BATTLE_TIMING.boardingDelay + index * BATTLE_TIMING.boardingStagger,
    duration: BATTLE_TIMING.boardingFlight,
  }))
}

function planCaptions(plan: BattlePlan, roster: FleetRoster): BattleCaption[] {
  const { launch, assault, advanceEnd, split, ceaseFire } = plan.times
  const rivals = roster.sides.slice(1)
  const turned = plan.ships.filter((ship) => ship.turnAt !== undefined).length
  const remaining = plan.ships.filter((ship) => !ship.lost).length
  const captions: BattleCaption[] = [
    { at: 0.4, text: 'Contact: the flying fortress' },
    { at: launch, text: `${roster.owner.name} fleet launching: ${plan.ships.length} contacts` },
    { at: plan.times.formed - 1.5, text: 'Forming up for the attack' },
    { at: assault, text: 'Attack: the fortress is breaking away' },
  ]
  if (turned > 0) {
    captions.push({
      at: advanceEnd + 0.4,
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
  if (!plan.times.boarding) {
    captions.push({ at: plan.times.fortressGone - 2.5, text: 'The fortress is getting away' })
  }
  captions.push({ at: plan.times.fortressGone, text: 'Contact lost: the flying fortress' })
  captions.push({ at: plan.times.fortressGone + 1.5, text: 'The cruisers fight on over open sky' })
  if (plan.times.boarding) {
    captions.push({
      at: plan.times.boarding.start,
      text: 'Boarding party away',
    })
  }
  captions.push({ at: ceaseFire + 1, text: `${remaining} contacts remain` })
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
