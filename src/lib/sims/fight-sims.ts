import type { EntityRef } from '#/definitions/kind'

import raw from './ride-the-lightning.json?raw'

/** One option on an axis of the simulated grid, such as a route or when the crystal room is found. */
export type SimOption = { key: string; label: string; detail: string }

export type SimOutcome = 'win' | 'stall' | 'tpk'

export type SimPcName = 'Devan' | 'Auren' | 'Cassian' | 'Swift'

/** The outcome of many runs of one scenario: a route, a crystal-room timing, enemy tactics and a mistake rate. */
export type SimScenario = {
  route: string
  crystal: string
  foes: string
  mistakes: number
  runs: number
  win: number
  tpk: number
  stall: number
  /** Share of all runs that ended in each room without a win. */
  lostAt: Record<string, number>
  down: Record<SimPcName, number>
  held: Record<SimPcName, number>
  damageShare: Record<SimPcName, number>
  kills: Record<SimPcName, number>
  potions: number
  bottles: number
  silasFled: number
}

export type SimRosterEntry = { name: string; side: 'pc' | 'ally' | 'foe'; who: EntityRef }

/** Hit points, max hit points, temporary hit points and conditions, in roster order. */
export type SimHp = [number, number, number, string[]]

export type SimFrame = { round: number; hp: SimHp[]; events: string[] }

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
  kind: SimOutcome
  seed: number
  rooms: SimRoom[]
}

export type SimData = {
  runs: number
  routes: SimOption[]
  crystal: SimOption[]
  foes: SimOption[]
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

export function findScenario(
  sims: SimData,
  pick: { route: string; crystal: string; foes: string; mistakes: number },
) {
  return sims.scenarios.find(
    (s) =>
      s.route === pick.route &&
      s.crystal === pick.crystal &&
      s.foes === pick.foes &&
      s.mistakes === pick.mistakes,
  )
}

/** Route rows by crystal-room columns, for one choice of enemy tactics and mistake rate. */
export function outcomeMatrix(sims: SimData, foes: string, mistakes: number) {
  return sims.routes.map((route) => ({
    route,
    cells: sims.crystal.map((crystal) => ({
      crystal,
      scenario: findScenario(sims, { route: route.key, crystal: crystal.key, foes, mistakes }),
    })),
  }))
}

export function findReplays(sims: SimData, route: string, crystal: string) {
  return sims.replays.filter((r) => r.route === route && r.crystal === crystal)
}

/** Where the lost runs end, worst room first. */
export function lossRooms(scenario: SimScenario) {
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
