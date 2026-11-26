import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.out_of_the_abyss_d_d_encounters,
  monsters: {
    derro: {
      name: 'Derro',
      tags: ['derro'],
      alignment: 'chaotic evil',
      languages: ['Dwarvish', 'Undercommon'],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '1/4',
        ac: 13,
        armor: 'leather armor',
        hitDice: '3d6',
        speed: { walk: 30 },
        scores: { str: 9, dex: 14, con: 12, int: 11, wis: 5, cha: 9 },
        skills: { stealth: 'proficient' },
        senses: { darkvision: 120 },
        abilities: [
          {
            key: 'insanity',
            name: 'Insanity',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The derro has advantage on saving throws against being ',
              rules.charmed,
              ' or ',
              rules.frightened,
              '.',
            ],
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The derro has advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'sunlight-sensitivity',
            name: 'Sunlight Sensitivity',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in sunlight, the derro has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.',
            ],
          },
          {
            key: 'hooked-shortspear',
            name: 'Hooked Shortspear',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              printedBonus: 2,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'If the target is a creature, the derro can choose to deal no damage and try to trip the target instead, in which case the target must succeed on a ',
              { dc: 'str' },
              ' Strength saving throw or fall ',
              rules.prone,
              '.',
            ],
          },
          {
            key: 'light-repeating-crossbow',
            name: 'Light Repeating Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [40, 160],
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    drow_spore_servant: {
      name: 'Drow Spore Servant',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/8',
        ac: 15,
        hitDice: '3d8',
        speed: { walk: 20 },
        scores: { str: 10, dex: 14, con: 10, int: 2, wis: 6, cha: 1 },
        senses: { blindsight: 30 },
        conditionImmunities: [rules.blinded, rules.charmed, rules.frightened, rules.paralyzed],
        abilities: [
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    duergar_spore_servant: {
      name: 'Duergar Spore Servant',
      alignment: 'unaligned',
      languages: [],
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/2',
        ac: 16,
        armor: 'scale armor, shield',
        hitDice: '4d8',
        speed: { walk: 15 },
        scores: { str: 14, dex: 11, con: 14, int: 2, wis: 6, cha: 1 },
        senses: { blindsight: 30 },
        damageResistances: [rules.poison],
        conditionImmunities: [rules.blinded, rules.charmed, rules.frightened, rules.paralyzed],
        abilities: [
          {
            key: 'war-pick',
            name: 'War Pick',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
