import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import type { AbilityEffect } from '#/definitions/stat-block'

import { describeAbilityEffect, type DerivedStatBlock } from './dm-ability-text'
import { suggestFromAbilityEffect } from './effect-suggestion'
import { EACH_TARGET } from './encounter-combat'

const block: DerivedStatBlock = {
  speed: { walk: 30 },
  abilities: {},
  saveDc: { con: 12, str: 13, wis: 14 },
  modifier: { str: 3, dex: 2, con: 1, int: -2, wis: 2, cha: -1 },
  proficiencyBonus: 2,
}

const dominated: AbilityEffect = {
  key: 'dominated',
  name: 'Dominated',
  lands: { on: 'save', save: 'wis', dc: 'wis' },
  conditions: [refs.rules.charmed],
  text: ['It acts as an ally to the aboleth.'],
  lasts: { kind: 'until', text: ['the aboleth dies'] },
  ends: { repeatSave: ['damaged', 'every-24-hours'] },
}

describe('ability effects', () => {
  it('reads an effect aloud, with what ends it', () => {
    expect(describeAbilityEffect(dominated, {}, block)).toMatchObject({
      summary: 'Charmed until the aboleth dies',
      details:
        'It acts as an ally to the aboleth. DC 14 Wisdom save whenever it takes damage or every 24 hours ends it.',
    })
  })

  it('applies a turn-length effect on each target’s own turn', () => {
    const paralysis: AbilityEffect = {
      key: 'p',
      name: 'Ghoul paralysis',
      lands: { on: 'save', save: 'con', dc: 'con' },
      conditions: [refs.rules.paralyzed],
      lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
    }
    expect(suggestFromAbilityEffect(paralysis, {}, block, 'ghoul')).toEqual({
      conditions: ['paralyzed'],
      candidates: [],
      text: undefined,
      duration: { kind: 'end-of-turn', of: EACH_TARGET },
    })
  })

  it('keeps what the turn order can’t track in the rider', () => {
    expect(suggestFromAbilityEffect(dominated, {}, block, 'aboleth')).toMatchObject({
      duration: { kind: 'until-removed' },
      text: 'It acts as an ally to the aboleth. Lasts until the aboleth dies. DC 14 Wisdom save whenever it takes damage or every 24 hours ends it.',
    })
  })
})
