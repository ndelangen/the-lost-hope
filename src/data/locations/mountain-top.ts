import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Mountain Top',
  icon: 'gi/GiMountaintop',
  type: 'landmark',
  parent: refs.locations.world,
  at: [600, 200],
  description: [
    [
      'The mountain summit, home of the ',
      refs.npcs.angel_of_the_mountain,
      ', the ',
      refs.npcs.dragon_of_the_mountain,
      ', and their ',
      refs.npcs.dragon_children,
      '.',
    ],
  ],
  map: { url: '/assets/locations/mountain-top.png', width: 1200, height: 700 },
})
