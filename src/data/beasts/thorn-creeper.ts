import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Thorn Creeper',
  location: refs.locations.thornwall_maze,
  species: 'Thorn creeper',
  notes: [['A knot of thorny vines that pulls itself out of a hedge and drags people in.']],
  background: [
    [
      'Part of the barricade the elves grew in the ',
      refs.locations.thornwall_maze,
      '. It was meant to hold dwarves until the walls closed over them, and it still does.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'plant',
    cr: '1',
    ac: 12,
    armor: 'natural armor',
    hitDice: '6d8',
    speed: { walk: 10, climb: 10 },
    scores: { str: 15, dex: 8, con: 14, int: 4, wis: 8, cha: 1 },
    skills: { stealth: 'proficient' },
    senses: { blindsight: 60 },
    damageVulnerabilities: [refs.rules.fire],
    conditionImmunities: [refs.rules.blinded, refs.rules.deafened],
    abilities: [
      {
        key: 'false-appearance',
        name: 'False Appearance',
        timing: 'trait',
        icon: 'gi/GiTreeBranch',
        text: ['While it does not move, it is part of the thorn wall.'],
      },
      {
        key: 'thorn-lash',
        name: 'Thorn Lash',
        timing: 'action',
        icon: 'gi/GiWhiplash',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 10,
          damage: [{ dice: '2d6', type: refs.rules.piercing, addModifier: true }],
        },
        text: [
          'The target is ',
          refs.rules.grappled,
          ' (escape DC 12) and pulled up to 5 ft. toward the wall. It can hold one target at a time.',
        ],
      },
      {
        key: 'drag-into-the-wall',
        name: 'Drag into the Wall',
        timing: 'bonus action',
        icon: 'gi/GiBreakingChain',
        intent: 'damage',
        text: [
          'The creature it is grappling takes 1d6 piercing damage from the thorns and is ',
          refs.rules.restrained,
          ' until the grapple ends.',
        ],
      },
    ],
    source: {
      adaptedFrom: [],
      changes:
        'Homebrew, built like a vine blight: a wall-hugging plant that grabs at 10 ft., then pulls its prey into the thorns.',
    },
  },
})
