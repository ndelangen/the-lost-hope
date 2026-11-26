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
      languages: [],
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
  },
})
