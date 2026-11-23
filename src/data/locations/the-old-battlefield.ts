import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Old Battlefield',
  icon: 'gi/GiBattleMech',
  type: 'wilderness',
  parent: refs.locations.world,
  at: [1085, 610],
  notes: [
    [
      'A giant old battlefield, strewn with giant machines, mines and crashed flying ships, in layers on top of layers of destruction. ',
      refs.locations.rustmoor,
      ' stands at its edge.',
    ],
  ],
  background: [
    [
      'More than one war was fought here: the war of the marshals against the elves, and the fighting between the marshals themselves.',
    ],
    [
      'The war of the marshals against the elves is the Second Great War. The marshals ordered it, and the dwarves built the machines and marched.',
    ],
    ['Its map position is a guess.'],
  ],
})
