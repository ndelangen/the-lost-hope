import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Tempest',
  icon: 'gi/GiWhirlwind',
  type: 'settlement',
  parent: refs.locations.sky_islands,
  at: [0, 0],
  notes: [
    [
      'The third inhabited ',
      refs.locations.sky_islands,
      ' destination. It is governed by a northern house of Air Genasi, whose moving island allows them to preserve a nomadic tradition without leaving the settlement.',
    ],
    [
      'Tempest has one known shape-changing dungeon that also serves as a training site for the Arcane University.',
    ],
  ],
})
