import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Thornwall Gate Tree',
  location: refs.locations.thornwall_maze,
  species: 'Awakened tree',
  notes: [['An old, gnarled tree grown into a thorn wall, where the path seems to end.']],
  background: [
    [
      'The elves awakened it in the Second Great War as a living gate in the ',
      refs.locations.thornwall_maze,
      '. It stands in the only way in, and still guards it, waiting for an elf to give the word.',
    ],
    [
      'It speaks only Elvish. It understands no other language, and it lets through anyone who speaks to it in Elvish with respect.',
    ],
  ],
  stats: {
    size: 'huge',
    type: 'plant',
    cr: '2',
    ac: 13,
    armor: 'natural armor',
    hitDice: '7d12',
    speed: { walk: 20 },
    scores: { str: 19, dex: 6, con: 15, int: 10, wis: 10, cha: 7 },
    damageVulnerabilities: [refs.rules.fire],
    damageResistances: [refs.rules.bludgeoning, refs.rules.piercing],
    abilities: [
      {
        key: 'false-appearance',
        name: 'False Appearance',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: ['While it does not move, it looks like an ordinary tree grown into the wall.'],
      },
      {
        key: 'slam',
        name: 'Slam',
        timing: 'action',
        icon: 'gi/GiFist',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 10,
          damage: [{ dice: '3d6', type: refs.rules.bludgeoning, addModifier: true }],
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_awakened-tree'],
      changes: 'Speaks only Elvish, and guards a hidden path in the maze.',
    },
  },
})
