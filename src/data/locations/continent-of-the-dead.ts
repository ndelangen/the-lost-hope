import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Continent of the Dead',
  icon: 'gi/GiDeathZone',
  type: 'region',
  parent: refs.locations.world,
  at: [0, 0],
  notes: [
    [
      'A continent said by ',
      refs.npcs.roberto,
      ' to lie across the ',
      refs.locations.sea_of_unknown,
      '; the reliability of this claim is unconfirmed.',
    ],
  ],
})
