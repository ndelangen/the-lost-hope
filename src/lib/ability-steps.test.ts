import { describe, expect, it } from 'vitest'

import dragon from '#/data/npcs/dragon-of-the-mountain'
import type { StatBlock } from '#/definitions/stat-block'

import { abilitySources, abilitySteps, plainSteps } from './ability-steps'
import { resolveStatBlock } from './dm-campaign'

const stats = resolveStatBlock(dragon.stats) as StatBlock
const sources = abilitySources(stats)
const ability = (key: string) =>
  [...stats.abilities, ...(stats.legendary?.actions ?? [])].find((entry) => entry.key === key)!
const steps = (key: string) => abilitySteps(ability(key), stats, sources.get(key)!)

describe('ability steps', () => {
  it('walks through an attack with the derived numbers', () => {
    expect(plainSteps(steps('rend'))).toEqual([
      'Uses its action on its turn.',
      'Pick one target within 10 ft. (its reach).',
      'Make an attack roll: roll d20 + 14. If the total equals or beats the target’s AC, it hits.',
      'On a hit, deal 17 slashing damage (or roll 2d8 + 8) plus 4 fire damage (or roll 1d8).',
      'If the d20 shows a 20, it’s a critical hit: roll all the damage dice twice.',
    ])
  })

  it('expands the attacks a Multiattack makes', () => {
    const [, text] = steps('multiattack')
    expect(text?.expand).toEqual(['rend'])
    expect(text?.parts[0]).toMatchObject({ kind: 'term', rule: { key: 'multiattack' } })
  })

  it('walks through a breath weapon from its structured save', () => {
    expect(plainSteps(steps('fire-breath'))).toEqual([
      'Uses its action on its turn.',
      'Choose a 60-ft. cone starting from it.',
      'Every creature in it rolls a DC 21 Dexterity saving throw: d20 + its Dexterity save bonus. 21 or higher succeeds.',
      'Fail: take 60 fire damage (or roll 11d10).',
      'Success: take half (30).',
      'After using it, it’s spent. At the start of its turn, roll a d6: on 5–6 it’s ready again (recharge).',
    ])
    const terms = steps('fire-breath').flatMap((step) =>
      step.parts.flatMap((part) => (part.kind === 'term' ? [part.rule.key] : [])),
    )
    expect(terms).toEqual(
      expect.arrayContaining(['cone', 'saving_throw', 'difficulty_class', 'half_damage']),
    )
  })

  it('names conditions a failed save gives and only the creatures picked', () => {
    expect(plainSteps(steps('frightful-presence')).slice(1, 4)).toEqual([
      'Everything within 120 ft. of it is caught (an emanation). It picks which creatures in it are affected; the rest are safe.',
      'Every creature in it rolls a DC 21 Wisdom saving throw: d20 + its Wisdom save bonus. 21 or higher succeeds.',
      'Fail: it has the frightened condition. It lasts 1 minute.',
    ])
  })

  it('says when a legendary action can be used and from what pool', () => {
    expect(plainSteps(steps('tail-sweep'))[0]).toBe(
      'At the end of another creature’s turn, spend 1 of its 3 legendary actions. They refill at the start of its own turn.',
    )
  })

  it('counts limited uses until a rest', () => {
    expect(plainSteps(steps('legendary-resistance'))).toEqual([
      'Always on. It doesn’t take an action.',
      'If it fails a saving throw, it can choose to succeed instead.',
      'It can do this 3 times per day, then it’s spent until a long rest.',
    ])
  })

  it('carries damage types as rule refs so they get their icon and colour', () => {
    const hit = steps('rend')[3]!
    expect(
      hit.parts.filter((part) => part.kind === 'damage').map((part) => part.type?.key),
    ).toEqual(['slashing', 'fire'])
  })

  it('links rules words to the glossary', () => {
    const roll = steps('rend')[2]!
    expect(roll.parts.filter((part) => part.kind === 'term').map((part) => part.rule.key)).toEqual([
      'attack_roll',
      'armor_class',
    ])
  })
})
