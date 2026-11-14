import { z } from 'zod'

import type { EntityRef } from '#/definitions/kind'
import type { Condition } from '#/definitions/rules-glossary'

import {
  CombatFields,
  applyTurnBoundary,
  makeCondition,
  recordDeathSave,
  type DurationChoice,
  type TurnNote,
} from './encounter-combat'

/**
 * Browser-local encounter tracking. The DM prepares several encounters; each owns its roster, turn
 * order, and the live values of its combatants. The campaign record supplies starting values;
 * values the DM changes during play are saved on the encounter and take precedence until reset.
 */

const CreatureRef = z.strictObject({ ref: z.enum(['npc', 'beast']), key: z.string().min(1) })
const PcRef = z.strictObject({ ref: z.literal('pc'), key: z.string().min(1) })

const RosterEntry = z.discriminatedUnion('kind', [
  z.strictObject({
    id: z.string(),
    kind: z.literal('creature'),
    source: CreatureRef,
    copy: z.number().int().positive(),
  }),
  z.strictObject({ id: z.string(), kind: z.literal('pc'), source: PcRef }),
  z.strictObject({ id: z.string(), kind: z.literal('placeholder'), label: z.string().min(1) }),
])

const CombatantValues = z.strictObject({
  hp: z.number().int().nonnegative().optional(),
  maxHp: z.number().int().positive().optional(),
  ac: z.number().int().nonnegative().optional(),
  uses: z.record(z.string(), z.number().int().nonnegative()).optional(),
  maxUses: z.record(z.string(), z.number().int().nonnegative()).optional(),
  ...CombatFields,
})

const Encounter = z.strictObject({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  scene: z.strictObject({ ref: z.literal('scene'), key: z.string().min(1) }).optional(),
  roster: z.array(RosterEntry),
  active: z.string().optional(),
  round: z.number().int().positive(),
  /** Live values per combatant in this encounter, keyed by roster entry id. */
  values: z.record(z.string(), CombatantValues),
})

const EncounterStore = z.strictObject({ encounters: z.array(Encounter) })

export type CreatureRef = EntityRef<'npc'> | EntityRef<'beast'>
export type RosterEntry = z.infer<typeof RosterEntry>
export type CombatantValues = z.infer<typeof CombatantValues>
export type Encounter = z.infer<typeof Encounter>
export type EncounterStore = z.infer<typeof EncounterStore>

export const ENCOUNTER_STORAGE_KEY = 'lost-hope:dm-encounters'

export const LEGENDARY_POOL = 'legendary'

export function emptyStore(): EncounterStore {
  return { encounters: [] }
}

/** Read saved state, discarding anything that no longer matches the current shape. */
export function parseStore(raw: string | null): EncounterStore {
  if (!raw) return emptyStore()
  try {
    const parsed = EncounterStore.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : emptyStore()
  } catch {
    return emptyStore()
  }
}

// --- Roster -------------------------------------------------------------------------------------

function sameSource(entry: RosterEntry, source: CreatureRef) {
  return (
    entry.kind === 'creature' && entry.source.ref === source.ref && entry.source.key === source.key
  )
}

/**
 * Add a creature as its own combatant. Copies of one record take the lowest free copy number, so
 * names stay short after a copy is removed.
 */
export function addCreature(encounter: Encounter, source: CreatureRef): Encounter {
  const taken = new Set(
    encounter.roster.flatMap((entry) =>
      entry.kind === 'creature' && sameSource(entry, source) ? [entry.copy] : [],
    ),
  )
  let copy = 1
  while (taken.has(copy)) copy += 1
  return appendEntry(encounter, {
    id: `${source.ref}:${source.key}:${copy}`,
    kind: 'creature',
    source: { ref: source.ref, key: source.key },
    copy,
  })
}

export function addPc(encounter: Encounter, source: EntityRef<'pc'>): Encounter {
  const id = `pc:${source.key}`
  if (encounter.roster.some((entry) => entry.id === id)) return encounter
  return appendEntry(encounter, { id, kind: 'pc', source: { ref: 'pc', key: source.key } })
}

export function addPlaceholder(encounter: Encounter, label: string): Encounter {
  const trimmed = label.trim()
  if (!trimmed) return encounter
  const ids = new Set(encounter.roster.map((entry) => entry.id))
  let index = 1
  while (ids.has(`placeholder:${index}`)) index += 1
  return appendEntry(encounter, { id: `placeholder:${index}`, kind: 'placeholder', label: trimmed })
}

function appendEntry(encounter: Encounter, entry: RosterEntry): Encounter {
  return {
    ...encounter,
    roster: [...encounter.roster, entry],
    active: encounter.active ?? entry.id,
  }
}

export function removeCombatant(encounter: Encounter, id: string): Encounter {
  const index = encounter.roster.findIndex((entry) => entry.id === id)
  if (index < 0) return encounter
  const roster = encounter.roster.toSpliced(index, 1)
  const active = encounter.active === id ? (roster[index] ?? roster[0])?.id : encounter.active
  const { [id]: _removed, ...values } = encounter.values
  return { ...encounter, roster, active, values }
}

/** Move a combatant within the initiative order. The active combatant stays active. */
export function moveCombatant(encounter: Encounter, id: string, toIndex: number): Encounter {
  const from = encounter.roster.findIndex((entry) => entry.id === id)
  if (from < 0) return encounter
  const target = Math.max(0, Math.min(encounter.roster.length - 1, toIndex))
  if (target === from) return encounter
  const roster = encounter.roster.toSpliced(from, 1)
  roster.splice(target, 0, encounter.roster[from]!)
  return { ...encounter, roster }
}

/**
 * Advance or rewind the turn. Wrapping past the last entry advances the round. Combatants that are
 * out of the fight are skipped. Turn navigation changes only the active entry and round.
 */
export function stepTurn(
  encounter: Encounter,
  step: 1 | -1,
  isOut: (id: string) => boolean = () => false,
): Encounter {
  const { roster } = encounter
  if (roster.length === 0) return encounter
  let index = Math.max(
    0,
    roster.findIndex((entry) => entry.id === encounter.active),
  )
  let round = encounter.round
  for (let tried = 0; tried < roster.length; tried += 1) {
    const next = index + step
    if (next < 0 && round === 1)
      return tried === 0 ? encounter : { ...encounter, round, active: roster[index]!.id }
    if (next < 0) round -= 1
    if (next >= roster.length) round += 1
    index = (next + roster.length) % roster.length
    if (!isOut(roster[index]!.id)) break
  }
  return { ...encounter, round, active: roster[index]!.id }
}

/**
 * Move to the next turn and apply what happens at the boundary: conditions expire, save-ends
 * conditions prompt a save, and the starting creature's legendary actions refill.
 */
export function advanceTurn(
  encounter: Encounter,
  {
    isOut = () => false,
    legendaryUses = () => undefined,
  }: {
    isOut?: (id: string) => boolean
    legendaryUses?: (id: string) => number | undefined
  } = {},
): { encounter: Encounter; notes: TurnNote[] } {
  const moved = stepTurn(encounter, 1, isOut)
  if (moved === encounter || !moved.active) return { encounter: moved, notes: [] }
  const { values, notes } = applyTurnBoundary(encounter.values, {
    ending: encounter.active,
    starting: moved.active,
    endingRound: encounter.round,
    startingRound: moved.round,
    legendaryUses: legendaryUses(moved.active),
    legendaryPool: LEGENDARY_POOL,
  })
  return { encounter: { ...moved, values }, notes }
}

export function canStepBack(encounter: Encounter) {
  return encounter.round > 1 || encounter.roster[0]?.id !== encounter.active
}

/** Add each PC that is not already in the roster. */
export function addParty(encounter: Encounter, pcs: readonly EntityRef<'pc'>[]): Encounter {
  return pcs.reduce(addPc, encounter)
}

// --- Prepared encounters ------------------------------------------------------------------------

export type NewEncounter = {
  id: string
  name: string
  scene?: EntityRef<'scene'>
  build?: (encounter: Encounter) => Encounter
}

/** Prepare a new encounter. Saved combatant values are kept. */
export function createEncounter(
  store: EncounterStore,
  { id, name, scene, build = (encounter) => encounter }: NewEncounter,
): EncounterStore {
  const blank: Encounter = {
    id,
    name: name.trim() || 'Encounter',
    ...(scene ? { scene: { ref: 'scene', key: scene.key } } : {}),
    roster: [],
    active: undefined,
    round: 1,
    values: {},
  }
  return { ...store, encounters: [...store.encounters, { ...build(blank), round: 1 }] }
}

export function findEncounter(store: EncounterStore, id: string) {
  return store.encounters.find((encounter) => encounter.id === id)
}

/** The first encounter prepared for a scene, if any. */
export function encounterForScene(store: EncounterStore, scene: EntityRef<'scene'>) {
  return store.encounters.find((encounter) => encounter.scene?.key === scene.key)
}

export function updateEncounter(
  store: EncounterStore,
  id: string,
  change: (encounter: Encounter) => Encounter,
): EncounterStore {
  return {
    ...store,
    encounters: store.encounters.map((encounter) =>
      encounter.id === id ? change(encounter) : encounter,
    ),
  }
}

export function renameEncounter(store: EncounterStore, id: string, name: string): EncounterStore {
  const trimmed = name.trim()
  return trimmed
    ? updateEncounter(store, id, (encounter) => ({ ...encounter, name: trimmed }))
    : store
}

/** Copy an encounter's roster, order, and current HP and uses, starting again from the first turn. */
export function duplicateEncounter(
  store: EncounterStore,
  id: string,
  copyId: string,
): EncounterStore {
  const source = findEncounter(store, id)
  if (!source) return store
  const index = store.encounters.indexOf(source)
  const copy: Encounter = {
    ...source,
    id: copyId,
    name: `${source.name} (copy)`,
    active: source.roster[0]?.id,
    round: 1,
  }
  return { ...store, encounters: store.encounters.toSpliced(index + 1, 0, copy) }
}

export function deleteEncounter(store: EncounterStore, id: string): EncounterStore {
  return { ...store, encounters: store.encounters.filter((encounter) => encounter.id !== id) }
}

// --- Live values --------------------------------------------------------------------------------

export type LiveStats = { hp?: number; maxHp?: number; ac?: number }

/** Starting values from the creature's derived stat block. */
export type StartingStats = { maxHp?: number; ac?: number }

export function liveStats(start: StartingStats | undefined, saved: CombatantValues | undefined) {
  const maxHp = saved?.maxHp ?? start?.maxHp
  return { maxHp, hp: saved?.hp ?? maxHp, ac: saved?.ac ?? start?.ac } satisfies LiveStats
}

export function abilityKey(timing: string, name: string) {
  return `${timing}:${name}`
}

export type UseCount = { uses: number; maxUses: number }

/** Remaining and maximum uses for a limited ability or legendary pool, if it is limited. */
export function remainingUses(
  startingUses: number | undefined,
  saved: CombatantValues | undefined,
  key: string,
): UseCount | undefined {
  const maxUses = saved?.maxUses?.[key] ?? startingUses
  if (maxUses === undefined) return undefined
  return { maxUses, uses: saved?.uses?.[key] ?? maxUses }
}

function updateValues(
  encounter: Encounter,
  id: string,
  update: (values: CombatantValues) => CombatantValues,
): Encounter {
  return { ...encounter, values: { ...encounter.values, [id]: update(encounter.values[id] ?? {}) } }
}

export function setStat(
  encounter: Encounter,
  id: string,
  field: 'hp' | 'maxHp' | 'ac',
  value: number,
): Encounter {
  if (!Number.isInteger(value) || value < (field === 'maxHp' ? 1 : 0)) return encounter
  return updateValues(encounter, id, (values) => ({ ...values, [field]: value }))
}

/** Apply damage (negative) or healing (positive). Healing stops at maximum HP. */
export function adjustHp(
  encounter: Encounter,
  id: string,
  start: StartingStats | undefined,
  delta: number,
): Encounter {
  const { hp, maxHp } = liveStats(start, encounter.values[id])
  if (hp === undefined) return encounter
  const ceiling = delta > 0 && maxHp !== undefined ? Math.max(hp, maxHp) : Infinity
  return setStat(encounter, id, 'hp', Math.max(0, Math.min(ceiling, hp + delta)))
}

export function setUses(
  encounter: Encounter,
  id: string,
  key: string,
  field: 'uses' | 'maxUses',
  value: number,
): Encounter {
  if (!Number.isInteger(value) || value < 0) return encounter
  return updateValues(encounter, id, (values) => ({
    ...values,
    [field]: { ...values[field], [key]: value },
  }))
}

export function spendUse(
  encounter: Encounter,
  id: string,
  key: string,
  count: UseCount,
): Encounter {
  return count.uses > 0 ? setUses(encounter, id, key, 'uses', count.uses - 1) : encounter
}

/** The DM marks an ability ready. Recharge is never automatic. */
export function recharge(
  encounter: Encounter,
  id: string,
  key: string,
  count: UseCount,
): Encounter {
  return setUses(encounter, id, key, 'uses', count.maxUses)
}

// --- Conditions, concentration, and 0 HP ---------------------------------------------------------

export function addCondition(
  encounter: Encounter,
  id: string,
  condition: Condition,
  duration: DurationChoice,
  conditionId: string,
): Encounter {
  const held = makeCondition(condition, duration, {
    id: conditionId,
    round: encounter.round,
    active: encounter.active,
  })
  return updateValues(encounter, id, (values) => ({
    ...values,
    conditions: [...(values.conditions ?? []).filter((c) => c.condition !== condition), held],
  }))
}

export function removeCondition(encounter: Encounter, id: string, conditionId: string): Encounter {
  return updateValues(encounter, id, (values) => ({
    ...values,
    conditions: (values.conditions ?? []).filter((held) => held.id !== conditionId),
  }))
}

export function setConcentration(
  encounter: Encounter,
  id: string,
  on: string | undefined,
): Encounter {
  return updateValues(encounter, id, ({ concentration: _previous, ...values }) =>
    on === undefined ? values : { ...values, concentration: { on } },
  )
}

/** A PC drops to 0 HP and starts making death saves. */
export function startDying(encounter: Encounter, id: string): Encounter {
  return updateValues(encounter, id, ({ stable: _stable, dead: _dead, ...values }) => ({
    ...values,
    dying: { successes: 0, failures: 0 },
  }))
}

export function deathSave(
  encounter: Encounter,
  id: string,
  result: 'success' | 'failure',
  count = 1,
): Encounter {
  return updateValues(encounter, id, (values) => {
    if (!values.dying) return values
    const { saves, outcome } = recordDeathSave(values.dying, result, count)
    if (outcome === 'dead') return { ...values, dying: saves, dead: true }
    if (outcome === 'stable') return { ...values, dying: undefined, stable: true }
    return { ...values, dying: saves }
  })
}

/** Healing or the DM brings a PC back up: death saves reset. */
export function backUp(encounter: Encounter, id: string): Encounter {
  return updateValues(encounter, id, ({ dying: _d, stable: _s, dead: _x, ...values }) => values)
}

export function markDead(encounter: Encounter, id: string, dead: boolean): Encounter {
  return updateValues(encounter, id, ({ dying: _d, stable: _s, dead: _x, ...values }) =>
    dead ? { ...values, dead: true } : values,
  )
}

export function setInLair(encounter: Encounter, id: string, inLair: boolean): Encounter {
  return updateValues(encounter, id, ({ inLair: _previous, ...values }) =>
    inLair ? { ...values, inLair: true } : values,
  )
}

/** Record this round's lair action. */
export function recordLairAction(encounter: Encounter, id: string, key: string): Encounter {
  return updateValues(encounter, id, (values) => ({
    ...values,
    lastLairAction: { key, round: encounter.round },
  }))
}

/** Restore a combatant's starting values from the campaign record. */
export function resetCombatant(encounter: Encounter, id: string): Encounter {
  const { [id]: _reset, ...values } = encounter.values
  return { ...encounter, values }
}

/** Restore every combatant to full HP and uses. The roster and turn order stay. */
export function resetEncounter(encounter: Encounter): Encounter {
  return { ...encounter, values: {} }
}

// --- Display ------------------------------------------------------------------------------------

/** Number copies only when the roster holds several of one record, or a later copy remains. */
export function combatantName(entry: RosterEntry, roster: readonly RosterEntry[], name: string) {
  if (entry.kind !== 'creature') return name
  const copies = roster.filter((other) => sameSource(other, entry.source)).length
  return copies > 1 || entry.copy > 1 ? `${name} ${entry.copy}` : name
}

export const ABILITY_ORDER = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const
