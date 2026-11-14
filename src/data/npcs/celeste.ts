import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Celeste',
  location: refs.locations.verdant_haven,
  notes: [
    [
      "A child with an unexplained connection to death or the undead. She has no connection to the party's personal histories.",
    ],
  ],
  stats: {
    size: 'Small',
    type: 'humanoid',
    cr: '1/8',
    ac: 11,
    hitDice: '2d6',
    speed: {
      walk: 25,
    },
    scores: {
      str: 7,
      dex: 12,
      con: 11,
      int: 12,
      wis: 15,
      cha: 13,
    },
    skills: {
      insight: 'proficient',
      perception: 'proficient',
    },
    damageResistances: [refs.rules.necrotic],
    abilities: [
      {
        key: 'deaths-favour',
        name: 'Death’s Favour',
        timing: 'trait',
        icon: 'gi/GiDeathSkull',
        text: ['Undead will not willingly harm her, and she can sense undead within 60 ft.'],
      },
      {
        key: 'grave-chill',
        name: 'Grave Chill',
        timing: 'action',
        icon: 'gi/GiSpectre',
        intent: 'damage',
        text: [
          'One creature within 30 ft.: Constitution saving throw, ',
          {
            dc: 'wis',
          },
          '. Failure: 2d6 necrotic damage and it can’t regain HP until the start of her next turn.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_commoner'],
      changes:
        'A child with an unexplained link to death: a commoner with a necrotic cantrip and protection from undead.',
    },
  },
})
