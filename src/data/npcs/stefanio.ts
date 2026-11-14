import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Stefanio',
  location: refs.locations.nimbus,
  notes: [
    [
      'A magic-item merchant with a spirit cannon powered by arcane energy. The name is transcribed provisionally.',
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '2',
    ac: 13,
    armor: 'enchanted coat',
    hitDice: '7d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 14,
      con: 12,
      int: 15,
      wis: 12,
      cha: 15,
    },
    skills: {
      arcana: 'proficient',
      persuasion: 'expert',
    },
    abilities: [
      {
        key: 'wares',
        name: 'Wares on Hand',
        timing: 'trait',
        icon: 'gi/GiMoneyStack',
        text: ['Carries a stock of minor magic items; the DM picks one he can use per fight.'],
      },
      {
        key: 'spirit-cannon',
        name: 'Spirit Cannon',
        timing: 'action',
        icon: 'gi/GiIonCannonBlast',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'int',
          range: [60, 120],
          damage: [
            {
              dice: '2d10',
              type: 'force',
              addModifier: true,
            },
          ],
        },
        text: ['Spends a charge.'],
        uses: 3,
        recharge: 'Long rest',
      },
      {
        key: 'dagger',
        name: 'Dagger',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d4',
              type: 'piercing',
              addModifier: true,
            },
          ],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_noble'],
      changes: 'A magic-item merchant with an arcane spirit cannon.',
    },
  },
})
