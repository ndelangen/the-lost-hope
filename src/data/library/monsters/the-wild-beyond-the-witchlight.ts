import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.the_wild_beyond_the_witchlight,
  monsters: {
    bullywug_knight: {
      name: 'Bullywug Knight',
      page: 231,
      alignment: 'typically lawful good',
      languages: ['Bullywug', 'Common.'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 18,
        hitDice: '12d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 16, dex: 12, con: 13, int: 9, wis: 11, cha: 14 },
        saves: { con: 'proficient', wis: 'proficient' },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['The knight breathes air and water.'],
          },
          {
            key: 'speak-with-frogs-and-toads',
            name: 'Speak with Frogs and Toads',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['When speaking Bullywug, it can communicate simple ideas to frogs and toads.'],
          },
          {
            key: 'standing-leap',
            name: 'Standing Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'It can long jump up to 20 ft. or high jump up to 10 ft. without a running start.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'glaive' }, ' attacks.'],
          },
          {
            key: 'glaive',
            name: 'Glaive',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'croak-of-charming-recharges-after-a-short-or-long-rest',
            name: 'Croak of Charming (recharges after a short or long rest)',
            timing: 'bonus action',
            icon: 'gi/GiBull',
            text: [
              'Target one creature the knight can see within 30 ft. The knight croaks loudly. The target must pass a ',
              { dc: 'cha', save: 'wis' },
              ' Wisdom save or become ',
              rules.charmed,
              ' through the end of its next turn.',
            ],
          },
        ],
      },
    },
    giant_dragonfly: {
      name: 'Giant Dragonfly',
      page: 234,
      alignment: 'unaligned',
      habitats: ['Witchlight Carnival', 'Ponds'],
      appearance: [
        [
          'A metallic blue-green dragonfly with large compound eyes, four clear veined wings and a long, tapered abdomen.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 16,
        armor: 'natural armor',
        hitDice: '4d10',
        speed: { walk: 10, fly: 60 },
        scores: { str: 15, dex: 18, con: 11, int: 3, wis: 10, cha: 3 },
        abilities: [
          {
            key: 'drone',
            name: 'Drone',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Its wingbeats can be heard as a loud drone up to 120 ft. away.'],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'uncanny-dodge',
            name: 'Uncanny Dodge',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The dragonfly halves the damage from an attack against it if it can see the attacker.',
            ],
          },
        ],
      },
    },
    giant_snail: {
      name: 'Giant Snail',
      page: 234,
      alignment: 'unaligned',
      habitats: ['Witchlight Carnival'],
      appearance: [
        [
          'A russet-brown snail with long eyestalks, a broad muscular foot and a sturdy brown spiral shell with a dark band.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/4',
        ac: 11,
        armor: 'natural armor',
        hitDice: '4d10',
        speed: { walk: 10, climb: 10 },
        scores: { str: 15, dex: 3, con: 11, int: 3, wis: 10, cha: 3 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'salt-osmosis',
            name: 'Salt Osmosis',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Starting its turn in contact with at least 1 pound of salt deals the snail 1d4 necrotic damage. A creature can use an action to sprinkle 1 pound of salt on the snail. Provided the snail has not withdrawn into its shell, it takes 1d4 necrotic damage immediately and another 1d4 necrotic damage at the start of its next turn, when the salt rubs off.',
            ],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'shell-defense',
            name: 'Shell Defense',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The snail withdraws into its shell and gains +4 AC until it emerges. It can emerge as a bonus action on its turn.',
            ],
          },
        ],
      },
    },
    pollenella_the_honeybee: {
      name: 'Pollenella the Honeybee',
      page: 135,
      alignment: 'unaligned',
      habitats: ['Yon', 'Feywild'],
      appearance: [
        [
          'An orange-sized queen honeybee with a fuzzy thorax, a long banded abdomen and translucent veined wings.',
        ],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 13,
        hitDice: '1d4',
        speed: { walk: 5, fly: 30 },
        scores: { str: 1, dex: 16, con: 8, int: 1, wis: 10, cha: 1 },
        abilities: [
          {
            key: 'sting',
            name: 'Sting',
            timing: 'action',
            icon: 'gi/GiPoisonBottle',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '3', type: rules.piercing }],
            },
          },
        ],
      },
    },
  },
})
