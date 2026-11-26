import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.plane_shift_zendikar,
  monsters: {
    baloth: {
      name: 'Baloth',
      page: 80,
      alignment: 'unaligned',
      habitats: ['grassland'],
      appearance: [
        [
          'A bulky, muscular omnivore covered in horns, spines and plates. The portrait shows a heavy ground-running form with a broad muzzle and strong forelimbs.',
        ],
      ],
      tableNotes: [
        [
          'This is the regular walking form. The Woodcrasher’s 30-ft. climb speed belongs to the separate Woodcrasher Baloth.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '5',
        ac: 13,
        armor: 'natural armor',
        hitDice: '10d12',
        speed: { walk: 50 },
        scores: { str: 22, dex: 9, con: 17, int: 2, wis: 11, cha: 5 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'Move at least 20 ft. directly toward a creature and hit it with ',
              { ability: 'gore' },
              ' on that turn. The creature makes a ',
              { dc: 'str', printed: 13 },
              ' Strength save and falls ',
              rules.prone,
              ' on a failure. The baloth can follow up with a bonus-action ',
              { ability: 'stomp' },
              ' if the target is ',
              rules.prone,
              '.',
            ],
          },
          {
            key: 'gore',
            name: 'Gore',
            timing: 'action',
            icon: 'gi/GiBullHorns',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d8', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'stomp',
            name: 'Stomp',
            timing: 'action',
            icon: 'gi/GiStomp',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d10', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
    drake_small: {
      name: 'Drake (Small)',
      page: 80,
      alignment: 'unaligned',
      habitats: ['mountain', 'grassland', 'coastal'],
      appearance: [
        [
          'A reptile with two legs, a long tail and broad leathery wings, smaller than the large drake. It shares the same portrait.',
        ],
      ],
      tableNotes: [
        [
          'Small in the catalog refers to the smaller kind of drake. The suggested Pteranodon base is mechanically Medium.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d8',
        speed: { walk: 10, fly: 60 },
        scores: { str: 12, dex: 15, con: 10, int: 2, wis: 9, cha: 5 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'flyby',
            name: 'Flyby',
            timing: 'trait',
            icon: 'gi/GiFeather',
            text: [
              'When it flies out of a foe’s reach, that movement gives the foe no opportunity attack.',
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
              damage: [{ dice: '2d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    shoal_serpent: {
      name: 'Shoal Serpent',
      page: 80,
      alignment: 'unaligned',
      habitats: ['underwater', 'coastal'],
      appearance: [
        ['A massive marine serpent whose long neck rises above a heavy, reef-like back.'],
      ],
      tableNotes: [
        [
          'The printed base block retains 20 ft. of walking movement and 40 ft. of swimming movement.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '2',
        ac: 13,
        armor: 'natural armor',
        hitDice: '8d10',
        speed: { walk: 20, swim: 40 },
        scores: { str: 18, dex: 15, con: 16, int: 2, wis: 12, cha: 5 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The serpent can stay on a single breath for 1 hour.'],
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
              reach: 10,
              damage: [{ dice: '3d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    terastodon: {
      name: 'Terastodon',
      page: 332,
      alignment: 'unaligned',
      habitats: ['arctic'],
      appearance: [
        [
          'An enormous armored elephant with four tusks and a sharp-edged bone plate extending from its head over the neck.',
        ],
      ],
      tableNotes: [
        [
          'Stomp has a 5-ft. reach, half of Gore’s 10-ft. reach. Check the distance before using a bonus-action Stomp.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '6',
        ac: 13,
        armor: 'natural armor',
        hitDice: '11d12',
        speed: { walk: 40 },
        scores: { str: 24, dex: 9, con: 21, int: 3, wis: 11, cha: 6 },
        abilities: [
          {
            key: 'trampling-charge',
            name: 'Trampling Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'Move at least 20 ft. straight toward a creature and hit it with ',
              { ability: 'gore' },
              ' that turn. The target makes a ',
              { dc: 'str' },
              ' Strength save or falls ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the terastodon may make one ',
              { ability: 'stomp' },
              ' against it as a bonus action.',
            ],
          },
          {
            key: 'gore',
            name: 'Gore',
            timing: 'action',
            icon: 'gi/GiBullHorns',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [{ dice: '4d8', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'stomp',
            name: 'Stomp',
            timing: 'action',
            icon: 'gi/GiStomp',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d10', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
    terra_stomper: {
      name: 'Terra Stomper',
      page: 80,
      alignment: 'unaligned',
      habitats: ['grassland'],
      appearance: [
        ['A six-legged forest behemoth with massive jaws, a heavy tail and a low, thick-set body.'],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '8',
        ac: 13,
        armor: 'natural armor',
        hitDice: '13d12',
        speed: { walk: 50 },
        scores: { str: 25, dex: 10, con: 19, int: 2, wis: 12, cha: 9 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make one ',
              { ability: 'bite' },
              ' and one ',
              { ability: 'tail' },
              ' attack against different targets.',
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
              reach: 10,
              damage: [{ dice: '4d12', type: rules.piercing, addModifier: true }],
            },
            text: [
              'If the target is a Medium or smaller creature, it is ',
              rules.grappled,
              ' and ',
              rules.restrained,
              ' until the grapple ends. The escape DC is 17. During the grapple, the stomper cannot bite another target.',
            ],
          },
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
              damage: [{ dice: '3d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
