import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_03_the_executioner,
  monsters: {
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
