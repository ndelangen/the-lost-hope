import type { FleetMarker, FleetRoster } from './fleet-roster'
import { fleetShips } from './fleet-sequence'

/** A point on the battle map, in the pixels of the region map it is drawn over. */
export type Vec = { x: number; y: number }

export type BattleGeometry = {
  /** Where the fleet launches from. */
  home: Vec
  /** Where the fleet holds and the party comes aboard. */
  hold: Vec
  /** Where the flying fortress is when the battle opens. */
  fortress: Vec
  /** The fortress's course, as a unit vector; it holds it at a steady pace throughout. */
  course: Vec
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
  /** How long its run out from home takes; longer runs take longer, so no ship outruns the cap. */
  flight: number
  /** For the flagship: when it leaves the hold to join the fight, and how long that takes. */
  join?: { at: number; flight: number }
  /** When it switches to the side that takes it; absent for ships that stay. */
  turnAt?: number
  lostAt?: number
  /** Its place in the fleet's loose formation, relative to the formation's centre. */
  slot: Vec
  /** Where it screens the fortress once it has switched, relative to the formation's centre. */
  screen: Vec
  markers: FleetMarker[]
  /** A random phase, so the ships do not bob or circle in step. */
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

/**
 * One portrait's moment in the battle: fading in aboard the flagship, or fired from ship to ship
 * as a large shot.
 */
export type Crossing = {
  marker: string
  avatar: string
  kind: 'appear' | 'shot'
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
  /** The flagship the party boards first, and the ship the party is fired across to. */
  flagship?: string
  partyShip?: string
  times: {
    launch: number
    /** The fleet, less the flagship, has arrived and is ready to engage. */
    arrive: number
    /** The party fades in aboard the flagship, which is holding over the pickup point. */
    boardStart: number
    boardEnd: number
    /** The flagship leaves the hold and joins the fight. */
    join: { start: number; end: number } | undefined
    /** The fleet sets off after the fortress. */
    chase: number
    /** The fleet opens fire on the fortress. */
    fire: number
    switchStart: number
    switchEnd: number
    /** The slow-motion stretch in which the party is fired across. */
    slow: { start: number; end: number }
    ceaseFire: number
    end: number
  }
}

export const BATTLE_TIMING = {
  launch: 2,
  launchStagger: 0.15,
  launchFlight: 3,
  /** The fastest any ship flies, in map pixels a second. */
  maxSpeed: 140,
  boardDelay: 0.8,
  boardStagger: 0.5,
  boardFade: 0.8,
  joinDelay: 0.8,
  chaseDelay: 0.6,
  fireDelay: 1.4,
  switchDelay: 3,
  switchStagger: 0.35,
  switchFlight: 4,
  screenHold: 3,
  shotDelay: 0.6,
  shotStagger: 0.9,
  shotFlight: 1.6,
  slowTail: 0.5,
  firstLoss: 0.8,
  lossStagger: 0.85,
  heavyFlight: 1.3,
  hailFlight: 0.55,
  beamFlight: 0.35,
  hold: 4,
  /** How fast battle time runs during the slow-motion stretch. */
  slowMotion: 0.3,
  /** The fortress's steady speed, in map pixels a second. */
  fortressSpeed: 22,
  sink: 2.2,
  /** How long the fleet takes to coast to a halt once the chase gives way to the fight. */
  coast: 2.5,
  /** How long the fleet takes to close from the hold to its chasing distance. */
  chaseRamp: 9,
  /** How long the ships take to settle into circling each other. */
  circleIn: 6,
} as const

/**
 * The fleet battle as a timed plan. The flying fortress holds a steady course away from the
 * islands. The fleet deploys from home into a loose formation and holds while the party boards
 * the flagship. It gives chase and opens fire; the ships that change hands switch sides in quick
 * succession and screen the fortress. In slow motion the party is fired across, one by one, from
 * the flagship to the ship they take. Then the fortress slips away and the ships that were lost go
 * down, alternating sides. Everything is drawn from the plan by time alone.
 */
export function battlePlan(roster: FleetRoster, geometry: BattleGeometry, seed = 7): BattlePlan {
  const random = mulberry32(seed)
  const t = BATTLE_TIMING
  const entries = fleetShips(roster)

  const partyEntry = entries.find(({ ship }) => ship.aboard.some((marker) => marker.id === 'party'))
  const party = partyEntry?.ship.aboard.find((marker) => marker.id === 'party')
  const owners = entries.filter(({ side }) => side === 0)
  const flagshipEntry = owners.find(({ ship }) => ship.aboard.length > 0) ?? owners[0]
  const boarders = party?.avatars ?? []

  const launch = t.launch
  const flagshipKey = flagshipEntry?.ship.key
  const slots = entries.map(({ ship }) =>
    ship.key === flagshipKey ? { x: 0, y: 0 } : looseSlot(random),
  )
  // Each run is eased in and out along a sine, which peaks at about 1.6 times its average speed,
  // so each takes long enough that the peak (with the path's bow) stays under the cap.
  const runTime = (from: Vec, to: Vec) =>
    Math.max(t.launchFlight, (1.75 * length(sub(to, from))) / t.maxSpeed)
  const flights = entries.map((_, index) =>
    runTime(geometry.home, add(geometry.hold, slots[index]!)),
  )
  const launchAts = entries.map((_, index) => launch + index * t.launchStagger)
  const landed = entries.map((_, index) => launchAts[index]! + flights[index]!)
  const flagshipIndex = entries.findIndex(({ ship }) => ship.key === flagshipKey)
  const arrive = Math.max(launch, ...landed.filter((_, index) => index !== flagshipIndex))
  const chase = arrive + t.chaseDelay
  const fire = chase + t.fireDelay
  const switchStart = chase + t.switchDelay
  const turning = entries.filter(({ side }) => side > 0)
  const switchEnd = switchStart + Math.max(0, turning.length - 1) * t.switchStagger + t.switchFlight

  // The flagship holds over the pickup point while the party comes aboard, then joins the fight.
  const flagshipLanded = flagshipIndex < 0 ? arrive : landed[flagshipIndex]!
  const boardStart = flagshipLanded + t.boardDelay
  const boardEnd =
    boarders.length > 0
      ? boardStart + (boarders.length - 1) * t.boardStagger + t.boardFade
      : boardStart
  const joinStart = Math.max(boardEnd + t.joinDelay, switchStart)
  const joinFlight = runTime(
    geometry.hold,
    chaseCentre(geometry, chase, joinStart + t.launchFlight),
  )
  const join = flagshipIndex < 0 ? undefined : { start: joinStart, end: joinStart + joinFlight }
  const slowStart = Math.max(switchEnd + t.screenHold, (join?.end ?? 0) + 0.8)
  const slowEnd =
    slowStart +
    t.shotDelay +
    Math.max(0, boarders.length - 1) * t.shotStagger +
    t.shotFlight +
    t.slowTail

  const turnOrder = shuffle(turning, random).map(({ ship }) => ship.key)
  const lossOrder = interleave(
    roster.sides.map((_, side) =>
      shuffle(
        entries.filter((entry) => entry.side === side && entry.ship.status === 'destroyed'),
        random,
      ).map(({ ship }) => ship.key),
    ),
  )
  const lostAt = new Map(
    lossOrder.map((key, index) => [key, slowEnd + t.firstLoss + index * t.lossStagger]),
  )
  const lastLoss = Math.max(slowEnd, ...lostAt.values())
  const ceaseFire = lastLoss + 1.2
  const end = ceaseFire + t.hold

  const turnedCount = turning.length
  const ships: BattleShip[] = entries.map(({ ship, side }, index) => {
    const turnIndex = turnOrder.indexOf(ship.key)
    return {
      key: ship.key,
      name: ship.name,
      icon: ship.icon,
      side,
      lost: ship.status === 'destroyed',
      launchAt: launchAts[index]!,
      flight: flights[index]!,
      join: index === flagshipIndex && join ? { at: join.start, flight: joinFlight } : undefined,
      turnAt: turnIndex < 0 ? undefined : switchStart + turnIndex * t.switchStagger,
      lostAt: lostAt.get(ship.key),
      slot: slots[index]!,
      screen: screenSlot(geometry.course, turnIndex, turnedCount, random),
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
    flagship: flagshipEntry?.ship.key,
    partyShip: partyEntry?.side ? partyEntry.ship.key : undefined,
    times: {
      launch,
      arrive,
      boardStart,
      boardEnd,
      join,
      chase,
      fire,
      switchStart,
      switchEnd,
      slow: { start: slowStart, end: slowEnd },
      ceaseFire,
      end,
    },
  }
  plan.crossings = planCrossings(plan, party)
  plan.volleys = planVolleys(plan, random)
  plan.captions = planCaptions(plan, roster)
  return plan
}

/** A place in a loose, uneven formation: scattered over an ellipse rather than in rows. */
function looseSlot(random: () => number): Vec {
  const angle = random() * Math.PI * 2
  const reach = Math.sqrt(random())
  return { x: Math.cos(angle) * reach * 230, y: Math.sin(angle) * reach * 150 }
}

/**
 * Where a switched ship screens the fortress: strung out across the fortress's wake, between the
 * fortress and the ships chasing it.
 */
function screenSlot(course: Vec, index: number, count: number, random: () => number): Vec {
  if (index < 0) return { x: 0, y: 0 }
  const across = { x: -course.y, y: course.x }
  const spread = (index - (count - 1) / 2) * 62
  const depth = 190 + random() * 110
  return add(scale(course, depth), add(scale(across, spread), { x: 0, y: (random() - 0.5) * 40 }))
}

/** Where the fortress is: on a steady course from where it is sighted. */
export function fortressAt(plan: BattlePlan, time: number): Vec {
  return fortressCourse(plan.geometry, time)
}

function fortressCourse(geometry: BattleGeometry, time: number): Vec {
  return add(geometry.fortress, scale(geometry.course, BATTLE_TIMING.fortressSpeed * time))
}

/**
 * The centre of the fleet's formation: over the hold point until the chase, then closing on the
 * fortress, until the ships turn on each other in slow motion and the fight stays where it is.
 */
export function formationCentre(plan: BattlePlan, time: number): Vec {
  const stop = plan.times.slow.start
  if (time <= stop) return chaseCentre(plan.geometry, plan.times.chase, time)
  // The fleet does not stop dead when the fight turns inward: it coasts to a halt.
  const at = chaseCentre(plan.geometry, plan.times.chase, stop)
  const velocity = scale(
    sub(at, chaseCentre(plan.geometry, plan.times.chase, stop - 0.05)),
    1 / 0.05,
  )
  const coast = BATTLE_TIMING.coast * (1 - Math.exp(-(time - stop) / BATTLE_TIMING.coast))
  return add(at, scale(velocity, coast))
}

function chaseCentre(geometry: BattleGeometry, chase: number, time: number): Vec {
  if (time <= chase) return geometry.hold
  const progress = easeInOut(clamp01((time - chase) / BATTLE_TIMING.chaseRamp))
  const behind = sub(fortressCourse(geometry, time), scale(geometry.course, 380))
  return lerp(geometry.hold, behind, progress * 0.85)
}

/**
 * Battle time for a moment of real playback: the clock runs at full speed, except through the
 * slow-motion stretch.
 */
export function battleTimeAt(plan: BattlePlan, real: number): number {
  const { start, end } = plan.times.slow
  const factor = BATTLE_TIMING.slowMotion
  if (real <= start) return real
  const slowReal = (end - start) / factor
  if (real <= start + slowReal) return start + (real - start) * factor
  return Math.min(plan.times.end, end + (real - start - slowReal))
}

/** How long the whole battle takes to play, slow motion included, in real seconds. */
export function playbackLength(plan: BattlePlan): number {
  const { start, end } = plan.times.slow
  return plan.times.end + (end - start) / BATTLE_TIMING.slowMotion - (end - start)
}

/** Where the camera looks and how much of the map it takes in, in map pixels across. */
export type Camera = { centre: Vec; span: number }

export const CAMERA = { wide: 2300, chase: 1900, closeIn: 1250, fight: 1500 } as const

/**
 * The camera: wide on the islands while the fleet deploys, following the chase, closing in on the
 * two ships for the slow-motion crossing, then settling on the fight.
 */
export function cameraAt(plan: BattlePlan, time: number): Camera {
  const { home, hold, fortress } = plan.geometry
  const { chase, slow } = plan.times
  const wide: Camera = {
    centre: scale(add(add(home, hold), fortress), 1 / 3),
    span: CAMERA.wide,
  }
  const centre = formationCentre(plan, time)
  const chasing: Camera = {
    centre: lerp(centre, fortressAt(plan, Math.min(time, slow.start)), 0.4),
    span: CAMERA.chase,
  }
  let camera = blendCamera(wide, chasing, easeInOut(clamp01((time - chase) / 3)))
  const { flagship, partyShip } = plan
  if (flagship && partyShip) {
    const a = pointOf(plan, flagship, time)
    const b = pointOf(plan, partyShip, time)
    const close: Camera = {
      centre: lerp(a, b, 0.5),
      span: Math.max(CAMERA.closeIn, length(sub(b, a)) * 2.4),
    }
    camera = blendCamera(camera, close, easeInOut(clamp01((time - (slow.start - 1)) / 1)))
  }
  const fight: Camera = { centre: formationCentre(plan, time), span: CAMERA.fight }
  return blendCamera(camera, fight, easeInOut(clamp01((time - slow.end) / 4)))
}

function blendCamera(a: Camera, b: Camera, k: number): Camera {
  return { centre: lerp(a.centre, b.centre, k), span: a.span + (b.span - a.span) * k }
}

export type ShipPose = {
  pos: Vec
  /** Unit vector the bow points along. */
  heading: Vec
  /** Which side's colours it flies at this moment. */
  side: number
  state: 'hidden' | 'sailing' | 'wreck'
  /** 0 to 1 as a lost ship falls, shrinks and fades. */
  sinking: number
}

/** Where a ship is and which colours it flies at a moment of the battle. */
export function shipPose(plan: BattlePlan, ship: BattleShip, time: number): ShipPose {
  const pos = shipPosition(plan, ship, time)
  const before = shipPosition(plan, ship, time - 0.08)
  const motion = sub(pos, before)
  const turned = ship.turnAt !== undefined && time >= ship.turnAt + 0.2
  const facing = turned ? scale(plan.geometry.course, -1) : plan.geometry.course
  const heading = length(motion) > 0.6 ? unit(motion) : facing
  const side = ship.turnAt === undefined || turned ? ship.side : 0
  const state =
    time < ship.launchAt
      ? 'hidden'
      : ship.lostAt !== undefined && time >= ship.lostAt
        ? 'wreck'
        : 'sailing'
  const sinking = ship.lostAt === undefined ? 0 : clamp01((time - ship.lostAt) / BATTLE_TIMING.sink)
  return { pos, heading, side, state, sinking }
}

function shipPosition(plan: BattlePlan, ship: BattleShip, time: number): Vec {
  // A lost ship drops away from where it went down.
  if (ship.lostAt !== undefined && time > ship.lostAt) {
    const fall = time - ship.lostAt
    return add(shipPosition(plan, ship, ship.lostAt), {
      x: fall * 6,
      y: fall * 20 + fall * fall * 30,
    })
  }
  const t = BATTLE_TIMING
  const { slow } = plan.times
  const inFormation = add(formationCentre(plan, time), ship.slot)
  // The flagship's place is the hold over the pickup point until it leaves to join the fight.
  const join = ship.join
  const station = join && time < join.at + join.flight ? plan.geometry.hold : inFormation
  let pos =
    time < ship.launchAt + ship.flight
      ? curve(
          plan.geometry.home,
          station,
          easeSine(clamp01((time - ship.launchAt) / ship.flight)),
          Math.sin(ship.phase) * 0.6,
        )
      : station
  if (join && time >= join.at && time < join.at + join.flight) {
    pos = curve(plan.geometry.hold, inFormation, easeSine((time - join.at) / join.flight), 0.25)
  }
  if (ship.turnAt !== undefined && time >= ship.turnAt) {
    const screening = add(formationCentre(plan, time), ship.screen)
    pos = curve(pos, screening, easeInOut(clamp01((time - ship.turnAt) / t.switchFlight)), 0.35)
  }
  // Once the party is across, the ships ease into slow loops round each other where they are.
  if (time >= slow.end) pos = add(pos, circling(plan, ship, time))
  const sway = Math.min(1, Math.max(0, time - ship.launchAt - ship.flight) / 2)
  return add(pos, {
    x: Math.sin(time * 0.9 + ship.phase) * 7 * sway,
    y: Math.cos(time * 0.7 + ship.phase) * 5 * sway,
  })
}

/**
 * How far a ship has wandered from its place while circling: a loop that starts at zero and
 * grows in gently, so the ships carry on from how they were moving instead of jumping to it.
 */
function circling(plan: BattlePlan, ship: BattleShip, time: number): Vec {
  const index = plan.ships.indexOf(ship)
  const since = time - plan.times.slow.end
  const radius = 70 + (index % 5) * 18
  const direction = ship.side === 0 ? 1 : -1
  const angle = ship.phase + direction * (0.22 + (index % 3) * 0.04) * since
  const grow = easeInOut(clamp01(since / BATTLE_TIMING.circleIn))
  return scale(
    {
      x: (Math.cos(angle) - Math.cos(ship.phase)) * radius,
      y: (Math.sin(angle) - Math.sin(ship.phase)) * radius * 0.75,
    },
    grow,
  )
}

/** Where a volley's or crossing's end is at a moment: a ship or the fortress. */
export function pointOf(plan: BattlePlan, key: string, time: number): Vec {
  if (key === FORTRESS) return fortressAt(plan, time)
  const ship = plan.ships.find((entry) => entry.key === key)
  return ship ? shipPose(plan, ship, time).pos : plan.geometry.hold
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
  const { fire: opening, slow, ceaseFire } = plan.times
  const volleys: Volley[] = []
  // The flagship is out of the fight until it has joined it.
  const inFight = (ship: BattleShip, at: number) =>
    !ship.join || at >= ship.join.at + ship.join.flight
  const fighting = (at: number) => aliveAt(plan, at).filter((ship) => inFight(ship, at))
  const sideAt = (ship: BattleShip, at: number) =>
    ship.turnAt !== undefined && at >= ship.turnAt + 0.2 ? ship.side : 0
  const shoot = (from: string, to: string, at: number, heavy: boolean) =>
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
    for (let at = opening + random() * 1.2; at < stop; at += 0.6 + random() * 0.7) {
      if (!inFight(ship, at)) continue
      const side = sideAt(ship, at)
      const enemies = fighting(at + t.heavyFlight).filter(
        (other) => sideAt(other, at) !== side && sideAt(other, at + t.heavyFlight) !== side,
      )
      // The fleet fires on the fortress only while no ship has turned; once ships switch sides
      // they are the priority, and the odd shot still goes at the fortress. The switched ships
      // fire on the ships attacking the fortress.
      const onFortress = side === 0 && at < slow.end && (enemies.length === 0 || random() < 0.08)
      if (onFortress) {
        shoot(ship.key, FORTRESS, at, random() < 0.3)
        continue
      }
      if (enemies.length === 0) continue
      shoot(ship.key, enemies[Math.floor(random() * enemies.length)]!.key, at, random() < 0.2)
    }
  }
  // The fortress answers with beams at the ships chasing it.
  for (let at = opening + 1; at < slow.end; at += 1.6 + random() * 1.4) {
    const targets = fighting(at).filter((ship) => sideAt(ship, at) === 0)
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

/**
 * The party's moments, in initiative order: each fades in aboard the flagship while it holds over
 * the pickup point, then, in slow motion, is fired across to the ship they take.
 */
function planCrossings(plan: BattlePlan, party: FleetMarker | undefined): Crossing[] {
  const t = BATTLE_TIMING
  const { flagship, partyShip } = plan
  if (!party || !flagship) return []
  return party.avatars.flatMap((avatar, index): Crossing[] => {
    const board: Crossing = {
      marker: party.id,
      avatar,
      kind: 'appear',
      from: flagship,
      to: flagship,
      at: plan.times.boardStart + index * t.boardStagger,
      duration: t.boardFade,
    }
    if (!partyShip) return [board]
    return [
      board,
      {
        marker: party.id,
        avatar,
        kind: 'shot',
        from: flagship,
        to: partyShip,
        at: plan.times.slow.start + t.shotDelay + index * t.shotStagger,
        duration: t.shotFlight,
      },
    ]
  })
}

function planCaptions(plan: BattlePlan, roster: FleetRoster): BattleCaption[] {
  const { launch, boardStart, chase, fire, switchStart, switchEnd, slow, ceaseFire } = plan.times
  const rivals = roster.sides
    .slice(1)
    .map((side) => side.name)
    .join(', ')
  const turned = plan.ships.some((ship) => ship.turnAt !== undefined)
  const remaining = plan.ships.filter((ship) => !ship.lost).length
  const flagship = plan.ships.find((ship) => ship.key === plan.flagship)
  const partyShip = plan.ships.find((ship) => ship.key === plan.partyShip)
  const firstLoss = Math.min(...plan.ships.flatMap((ship) => ship.lostAt ?? []))
  const captions: BattleCaption[] = [
    { at: 0.4, text: 'Contact: the flying fortress, heading north-north-west' },
    { at: launch, text: `${roster.owner.name} fleet deploying: ${plan.ships.length} contacts` },
    { at: chase, text: 'The fleet gives chase' },
    { at: fire, text: 'Firing on the fortress' },
  ]
  if (flagship && plan.crossings.length > 0) {
    captions.push({ at: boardStart, text: `${flagship.name} picks up the party over Nimbus` })
  }
  if (flagship && plan.times.join) {
    captions.push({ at: plan.times.join.start + 2.5, text: `${flagship.name} joins the fight` })
  }
  if (turned) {
    captions.push({ at: switchStart, text: `Contacts switching sides: ${rivals}` })
    captions.push({ at: switchEnd, text: `${rivals} screening the fortress` })
  }
  if (flagship && partyShip) {
    captions.push({
      at: slow.start,
      text: `The party crosses to ${partyShip.name}`,
    })
  }
  captions.push({ at: slow.end, text: 'The fortress slips away' })
  if (Number.isFinite(firstLoss)) captions.push({ at: firstLoss + 0.6, text: 'Casualties' })
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
/** Eases in and out along a half sine: gentler at its peak than the cubic. */
export const easeSine = (k: number): number => (1 - Math.cos(Math.PI * k)) / 2
export const easeInOut = (k: number): number => (k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2)

/** A path from a to b that bows out sideways, for ships wheeling round and shots arcing. */
export function curve(a: Vec, b: Vec, k: number, bow: number): Vec {
  const straight = lerp(a, b, k)
  const span = sub(b, a)
  const normal = unit({ x: -span.y, y: span.x })
  return add(straight, scale(normal, Math.sin(Math.PI * k) * length(span) * 0.25 * bow))
}
