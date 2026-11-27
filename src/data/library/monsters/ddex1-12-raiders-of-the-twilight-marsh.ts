import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex1_12_raiders_of_the_twilight_marsh,
  monsters: {
    kobold_berserker: {
      name: 'Kobold Berserker',
      tags: ['kobold'],
      alignment: 'chaotic evil',
      languages: ['Common', 'Draconic'],
      appearance: [
        ['Ordinary-looking kobolds that drink a potion and turn into frenzied fighters.'],
      ],
      lore: [
        [
          'In the Black Bull hall, kobold berserkers start as normal kobolds and can swallow an elixir of hate as a free action to become berserkers. A fool who drinks an elixir found on a dead kobold gains the same transformation. Kobolds here help torture prisoners and carry out chores.',
        ],
        ['Sources: ', 'DDEX1-12 Raiders of the Twilight Marsh, p. 20'],
      ],
      habitats: ['Fortress'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 13,
        armor: 'hide armor',
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 12, con: 17, int: 9, wis: 11, cha: 9 },
        abilities: [
          {
            key: 'sunlight-sensitivity',
            name: 'Sunlight Sensitivity',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The kobold has advantage on an attack roll against a creature if at least one of the kobold’s allies is within 5 feet of the creature and the ally isn’t ',
              rules.incapacitated,
              '.',
            ],
            effects: [],
          },
          {
            key: 'reckless',
            name: 'Reckless',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'At the start of its turn, the berserker can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn.',
            ],
          },
          {
            key: 'battleaxe',
            name: 'Battleaxe',
            timing: 'action',
            icon: 'gi/GiBattleAxe',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    lizard_king: {
      name: 'Lizard King',
      tags: ['lizardfolk'],
      alignment: 'chaotic evil',
      languages: ['Abyssal', 'Draconic'],
      appearance: [
        ['The leader of the combined survivors of three lizardfolk tribes in the Twilight Marsh.'],
      ],
      lore: [
        [
          "He survived the events of Drums in the Marsh and now commands the remnants of three tribes. Hearing that the dragon Velvet is absent, he sees a chance for revenge for the tribes' destruction. He knows his clan alone is too weak, so he sends an envoy to recruit the adventurers.",
        ],
        ['Sources: ', 'DDEX1-12 Raiders of the Twilight Marsh, PDF page 5'],
      ],
      habitats: ['Swamp'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '4',
        ac: 15,
        armor: 'natural armor',
        hitDice: '12d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 17, dex: 12, con: 15, int: 11, wis: 11, cha: 15 },
        saves: { con: 'proficient', wis: 'proficient' },
        skills: { perception: 'expert', stealth: 'expert', survival: 'expert' },
        senses: { darkvision: 60 },
        conditionImmunities: [rules.frightened],
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The lizardfolk can hold its breath for 15 minutes.'],
          },
          {
            key: 'skewer',
            name: 'Skewer',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Once per turn, when the lizardfolk makes a melee attack with its trident and hits, the target takes an extra ',
              { roll: '3d6' },
              ' damage, and the lizardfolk gains temporary hit points equal to the extra damage dealt.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The lizardfolk makes two attacks: one with its bite and one with its claws or trident or two melee attacks with its trident.',
            ],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'claws',
            name: 'Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'trident',
            name: 'Trident',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [20, 60],
              twoHanded: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
