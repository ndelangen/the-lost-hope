import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_07_the_innocent,
  monsters: {
    bone_naga: {
      name: 'Bone Naga',
      stats: {
        size: 'large',
        type: 'undead',
        cr: '4',
        ac: 15,
        hitDice: '9d10',
        speed: { walk: 30 },
        scores: { str: 15, dex: 16, con: 12, int: 15, wis: 15, cha: 16 },
        abilities: [],
      },
    },
    regold_veteran: {
      name: 'Regold (Veteran)',
      tags: ['human'],
      alignment: 'lawful neutral',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 11,
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10 },
        skills: { athletics: 'proficient', perception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Regold makes two longsword attacks. If he has a shortsword drawn, he can also make a shortsword attack. ersonal use only.',
            ],
          },
          {
            key: 'longsword',
            name: 'Longsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              twoHanded: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    yuan_ti_malison: {
      name: 'Yuan-ti Malison',
      stats: {
        size: 'medium',
        type: 'monstrosity',
        cr: '3',
        ac: 12,
        hitDice: '12d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 14, con: 13, int: 14, wis: 12, cha: 16 },
        abilities: [],
      },
    },
  },
})
