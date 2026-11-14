import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Tough',
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '1/2',
    ac: 12,
    armor: 'leather armor',
    hitDice: '5d8',
    speed: { walk: 30 },
    scores: { str: 15, dex: 12, con: 14, int: 10, wis: 10, cha: 11 },
    abilities: [
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          'Advantage on an attack roll against a creature if at least one ally is within 5 ft. of it and not ',
          refs.rules.incapacitated,
          '.',
        ],
      },
      {
        key: 'mace',
        name: 'Mace',
        timing: 'action',
        icon: 'gi/GiFlangedMace',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d6', type: refs.rules.bludgeoning, addModifier: true }],
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
          damage: [{ dice: '1d10', type: refs.rules.piercing, addModifier: true }],
        },
      },
    ],
    source: { adaptedFrom: ['srd-2024_tough'] },
  },
})
