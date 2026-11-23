import type { EntityRef } from '#/definitions/kind'

import raw from './ride-the-lightning.json?raw'

/** One option on an axis of the simulated grid, such as a route or when the crystal room is found. */
export type SimOption = { key: string; label: string; detail: string }

export type SimOutcome = 'win' | 'stall' | 'tpk'

export type SimPcName = 'Devan' | 'Auren' | 'Cassian' | 'Swift'

/** Damage one kind of combatant dealt another, per run on average: [from, to, damage]. */
export type SimFlowTotal = [string, string, number]

/**
 * The outcome of many runs of one scenario: a route, a crystal-room timing, enemy tactics, what the
 * party focuses at the Helm, and a mistake rate.
 */
export type SimScenario = {
  route: string
  crystal: string
  foes: string
  party: string
  mistakes: number
  runs: number
  win: number
  tpk: number
  stall: number
  /** Share of all runs that ended in each room without a win. */
  lostAt: Record<string, number>
  down: Record<SimPcName, number>
  dead: Record<SimPcName, number>
  anyDead: number
  held: Record<SimPcName, number>
  damageShare: Record<SimPcName, number>
  taken: Record<SimPcName, number>
  kills: Record<SimPcName, number>
  crits: { pc: number; foe: number }
  flow: SimFlowTotal[]
  potions: number
  bottles: number
  bottlesPoured: number
  silasFled: number
}

export type SimSide = 'pc' | 'ally' | 'foe'

export type SimRosterEntry = { name: string; side: SimSide; who: EntityRef }

/** Hit points, max hit points, temporary hit points and conditions, in roster order. */
export type SimHp = [number, number, number, string[]]

/** One thing that happened in a round, in the order it happened. */
export type SimAct =
  | { k: 'turn'; who: string }
  | { k: 'miss'; by: string; to: string; what: string; how: 'miss' | 'parry' | 'shield' }
  | { k: 'dmg'; by?: string; to: string; what?: string; dmg: number; crit?: true; saved?: true }
  | { k: 'heal'; by?: string; to: string; what: string; amt: number }
  | { k: 'down'; who: string; by?: string }
  | { k: 'endure'; who: string }
  | { k: 'death'; who: string; roll: number; ok: number; fail: number; result: string }
  | { k: 'cond'; who: string; what: string; by?: string }
  | { k: 'countered'; who: string; what: string; by: string }
  | { k: 'mistake'; who: string; what: string }

export type SimFrame = { round: number; hp: SimHp[]; acts: SimAct[]; events: string[] }

export type SimRoom = {
  room: string
  outcome: string
  roster: SimRosterEntry[]
  frames: SimFrame[]
}

/** One narrated run, kept turn by turn, for the replay. */
export type SimReplay = {
  route: string
  crystal: string
  party: string
  kind: SimOutcome
  seed: number
  rooms: SimRoom[]
}

export type SimData = {
  runs: number
  routes: SimOption[]
  crystal: SimOption[]
  foes: SimOption[]
  party: SimOption[]
  mistakes: number[]
  scenarios: SimScenario[]
  replays: SimReplay[]
}

/** Written by `bun run sims:rtl`; read as text so the type checker skips the large JSON. */
export const rideTheLightningSims: SimData = JSON.parse(raw)

export const SIM_PCS: SimPcName[] = ['Devan', 'Auren', 'Cassian', 'Swift']

/** Replays are recorded for the scene's own enemy tactics at the default mistake rate. */
export const REPLAY_FOES = 'as-written'
export const REPLAY_MISTAKES = 0.1
/** The party focus every route and crystal timing has a replay for. */
export const REPLAY_PARTY = 'scene'

export type SimPick = {
  route: string
  crystal: string
  foes: string
  party: string
  mistakes: number
}

export function findScenario(sims: SimData, pick: SimPick) {
  return sims.scenarios.find(
    (s) =>
      s.route === pick.route &&
      s.crystal === pick.crystal &&
      s.foes === pick.foes &&
      s.party === pick.party &&
      s.mistakes === pick.mistakes,
  )
}

/** Route rows by crystal-room columns, for one choice of tactics, party focus and mistake rate. */
export function outcomeMatrix(sims: SimData, pick: Pick<SimPick, 'foes' | 'party' | 'mistakes'>) {
  return sims.routes.map((route) => ({
    route,
    cells: sims.crystal.map((crystal) => ({
      crystal,
      scenario: findScenario(sims, { ...pick, route: route.key, crystal: crystal.key }),
    })),
  }))
}

/** The kept runs for a route and crystal timing: the chosen party focus where kept, else the default. */
export function findReplays(sims: SimData, route: string, crystal: string, party: string) {
  const all = sims.replays.filter((r) => r.route === route && r.crystal === crystal)
  const focused = all.filter((r) => r.party === party)
  return focused.length > 0 ? focused : all.filter((r) => r.party === REPLAY_PARTY)
}

/** Where the lost runs end, worst room first. */
export function lossRooms(scenario: Pick<SimScenario, 'lostAt'>) {
  return Object.entries(scenario.lostAt)
    .map(([room, share]) => ({ room, share }))
    .toSorted((a, b) => b.share - a.share)
}

export function percent(share: number) {
  if (share > 0 && share < 0.005) return '<1%'
  return `${Math.round(share * 100)}%`
}

const OUTCOME_LABELS: Record<string, string> = {
  'party wins': 'Party wins',
  'party knocked out': 'Party knocked out',
  'still fighting after 20 rounds': 'Still fighting after 20 rounds',
}

export function roomOutcomeLabel(outcome: string) {
  return OUTCOME_LABELS[outcome] ?? outcome
}

/** Log lines with stable keys: a line that repeats in one round keeps its own count. */
export function keyedLines(lines: readonly string[]) {
  const seen = new Map<string, number>()
  return lines.map((line) => {
    const count = (seen.get(line) ?? 0) + 1
    seen.set(line, count)
    return { key: `${line}#${count}`, line }
  })
}

/** A link in a who-hits-whom diagram. */
export type FlowLink = {
  from: string
  to: string
  fromSide: SimSide
  toSide: SimSide
  value: number
  hits: number
  crits: number
}

/** The party and the freed soldiers fight on the same side. */
export const isParty = (side: SimSide) => side !== 'foe'

function sideLookup(roster: readonly SimRosterEntry[]) {
  const sides = new Map(roster.map((entry) => [entry.name, entry.side]))
  return (name: string | undefined): SimSide => (name && sides.get(name)) || 'foe'
}

/** Damage from each attacker to each target over a list of events, biggest first. */
export function flowOf(acts: readonly SimAct[], roster: readonly SimRosterEntry[]): FlowLink[] {
  const sideOf = sideLookup(roster)
  const links = new Map<string, FlowLink>()
  for (const act of acts) {
    if (act.k !== 'dmg' || !act.by) continue
    const key = `${act.by}>${act.to}`
    const link = links.get(key) ?? {
      from: act.by,
      to: act.to,
      fromSide: sideOf(act.by),
      toSide: sideOf(act.to),
      value: 0,
      hits: 0,
      crits: 0,
    }
    link.value += act.dmg
    link.hits += 1
    if (act.crit) link.crits += 1
    links.set(key, link)
  }
  return [...links.values()].toSorted((a, b) => b.value - a.value)
}

/** Per-run damage totals by kind of combatant, as links for the same diagram. */
export function scenarioFlow(scenario: Pick<SimScenario, 'flow'>): FlowLink[] {
  const sideOf = (name: string): SimSide =>
    SIM_PCS.includes(name as SimPcName) ? 'pc' : name === 'Soldier' ? 'ally' : 'foe'
  return scenario.flow
    .map(([from, to, value]) => ({
      from,
      to,
      fromSide: sideOf(from),
      toSide: sideOf(to),
      value,
      hits: 0,
      crits: 0,
    }))
    .toSorted((a, b) => b.value - a.value)
}

/** The headline numbers of a stretch of fighting: one round, or a whole room. */
export function fightSummary(acts: readonly SimAct[], roster: readonly SimRosterEntry[]) {
  const sideOf = sideLookup(roster)
  const total = {
    party: { damage: 0, hits: 0, misses: 0, crits: 0, healing: 0 },
    foes: { damage: 0, hits: 0, misses: 0, crits: 0, healing: 0 },
  }
  const downs: string[] = []
  for (const act of acts) {
    if (act.k === 'dmg' && act.by) {
      const side = isParty(sideOf(act.by)) ? total.party : total.foes
      side.damage += act.dmg
      side.hits += 1
      if (act.crit) side.crits += 1
    } else if (act.k === 'miss') {
      ;(isParty(sideOf(act.by)) ? total.party : total.foes).misses += 1
    } else if (act.k === 'heal') {
      ;(isParty(sideOf(act.to)) ? total.party : total.foes).healing += act.amt
    } else if (act.k === 'down') {
      downs.push(act.who)
    }
  }
  return { ...total, downs }
}

/** A round's events grouped by whose turn they happened on. */
export function turnsOf(acts: readonly SimAct[]) {
  const turns: { who: string; acts: SimAct[] }[] = []
  for (const act of acts) {
    if (act.k === 'turn') turns.push({ who: act.who, acts: [] })
    else if (turns.length > 0) turns.at(-1)!.acts.push(act)
  }
  return turns
}

/** Damage each combatant took this round, to mark it on their hit point bar. */
export function damageTaken(acts: readonly SimAct[]) {
  const taken = new Map<string, number>()
  for (const act of acts) {
    if (act.k === 'dmg') taken.set(act.to, (taken.get(act.to) ?? 0) + act.dmg)
  }
  return taken
}

/** Every event of a room up to and including one round, for running tallies such as death saves. */
export function actsUntil(room: SimRoom, frameIndex: number) {
  return room.frames.slice(0, frameIndex + 1).flatMap((frame) => frame.acts)
}

/** Each downed PC's death saves as they stand after these events. Healing clears them. */
export function deathSaves(acts: readonly SimAct[]) {
  const saves = new Map<string, { ok: number; fail: number; result: string }>()
  for (const act of acts) {
    if (act.k === 'death') saves.set(act.who, { ok: act.ok, fail: act.fail, result: act.result })
    if (act.k === 'heal') saves.delete(act.to)
    if (act.k === 'death' && act.result === 'up') saves.delete(act.who)
  }
  return saves
}
