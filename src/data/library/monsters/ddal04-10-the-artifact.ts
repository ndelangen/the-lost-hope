import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_10_the_artifact,
  monsters: {
    beholder_zombie: {
      name: 'Beholder Zombie',
      alignment: 'neutral evil',
      languages: ["understands Deep Speech and Undercommon but can't speak"],
      stats: {
        size: 'large',
        type: 'undead',
        cr: '5',
        ac: 15,
        armor: 'natural armor',
        hitDice: '11d10',
        speed: { walk: 0, fly: 20 },
        scores: { str: 10, dex: 8, con: 16, int: 3, wis: 8, cha: 5 },
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
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '4d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'eye-ray',
            name: 'Eye Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The zombie uses a random magical eye ray, choosing a target that it can see within 60 feet of it 1.',
            ],
          },
          {
            key: 'paralyzing-ray',
            name: 'Paralyzing Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'con' },
              ' Constitution saving throw or be ',
              rules.paralyzed,
              ' for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success 2.',
            ],
          },
          {
            key: 'fear-ray',
            name: 'Fear Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'con', save: 'wis' },
              ' Wisdom saving throw or be ',
              rules.frightened,
              ' for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. 3.',
            ],
          },
          {
            key: 'enervation-ray',
            name: 'Enervation Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must make a ',
              { dc: 'con' },
              ' Constitution saving throw, taking ',
              { roll: '8d8' },
              ' necrotic damage on a failed save, or half as much damage on a successful one. 4.',
            ],
          },
          {
            key: 'disintegration-ray',
            name: 'Disintegration Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'If the target is a creature, it must succeed on a ',
              { dc: 'con', save: 'dex' },
              ' Dexterity saving throw or take ',
              { roll: '10d8' },
              ' force damage. If this damage reduces the creature to 0 hit points, its body becomes a pile of fine gray dust. If the target is a Large or smaller nonmagical object or creation of magical force, it is disintegrated without a saving throw. If the target is a Huge or larger nonmagical object or creation of magical force, this ray disintegrates a 10-foot cube of it.',
            ],
          },
        ],
      },
    },
    ogre_zombie: {
      name: 'Ogre Zombie',
      alignment: 'neutral evil',
      languages: ['understands Giant and Common but can’t speak'],
      stats: {
        size: 'large',
        type: 'undead',
        cr: '2',
        ac: 8,
        hitDice: '9d10',
        speed: { walk: 30 },
        scores: { str: 19, dex: 6, con: 18, int: 3, wis: 6, cha: 5 },
        saves: { wis: 'proficient' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'morningstar',
            name: 'Morningstar',
            timing: 'action',
            icon: 'gi/GiFlangedMace',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
