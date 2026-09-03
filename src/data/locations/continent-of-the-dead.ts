import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Continent of the Dead',
  icon: 'gi/GiDeathZone',
  aliases: ['Rotten Continent'],
  type: 'region',
  parent: refs.locations.world,
  at: [125, 90],
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
