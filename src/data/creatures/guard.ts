import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Guard',
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '1/8',
    ac: 16,
    armor: 'chain shirt, shield',
    hitDice: '2d8',
    speed: { walk: 30 },
    scores: { str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10 },
    skills: { perception: 'proficient' },
    abilities: [
      {
        key: 'spear',
        name: 'Spear',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d6', type: refs.rules.piercing, addModifier: true }],
        },
      },
    ],
    source: { adaptedFrom: ['srd-2024_guard'] },
  },
})
