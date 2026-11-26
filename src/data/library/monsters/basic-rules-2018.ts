import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.basic_rules_2018,
  monsters: {
    ankylosaurus: {
      name: 'Ankylosaurus',
      page: 117,
      alignment: 'unaligned',
      habitats: ['Remote mountain valleys', 'Isolated plateaus', 'Tropical islands', 'Deep fens'],
      appearance: [
        [
          'A low four-legged dinosaur with a broad beaked head, rounded armor plates, and a heavy bony club at the tip of its tail.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '3',
        ac: 15,
        armor: 'natural armor',
        hitDice: '8d12',
        speed: { walk: 30 },
        scores: { str: 19, dex: 11, con: 15, int: 2, wis: 12, cha: 5 },
        abilities: [
          {
            key: 'tail',
            name: 'Tail',
            timing: 'action',
            icon: 'gi/GiWhiplash',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              printedBonus: 7,
              damage: [{ dice: '4d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'A creature hit by the tail must pass a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
    giant_lizard: {
      name: 'Giant Lizard',
      reprintedIn: [refs.publications.hoard_of_the_dragon_queen_online_supplement],
      alignment: 'unaligned',
      habitats: ['Underdark', 'Caverns', 'Woodland', 'Wetlands'],
      appearance: [
        [
          'A low, mount-sized lizard with pebbled olive-gray scales, four clawed limbs, a wedge-shaped head, and a long tapering tail.',
        ],
      ],
      tableNotes: [
        [
          'Residents of the Underdark and reptilian humanoids use giant lizards as riding and draft animals.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/4',
        ac: 12,
        armor: 'natural armor',
        hitDice: '3d10',
        speed: { walk: 30, climb: 30 },
        scores: { str: 15, dex: 12, con: 13, int: 2, wis: 10, cha: 5 },
        senses: { darkvision: 30 },
        abilities: [
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
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    giant_rat: {
      name: 'Giant Rat',
      page: 135,
      alignment: 'unaligned',
      habitats: ['Settlements', 'Sewers', 'Cellars'],
      appearance: [
        [
          'A stocky brown-gray rat with rounded ears, a pointed whiskered snout, and a long bare ringed tail.',
        ],
      ],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '1/8',
        ac: 12,
        hitDice: '2d6',
        speed: { walk: 30 },
        scores: { str: 7, dex: 15, con: 11, int: 2, wis: 10, cha: 4 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['The rat has advantage on Wisdom (Perception) checks that use scent.'],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The rat has advantage on attacks against a creature if one of the rat’s allies is within 5 ft. of that creature and that ally is not ',
              rules.incapacitated,
              '.',
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
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    polar_bear: {
      name: 'Polar Bear',
      reprintedIn: [refs.publications.rise_of_tiamat_online_supplement],
      page: 149,
      alignment: 'unaligned',
      habitats: ['Arctic coasts', 'Sea ice', 'Tundra'],
      appearance: [
        [
          'A heavy white-furred bear with a long neck, a tapering head, rounded ears, a black nose and broad paws.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '2',
        ac: 12,
        armor: 'natural armor',
        hitDice: '5d10',
        speed: { walk: 40, swim: 30 },
        scores: { str: 20, dex: 10, con: 16, int: 2, wis: 13, cha: 7 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['The bear has advantage on Wisdom (Perception) checks that rely on smell.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make one ', { ability: 'bite' }, ' and one ', { ability: 'claws' }, ' attack.'],
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
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
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
              damage: [{ dice: '2d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    warhorse: {
      name: 'Warhorse',
      page: 157,
      alignment: 'unaligned',
      habitats: ['Stables', 'Training grounds', 'Military camps', 'Battlefields'],
      appearance: [
        [
          'A mature light-bay horse with a sturdy build, black mane and tail, dark lower legs and a small pale forehead star.',
        ],
      ],
      tableNotes: [
        [
          'A rider controlling the mount limits its action options to Dash, Disengage and Dodge. An independent mount acts on its own initiative and can use its listed attacks.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 11,
        hitDice: '3d10',
        speed: { walk: 60 },
        scores: { str: 18, dex: 12, con: 13, int: 2, wis: 12, cha: 7 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'If the horse goes at least 20 ft. straight toward a creature and hits it with ',
              { ability: 'hooves' },
              ' on the same turn, the creature makes a ',
              { dc: 'str' },
              ' Strength save or falls ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the horse can make another ',
              { ability: 'hooves' },
              ' attack against it as a bonus action.',
            ],
          },
          {
            key: 'hooves',
            name: 'Hooves',
            timing: 'action',
            icon: 'gi/GiStomp',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
