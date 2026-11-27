import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_15_szith_morcane_unbound,
  monsters: {
    drow_veteran: {
      name: 'Drow Veteran',
      tags: ['elf'],
      alignment: 'any alignment',
      languages: ['Elvish', 'Undercommon'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 17,
        armor: 'splint',
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10 },
        skills: { athletics: 'proficient', perception: 'proficient' },
        senses: { darkvision: 120 },
        abilities: [
          {
            key: 'fey-ancestry',
            name: 'Fey Ancestry',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The drow has advantage on saving throws against being ',
              rules.charmed,
              ', and magic can’t put the drow to sleep.',
            ],
            effects: [],
          },
          {
            key: 'innate-spellcasting',
            name: 'Innate Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'The drow’s spellcasting ability is Charisma (spell save ',
              { dc: 'cha', printed: 11 },
              '). It can innately cast the following spells, requiring no material components: At will: ',
              refs.spells.dancing_lights_srd_5_1,
              '; 1/day each: ',
              refs.spells.darkness_srd_5_1,
              ', ',
              refs.spells.faerie_fire_srd_5_1,
            ],
            effects: [],
          },
          {
            key: 'sunlight-sensitivity',
            name: 'Sunlight Sensitivity',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The drow veteran makes two shotsword attacks.'],
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
          {
            key: 'heavy-crossbow',
            name: 'Heavy Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [100, 400],
              damage: [{ dice: '1d10', type: rules.piercing }],
            },
          },
        ],
      },
    },
  },
})
