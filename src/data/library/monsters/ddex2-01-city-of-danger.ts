import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_01_city_of_danger,
  monsters: {
    bullywug: {
      name: 'Bullywug',
      tags: ['bullywug'],
      alignment: 'neutral evil',
      languages: ['Bullywug'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/4',
        ac: 15,
        armor: 'hide armor, shield',
        hitDice: '2d8',
        speed: { walk: 20, swim: 40 },
        scores: { str: 12, dex: 12, con: 13, int: 7, wis: 10, cha: 7 },
        skills: { stealth: 'proficient' },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['The bullywug can breathe air and water.'],
          },
          {
            key: 'speak-with-frogs-and-toads',
            name: 'Speak with Frogs and Toads',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.',
            ],
          },
          {
            key: 'swamp-camouflage',
            name: 'Swamp Camouflage',
            timing: 'trait',
            icon: 'gi/GiInvisible',
            text: [
              'The bullywug has advantage on Dexterity (Stealth) checks made to hide in swampy terrain.',
            ],
          },
          {
            key: 'standing-leap',
            name: 'Standing Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'The bullywug’s long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The bullywug makes two melee attacks: one with its bite and one with its spear.',
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
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'spear',
            name: 'Spear',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [20, 60],
              twoHanded: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    guard: {
      name: 'Guard',
      tags: ['any race'],
      alignment: 'any alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 16,
        armor: 'chain shirt, shield',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'spear',
            name: 'Spear',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [20, 60],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
