import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.srd_5_1,
  monsters: {
    dire_wolf: {
      name: 'Dire Wolf',
      alignment: 'unaligned',
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 14,
        hitDice: '5d10',
        speed: { walk: 50 },
        scores: { str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The wolf has advantage on an attack roll against a creature if at least one of the wolf’s allies is within 5 feet of the creature and the ally isn’t ',
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
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.piercing, addModifier: true }],
            },
            text: [
              'If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
    draft_horse: {
      name: 'Draft Horse',
      alignment: 'unaligned',
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/4',
        ac: 10,
        hitDice: '3d10',
        speed: { walk: 40 },
        scores: { str: 18, dex: 10, con: 12, int: 2, wis: 11, cha: 7 },
        abilities: [
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
              damage: [{ dice: '2d4', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
    frog: {
      name: 'Frog',
      alignment: 'unaligned',
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '0',
        ac: 11,
        hitDice: '1d4',
        speed: { walk: 20, swim: 20 },
        scores: { str: 1, dex: 13, con: 8, int: 1, wis: 8, cha: 3 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 30 },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['The frog can breathe air and water.'],
          },
          {
            key: 'standing-leap',
            name: 'Standing Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'The frog’s long jump is up to 10 feet and its high jump is up to 5 feet, with or without a running start. A frog has no effective attacks. It feeds on small insects and typically dwells near water, in trees, or underground. The frog’s statistics can also be used to represent a toad.',
            ],
          },
        ],
      },
    },
  },
})
