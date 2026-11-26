import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_11_the_donjon,
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
    dryad: {
      name: 'Dryad',
      stats: {
        size: 'medium',
        type: 'fey',
        cr: '1',
        ac: 11,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 12, con: 11, int: 14, wis: 15, cha: 18 },
        abilities: [],
      },
    },
    fire_snake: {
      name: 'Fire Snake',
      stats: {
        size: 'medium',
        type: 'elemental',
        cr: '1',
        ac: 14,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 12, dex: 14, con: 11, int: 7, wis: 10, cha: 8 },
        abilities: [],
      },
    },
    giant_venomous_snake: {
      name: 'Giant Poisonous Snake',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Swamp', 'Underground'],
      appearance: [
        [
          'A coiled olive-brown snake with dark blotches, a pale underside, and a narrow tapering tail.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 14,
        armor: 'natural armor',
        hitDice: '2d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 10, dex: 18, con: 13, int: 2, wis: 11, cha: 4 },
        skills: { perception: 'proficient' },
        senses: { blindsight: 10 },
        abilities: [
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 10,
              printedBonus: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 10, which: 'it hits' },
              onFail: {
                damage: [{ dice: '3d6', type: rules.poison }],
              },
              onSuccess: 'half',
            },
          },
        ],
      },
    },
    lizardfolk: {
      name: 'Lizardfolk',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 15,
        hitDice: '4d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 15, dex: 10, con: 13, int: 7, wis: 12, cha: 7 },
        abilities: [],
      },
    },
  },
})
