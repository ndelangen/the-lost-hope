import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.minsc_and_boo_s_journal_of_villainy,
  monsters: {
    deep_spider: {
      name: 'Deep Spider',
      page: 151,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Underdark', 'Caverns', 'Forests'],
      appearance: [
        [
          'A giant spider with fine black hairs, a sleek dark exoskeleton, and eight serrated legs. The front pair ends in large curved blades.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '7',
        ac: 15,
        armor: 'natural armor',
        hitDice: '10d12',
        speed: { walk: 30, climb: 30 },
        scores: { str: 20, dex: 14, con: 16, int: 6, wis: 12, cha: 4 },
        skills: { stealth: 'expert' },
        senses: { tremorsense: 60 },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: ['It climbs difficult surfaces and ceilings without a check.'],
          },
          {
            key: 'web-sense',
            name: 'Web Sense',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['It locates other creatures touching the same web.'],
          },
          {
            key: 'web-walker',
            name: 'Web Walker',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['Webbing does not impede its movement.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make two ',
              { ability: 'foreleg' },
              ' attacks and one ',
              { ability: 'bite' },
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
              damage: [{ dice: '2d8', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 5, which: 'it hits' },
              onFail: {
                damage: [{ dice: '4d8', type: rules.poison }],
              },
              onSuccess: 'half',
            },
            text: [
              'A target knocked to 0 HP by the poison is stable and ',
              rules.poisoned,
              ' for one hour, including after healing. It is ',
              rules.paralyzed,
              ' while that poisoning lasts.',
            ],
          },
          {
            key: 'foreleg',
            name: 'Foreleg',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    sword_spider: {
      name: 'Sword Spider',
      page: 151,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forests', 'Caverns', 'Mhair jungles'],
      appearance: [
        [
          'A giant spider with fine black hairs, a sleek dark exoskeleton, and eight serrated legs. The front pair ends in large curved blades.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '3',
        ac: 16,
        armor: 'natural armor',
        hitDice: '6d10',
        speed: { walk: 30, climb: 30 },
        scores: { str: 16, dex: 16, con: 14, int: 6, wis: 12, cha: 4 },
        skills: { stealth: 'expert' },
        senses: { tremorsense: 60 },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: ['It climbs difficult surfaces and ceilings without a check.'],
          },
          {
            key: 'web-sense',
            name: 'Web Sense',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['It locates other creatures touching the same web.'],
          },
          {
            key: 'web-walker',
            name: 'Web Walker',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['Webbing does not impede its movement.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make two ',
              { ability: 'foreleg' },
              ' attacks and one ',
              { ability: 'bite' },
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
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 5, which: 'it hits' },
              onFail: {
                damage: [{ dice: '2d8', type: rules.poison }],
              },
              onSuccess: 'half',
            },
            text: [
              'A target knocked to 0 HP by the poison is stable and ',
              rules.poisoned,
              ' for one hour, including after healing. It is ',
              rules.paralyzed,
              ' while that poisoning lasts.',
            ],
          },
          {
            key: 'foreleg',
            name: 'Foreleg',
            timing: 'action',
            icon: 'lucide/Target',
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
  },
})
