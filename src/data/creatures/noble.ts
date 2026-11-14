import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Noble',
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '1/8',
    ac: 15,
    armor: 'breastplate',
    hitDice: '2d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 11,
      dex: 12,
      con: 11,
      int: 12,
      wis: 14,
      cha: 16,
    },
    skills: {
      deception: 'proficient',
      insight: 'proficient',
      persuasion: 'proficient',
    },
    abilities: [
      {
        key: 'rapier',
        name: 'Rapier',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d8',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'parry',
        name: 'Parry',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'Adds 2 to its AC against one melee attack that would hit it, while holding a weapon.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_noble'],
    },
  },
})
