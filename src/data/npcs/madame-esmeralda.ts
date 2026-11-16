import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Madame Esmeralda',
  avatar: '/assets/npcs/madame-esmeralda-portrait.png',
  location: refs.locations.fairhaven,
  notes: [['A fortune teller.']],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '2',
    ac: 12,
    hitDice: '8d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 9,
      dex: 14,
      con: 12,
      int: 13,
      wis: 17,
      cha: 16,
    },
    skills: {
      insight: 'expert',
      perception: 'proficient',
      performance: 'proficient',
    },
    abilities: [
      {
        key: 'portent',
        name: 'Portent',
        timing: 'trait',
        icon: 'gi/GiCrystalBall',
        text: [
          'Rolls two d20s at dawn. She can replace any attack roll, save, or check made by a creature she can see with one of them, once each.',
        ],
        uses: 2,
        recharge: 'Long rest',
      },
      {
        key: 'mind-spike',
        name: 'Mind Spike',
        timing: 'action',
        icon: 'gi/GiCrystalBall',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'wis',
          range: [60, 60],
          damage: [
            {
              dice: '2d6',
              type: refs.rules.psychic,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'unsettling-prophecy',
        name: 'Unsettling Prophecy',
        timing: 'action',
        icon: 'gi/GiCardRandom',
        save: {
          ability: 'wis',
          dc: 'wis',
          target: { creatures: 1, range: 30 },
          onFail: {
            conditions: [refs.rules.frightened],
            also: ['It is afraid of her for 1 minute.'],
          },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_priest-acolyte'],
      changes: 'A fortune teller: an acolyte’s numbers with divination tricks instead of a god.',
    },
  },
})
