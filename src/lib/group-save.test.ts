import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { SceneGroupSave } from '#/definitions/scene'

import {
  EMPTY_GROUP_SAVE,
  clearGroupSave,
  groupSaveRows,
  groupSaveSummary,
  parseGroupSaveState,
  resolveGroupSave,
  rollGroupSaveFor,
  rollGroupSaveRest,
  sceneGroupSaves,
  setGroupSaveOnScreen,
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
    { id: 'pc:hero', kind: 'pc', name: 'Hero', avatar: undefined, met: true, bonus: undefined },
    { id: 'npc:crow', kind: 'npc', name: 'Crow', avatar: undefined, met: true, bonus: 2 },
    { id: 'beast:wolf', kind: 'beast', name: 'Wolf', avatar: undefined, met: false, bonus: -1 },
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
      entries: { 'pc:hero': { reason: false } },
    })
  })

  it('clears the rolls but leaves the player screen alone', () => {
    const state = setGroupSaveRoll(setGroupSaveOnScreen(EMPTY_GROUP_SAVE, true), 'pc:hero', 12)
    expect(clearGroupSave(state)).toEqual({ onScreen: true, entries: {} })
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

  it('finds the group save of the green pulse, which only lists people the party has met', () => {
    const [pulse] = sceneGroupSaves('the_green_pulse_over_the_sky_islands')
    expect(pulse?.storageKey).toBe('the_green_pulse_over_the_sky_islands:2')
    expect(pulse?.save.rollers.every((roller) => roller.met)).toBe(true)
    expect(sceneGroupSaves('no_such_scene')).toEqual([])
  })
})
