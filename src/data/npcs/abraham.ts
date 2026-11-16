import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Abraham',
  avatar: '/assets/npcs/abraham-portrait.png',
  location: refs.locations.badesh_forest,
  species: 'Donkey',
  notes: [
    ['A donkey who now travels with ', refs.pcs.jim, '.'],
    ['Age, appearance, and temperament are all unestablished.'],
  ],
  stats: {
    size: 'medium',
    type: 'beast',
    cr: '1/8',
    ac: 10,
    hitDice: '2d8',
    speed: {
      walk: 40,
    },
    scores: {
      str: 14,
      dex: 10,
      con: 13,
      int: 2,
      wis: 10,
      cha: 5,
    },
    abilities: [
      {
        key: 'beast-of-burden',
        name: 'Beast of Burden',
        timing: 'trait',
        icon: 'gi/GiCrowbar',
        text: ['Counts as Large for carrying capacity.'],
      },
      {
        key: 'hooves',
        name: 'Hooves',
        timing: 'action',
        icon: 'gi/GiStomp',
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
    ],
    source: {
      adaptedFrom: ['srd-2024_mule'],
      changes: 'A donkey rather than a mule; otherwise unchanged.',
    },
  },
})
