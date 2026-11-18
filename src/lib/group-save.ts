import { isEntityRef } from '#/definitions/kind'
import type { SceneGroupSave } from '#/definitions/scene'
import type { OwnOrSharedStatBlock } from '#/definitions/stat-block'
import { PLAYER_VISIBLE_KEYS, SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveSourceRef, resolveStatBlock, scenes } from '#/lib/dm-campaign'
import { rules } from '#/lib/rules'
import { deriveStatBlock, signed } from '#/lib/stat-block'

const statBlocks: Record<
  'npc' | 'beast',
  Readonly<Record<string, { stats: OwnOrSharedStatBlock } | undefined>>
> = SOURCE_REGISTRIES

const pcs: Readonly<Record<string, { status: string } | undefined>> = SOURCE_REGISTRIES.pc

export type GroupSaveOutcome = 'pending' | 'passed' | 'failed'

/** One character in a group save, ready to list. */
export type GroupSaveRoller = {
  /** Kind and key, such as `npc:crowy`. */
  id: string
  kind: 'pc' | 'npc' | 'beast'
  name: string
  avatar: string | undefined
  /** Whether the party has met them, so the player screen can print their name. */
  met: boolean
  /**
   * The save bonus added to the die, from the stat block. A PC has none here: the number filled in
   * for them is their total.
   */
  bonus: number | undefined
  /** Whether the DM rolls for them: everyone but the PCs who are being played. */
  dmRolls: boolean
  /** A fixed outcome. Nobody rolls for them. */
  always: 'passed' | 'failed' | undefined
}

/** A beat's group save with everything looked up, ready for the DM's tracker and the player screen. */
export type GroupSave = {
  title: string
  abilityName: string
  dc: number
  reasonBonus: number | undefined
  passed: string
  failed: string
  rollers: GroupSaveRoller[]
}

/** The heading as the players read it: its words, with each record written as its name. */
function headingText(title: SceneGroupSave['title']): string {
  return title
    .map((paragraph) =>
      paragraph
        .map((part) =>
          typeof part === 'string'
            ? part
            : isEntityRef(part)
              ? (resolveSourceRef(part)?.name ?? '')
              : '',
        )
        .join(''),
    )
    .join(' ')
}

export function resolveGroupSave(save: SceneGroupSave): GroupSave {
  return {
    title: headingText(save.title),
    abilityName: rules[save.ability].name,
    dc: save.dc,
    reasonBonus: save.reasonBonus,
    passed: save.passed,
    failed: save.failed,
    rollers: save.rollers.flatMap((entry): GroupSaveRoller[] => {
      const ref = 'who' in entry ? entry.who : entry
      const record = resolveSourceRef(ref)
      if (!record) return []
      const stats =
        ref.ref === 'pc' ? undefined : resolveStatBlock(statBlocks[ref.ref][ref.key]?.stats)
      return [
        {
          id: `${ref.ref}:${ref.key}`,
          kind: ref.ref,
          name: record.name,
          avatar: record.avatar,
          met: PLAYER_VISIBLE_KEYS[ref.ref].has(ref.key),
          bonus: stats ? deriveStatBlock(stats).saves[save.ability] : undefined,
          dmRolls: ref.ref !== 'pc' || pcs[ref.key]?.status !== 'active',
          always: 'who' in entry ? entry.always : undefined,
        },
      ]
    }),
  }
}

/** Where one beat's rolls are kept in the browser. */
export function groupSaveStorageKey(sceneKey: string, beatNumber: number): string {
  return `${sceneKey}:${beatNumber}`
}

/** Every group save in a scene's script, with the key its rolls are stored under. */
export function sceneGroupSaves(sceneKey: string): { storageKey: string; save: GroupSave }[] {
  const scene = Object.hasOwn(scenes, sceneKey) ? scenes[sceneKey] : undefined
  if (!scene) return []
  return scene.beats.flatMap((beat, index) =>
    beat.groupSave
      ? [
          {
            storageKey: groupSaveStorageKey(sceneKey, index + 1),
            save: resolveGroupSave(beat.groupSave),
          },
        ]
      : [],
  )
}

/** How many characters the player screen lists at once. */
export const GROUP_SAVE_PAGE_SIZE = 8

export function groupSavePageCount(save: GroupSave): number {
  return Math.max(1, Math.ceil(save.rollers.length / GROUP_SAVE_PAGE_SIZE))
}

/** The page of the player screen a character is listed on, from 0. */
export function groupSavePageOf(save: GroupSave, id: string): number {
  const index = save.rollers.findIndex((roller) => roller.id === id)
  return index < 0 ? 0 : Math.floor(index / GROUP_SAVE_PAGE_SIZE)
}

/**
 * What the DM filled in for one character. `roll` is the die alone for someone with a stat block,
 * and the total for a PC.
 */
export type GroupSaveEntry = { roll?: number; reason: boolean }

export type GroupSaveState = {
  /** Whether the list is drawn over the scene's picture on the player screen. */
  onScreen: boolean
  /** The page of the list the player screen shows, from 0. */
  page: number
  entries: Readonly<Partial<Record<string, GroupSaveEntry>>>
}

export const EMPTY_GROUP_SAVE: GroupSaveState = { onScreen: false, page: 0, entries: {} }

/** A number the DM typed, kept only when it can be a roll. */
function validRoll(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 99
    ? value
    : undefined
}

function validPage(value: unknown, save: GroupSave): number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0
    ? Math.min(value, groupSavePageCount(save) - 1)
    : 0
}

/** Stored rolls read back, keeping only real entries of characters who still roll. */
export function parseGroupSaveState(raw: string | null, save: GroupSave): GroupSaveState {
  if (!raw) return EMPTY_GROUP_SAVE
  let stored: unknown
  try {
    stored = JSON.parse(raw)
  } catch {
    return EMPTY_GROUP_SAVE
  }
  if (typeof stored !== 'object' || stored === null) return EMPTY_GROUP_SAVE
  const { onScreen, page, entries } = stored as {
    onScreen?: unknown
    page?: unknown
    entries?: unknown
  }
  const kept: Partial<Record<string, GroupSaveEntry>> = {}
  if (typeof entries === 'object' && entries !== null) {
    for (const roller of save.rollers) {
      if (roller.always) continue
      const entry = (entries as Record<string, unknown>)[roller.id]
      if (typeof entry !== 'object' || entry === null) continue
      const { roll, reason } = entry as { roll?: unknown; reason?: unknown }
      const valid = validRoll(roll)
      kept[roller.id] = { ...(valid === undefined ? {} : { roll: valid }), reason: reason === true }
    }
  }
  return { onScreen: onScreen === true, page: validPage(page, save), entries: kept }
}

function entryOf(state: GroupSaveState, id: string): GroupSaveEntry {
  return state.entries[id] ?? { reason: false }
}

/** Fill in someone's roll, or take it away again with `undefined`. */
export function setGroupSaveRoll(
  state: GroupSaveState,
  id: string,
  roll: number | undefined,
): GroupSaveState {
  const { reason } = entryOf(state, id)
  const valid = validRoll(roll)
  return {
    ...state,
    entries: { ...state.entries, [id]: valid === undefined ? { reason } : { roll: valid, reason } },
  }
}

/** Whether a player gave a good reason for this character, which earns the bonus. */
export function setGroupSaveReason(
  state: GroupSaveState,
  id: string,
  reason: boolean,
): GroupSaveState {
  return { ...state, entries: { ...state.entries, [id]: { ...entryOf(state, id), reason } } }
}

export function setGroupSaveOnScreen(state: GroupSaveState, onScreen: boolean): GroupSaveState {
  return { ...state, onScreen }
}

/** Turn the player screen to another page of the list. */
export function setGroupSavePage(
  state: GroupSaveState,
  save: GroupSave,
  page: number,
): GroupSaveState {
  return { ...state, page: validPage(page, save) }
}

/** Forget every roll and reason and go back to the first page, for a fresh run. */
export function clearGroupSave(state: GroupSaveState): GroupSaveState {
  return { ...state, page: 0, entries: {} }
}

function d20(random: () => number): number {
  return Math.floor(random() * 20) + 1
}

/** Roll the die for one character, replacing any roll they had. */
export function rollGroupSaveFor(
  state: GroupSaveState,
  id: string,
  random: () => number = Math.random,
): GroupSaveState {
  return setGroupSaveRoll(state, id, d20(random))
}

/** Roll for everyone the DM rolls for who has no roll yet. The players' own characters are left alone. */
export function rollGroupSaveRest(
  state: GroupSaveState,
  save: GroupSave,
  random: () => number = Math.random,
): GroupSaveState {
  let next = state
  for (const roller of save.rollers) {
    if (!roller.dmRolls || roller.always || entryOf(next, roller.id).roll !== undefined) continue
    next = rollGroupSaveFor(next, roller.id, random)
  }
  return next
}

/** One line of the list: a character, what was rolled for them, and how it came out. */
export type GroupSaveRow = GroupSaveRoller & {
  roll: number | undefined
  reason: boolean
  /** The roll with the save bonus and the reason bonus added. */
  total: number | undefined
  outcome: GroupSaveOutcome
  /** The page of the player screen this line is on, from 0. */
  page: number
}

export function groupSaveRows(save: GroupSave, state: GroupSaveState): GroupSaveRow[] {
  return save.rollers.map((roller, index) => {
    const page = Math.floor(index / GROUP_SAVE_PAGE_SIZE)
    if (roller.always) {
      return {
        ...roller,
        roll: undefined,
        reason: false,
        total: undefined,
        outcome: roller.always,
        page,
      }
    }
    const { roll, reason } = entryOf(state, roller.id)
    const total =
      roll === undefined
        ? undefined
        : roll + (roller.bonus ?? 0) + (reason ? (save.reasonBonus ?? 0) : 0)
    return {
      ...roller,
      roll,
      reason,
      total,
      outcome: total === undefined ? 'pending' : total >= save.dc ? 'passed' : 'failed',
      page,
    }
  })
}

/** The rolls as plain text, for the DM to keep and later turn into a played event. */
export function groupSaveSummary(save: GroupSave, rows: readonly GroupSaveRow[]): string {
  const lines = rows.map((row) => {
    if (row.always)
      return `${row.name}: no roll. ${row.always === 'passed' ? save.passed : save.failed}`
    if (row.roll === undefined || row.total === undefined) return `${row.name}: not rolled`
    const parts = [
      row.bonus === undefined ? `total ${row.roll}` : `d20 ${row.roll} ${signed(row.bonus)} save`,
      ...(row.reason && save.reasonBonus ? [`${signed(save.reasonBonus)} for a reason`] : []),
    ]
    const verdict = row.outcome === 'passed' ? save.passed : save.failed
    return `${row.name}: ${parts.join(', ')} = ${row.total}. ${verdict}`
  })
  return [`${save.title} (DC ${save.dc} ${save.abilityName} saving throw)`, ...lines].join('\n')
}
