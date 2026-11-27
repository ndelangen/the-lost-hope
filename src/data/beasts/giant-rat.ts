import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Giant Rat',
  location: refs.locations.the_old_battlefield,
  species: 'Giant rat',
  notes: [['A dog-sized brown-grey rat with a bare, ringed tail.']],
  background: [
    [
      'They nest by the hundred in the holds of the crashed ships on ',
      refs.locations.the_old_battlefield,
      '.',
    ],
  ],
  stats: {
    size: 'small',
    type: 'beast',
    cr: '1/8',
    ac: 12,
    hitDice: '2d6',
    speed: { walk: 30 },
    scores: { str: 7, dex: 15, con: 11, int: 2, wis: 10, cha: 4 },
    senses: { darkvision: 60 },
    abilities: [
      {
        key: 'keen-smell',
        name: 'Keen Smell',
        timing: 'trait',
        icon: 'gi/GiNoseSide',
        text: [refs.rules.advantage, ' on Wisdom (', refs.rules.perception, ') checks by smell.'],
      },
      {
        key: 'pack-tactics',
        name: 'Pack Tactics',
        timing: 'trait',
        icon: 'lucide/UsersRound',
        text: [
          refs.rules.advantage,
          ' on an attack roll when an ally that is not incapacitated is within 5 ft. of the target.',
        ],
      },
      {
        key: 'bite',
        name: 'Bite',
        timing: 'action',
        icon: 'gi/GiFangs',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [{ dice: '1d4', type: refs.rules.piercing, addModifier: true }],
        },
      },
    ],
    source: { adaptedFrom: ['srd-2024_giant-rat'] },
  },
})
