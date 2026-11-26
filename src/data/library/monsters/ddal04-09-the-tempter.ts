import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_09_the_tempter,
  monsters: {
    animated_armor: {
      name: 'Animated Armor',
      alignment: 'unaligned',
      languages: ['–'],
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '1',
        ac: 18,
        armor: 'natural armor',
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 14, dex: 11, con: 13, int: 1, wis: 3, cha: 1 },
        senses: { blindsight: 60 },
        damageImmunities: [rules.poison, rules.psychic],
        conditionImmunities: [
          rules.blinded,
          rules.charmed,
          rules.deafened,
          rules.exhaustion,
          rules.frightened,
          rules.paralyzed,
          rules.petrified,
          rules.poisoned,
        ],
        abilities: [
          {
            key: 'antimagic-susceptibility',
            name: 'Antimagic Susceptibility',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The armor is ',
              rules.incapacitated,
              ' while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster’s spell save DC or fall ',
              rules.unconscious,
              ' for 1 minute.',
            ],
          },
          {
            key: 'false-appearance',
            name: 'False Appearance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While it remains motionless, the armor is indistinguishable from a normal suit of armor.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The armor makes two melee attacks.'],
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
        ],
      },
    },
    phantom_warrior: {
      name: 'Phantom Warrior',
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '3',
        ac: 16,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 11, con: 16, int: 8, wis: 10, cha: 15 },
        abilities: [],
      },
    },
    reflection_guardian: {
      name: 'Reflection Guardian',
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '1',
        ac: 5,
        hitDice: '5d8',
        speed: { walk: 0 },
        scores: { str: 1, dex: 1, con: 10, int: 14, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    wererat: {
      name: 'Wererat',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8 },
        abilities: [],
      },
    },
  },
})
