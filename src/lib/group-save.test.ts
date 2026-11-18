import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { SceneGroupSave } from '#/definitions/scene'

import {
  EMPTY_GROUP_SAVE,
  GROUP_SAVE_PAGE_SIZE,
  clearGroupSave,
  groupSavePageCount,
  groupSavePageOf,
  groupSaveRows,
  groupSaveSummary,
  parseGroupSaveState,
  resolveGroupSave,
  rollGroupSaveFor,
  rollGroupSaveRest,
  sceneGroupSaves,
  setGroupSaveOnScreen,
  setGroupSavePage,
  setGroupSaveReason,
  setGroupSaveRoll,
  type GroupSave,
} from './group-save'

const save: GroupSave = {
  title: 'Who holds on?',
  abilityName: 'Wisdom',
  dc: 15,
  reasonBonus: 5,
  passed: 'Holds on',
  failed: 'Lets go',
  rollers: [
    {
      id: 'pc:hero',
      kind: 'pc',
      name: 'Hero',
      avatar: undefined,
      met: true,
      bonus: undefined,
      dmRolls: false,
      always: undefined,
    },
    {
      id: 'npc:crow',
      kind: 'npc',
      name: 'Crow',
      avatar: undefined,
      met: true,
      bonus: 2,
      dmRolls: true,
      always: undefined,
    },
    {
      id: 'beast:wolf',
      kind: 'beast',
      name: 'Wolf',
      avatar: undefined,
      met: false,
      bonus: -1,
      dmRolls: true,
      always: undefined,
    },
  ],
}

/** A die that always lands on the given face. */
const always = (face: number) => () => (face - 1) / 20

describe('group save rows', () => {
  it('leaves everyone pending until a roll is filled in', () => {
    expect(groupSaveRows(save, EMPTY_GROUP_SAVE).map((row) => row.outcome)).toEqual([
      'pending',
      'pending',
      'pending',
    ])
  })

  it('takes a player’s roll as their total and adds the stat block’s save bonus to a die', () => {
    let state = setGroupSaveRoll(EMPTY_GROUP_SAVE, 'pc:hero', 15)
    state = setGroupSaveRoll(state, 'npc:crow', 12)
    state = setGroupSaveRoll(state, 'beast:wolf', 15)
    expect(groupSaveRows(save, state).map((row) => [row.total, row.outcome])).toEqual([
      [15, 'passed'],
      [14, 'failed'],
      [14, 'failed'],
    ])
  })

  it('adds the bonus for a good reason, which can turn a failure around', () => {
    let state = setGroupSaveRoll(EMPTY_GROUP_SAVE, 'npc:crow', 8)
    expect(groupSaveRows(save, state)[1]).toMatchObject({ total: 10, outcome: 'failed' })
    state = setGroupSaveReason(state, 'npc:crow', true)
    expect(groupSaveRows(save, state)[1]).toMatchObject({ total: 15, outcome: 'passed' })
  })

  it('keeps a reason given before the roll, and takes a roll away again', () => {
    let state = setGroupSaveReason(EMPTY_GROUP_SAVE, 'pc:hero', true)
    state = setGroupSaveRoll(state, 'pc:hero', 10)
    expect(groupSaveRows(save, state)[0]).toMatchObject({ total: 15, outcome: 'passed' })
    state = setGroupSaveRoll(state, 'pc:hero', undefined)
    expect(groupSaveRows(save, state)[0]).toMatchObject({ reason: true, outcome: 'pending' })
  })
})

describe('rolling for the DM', () => {
  it('rolls one character again on request', () => {
    const state = rollGroupSaveFor(
      setGroupSaveRoll(EMPTY_GROUP_SAVE, 'npc:crow', 3),
      'npc:crow',
      always(17),
    )
    expect(state.entries['npc:crow']?.roll).toBe(17)
  })

  it('rolls only for characters the DM rolls for who have no roll yet', () => {
    const state = rollGroupSaveRest(
      setGroupSaveRoll(EMPTY_GROUP_SAVE, 'npc:crow', 3),
      save,
      always(20),
    )
    expect(state.entries['pc:hero']).toBeUndefined()
    expect(state.entries['npc:crow']?.roll).toBe(3)
    expect(state.entries['beast:wolf']?.roll).toBe(20)
  })
})

describe('fixed outcomes', () => {
  const withFixed: GroupSave = {
    ...save,
    rollers: [
      ...save.rollers,
      {
        id: 'npc:zealot',
        kind: 'npc',
        name: 'Zealot',
        avatar: undefined,
        met: false,
        bonus: 0,
        dmRolls: true,
        always: 'passed',
      },
      {
        id: 'pc:old_friend',
        kind: 'pc',
        name: 'Old friend',
        avatar: undefined,
        met: true,
        bonus: undefined,
        dmRolls: true,
        always: undefined,
      },
    ],
  }

  it('never rolls for someone whose outcome is fixed, whatever was stored', () => {
    const stored = JSON.stringify({ entries: { 'npc:zealot': { roll: 1, reason: false } } })
    const state = rollGroupSaveRest(parseGroupSaveState(stored, withFixed), withFixed, always(1))
    expect(state.entries['npc:zealot']).toBeUndefined()
    expect(groupSaveRows(withFixed, state)[3]).toMatchObject({
      total: undefined,
      outcome: 'passed',
    })
  })

  it('rolls a plain d20 for a PC nobody is playing', () => {
    const state = rollGroupSaveRest(EMPTY_GROUP_SAVE, withFixed, always(16))
    expect(groupSaveRows(withFixed, state)[4]).toMatchObject({ total: 16, outcome: 'passed' })
    expect(state.entries['pc:hero']).toBeUndefined()
  })

  it('says so in the summary', () => {
    expect(groupSaveSummary(withFixed, groupSaveRows(withFixed, EMPTY_GROUP_SAVE))).toContain(
      'Zealot: no roll. Holds on',
    )
  })
})

describe('pages on the player screen', () => {
  const many: GroupSave = {
    ...save,
    rollers: Array.from({ length: GROUP_SAVE_PAGE_SIZE * 2 + 1 }, (_, index) => ({
      id: `npc:n${index}`,
      kind: 'npc' as const,
      name: `N${index}`,
      avatar: undefined,
      met: true,
      bonus: 0,
      dmRolls: true,
      always: undefined,
    })),
  }

  it('splits the list into pages in order', () => {
    expect(groupSavePageCount(save)).toBe(1)
    expect(groupSavePageCount(many)).toBe(3)
    expect(groupSavePageOf(many, 'npc:n0')).toBe(0)
    expect(groupSavePageOf(many, `npc:n${GROUP_SAVE_PAGE_SIZE}`)).toBe(1)
    expect(groupSaveRows(many, EMPTY_GROUP_SAVE).at(-1)?.page).toBe(2)
  })

  it('turns to a page that exists and remembers it', () => {
    const state = setGroupSavePage(EMPTY_GROUP_SAVE, many, 2)
    expect(state.page).toBe(2)
    expect(setGroupSavePage(state, many, 9).page).toBe(2)
    expect(parseGroupSaveState(JSON.stringify(state), many).page).toBe(2)
    expect(parseGroupSaveState(JSON.stringify(state), save).page).toBe(0)
  })
})

describe('stored rolls', () => {
  it('survives a round trip through storage', () => {
    let state = setGroupSaveOnScreen(EMPTY_GROUP_SAVE, true)
    state = setGroupSaveReason(setGroupSaveRoll(state, 'npc:crow', 11), 'npc:crow', true)
    expect(parseGroupSaveState(JSON.stringify(state), save)).toEqual(state)
  })

  it('drops rubbish, impossible rolls and characters the save no longer lists', () => {
    expect(parseGroupSaveState('not json', save)).toEqual(EMPTY_GROUP_SAVE)
    expect(parseGroupSaveState(null, save)).toEqual(EMPTY_GROUP_SAVE)
    const raw = JSON.stringify({
      onScreen: 'yes',
      entries: { 'pc:hero': { roll: 0, reason: 1 }, 'npc:gone': { roll: 12, reason: true } },
    })
    expect(parseGroupSaveState(raw, save)).toEqual({
      onScreen: false,
      page: 0,
      entries: { 'pc:hero': { reason: false } },
    })
  })

  it('clears the rolls for a fresh run but leaves the list on the player screen', () => {
    const state = setGroupSaveRoll(setGroupSaveOnScreen(EMPTY_GROUP_SAVE, true), 'pc:hero', 12)
    expect(clearGroupSave({ ...state, page: 1 })).toEqual({ onScreen: true, page: 0, entries: {} })
  })
})

describe('the summary to keep', () => {
  it('spells out each roll and how it came out', () => {
    let state = setGroupSaveReason(
      setGroupSaveRoll(EMPTY_GROUP_SAVE, 'pc:hero', 12),
      'pc:hero',
      true,
    )
    state = setGroupSaveRoll(state, 'npc:crow', 9)
    expect(groupSaveSummary(save, groupSaveRows(save, state))).toBe(
      [
        'Who holds on? (DC 15 Wisdom saving throw)',
        'Hero: total 12, +5 for a reason = 17. Holds on',
        'Crow: d20 9 +2 save = 11. Lets go',
        'Wolf: not rolled',
      ].join('\n'),
    )
  })
})

describe('group saves in campaign data', () => {
  it('looks up names, the title and save bonuses from the records', () => {
    const resolved = resolveGroupSave(
      SceneGroupSave.parse({
        title: [['Who still cares about ', refs.pcs.jim, '?']],
        ability: 'wis',
        dc: 15,
        rollers: [refs.pcs.swift_starblade, refs.npcs.crowy, refs.beasts.wolfie],
        passed: 'Still cares',
        failed: 'No longer cares',
      }),
    )
    expect(resolved.title).toBe('Who still cares about Jim?')
    expect(resolved.abilityName).toBe('Wisdom')
    expect(resolved.rollers.map((roller) => roller.id)).toEqual([
      'pc:swift_starblade',
      'npc:crowy',
      'beast:wolfie',
    ])
    expect(resolved.rollers[0]).toMatchObject({ name: 'Swift Starblade', bonus: undefined })
    expect(resolved.rollers[1]?.bonus).toBeTypeOf('number')
    expect(resolved.rollers[2]?.bonus).toBeTypeOf('number')
  })

  it('finds the group save of the green pulse, with the Hand’s outcomes fixed', () => {
    const [pulse] = sceneGroupSaves('the_green_pulse_over_the_sky_islands')
    expect(pulse?.storageKey).toBe('the_green_pulse_over_the_sky_islands:2')
    const always = Object.fromEntries(
      (pulse?.save.rollers ?? []).flatMap((roller) =>
        roller.always ? [[roller.id, roller.always]] : [],
      ),
    )
    expect(always).toEqual({
      'npc:silas_wren': 'passed',
      'npc:cloaked_snatcher': 'failed',
      'npc:the_father': 'passed',
    })
    expect(sceneGroupSaves('no_such_scene')).toEqual([])
  })

  it('lets players roll for the PCs in play and the DM for everyone else', () => {
    const [pulse] = sceneGroupSaves('the_green_pulse_over_the_sky_islands')
    const dmRolls = (id: string) => pulse?.save.rollers.find((roller) => roller.id === id)?.dmRolls
    expect(dmRolls('pc:swift_starblade')).toBe(false)
    expect(dmRolls('pc:william_greenhove')).toBe(true)
    expect(dmRolls('npc:crowy')).toBe(true)
  })
})
