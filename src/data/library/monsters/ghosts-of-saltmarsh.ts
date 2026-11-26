import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ghosts_of_saltmarsh,
  monsters: {
    giant_coral_snake: {
      name: 'Giant Coral Snake',
      page: 236,
      alignment: 'unaligned',
      habitats: ['Coastal caves', 'Hermitage'],
      appearance: [['A heavily muscled coral snake with vivid red, pale cream, and dark rings.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '4',
        ac: 13,
        hitDice: '12d10',
        speed: { walk: 30, swim: 30 },
        scores: { str: 12, dex: 16, con: 14, int: 2, wis: 10, cha: 3 },
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
              reach: 5,
              damage: [{ dice: '2d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'The target makes a ',
              { dc: 'con' },
              ' Constitution save. On a failure it is ',
              rules.stunned,
              ' until the end of its next turn and hallucinates under a short-term madness effect for 10 minutes. Roll on the Dungeon Master’s Guide table or let the DM choose the effect. https://www.dndbeyond.com/sources/dnd/basic-rules-2014/running-the-game#Madness',
            ],
          },
        ],
      },
    },
    giant_sea_eel: {
      name: 'Giant Sea Eel',
      page: 237,
      alignment: 'unaligned',
      habitats: ['Underwater', 'Ocean depths'],
      appearance: [['A long kelp-green sea eel with mottled skin and a low continuous fin.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/2',
        ac: 14,
        armor: 'natural armor',
        hitDice: '3d10',
        speed: { walk: 0, swim: 40 },
        scores: { str: 11, dex: 14, con: 12, int: 7, wis: 10, cha: 7 },
        saves: { dex: 'proficient' },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'water-breathing',
            name: 'Water Breathing',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The eel breathes only underwater.'],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '2d10', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    sea_lion: {
      name: 'Sea Lion',
      alignment: 'unaligned',
      habitats: ['Coastal waters and islands at sea'],
      appearance: [['A scaled, catlike face and clawed forelimbs give way to a finned body.']],
      tableNotes: [
        ['Rules source: Tales from the Yawning Portal, p. 242.'],
        [
          'Also published in Ghosts of Saltmarsh, p. 252. The 2014-era stat block lists piercing damage for Claw.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '5',
        ac: 15,
        armor: 'natural armor',
        hitDice: '12d10',
        speed: { walk: 10, swim: 40 },
        scores: { str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 8 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiWaterSplash',
            text: ['It can breathe air and water.'],
          },
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['It has Advantage on Perception checks that use smell.'],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'It attacks with Advantage if an ally within 5 ft. of the target is not ',
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'swimming-leap',
            name: 'Swimming Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'After swimming at least 10 ft. it can long jump up to 25 ft. out of or across the water.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Make one ',
              { ability: 'bite' },
              ' attack and two ',
              { ability: 'claw' },
              ' attacks.',
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
              damage: [{ dice: '2d8', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
