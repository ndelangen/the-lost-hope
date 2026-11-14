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

  it('explains saves with the DC and when the ability comes back', () => {
    const plain = plainSteps(steps('fire-breath'))
    expect(plain[2]).toBe(
      'For the saving throw, each creature rolls d20 plus its bonus for the ability named above. 21 or higher (DC) is a success.',
    )
    expect(plain.at(-1)).toBe(
      'After using it, it’s spent. At the start of its turn, roll a d6: on 5–6 it’s ready again (recharge).',
    )
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
    expect(hit.parts.filter((part) => part.kind === 'damage').map((part) => part.type.key)).toEqual(
      ['slashing', 'fire'],
    )
  })

  it('links rules words to the glossary', () => {
    const roll = steps('rend')[2]!
    expect(roll.parts.filter((part) => part.kind === 'term').map((part) => part.rule.key)).toEqual([
      'attack_roll',
      'armor_class',
    ])
  })
})
