import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddep2_mulmaster_undone_v2,
  monsters: {
    assassin: {
      name: 'Assassin',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '8',
        ac: 15,
        hitDice: '12d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 16, con: 14, int: 13, wis: 11, cha: 10 },
        abilities: [],
      },
    },
    azer: {
      name: 'Azer',
      stats: {
        size: 'medium',
        type: 'elemental',
        cr: '2',
        ac: 17,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 17, dex: 12, con: 15, int: 12, wis: 13, cha: 10 },
        abilities: [],
      },
    },
    djinni: {
      name: 'Djinni',
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '11',
        ac: 17,
        hitDice: '14d10',
        speed: { walk: 30, fly: 90 },
        scores: { str: 21, dex: 15, con: 22, int: 15, wis: 16, cha: 20 },
        abilities: [],
      },
    },
    duergar: {
      name: 'Duergar',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 16,
        hitDice: '4d8',
        speed: { walk: 25 },
        scores: { str: 14, dex: 11, con: 14, int: 11, wis: 10, cha: 9 },
        abilities: [],
      },
    },
    qabara: {
      name: 'Qabara',
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '11',
        ac: 17,
        hitDice: '17d10',
        speed: { walk: 30, fly: 60, swim: 90 },
        scores: { str: 22, dex: 12, con: 26, int: 18, wis: 17, cha: 18 },
        abilities: [],
      },
    },
    razerblast_initiate: {
      name: 'Razerblast Initiate',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 13,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 11, con: 14, int: 10, wis: 10, cha: 11 },
        abilities: [],
      },
    },
    water_weird: {
      name: 'Water Weird',
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '3',
        ac: 13,
        hitDice: '9d10',
        speed: { walk: 0, swim: 60 },
        scores: { str: 17, dex: 16, con: 13, int: 11, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    wolf: {
      name: 'Wolf',
      page: 37,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Urban'],
      appearance: [['An alert gray wolf wearing fitted studded leather barding.']],
      tableNotes: [
        [
          'If the party rescues the Emerald Enclave halfling, the halfling and wolf aid the fight with Crannak. They arrive at the end of round one and enter initiative in round two.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 14,
        hitDice: '2d8',
        speed: { walk: 40 },
        scores: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The wolf has advantage on an attack roll against a creature if at least one of its allies is within 5 ft. of that creature and is not ',
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'scimitar-printed-action',
            name: 'Scimitar (printed action)',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
