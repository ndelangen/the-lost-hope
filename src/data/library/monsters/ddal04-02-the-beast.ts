import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_02_the_beast,
  monsters: {
    blood_hawk: {
      name: 'Blood Hawk',
      page: 27,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Quivering Forest'],
      appearance: [['A rust-red hawk with a hooked beak, cream underparts and a banded tail.']],
      tableNotes: [
        [
          'Print note: The printed feature heading reads Keen Hearing and Smell. The rule grants advantage on sight checks.',
        ],
        [
          'Encounter: Six blood hawks nest in hardy maples. They do not pursue when the party retreats more than 50 ft. from the tree. Very weak and weak parties face four. Against a strong party the wind imposes disadvantage on ranged weapon attacks. A very strong party also faces two additional hawks.',
        ],
      ],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '1/8',
        ac: 12,
        hitDice: '2d6',
        speed: { walk: 10, fly: 60 },
        scores: { str: 6, dex: 14, con: 10, int: 3, wis: 14, cha: 5 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: ['The hawk has advantage on Wisdom (Perception) checks that rely on sight.'],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The hawk has advantage on an attack roll against a creature if an ally within 5 ft. of that creature is free of the ',
              rules.incapacitated,
              ' condition.',
            ],
          },
          {
            key: 'beak',
            name: 'Beak',
            timing: 'action',
            icon: 'gi/GiRaven',
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
    zombie: {
      name: 'Zombie',
      alignment: 'neutral evil',
      languages: ['Common', 'Draconic'],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1/2',
        ac: 8,
        hitDice: '3d8',
        speed: { walk: 20 },
        scores: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 },
        saves: { wis: 'proficient' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'undead-fortitude',
            name: 'Undead Fortitude',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.',
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
            text: [
              'Ersonal use only . Player Handout: Alina’s Petr Fitzparck (orde #87649) ersonal use only .',
            ],
          },
          {
            key: 'appendix',
            name: 'Appendix',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Map of Wolf Petr Fitzparck (orde #87649) ersonal use only . DM Appendix 2: Extending to a 4-Hour Session Many players seek a longer experience than what a two-hour game might normally allow, so here are some options to consider if and when your players request that this adventure be run in a longer capacity. The Curse of Strahd season is very tightly designed with a large number of factors in mind, but first among these factors is that the adventures are designed to be played in numeric order starting with DDAL04-01 Suits of the Mists. Here are the basic rules to bear in mind when you extend this adventure or any other two-hour adventure into a longer format:  The adventure’s rewards (i.e., XP, treasure, renown, and downtime) are not modified.  Respect the operating hours of your establishment. If you are running in a store or convention, be sure to have enough time to wrap up and clear your table.  Be sure to notify all the players at your table that this game will run longer than the normal time. If a player leaves early, it will need to be treated the same as if they had left a four-hour game early— this may mean that the player sacrifices certain rewards or may even be unable to complete the story! Specific Rules for DDAL04-02 This adventure is designed for a two-hour window, but includes a number of elements that are intended to encourage players to replay this adventure— there are typically more encounters than they will get in a single session in the intended format.',
            ],
          },
        ],
      },
    },
  },
})
