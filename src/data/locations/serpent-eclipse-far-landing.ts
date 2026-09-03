import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Far Landing',
  icon: 'gi/GiStonePath',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_maze,
  at: [725, 640],
  notes: [
    [
      'A broad, dry stone platform at the far side of the ',
      refs.locations.serpent_eclipse_flooded_cavern,
      ', before the doorway to the ',
      refs.locations.serpent_eclipse_rest_chamber,
      '. It has room for the party to gather out of the water.',
    ],
  ],
})
