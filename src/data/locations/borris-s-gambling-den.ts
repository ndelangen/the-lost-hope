import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Borris’s Gambling Den',
  illustration: '/assets/locations/borris-s-gambling-den-illustration.png',
  icon: 'gi/GiToken',
  type: 'building',
  parent: refs.locations.nimbus,
  at: [903, 524],
  notes: [
    [
      'A casino run by ',
      refs.npcs.borris,
      '. The public gaming floor leads to a VIP room with gaming tables, snail races with little carts, and tables offering drugs.',
    ],
  ],
})
