import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Spy',
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '1',
    ac: 12,
    hitDice: '6d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 15,
      con: 10,
      int: 12,
      wis: 14,
      cha: 16,
    },
    skills: {
      deception: 'proficient',
      insight: 'proficient',
      investigation: 'proficient',
      perception: 'proficient',
      persuasion: 'proficient',
      sleightOfHand: 'proficient',
      stealth: 'expert',
    },
    abilities: [
      {
        key: 'cunning-action',
        name: 'Cunning Action',
        timing: 'bonus action',
        icon: 'gi/GiSmokeBomb',
        text: [
          'Takes the ',
          refs.rules.dash,
          ', ',
          refs.rules.disengage,
          ', or ',
          refs.rules.hide,
          ' action.',
        ],
      },
      {
        key: 'sneak-attack',
        name: 'Sneak Attack',
        timing: 'trait',
        icon: 'gi/GiDaggerRose',
        text: [
          'Once per turn, deals an extra 2d6 damage when it hits with advantage, or when an ally is within 5 ft. of the target.',
        ],
      },
      {
        key: 'shortsword',
        name: 'Shortsword',
        timing: 'action',
        icon: 'gi/GiDaggerRose',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'hand-crossbow',
        name: 'Hand Crossbow',
        timing: 'action',
        icon: 'gi/GiCrossbow',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [30, 120],
          damage: [
            {
              dice: '1d6',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_spy'],
    },
  },
})
