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
  /** How long the fleet's centre takes to run from home to its chasing distance. */
  chaseRamp: number
  /** The flagship the party boards first, and the ship the party is fired across to. */
  flagship?: string
  partyShip?: string
  times: {
    launch: number
    /** The party fades in aboard the flagship, which is holding over the pickup point. */
    boardStart: number
    boardEnd: number
    /** The pickup, played in slow motion with the camera on the flagship. */
    pickup: { start: number; end: number } | undefined
    /** The flagship leaves the hold and joins the fight. */
    join: { start: number; end: number } | undefined
    /** The fleet, formed up off home, sets off after the fortress. */
    chase: number
    /** The fleet opens fire on the fortress. */
    fire: number
    switchStart: number
    switchEnd: number
    /** The slow-motion stretch in which the party is fired across. */
    slow: { start: number; end: number }
    /** The fortress is wholly out of view; the battle ends soon after. */
    fortressGone: number
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
  /** How long the ships hang in a loose cluster off home before setting off. */
  scatter: 0.5,
  /** How long a spawned ship takes to spread out to its place in the formation. */
  spawnSpread: 1.2,
  /** How close the fleet gets to the fortress before it opens fire, in map pixels. */
  range: 1050,
  switchAfterFire: 2,
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
  const flagshipIndex = entries.findIndex(({ ship }) => ship.key === flagshipKey)
  const slots = entries.map(({ ship }) =>
    ship.key === flagshipKey ? { x: 0, y: 0 } : looseSlot(random),
  )
  // Each run is eased in and out along a sine, which peaks at about 1.6 times its average speed,
  // so each takes long enough that the peak (with the path's bow) stays under the cap.
  const runTime = (from: Vec, to: Vec) =>
    Math.max(t.launchFlight, (1.75 * length(sub(to, from))) / t.maxSpeed)

  // The ships spawn one by one off home, hang in a loose cluster for a moment, and set off: the
  // fleet engages straight away. Its centre runs at the capped speed to its chasing distance.
  const launchAts = entries.map((_, index) => launch + index * t.launchStagger)
  const chase = launch + t.scatter
  let chaseRamp: number = t.launchFlight
  for (let pass = 0; pass < 3; pass += 1) {
    const behind = sub(fortressCourse(geometry, chase + chaseRamp), scale(geometry.course, 380))
    chaseRamp = runTime(geometry.home, behind)
  }
  const flights = entries.map((_, index) =>
    index === flagshipIndex ? runTime(geometry.home, geometry.hold) : 0,
  )
  // The fleet opens fire once it is in range of the fortress.
  let fire = chase
  while (
    fire < chase + chaseRamp &&
    length(sub(chaseCentre(geometry, chase, chaseRamp, fire), fortressCourse(geometry, fire))) >
      t.range
  ) {
    fire += 0.1
  }
  const switchStart = fire + t.switchAfterFire
  const turning = entries.filter(({ side }) => side > 0)
  const switchEnd = switchStart + Math.max(0, turning.length - 1) * t.switchStagger + t.switchFlight

  // The flagship stays behind over the pickup point. Once ships start turning, it takes the party
  // aboard in slow motion, then joins the fight.
  const boardStart = switchStart + t.boardDelay
  const boardEnd =
    boarders.length > 0
      ? boardStart + (boarders.length - 1) * t.boardStagger + t.boardFade
      : boardStart
  const pickup =
    flagshipIndex < 0 || boarders.length === 0
      ? undefined
      : { start: switchStart, end: boardEnd + t.slowTail }
  const joinStart = boardEnd + t.joinDelay
  const joinFlight = runTime(
    geometry.hold,
    chaseCentre(geometry, chase, chaseRamp, joinStart + t.launchFlight),
  )
  const join = flagshipIndex < 0 ? undefined : { start: joinStart, end: joinStart + joinFlight }
  const slowStart = Math.max(switchEnd + 1, (join?.end ?? 0) + 0.8)
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
    chaseRamp,
    flagship: flagshipEntry?.ship.key,
    partyShip: partyEntry?.side ? partyEntry.ship.key : undefined,
    times: {
      launch,
      boardStart,
      boardEnd,
      pickup,
      join,
      chase,
      fire,
      switchStart,
      switchEnd,
      slow: { start: slowStart, end: slowEnd },
      fortressGone: slowEnd,
      ceaseFire,
      end: ceaseFire + t.hold,
    },
  }
  // The battle plays on until the fortress is wholly out of view.
  plan.times.fortressGone = fortressLeavesView(plan, slowEnd)
  plan.times.end = Math.max(ceaseFire + t.hold, plan.times.fortressGone + 1)
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
  if (time <= stop) return chaseCentre(plan.geometry, plan.times.chase, plan.chaseRamp, time)
  // The fleet does not stop dead when the fight turns inward: it coasts to a halt.
  const at = chaseCentre(plan.geometry, plan.times.chase, plan.chaseRamp, stop)
  const velocity = scale(
    sub(at, chaseCentre(plan.geometry, plan.times.chase, plan.chaseRamp, stop - 0.05)),
    1 / 0.05,
  )
  const coast = BATTLE_TIMING.coast * (1 - Math.exp(-(time - stop) / BATTLE_TIMING.coast))
  return add(at, scale(velocity, coast))
}

function chaseCentre(geometry: BattleGeometry, chase: number, ramp: number, time: number): Vec {
  if (time <= chase) return geometry.home
  const progress = easeSine(clamp01((time - chase) / ramp))
  const behind = sub(fortressCourse(geometry, time), scale(geometry.course, 380))
  return lerp(geometry.home, behind, progress)
}

/**
 * Battle time for a moment of real playback: the clock runs at full speed, except through the
 * slow-motion stretch.
 */
export function battleTimeAt(plan: BattlePlan, real: number): number {
  const factor = BATTLE_TIMING.slowMotion
  let battle = 0
  let clock = 0
  for (const window of slowWindows(plan)) {
    const before = window.start - battle
    if (real <= clock + before) return battle + (real - clock)
    clock += before
    battle = window.start
    const span = window.end - window.start
    if (real <= clock + span / factor) return battle + (real - clock) * factor
    clock += span / factor
    battle = window.end
  }
  return Math.min(plan.times.end, battle + (real - clock))
}

/** How long the whole battle takes to play, slow motion included, in real seconds. */
export function playbackLength(plan: BattlePlan): number {
  const slowed = slowWindows(plan).reduce((sum, window) => sum + (window.end - window.start), 0)
  return plan.times.end + slowed / BATTLE_TIMING.slowMotion - slowed
}

/** The stretches that play in slow motion: the pickup, then the crossing. */
export function slowWindows(plan: BattlePlan): { start: number; end: number }[] {
  return [plan.times.pickup, plan.times.slow].filter(
    (window): window is { start: number; end: number } => window !== undefined,
  )
}

/** Where the camera looks and how much of the map it takes in, in map pixels across. */
export type Camera = { centre: Vec; span: number }

export const CAMERA = { wide: 2300, chase: 1900, pickup: 900, closeIn: 1250, fight: 1500 } as const

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
  const pickup = plan.times.pickup
  if (flagship && pickup) {
    const onFlagship: Camera = { centre: pointOf(plan, flagship, time), span: CAMERA.pickup }
    const zoom =
      easeInOut(clamp01((time - (pickup.start - 0.8)) / 0.8)) *
      (1 - easeInOut(clamp01((time - pickup.end) / 1.5)))
    camera = blendCamera(camera, onFlagship, zoom)
  }
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

/**
 * When the fortress is wholly out of the camera's view after a moment: the radar shows the
 * camera's span across and about four fifths of it high, and the fortress glyph and its label
 * reach some way past its centre.
 */
function fortressLeavesView(plan: BattlePlan, after: number): number {
  for (let time = after; time < after + 120; time += 0.25) {
    const camera = cameraAt(plan, time)
    const offset = sub(fortressAt(plan, time), camera.centre)
    const margin = 260
    if (
      Math.abs(offset.x) > camera.span / 2 + margin ||
      Math.abs(offset.y) > camera.span * 0.4 + margin
    ) {
      return time
    }
  }
  return after + 120
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
  return separated(plan, ship, time)
}

/** How close two ships may come before they ease apart, in map pixels. */
const SEPARATION = 70

/**
 * A ship's place with its neighbours kept at arm's length: each ship that comes closer than the
 * separation distance pushes it away by half the overlap. A ship just spawned, or just lost,
 * pushes only lightly, so ships never jump when one appears or goes down.
 */
function separated(plan: BattlePlan, ship: BattleShip, time: number): Vec {
  const own = presentAt(plan, time).get(ship.key)?.pos ?? rawPosition(plan, ship, time)
  // The push is averaged over the last moment, so ships ease apart rather than being shoved.
  let push: Vec = { x: 0, y: 0 }
  let total = 0
  for (let step = 0; step < PUSH_SAMPLES; step += 1) {
    const weight = PUSH_SAMPLES - step
    push = add(push, scale(pushAt(plan, ship, time - step * PUSH_STEP), weight))
    total += weight
  }
  return add(own, scale(push, 1 / total))
}

const PUSH_SAMPLES = 8
const PUSH_STEP = 0.1

/** How far a ship's neighbours push it at one moment. */
function pushAt(plan: BattlePlan, ship: BattleShip, time: number): Vec {
  const others = presentAt(plan, time)
  const own = others.get(ship.key)?.pos
  if (!own) return { x: 0, y: 0 }
  let push: Vec = { x: 0, y: 0 }
  for (const [key, other] of others) {
    if (key === ship.key) continue
    const apart = sub(own, other.pos)
    const distance = length(apart)
    if (distance >= SEPARATION) continue
    // Close in, each pair parts along its own fixed line, so the push never flips sides as two
    // ships' paths cross; further out it simply points away from the other ship. Blended, not
    // renormalised, so the push changes smoothly even where the two disagree.
    const fixed = pairDirection(ship.key, key)
    const closeness = easeInOut(clamp01(1 - distance / SEPARATION))
    const outward = distance > 0.01 ? unit(apart) : fixed
    const away = lerp(outward, fixed, closeness)
    push = add(push, scale(away, ((SEPARATION - distance) / 2) * other.weight))
  }
  return push
}

/** A fixed direction for a pair of ships to part along: opposite for each of the two. */
function pairDirection(a: string, b: string): Vec {
  const [first, second] = a < b ? [a, b] : [b, a]
  let hash = 0
  for (const char of `${first}|${second}`) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  const angle = (hash % 360) * (Math.PI / 180)
  const direction = { x: Math.cos(angle), y: Math.sin(angle) }
  return a < b ? direction : scale(direction, -1)
}

const presence = new WeakMap<BattlePlan, Map<number, Map<string, { pos: Vec; weight: number }>>>()

/** Every ship afloat at a moment, unseparated, with how strongly it pushes its neighbours. */
function presentAt(plan: BattlePlan, time: number): Map<string, { pos: Vec; weight: number }> {
  let byTime = presence.get(plan)
  if (!byTime) {
    byTime = new Map()
    presence.set(plan, byTime)
  }
  const key = Math.round(time * 1000)
  const cached = byTime.get(key)
  if (cached) return cached
  if (byTime.size > 6000) byTime.clear()
  const present = new Map<string, { pos: Vec; weight: number }>()
  for (const other of plan.ships) {
    if (time < other.launchAt) continue
    const spawned = clamp01((time - other.launchAt) / 0.6)
    if (other.lostAt !== undefined && time >= other.lostAt) {
      const fading = 1 - clamp01((time - other.lostAt) / 1.2)
      if (fading > 0) {
        present.set(other.key, { pos: rawPosition(plan, other, other.lostAt), weight: fading })
      }
      continue
    }
    present.set(other.key, { pos: rawPosition(plan, other, time), weight: spawned })
  }
  byTime.set(key, present)
  return present
}

/** Where a ship is before it is kept clear of its neighbours. */
function rawPosition(plan: BattlePlan, ship: BattleShip, time: number): Vec {
  const t = BATTLE_TIMING
  const { slow } = plan.times
  const inFormation = add(formationCentre(plan, time), ship.slot)
  // The flagship's place is the hold over the pickup point until it leaves to join the fight.
  const join = ship.join
  let pos: Vec
  if (join && time < join.at) {
    pos =
      time < ship.launchAt + ship.flight
        ? curve(
            plan.geometry.home,
            plan.geometry.hold,
            easeSine(clamp01((time - ship.launchAt) / ship.flight)),
            Math.sin(ship.phase) * 0.4,
          )
        : plan.geometry.hold
  } else {
    // A ship spawns at home and spreads out to its place in the loose formation.
    const spread = easeSine(clamp01((time - ship.launchAt) / t.spawnSpread))
    pos = add(formationCentre(plan, time), scale(ship.slot, spread))
  }
  if (join && time >= join.at && time < join.at + join.flight) {
    pos = curve(plan.geometry.hold, inFormation, easeSine((time - join.at) / join.flight), 0.25)
  }
  if (ship.turnAt !== undefined && time >= ship.turnAt) {
    const screening = add(formationCentre(plan, time), ship.screen)
    pos = curve(pos, screening, easeInOut(clamp01((time - ship.turnAt) / t.switchFlight)), 0.35)
  }
  // Once the party is across, the ships ease into slow loops round each other where they are.
  if (time >= slow.end) pos = add(pos, circling(plan, ship, time))
  const sway = Math.min(1, Math.max(0, time - ship.launchAt - 1) / 2)
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
  /** It is switching sides: flashing between the colours before it moves to its new group. */
  switching: boolean
  /** It is going down: blowing up in place before it drops to the foot of its group. */
  exploding: boolean
}

/** How long a legend row flashes before it moves to its new side, in battle seconds. */
export const LEGEND_SWITCH_FLASH = 1.4
/** How long a legend row burns before it drops to the destroyed ships, in battle seconds. */
export const LEGEND_EXPLOSION = 1.6

/**
 * The legend at a moment: every ship with the side it flies for and whether it is still in the
 * fight. Each side's ships in service come first, then its losses, each in launch order.
 */
export function legendAt(plan: BattlePlan, time: number): LegendRow[] {
  const rank: Record<LegendStatus, number> = { 'in service': 0, docked: 1, destroyed: 2 }
  return plan.ships
    .map((ship): LegendRow => {
      const pose = shipPose(plan, ship, time)
      // A switching ship flashes in its old group first, and moves when the flashing stops; a
      // lost ship burns where it is first, and drops to the destroyed ships after.
      const switching =
        ship.turnAt !== undefined && time >= ship.turnAt && time < ship.turnAt + LEGEND_SWITCH_FLASH
      const exploding =
        ship.lostAt !== undefined && time >= ship.lostAt && time < ship.lostAt + LEGEND_EXPLOSION
      const side =
        ship.turnAt !== undefined && time < ship.turnAt + LEGEND_SWITCH_FLASH ? 0 : pose.side
      const status: LegendStatus =
        pose.state === 'hidden'
          ? 'docked'
          : pose.state === 'wreck' && !exploding
            ? 'destroyed'
            : 'in service'
      return {
        key: ship.key,
        name: ship.name,
        icon: ship.icon,
        side,
        turned: side !== 0,
        status,
        switching,
        exploding,
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
  const { fire: opening, slow } = plan.times
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
    // The survivors keep fighting to the very end.
    const stop = Math.min(plan.times.end, ship.lostAt ?? Infinity)
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
  const { launch, chase, fire, switchStart, switchEnd, slow, ceaseFire } = plan.times
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
    { at: chase + 1, text: 'The fleet engages' },
    { at: fire, text: 'Firing on the fortress' },
  ]
  if (flagship && plan.times.pickup) {
    captions.push({
      at: plan.times.pickup.start + 0.4,
      text: `${flagship.name} picks up the party over Nimbus`,
    })
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
  captions.push({ at: plan.times.fortressGone, text: 'Contact lost: the flying fortress' })
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
