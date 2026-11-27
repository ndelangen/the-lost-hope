import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Shrieker Fungus',
  location: refs.locations.thornwall_maze,
  species: 'Shrieker',
  notes: [['A man-sized mushroom that screams when anything comes near it.']],
  background: [
    [
      'In the ',
      refs.locations.thornwall_maze,
      ' they grow on the wrecks, their caps glittering with old Arcane Dust. Their screams carry over the walls and call the ',
      refs.beasts.shambling_mound,
      '.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'plant',
    cr: '0',
    ac: 5,
    hitDice: '3d8',
    speed: { walk: 0 },
    scores: { str: 1, dex: 1, con: 10, int: 1, wis: 3, cha: 1 },
    senses: { blindsight: 30 },
    conditionImmunities: [
      refs.rules.blinded,
      refs.rules.charmed,
      refs.rules.deafened,
      refs.rules.frightened,
    ],
    abilities: [
      {
        key: 'false-appearance',
        name: 'False Appearance',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: ['While it does not move, it looks like an ordinary mushroom.'],
      },
      {
        key: 'shriek',
        name: 'Shriek',
        timing: 'reaction',
        icon: 'gi/GiSonicShout',
        text: [
          'When bright light or a creature comes within 30 ft. of it, it shrieks until the light or creature is gone and for one turn after. The shriek is heard 300 ft. away, over every wall of the maze.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_shrieker-fungus'],
      changes: 'Its shriek carries over the maze walls and calls the shambling mound.',
    },
  },
})
