import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.xanathar_s_guide_to_everything,
  monsters: {
    hound_of_ill_omen: {
      name: 'Hound of Ill Omen',
      alignment: 'unaligned',
      languages: [],
      habitats: ['forest', 'hill'],
      stats: {
        size: 'medium',
        type: 'monstrosity',
        cr: '1',
        ac: 14,
        armor: 'natural armor',
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
              'The hound has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              "The hound has advantage on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and the ally isn't ",
              rules.incapacitated,
              '.',
            ],
            effects: [],
          },
          {
            key: 'cloak-of-shadows',
            name: 'Cloak of Shadows',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The hound appears with a number of temporary hit points equal to half your sorcerer level.',
            ],
          },
          {
            key: 'incorporeal-movement',
            name: 'Incorporeal Movement',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The hound can move through other creatures and objects as if they were 3. The hound takes 5 force damage if it ends its turn inside an object.',
            ],
          },
          {
            key: 'omen-sight',
            name: 'Omen Sight',
            timing: 'trait',
            icon: 'lucide/Eye',
            text: [
              "At the start of its turn, the hound automatically knows its target's location. If the target was hidden, it is no longer hidden from the hound. Ever at Your Heels. On its turn, it can move only toward its target by the most direct route, and it can use its action only to attack its target. The hound can make opportunity attacks, but only against its target. Additionally, while the hound is within 5 feet of the target, the target has disadvantage on saving throws against any spell you cast. The hound disappears if it is reduced to 0 hit points, if its target is reduced to 0 hit points, or after 5 minutes.",
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
              'If the target is a creature, it must succeed on a ',
              { dc: 'str' },
              ' Strength saving throw or be knocked ',
              { effect: 'bite-prone' },
              '.',
            ],
            effects: [
              {
                key: 'bite-prone',
                name: 'Knocked prone',
                lands: { on: 'save', save: 'str', dc: 'str' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
  },
})
