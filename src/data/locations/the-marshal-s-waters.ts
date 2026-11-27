import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Marshal’s Waters',
  icon: 'gi/GiAtSea',
  illustration: '/assets/locations/the-marshal-s-waters-illustration.png',
  type: 'region',
  parent: refs.locations.world,
  at: [1085, 90],
  notes: [
    [
      'A vast open ocean with no land in sight. From the air, the only sign of life is a fishing fleet of strange iron ships that can sail under the surface as well as on it.',
    ],
  ],
  background: [
    [
      'The sea ruled by ',
      refs.npcs.the_11th_marshal,
      '. Where exactly these waters end is never stated, and that matters for its third law.',
    ],
    ['Its map position is a guess.'],
  ],
})
