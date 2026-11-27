import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Silverspore Puffball',
  location: refs.locations.thornwall_maze,
  species: 'Puffball',
  notes: [
    [
      'A floating puffball the size of a head, glittering silver. It drifts toward warmth and bursts.',
    ],
  ],
  background: [
    [
      'Its spores are laced with the old Arcane Dust of the ',
      refs.locations.thornwall_maze,
      '. Whoever breathes them loses their bearings for a while.',
    ],
  ],
  stats: {
    size: 'small',
    type: 'plant',
    cr: '1/2',
    ac: 5,
    hitDice: '2d6',
    speed: { walk: 0, fly: 10 },
    scores: { str: 3, dex: 1, con: 14, int: 1, wis: 5, cha: 1 },
    senses: { blindsight: 30 },
    conditionImmunities: [refs.rules.blinded, refs.rules.deafened, refs.rules.prone],
    abilities: [
      {
        key: 'hover',
        name: 'Hover',
        timing: 'trait',
        icon: 'gi/GiFeather',
        text: ['It floats at head height and cannot fall.'],
      },
      {
        key: 'spore-burst',
        name: 'Spore Burst',
        timing: 'trait',
        icon: 'gi/GiSmokeBomb',
        intent: 'damage',
        save: {
          ability: 'con',
          dc: 'con',
          target: { area: { shape: refs.rules.emanation, size: 10 } },
          onFail: {
            damage: [{ dice: '2d6', type: refs.rules.poison }],
            conditions: [refs.rules.poisoned],
            also: [
              'The creature stays poisoned for 1 minute. If it was keeping the party’s map, it forgets the last two turns it drew: the player rubs them out.',
            ],
          },
          onSuccess: 'half',
        },
        text: [
          'When it drops to 0 hit points or uses ',
          { ability: 'drift-and-burst' },
          ', it bursts.',
        ],
      },
      {
        key: 'drift-and-burst',
        name: 'Drift and Burst',
        timing: 'action',
        icon: 'gi/GiWindHole',
        intent: 'damage',
        text: [
          'It drifts into a creature’s space and bursts, setting off ',
          { ability: 'spore-burst' },
          ', and dies.',
        ],
      },
    ],
    source: {
      adaptedFrom: [],
      changes:
        'Homebrew, built like a gas spore with a much smaller burst. Its spores make the party’s mapper lose part of the map.',
    },
  },
})
