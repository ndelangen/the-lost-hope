import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'

import {
  abilityTextSegments,
  formatFeet,
  plainAbilityText,
  type AbilityTextToken,
  type DerivedStatBlock,
} from './dm-ability-text'
import type { StatPart } from './stat-block'

const bite = (dice: string, amount: number, extra?: [string, number, 'acid']): StatPart[] => [
  { kind: 'value', text: '+5' },
  { kind: 'text', text: ', ' },
  { kind: 'damage', amount, roll: dice, type: refs.rules.piercing },
  ...(extra
    ? ([
        { kind: 'text', text: ' plus ' },
        { kind: 'damage', amount: extra[1], roll: extra[0], type: refs.rules[extra[2]] },
      ] as StatPart[])
    : []),
]

/** Fixture blocks shaped like the derived stat block, independent of creature data. */
const wolfie: DerivedStatBlock = {
  speed: { walk: 50 },
  abilities: {
    bite: { key: 'bite', name: 'Bite', summary: bite('2d6 + 3', 10) },
    pounce: { key: 'pounce', name: 'Pounce', summary: [{ kind: 'value', text: 'DC 13 Str' }] },
  },
  saveDc: { str: 13 },
  modifier: { str: 3, dex: 2, con: 2, int: -1, wis: 1, cha: -1 },
  proficiencyBonus: 2,
}

const mimic: DerivedStatBlock = {
  speed: { walk: 15 },
  abilities: {
    bite: { key: 'bite', name: 'Bite', summary: bite('1d8 + 3', 7, ['1d8', 4, 'acid']) },
  },
  saveDc: {},
  modifier: { str: 3, dex: 1, con: 2, int: -3, wis: 1, cha: -1 },
  proficiencyBonus: 2,
}

const lungingBite: AbilityTextToken[] = [
  'Move up to ',
  { speed: 'walk', times: 0.5 },
  ' and make a ',
  { ability: 'bite' },
  ' attack.',
]

describe('ability text', () => {
  it('replaces speed and ability references with their values', () => {
    expect(abilityTextSegments(lungingBite, mimic)).toEqual([
      { kind: 'text', text: 'Move up to ' },
      { kind: 'speed', value: '7½ ft.', note: 'Half its speed (15 ft.)' },
      { kind: 'text', text: ' and make a ' },
      { kind: 'ability', key: 'bite', name: 'Bite', summary: mimic.abilities.bite!.summary },
      { kind: 'text', text: ' attack.' },
    ])
  })

  it('reads as plain text with the numbers inline', () => {
    expect(plainAbilityText(abilityTextSegments(lungingBite, wolfie))).toBe(
      'Move up to 25 ft. and make a Bite (+5, 10 (2d6 + 3) piercing) attack.',
    )
  })

  it('resolves save DCs, modifiers, and proficiency', () => {
    const segments = abilityTextSegments(
      ['The target makes a ', { dc: 'str' }, ' save; add ', { mod: 'dex' }, ' and ', { pb: true }],
      wolfie,
    )
    expect(segments[1]).toMatchObject({ kind: 'number', value: 'DC 13' })
    expect(segments[3]).toMatchObject({ kind: 'number', value: '+2', note: 'Dexterity modifier' })
    expect(segments[5]).toMatchObject({ kind: 'number', value: '+2', note: 'Proficiency bonus' })
  })

  it('explains conditions and standard actions', () => {
    const [prone, disengage] = abilityTextSegments(
      ['Knocked ', refs.rules.prone, ' or ', refs.rules.disengage],
      wolfie,
    ).filter((segment) => segment.kind === 'rule')
    expect(prone).toMatchObject({ kind: 'rule', rule: refs.rules.prone, label: 'prone' })
    expect(disengage).toMatchObject({ kind: 'rule', label: 'Disengage' })
  })

  it('names other speed modes and multiples', () => {
    const block = { ...wolfie, speed: { walk: 30, climb: 30 } }
    expect(abilityTextSegments([{ speed: 'climb', times: 2 }], block)[0]).toEqual({
      kind: 'speed',
      value: '60 ft.',
      note: 'Twice its climb speed (30 ft.)',
    })
  })

  it('falls back to words when the block lacks the value', () => {
    expect(
      abilityTextSegments([{ speed: 'fly' }, { dc: 'wis' }, { ability: 'gone' }], wolfie),
    ).toEqual([
      { kind: 'text', text: 'its fly speed' },
      { kind: 'text', text: 'Wisdom save' },
      { kind: 'text', text: 'gone' },
    ])
  })

  it('formats half feet', () => {
    expect(formatFeet(7.5)).toBe('7½ ft.')
    expect(formatFeet(25)).toBe('25 ft.')
  })
})
