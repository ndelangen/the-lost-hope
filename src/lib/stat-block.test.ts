import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { PcStatBlock, PrintedStatBlock, StatBlock } from '#/definitions/stat-block'

import {
  abilityKind,
  abilitySummary,
  plainStatParts,
  deriveStatBlock,
  formatSpeed,
  proficiencyBonus,
  proficiencyOf,
  withOptions,
} from './stat-block'

/** SRD 5.2.1 Dire Wolf: the derived numbers must match the printed stat block. */
const direWolf = StatBlock.parse({
  size: 'large',
  type: 'beast',
  cr: '1',
  ac: 14,
  hitDice: '3d10',
  speed: { walk: 50 },
  scores: { str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7 },
  skills: { perception: 'expert', stealth: 'proficient' },
  senses: { darkvision: 60 },
  abilities: [
    {
      key: 'bite',
      name: 'Bite',
      timing: 'action',
      icon: 'gi/GiFangs',
      attack: {
        kind: 'melee',
        ability: 'str',
        damage: [{ dice: '1d10', type: refs.rules.piercing, addModifier: true }],
      },
    },
    {
      key: 'howl',
      name: 'Howl',
      timing: 'action',
      icon: 'gi/GiPaw',
      save: {
        ability: 'wis',
        dc: 'con',
        target: { area: { shape: refs.rules.emanation, size: 30 } },
        onFail: { conditions: [refs.rules.frightened] },
      },
    },
  ],
  source: { adaptedFrom: ['srd-2024_dire-wolf'] },
})

/** SRD 5.2.1 Giant Spider: a finesse bite with extra poison damage. */
const giantSpider = StatBlock.parse({
  size: 'large',
  type: 'beast',
  cr: '1',
  ac: 14,
  hitDice: '4d10',
  speed: { walk: 30, climb: 30 },
  scores: { str: 14, dex: 16, con: 12, int: 2, wis: 11, cha: 4 },
  skills: { perception: 'expert', stealth: 'expert' },
  senses: { darkvision: 60 },
  abilities: [
    {
      key: 'bite',
      name: 'Bite',
      timing: 'action',
      icon: 'gi/GiFangs',
      attack: {
        kind: 'melee',
        ability: 'dex',
        damage: [
          { dice: '1d8', type: refs.rules.piercing, addModifier: true },
          { dice: '2d6', type: refs.rules.poison },
        ],
      },
    },
  ],
  source: { adaptedFrom: ['srd-2024_giant-spider'] },
})

describe('derived stat block', () => {
  it('derives proficiency bonus from challenge rating', () => {
    expect(['0', '1/2', '4', '5', '8', '9', '17', '30'].map(proficiencyBonus)).toEqual([
      2, 2, 2, 3, 3, 4, 6, 9,
    ])
  })

  it('matches the printed SRD dire wolf', () => {
    const derived = deriveStatBlock(direWolf)
    expect(derived.hitPoints).toBe('22 (3d10 + 6)')
    expect(derived.maxHp).toBe(22)
    expect(derived.initiative).toBe(2)
    expect(derived.experience).toBe(200)
    expect(derived.skills.map(({ label, bonus }) => [label, bonus])).toEqual([
      ['Perception', 5],
      ['Stealth', 4],
    ])
    expect(derived.senses).toEqual([{ sense: 'darkvision', feet: 60 }])
    expect(derived.passivePerception).toBe(15)
    expect(derived.saves.str).toBe(3)
    expect(plainStatParts(derived.abilities.bite!.summary!)).toBe('+5, 8 (1d10 + 3) piercing')
  })

  it('matches the printed SRD giant spider', () => {
    const derived = deriveStatBlock(giantSpider)
    expect(derived.hitPoints).toBe('26 (4d10 + 4)')
    expect(derived.skills.map(({ bonus }) => bonus)).toEqual([4, 7])
    expect(derived.passivePerception).toBe(14)
    const bite = deriveStatBlock(giantSpider).abilities[giantSpider.abilities[0]!.key]!
    expect(plainStatParts(bite.summary!)).toBe('+5, 7 (1d8 + 3) piercing plus 7 (2d6) poison')
    expect(
      bite.summary!.filter((part) => part.kind === 'damage').map((part) => part.type?.key),
    ).toEqual(['piercing', 'poison'])
  })

  it('summarises save DCs from ability text', () => {
    expect(plainStatParts(abilitySummary(direWolf.abilities[1]!, direWolf)!)).toBe('DC 12 Wis save')
    expect(deriveStatBlock(direWolf).saveDc.con).toBe(12)
  })

  it('rejects an area save without a shape and size, or with a shape that is not an area', () => {
    const withSave = (target: unknown) =>
      StatBlock.safeParse({
        ...giantSpider,
        abilities: [
          ...giantSpider.abilities,
          {
            key: 'burst',
            name: 'Burst',
            timing: 'action',
            icon: 'gi/GiFireBreath',
            save: { ability: 'dex', dc: 'con', target, onFail: { conditions: [refs.rules.prone] } },
          },
        ],
      }).success
    expect(withSave({ area: { shape: refs.rules.cone, size: 15 } })).toBe(true)
    expect(withSave({ area: { size: 15 } })).toBe(false)
    expect(withSave({ area: { shape: refs.rules.cone } })).toBe(false)
    expect(withSave({ area: { shape: refs.rules.fire, size: 15 } })).toBe(false)
    expect(withSave({ area: { shape: refs.rules.line, size: 60 } })).toBe(false)
  })

  it('summarises a save with what the target rolls and the damage', () => {
    const block = StatBlock.parse({
      ...giantSpider,
      abilities: [
        {
          key: 'breath',
          name: 'Breath',
          timing: 'action',
          icon: 'gi/GiFireBreath',
          save: {
            ability: 'dex',
            dc: 'con',
            target: { area: { shape: refs.rules.cone, size: 15 } },
            onFail: { damage: [{ dice: '4d10', type: refs.rules.fire }] },
            onSuccess: 'half',
          },
        },
      ],
    })
    expect(plainStatParts(abilitySummary(block.abilities[0]!, block)!)).toBe(
      'DC 11 Dex save, 22 (4d10) fire',
    )
  })

  it('formats speeds for reading', () => {
    expect(formatSpeed({ walk: 30, climb: 30 })).toBe('30 ft., climb 30 ft.')
  })
})

describe('ability kind', () => {
  it('names attack rolls by kind, then saves, then what the ability is for', () => {
    const [bite] = direWolf.abilities
    expect(abilityKind(bite!)).toBe('melee')
    const base = { key: 'x', name: 'X', icon: 'gi/GiFangs', text: [] }
    expect(abilityKind({ ...base, intent: 'damage' as const })).toBe('attack')
    expect(abilityKind({ ...base, intent: 'healing' as const })).toBe('healing')
    expect(abilityKind({ ...base, intent: 'support' as const })).toBe('other')
  })
})

describe('a PC stat block', () => {
  const devan = {
    ...PcStatBlock.parse({
      size: 'medium',
      type: 'humanoid',
      ac: 21,
      maxHp: 60,
      speed: { walk: 30 },
      scores: { str: 18, dex: 14, con: 14, int: 12, wis: 14, cha: 15 },
      saves: { wis: 'proficient', cha: 'proficient' },
      skills: { perception: 'proficient' },
      abilities: [
        {
          key: 'warhammer',
          name: 'Warhammer',
          timing: 'action',
          icon: 'gi/GiWarhammer',
          attack: {
            kind: 'melee',
            ability: 'str',
            damage: [{ dice: '1d8', type: refs.rules.bludgeoning, addModifier: true }],
          },
        },
        {
          key: 'mace',
          name: 'Mace of Returning',
          timing: 'action',
          icon: 'gi/GiMaceHead',
          attack: {
            kind: 'melee',
            ability: 'str',
            magic: 1,
            damage: [{ dice: '1d10', type: refs.rules.bludgeoning, addModifier: true }],
          },
        },
      ],
    }),
    level: 5,
  }

  it('takes its proficiency bonus from the character level', () => {
    expect(proficiencyOf(devan)).toBe(3)
    expect(proficiencyOf({ ...devan, level: 9 })).toBe(4)
  })

  it('keeps the hit points from the sheet and derives the rest like a creature', () => {
    const block = deriveStatBlock(devan)
    expect(block.maxHp).toBe(60)
    expect(block.experience).toBe(0)
    expect(block.saves.wis).toBe(5)
    expect(block.passivePerception).toBe(15)
    expect(plainStatParts(abilitySummary(devan.abilities[0]!, devan)!)).toBe(
      '+7, 8 (1d8 + 4) bludgeoning',
    )
  })

  it('adds a magic weapon bonus to the attack roll and its damage', () => {
    expect(plainStatParts(abilitySummary(devan.abilities[1]!, devan)!)).toBe(
      '+8, 10 (1d10 + 5) bludgeoning',
    )
  })
})

/** Monster Manual (2014) Hawk: a talon that always deals 1 slashing damage. */
describe('fixed damage', () => {
  const hawk = PrintedStatBlock.parse({
    size: 'tiny',
    type: 'beast',
    cr: '0',
    ac: 13,
    hitDice: '1d4',
    speed: { walk: 10, fly: 60 },
    scores: { str: 5, dex: 16, con: 8, int: 2, wis: 14, cha: 6 },
    skills: { perception: 'proficient' },
    abilities: [
      {
        key: 'talons',
        name: 'Talons',
        timing: 'action',
        icon: 'gi/GiClaws',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [{ dice: '1', type: refs.rules.slashing }],
        },
      },
    ],
  })

  it('prints the amount without a roll', () => {
    const summary = abilitySummary(hawk.abilities[0]!, hawk)
    expect(plainStatParts(summary ?? [])).toBe('+5, 1 slashing')
    expect(deriveStatBlock(hawk).hitPoints).toBe('1 (1d4 − 1)')
  })
})

describe('versatile weapons', () => {
  const guard = PrintedStatBlock.parse({
    size: 'medium',
    type: 'humanoid',
    cr: '1/8',
    ac: 16,
    hitDice: '2d8',
    speed: { walk: 30 },
    scores: { str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10 },
    abilities: [
      {
        key: 'spear',
        name: 'Spear',
        timing: 'action',
        icon: 'gi/GiThrownDaggers',
        attack: {
          kind: 'melee',
          ability: 'str',
          thrown: [20, 60],
          damage: [{ dice: '1d6', type: refs.rules.piercing, addModifier: true }],
          twoHanded: [{ dice: '1d8', type: refs.rules.piercing, addModifier: true }],
        },
      },
    ],
  })

  it('reads the two-handed damage after the one-handed damage', () => {
    expect(plainStatParts(abilitySummary(guard.abilities[0]!, guard) ?? [])).toBe(
      '+3, 4 (1d6 + 1) piercing, or 5 (1d8 + 1) piercing with two hands',
    )
  })
})

/** Monster Manual (2014) Crab: the book prints +0 to hit where the formula gives +2. */
describe('printed numbers that break the formula', () => {
  const crab = PrintedStatBlock.parse({
    size: 'tiny',
    type: 'beast',
    cr: '0',
    ac: 11,
    hitDice: '1d4',
    speed: { walk: 20, swim: 20 },
    scores: { str: 2, dex: 11, con: 10, int: 1, wis: 8, cha: 2 },
    abilities: [
      {
        key: 'claw',
        name: 'Claw',
        timing: 'action',
        icon: 'gi/GiClaws',
        attack: {
          kind: 'melee',
          ability: 'dex',
          printedBonus: 0,
          damage: [{ dice: '1', type: refs.rules.bludgeoning }],
        },
      },
    ],
  })

  it('uses the printed bonus and says what the formula gives', () => {
    const [bonus] = abilitySummary(crab.abilities[0]!, crab) ?? []
    expect(bonus).toEqual({
      kind: 'value',
      text: '+0',
      note: 'As printed; the formula gives +2',
    })
  })
})

describe('initiative', () => {
  it('adds proficiency where the stat block grants it', () => {
    const { source: _, ...printed } = { ...direWolf }
    const dragon = PrintedStatBlock.parse({ ...printed, cr: '15', initiative: 'expert' })
    // Dexterity +2 and proficiency +5, doubled.
    expect(deriveStatBlock(dragon).initiative).toBe(12)
  })
})

describe('numbers the book prints that its statistics do not produce', () => {
  /** A raging warrior: a damage bonus no modifier explains, and hit points printed at maximum. */
  const printed = PrintedStatBlock.parse({
    size: 'medium',
    type: 'humanoid',
    cr: '2',
    ac: 13,
    hitDice: '8d8',
    printed: {
      hitPoints: 64,
      initiative: 4,
      passivePerception: 9,
      saves: { str: 7 },
      skills: { intimidation: 5 },
    },
    speed: { walk: 30 },
    scores: { str: 16, dex: 12, con: 14, int: 9, wis: 11, cha: 10 },
    saves: { con: 'proficient' },
    abilities: [
      {
        key: 'greataxe',
        name: 'Greataxe',
        timing: 'action',
        icon: 'gi/GiBattleAxe',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d12',
              type: refs.rules.slashing,
              addModifier: true,
              printedBonus: 5,
              printedAverage: 12,
            },
          ],
        },
      },
    ],
  })

  it('keeps the printed hit points, with the dice but no formula that would not add up', () => {
    const derived = deriveStatBlock(printed)
    expect(derived.maxHp).toBe(64)
    expect(derived.hitPoints).toBe('64 (8d8)')
  })

  it('keeps printed initiative, passive Perception, saves and skills', () => {
    const derived = deriveStatBlock(printed)
    expect(derived.initiative).toBe(4)
    expect(derived.passivePerception).toBe(9)
    expect(derived.saves.str).toBe(7)
    expect(derived.saves.con).toBe(4)
    expect(derived.skills.map(({ label, bonus }) => [label, bonus])).toEqual([['Intimidation', 5]])
  })

  it('keeps a damage bonus and average the formula does not give', () => {
    const derived = deriveStatBlock(printed)
    expect(plainStatParts(derived.abilities.greataxe!.summary!)).toBe('+5, 12 (1d12 + 5) slashing')
  })

  it('rejects an empty printed record', () => {
    expect(() => PrintedStatBlock.parse({ ...printed, printed: {} })).toThrow('Leave out `printed`')
  })
})

describe('optional abilities', () => {
  const summoner = PrintedStatBlock.parse({
    size: 'large',
    type: 'fiend',
    cr: '5',
    ac: 15,
    hitDice: '10d10',
    speed: { walk: 30 },
    scores: { str: 18, dex: 12, con: 10, int: 8, wis: 10, cha: 10 },
    options: [
      {
        key: 'summoner',
        name: 'Summoner',
        abilities: [
          { key: 'summon', name: 'Summon Demon', timing: 'action', icon: 'gi/GiMagicSwirl' },
        ],
      },
    ],
    abilities: [{ key: 'claw', name: 'Claw', timing: 'action', icon: 'gi/GiClaws' }],
  })

  it('leaves the stat block as printed until the DM picks an option', () => {
    expect(withOptions(summoner, []).abilities.map(({ key }) => key)).toEqual(['claw'])
  })

  it('joins a picked option’s abilities to the stat block', () => {
    expect(withOptions(summoner, ['summoner']).abilities.map(({ key }) => key)).toEqual([
      'claw',
      'summon',
    ])
  })

  it('rejects an option ability whose key the block already uses', () => {
    const clash = {
      ...summoner,
      options: [{ ...summoner.options![0]!, abilities: [{ ...summoner.abilities[0]! }] }],
    }
    expect(() => PrintedStatBlock.parse(clash)).toThrow('Duplicate ability key')
  })
})

describe('option checks', () => {
  const block = {
    size: 'large',
    type: 'fiend',
    cr: '5',
    ac: 15,
    hitDice: '10d10',
    speed: { walk: 30 },
    scores: { str: 18, dex: 12, con: 10, int: 8, wis: 10, cha: 10 },
    abilities: [{ key: 'claw', name: 'Claw', timing: 'action', icon: 'gi/GiClaws' }],
  } as const
  const option = (key: string, abilityKey: string) => ({
    key,
    name: key,
    abilities: [{ key: abilityKey, name: abilityKey, timing: 'action', icon: 'gi/GiClaws' }],
  })

  it('rejects two options with one key', () => {
    expect(() =>
      PrintedStatBlock.parse({ ...block, options: [option('a', 'x'), option('a', 'y')] }),
    ).toThrow('Duplicate option key')
  })

  it('rejects printed text that points at an option’s ability', () => {
    expect(() =>
      PrintedStatBlock.parse({
        ...block,
        abilities: [{ ...block.abilities[0], text: ['Then ', { ability: 'x' }] }],
        options: [option('a', 'x')],
      }),
    ).toThrow('refers to a missing ability')
  })
})
