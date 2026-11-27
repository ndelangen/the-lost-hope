import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.descent_into_the_lost_caverns_of_tsojcanth,
  monsters: {
    pech: {
      name: 'Pech',
      alignment: 'neutral good',
      languages: ['Common', 'Terran'],
      stats: {
        size: 'small',
        type: 'elemental',
        cr: '4',
        ac: 17,
        armor: 'natural armor',
        hitDice: '11d6',
        speed: { walk: 30, burrow: 20 },
        scores: { str: 19, dex: 11, con: 18, int: 11, wis: 14, cha: 10 },
        saves: { con: 'proficient', wis: 'proficient' },
        skills: { athletics: 'proficient', perception: 'proficient', survival: 'proficient' },
        senses: { darkvision: 120, tremorsense: 120 },
        conditionImmunities: [rules.petrified],
        abilities: [
          {
            key: 'spellcasting',
            name: 'Spellcasting',
            timing: 'action',
            icon: 'gi/GiWizardStaff',
            text: [
              'As an action, the pech works with three or more pechs to cast spells, requiring no spell components and using Wisdom as the spellcasting ability (save ',
              { dc: 'wis' },
              '). If at least three other pechs are within 30 feet of it, the pech can cast ',
              refs.spells.wall_of_stone_srd_5_1,
              '. If at least seven other pechs are within 30 feet of it, it can cast ',
              refs.spells.greater_restoration_srd_5_1,
              ". Each other pech involved in casting the spell can't have the ",
              rules.incapacitated,
              ' condition and must have at least one use of Communal Spellcasting remaining, which it must immediately expend to participate (no action required). 2/day: ',
              refs.spells.wall_of_stone_srd_5_1,
              ', ',
              refs.spells.greater_restoration_srd_5_1,
            ],
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The pech has advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'sunlight-sensitivity',
            name: 'Sunlight Sensitivity',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['While in sunlight, the pech has disadvantage on attack rolls.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The pech makes two ',
              { ability: 'fortified-pickaxe' },
              ' attacks. If it hits a Large or smaller creature with both attacks, the target must succeed on a ',
              { dc: 'str' },
              ' Strength saving throw or have the ',
              rules.prone,
              ' condition.',
            ],
          },
          {
            key: 'fortified-pickaxe',
            name: 'Fortified Pickaxe',
            timing: 'action',
            icon: 'gi/GiBattleAxe',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.force, addModifier: true }],
            },
            text: [
              'If the target is a Construct or an object, the attack is automatically a critical hit.',
            ],
          },
          {
            key: 'stone-shape',
            name: 'Stone Shape',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The pech casts ',
              refs.spells.stone_shape_srd_5_1,
              ', requiring no spell components and using Wisdom as the spellcasting ability. 3/day each: ',
              refs.spells.stone_shape_srd_5_1,
            ],
            uses: 3,
            recharge: 'Long rest',
          },
        ],
      },
    },
  },
})
