import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import spells from '#/data/library/spells/srd-5-2-1'
import type { Ability } from '#/definitions/stat-block'

import type { DerivedStatBlock } from './dm-ability-text'
import {
  abilityLeavesEffect,
  durationFromText,
  suggestFromAbility,
  suggestFromSpell,
} from './effect-suggestion'
import { EACH_TARGET } from './encounter-combat'

const block: DerivedStatBlock = {
  speed: { walk: 30 },
  abilities: {},
  saveDc: { con: 12, str: 13 },
  modifier: { str: 3, dex: 2, con: 1, int: -2, wis: 0, cha: -1 },
  proficiencyBonus: 2,
}

const ability = (over: Partial<Ability>): Ability =>
  ({
    key: 'x',
    name: 'X',
    icon: 'gi/GiFangs',
    text: [],
    intent: 'damage',
    timing: 'action',
    ...over,
  }) as Ability

describe('effect suggestions', () => {
  it('reads a ghoul-style save that ends at the end of each of its turns', () => {
    const claws = ability({
      save: {
        ability: 'con',
        dc: 'con',
        target: { creatures: 1, range: 5 },
        onFail: {
          conditions: [refs.rules.paralyzed],
          also: [
            'The target repeats the save at the end of each of its turns, ending the effect on itself on a success.',
          ],
        },
        onSuccess: 'none',
      } as Ability['save'],
    })
    expect(suggestFromAbility(claws, block, 'ghoul')).toEqual({
      conditions: ['paralyzed'],
      candidates: [],
      duration: { kind: 'save-ends', dc: 12, ability: 'con' },
    })
  })

  it('picks up conditions named in an attack rider', () => {
    const bite = ability({
      text: ['If the target is a creature, it has the ', refs.rules.prone, ' condition.'],
    })
    expect(suggestFromAbility(bite, block, 'wolf')).toMatchObject({
      conditions: ['prone'],
      duration: { kind: 'until-removed' },
    })
    expect(suggestFromAbility(bite, block, 'wolf').text).toBeUndefined()
  })

  it('keeps what the conditions and duration don’t say', () => {
    const tentacle = ability({
      text: [
        'The target has the ',
        { ref: 'rule', key: 'grappled' },
        ' condition (escape DC 14). Until the grapple ends, the target can’t regain hit points.',
      ],
    })
    expect(suggestFromAbility(tentacle, block, 'x').text).toBe(
      'The target has the grappled condition (escape DC 14). Until the grapple ends, the target can’t regain hit points.',
    )
  })

  it('tells the target’s next turn from the source’s', () => {
    expect(
      durationFromText("It can't take reactions until the end of its next turn.", { source: 's' }),
    ).toEqual({
      kind: 'end-of-turn',
      of: EACH_TARGET,
    })
    expect(durationFromText("until the start of the ogre's next turn", { source: 's' })).toEqual({
      kind: 'start-of-turn',
      of: 's',
    })
    // Lengths count on each target's turns, so they end even if the source drops out.
    expect(durationFromText('for 1 minute', { source: 's' })).toEqual({
      kind: 'rounds',
      rounds: 10,
      of: EACH_TARGET,
    })
  })

  it('reads Hold Person: paralyzed, Wisdom save at the end of each turn, concentration', () => {
    expect(suggestFromSpell(spells.hold_person!, { caster: 'mage', dc: 14 })).toEqual({
      conditions: ['paralyzed'],
      candidates: [],
      duration: { kind: 'save-ends', dc: 14, ability: 'wis' },
      concentration: true,
    })
  })

  it('falls back on the spell’s duration', () => {
    const bless = suggestFromSpell(spells.bless!, { caster: 'cleric', dc: 13 })
    expect(bless.duration).toEqual({ kind: 'rounds', rounds: 10, of: EACH_TARGET })
    // The upcast paragraph's "10 minutes" is not the spell's duration.
    expect(suggestFromSpell(spells.bestow_curse!, { caster: 'c', dc: 13 }).duration).toEqual({
      kind: 'rounds',
      rounds: 10,
      of: EACH_TARGET,
    })
  })

  it('offers conditions a spell protects against without picking them', () => {
    expect(suggestFromSpell(spells.heroism!, { caster: 'c', dc: 13 })).toMatchObject({
      conditions: [],
      candidates: ['frightened'],
    })
    expect(
      suggestFromSpell(spells.freedom_of_movement!, { caster: 'c', dc: 13 }).conditions,
    ).toEqual([])
    expect(suggestFromSpell(spells.hideous_laughter!, { caster: 'c', dc: 13 }).duration).toEqual({
      kind: 'save-ends',
      dc: 13,
      ability: 'wis',
    })
  })

  it('does not impose a condition a trait only mentions', () => {
    const packTactics = ability({
      timing: 'trait',
      text: [
        'Advantage on attacks if an ally is within 5 feet of the target and not ',
        refs.rules.incapacitated,
        '.',
      ],
    } as Partial<Ability>)
    expect(suggestFromAbility(packTactics, block, 'wolf')).toMatchObject({
      conditions: [],
      candidates: ['incapacitated'],
    })
    expect(abilityLeavesEffect(packTactics)).toBe(false)
  })
})
