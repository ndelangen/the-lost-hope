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
    wererat: {
      name: 'Wererat',
      tags: ['human', 'shapechanger'],
      alignment: 'lawful evil',
      languages: ['Common (can’t speak in rat form)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        nonmagicalExcept: 'silvered',
        nonmagicalImmunities: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The wererat can use its action to polymorph into a rat-human hybrid or into a giant rat, or back into its true form which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying is not transformed. It reverts to its true form when it dies. ersonal use only.',
            ],
          },
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['The wererat has advantage on Wisdom (Perception) checks that rely on smell.'],
          },
          {
            key: 'multiattack-humanoid-or-hybrid-form-only',
            name: 'Multiattack (Humanoid or Hybrid form only)',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The wererat makes two attacks one of which is a bite.'],
          },
          {
            key: 'bite-rat-or-hybrid-form-only',
            name: 'Bite (Rat or Hybrid form only)',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'If the target is a humanoid it must succeed on a ',
              { dc: 'con' },
              ' Constitution saving throw or be cursed with wererat lycanthropy.',
            ],
          },
          {
            key: 'shortsword-humanoid-or-hybrid-form-only',
            name: 'Shortsword (Humanoid or Hybrid form only)',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
