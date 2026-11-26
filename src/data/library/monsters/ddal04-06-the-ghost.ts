import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_06_the_ghost,
  monsters: {
    cooshee_mastiff: {
      name: 'Cooshee (Mastiff)',
      page: 24,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Greenhall'],
      appearance: [
        [
          'A broad-chested elven hound with a moss-green coat mottled with irregular dark brown patches and a strong muzzle.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/8',
        ac: 12,
        hitDice: '1d8',
        speed: { walk: 40 },
        scores: { str: 13, dex: 14, con: 12, int: 3, wis: 12, cha: 7 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The cooshee has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
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
            text: [
              'A creature hit must pass a ',
              { dc: 'str' },
              ' Strength saving throw or fall ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
    druid: {
      name: 'Druid',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 11,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 12, con: 13, int: 12, wis: 15, cha: 11 },
        abilities: [],
      },
    },
    ettercap: {
      name: 'Ettercap',
      stats: {
        size: 'medium',
        type: 'monstrosity',
        cr: '2',
        ac: 13,
        hitDice: '8d8',
        speed: { walk: 30, climb: 30 },
        scores: { str: 14, dex: 15, con: 13, int: 7, wis: 12, cha: 8 },
        abilities: [],
      },
    },
    giant_wolf_spider: {
      name: 'Giant Wolf Spider',
      page: 26,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Ettercap nest'],
      appearance: [
        ['A low, hairy spider with stout banded legs and a dark-striped brown abdomen.'],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        hitDice: '2d8',
        speed: { walk: 40, climb: 40 },
        scores: { str: 12, dex: 16, con: 13, int: 3, wis: 12, cha: 4 },
        skills: { perception: 'proficient', stealth: 'expert' },
        senses: { darkvision: 60, blindsight: 10 },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'It can climb difficult surfaces, including ceilings while upside down, without an ability check.',
            ],
          },
          {
            key: 'web-sense',
            name: 'Web Sense',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: [
              'When touching a web, the spider knows the exact position of any other creature touching that web.',
            ],
          },
          {
            key: 'web-walker',
            name: 'Web Walker',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['Webbing does not restrict its movement.'],
          },
          {
            key: 'bites',
            name: 'Bites',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 5, which: 'it hits' },
              onFail: {
                damage: [{ dice: '2d6', type: rules.poison }],
              },
              onSuccess: 'half',
            },
            text: [
              'If the poison drops the target to 0 hit points, it is stable and ',
              rules.poisoned,
              ' for 1 hour even if it regains hit points. It is ',
              rules.paralyzed,
              ' while ',
              rules.poisoned,
              ' this way.',
            ],
          },
        ],
      },
    },
  },
})
