import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'ShadowPeak Mining Operation',
  icon: 'gi/GiMineWagon',
  type: 'dungeon',
  parent: refs.locations.shadowpeak,
  at: [650, 520],
  notes: [
    [
      'A large underground mine reached by elevator, with stalagmites, stalactites, a crowded work floor, and a slave pit providing only minimal necessities.',
    ],
    [
      'Human captors controlled enslaved elves, orcs, and half-orcs through a crystal and fitted them with collars.',
    ],
  ],
})
