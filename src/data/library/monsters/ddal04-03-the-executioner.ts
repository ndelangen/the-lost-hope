import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_03_the_executioner,
  monsters: {
    blood_hawk: {
      name: 'Blood Hawk',
      page: 23,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Orașnou'],
      appearance: [['A rust-red hawk with a hooked beak, cream underparts and a banded tail.']],
      tableNotes: [
        [
          'Print note: The printed feature heading reads Keen Hearing and Smell. The rule grants advantage on sight checks.',
        ],
        ['Encounter: On 1–3 on the Orașnou encounter table, 1d4 blood hawks swoop in and attack.'],
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
    wererat: {
      name: 'Wererat',
      reprintedIn: [
        refs.publications.monster_manual_2014,
        refs.publications.monster_manual_2024,
        refs.publications.srd_5_1,
      ],
      tags: ['human', 'shapechanger'],
      alignment: 'lawful evil',
      languages: ["Common (can't speak in rat form)"],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        nonmagicalExcept: 'silvered',
        nonmagicalImmunities: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "The wererat can use its action to polymorph into a rat-humanoid hybrid or into a giant rat, or back into its true form, which is humanoid. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.",
            ],
          },
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['The were rat has advantage on Wisdom (Perception) checks that rely on smell.'],
          },
          {
            key: 'multiattack-human-or-hybrid-form-only',
            name: 'Multiattack (Human or Hybrid Form Only)',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The wereraven makes two weapon attacks, one of which can be with its hand crossbow.',
            ],
          },
          {
            key: 'beak-raven-or-hybrid-form-only',
            name: 'Beak (Raven or Hybrid Form Only)',
            timing: 'action',
            icon: 'gi/GiRaven',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'In hybrid form. If the target is a humanoid, it must succeed on a ',
              { dc: 'str', save: 'con' },
              ' Constitution saving throw or be cursed with ',
              { effect: 'wereraven-lycanthropy' },
              '.',
            ],
            effects: [
              {
                key: 'wereraven-lycanthropy',
                name: 'Wereraven lycanthropy',
                lands: { on: 'save', save: 'con', dc: 'str' },
                text: ['Cursed with wereraven lycanthropy.'],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'shortsword-humanoid-or-hybrid-form-only',
            name: 'Shortsword (Humanoid or Hybrid Form Only)',
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
    zombie: {
      name: 'Zombie',
      alignment: 'neutral evil',
      languages: ['Common', 'Draconic'],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1/4',
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
              'If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead. ersonal use only.',
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
            text: ['Petr Fitzparck (orde #87649) ersonal use only.'],
          },
          {
            key: 'appendix',
            name: 'Appendix',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['The Village of Petr Fitzparck (orde #87649) ersonal use only.'],
          },
          {
            key: 'appendix-2',
            name: 'Appendix',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Laszlo’s Cabin Petr Fitzparck (orde #87649) ersonal use only.'],
          },
          {
            key: 'appendix-3',
            name: 'Appendix',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Orașnou Square Petr Fitzparck (orde #87649) ersonal use only.'],
          },
        ],
      },
    },
  },
})
