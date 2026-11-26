import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_03_the_drowned_tower,
  monsters: {
    bandit_captain: {
      name: 'Bandit Captain',
      tags: ['any race'],
      alignment: 'any non-lawful alignment',
      languages: ['any two languages'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 15,
        armor: 'studded leather',
        hitDice: '10d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 16, con: 14, int: 14, wis: 11, cha: 14 },
        saves: { str: 'proficient', dex: 'proficient', wis: 'proficient' },
        skills: { athletics: 'proficient', deception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.',
            ],
          },
          {
            key: 'scimitar',
            name: 'Scimitar',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'dagger',
            name: 'Dagger',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              thrown: [20, 60],
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon.',
            ],
          },
        ],
      },
    },
    crushing_wave_reaver: {
      name: 'Crushing Wave Reaver',
      tags: ['human'],
      alignment: 'neutral evil',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 14,
        armor: 'shield',
        hitDice: '4d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 14, con: 13, int: 10, wis: 11, cha: 8 },
        skills: { athletics: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'sharktoothed-longsword',
            name: 'Sharktoothed Longsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              twoHanded: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
            text: [
              'Against a target is wearing no armor, the reaver deals an extra die of damage with this sword.',
            ],
          },
          {
            key: 'javelin',
            name: 'Javelin',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    water_weird: {
      name: 'Water Weird',
      alignment: 'neutral',
      languages: ['understands Aquan but doesn’t speak'],
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '3',
        ac: 13,
        hitDice: '9d10',
        speed: { walk: 0, swim: 60 },
        scores: { str: 17, dex: 16, con: 13, int: 11, wis: 10, cha: 10 },
        senses: { blindsight: 30 },
        damageResistances: [rules.fire],
        damageImmunities: [rules.poison],
        conditionImmunities: [
          rules.exhaustion,
          rules.grappled,
          rules.paralyzed,
          rules.poisoned,
          rules.prone,
          rules.restrained,
          rules.unconscious,
        ],
        nonmagicalResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'invisible-in-water',
            name: 'Invisible in Water',
            timing: 'trait',
            icon: 'gi/GiInvisible',
            text: ['The water weird is ', rules.invisible, ' while fully immersed in water.'],
            effects: [],
          },
          {
            key: 'water-bound',
            name: 'Water Bound',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: [
              'The water weird dies if it leaves the water to which it is bound or if that water is destroyed.',
            ],
          },
          {
            key: 'constrict',
            name: 'Constrict',
            timing: 'action',
            icon: 'gi/GiTentacleStrike',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '3d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'If the target is Medium or smaller, it is ',
              { effect: 'constricted' },
              ' and pulled 5 feet toward the water weird.',
            ],
            effects: [
              {
                key: 'constricted',
                name: 'Constricted',
                lands: { on: 'hit' },
                conditions: [rules.grappled, rules.restrained],
                text: [
                  'Escape DC 13.',
                  ' The water weird tries to drown it, and the water weird can’t constrict another target.',
                ],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
  },
})
