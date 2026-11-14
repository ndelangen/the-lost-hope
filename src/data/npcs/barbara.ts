import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Barbara',
  location: refs.locations.nimbus,
  notes: [
    [
      'An elderly widow whom the local dealers describe as a formidable customer with an unusually high tolerance for drugs and alcohol.',
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '1/8',
    ac: 10,
    hitDice: '3d8',
    speed: {
      walk: 25,
    },
    scores: {
      str: 8,
      dex: 9,
      con: 14,
      int: 11,
      wis: 14,
      cha: 13,
    },
    skills: {
      insight: 'proficient',
      intimidation: 'proficient',
    },
    damageResistances: [refs.rules.poison],
    abilities: [
      {
        key: 'iron-liver',
        name: 'Iron Liver',
        timing: 'trait',
        icon: 'gi/GiBeerStein',
        text: [
          'Advantage on saves against being ',
          refs.rules.poisoned,
          '; drugs and drink barely touch her.',
        ],
      },
      {
        key: 'cane',
        name: 'Cane',
        timing: 'action',
        icon: 'gi/GiCrowbar',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d4',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'scolding',
        name: 'Scolding',
        timing: 'action',
        icon: 'gi/GiSonicShout',
        text: [
          'One creature within 30 ft. that hears her: Wisdom ',
          refs.rules.saving_throw,
          ', ',
          {
            dc: 'wis',
          },
          '. Failure: ',
          refs.rules.frightened,
          ' of her until the end of its next turn.',
        ],
        uses: 1,
        recharge: 'Recharge 6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_commoner'],
      changes:
        'An elderly widow: tougher, slower, poison-resistant, and with a scolding that works.',
    },
  },
})
