import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.tales_from_the_yawning_portal,
  monsters: {
    elder_giant_lizard: {
      name: 'Elder Giant Lizard',
      page: 176,
      alignment: 'unaligned',
      languages: [],
      habitats: ['swamp'],
      appearance: [
        [
          'A heavy-bodied lizard with olive scales, a broad head, four clawed feet, and a thick tail.',
        ],
      ],
      tableNotes: [
        [
          'Encounter notes: The mated pair raises four young in this cavern. The adults hunt in caverns below the lair and feed on fungi when they cannot find larger prey.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '5',
        ac: 14,
        armor: 'natural armor',
        hitDice: '9d12',
        speed: { walk: 30, climb: 30 },
        scores: { str: 21, dex: 9, con: 17, int: 2, wis: 10, cha: 7 },
        skills: { stealth: 'expert' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The lizard can hold its breath for 30 minutes.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make one ', { ability: 'bite' }, ' and one ', { ability: 'tail' }, ' attack.'],
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
              damage: [{ dice: '3d10', type: rules.piercing, addModifier: true }],
            },
            text: [
              'Grapples the target (escape DC 16). The target remains ',
              rules.restrained,
              ' and the lizard cannot bite a different target until that grapple ends.',
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
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'A creature hit must succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
    giant_crayfish: {
      name: 'Giant Crayfish',
      page: 235,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Underground', 'Freshwater'],
      appearance: [
        [
          'An oversized crayfish with two broad pincers, a mottled ochre shell, sweeping antennae, and a fan-shaped tail.',
        ],
      ],
      tableNotes: [
        [
          'Encounter notes: The guard in area 3 of the Hidden Shrine of Tamoachan speaks Olman. Six giant crayfish occupy an aquarium tier in White Plume Mountain.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '2',
        ac: 15,
        armor: 'natural armor',
        hitDice: '7d10',
        speed: { walk: 30, swim: 30 },
        scores: { str: 15, dex: 13, con: 13, int: 1, wis: 9, cha: 3 },
        skills: { stealth: 'proficient' },
        senses: { blindsight: 30 },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['The crayfish can breathe air and water.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'claw' }, ' attacks.'],
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d10', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Grapples the target (escape DC 12). The crayfish has two claws and can grapple one target with each.',
            ],
          },
        ],
      },
    },
    giant_subterranean_lizard: {
      name: 'Giant Subterranean Lizard',
      page: 236,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Underground', 'Cave'],
      appearance: [['A pale pink-white lizard with splayed toes and a long tapering tail.']],
      tableNotes: [
        [
          'Encounter notes: In the Forge of Fury the troglodytes chain a white-scaled specimen near a stream. It lashes with its tail before trying to seize and swallow prey.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '4',
        ac: 14,
        armor: 'natural armor',
        hitDice: '7d12',
        speed: { walk: 30, swim: 50 },
        scores: { str: 21, dex: 9, con: 17, int: 2, wis: 10, cha: 7 },
        skills: { stealth: 'expert' },
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
              ' attack. The lizard can replace either one with ',
              { ability: 'swallow' },
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
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d10', type: rules.piercing, addModifier: true }],
            },
            text: [
              'Grapples the target (escape DC 15). The target remains ',
              rules.restrained,
              ' and the lizard cannot bite a different target until that grapple ends.',
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
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'A creature hit must succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '.',
            ],
          },
          {
            key: 'swallow',
            name: 'Swallow',
            timing: 'action',
            icon: 'gi/GiSlime',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d10', type: rules.piercing, addModifier: true }],
            },
            text: [
              'Is swallowed, and is released from the grapple. A swallowed creature is ',
              rules.blinded,
              ' and ',
              rules.restrained,
              ', has total cover against attacks and effects outside the lizard, and takes ',
              { roll: '3d6' },
              ' acid damage at the start of each lizard turn. The lizard can hold one swallowed target at a time. If the lizard dies, the swallowed creature is no longer ',
              rules.restrained,
              ' by it and can spend 10 ft. of movement to leave the corpse, exiting ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
  },
})
