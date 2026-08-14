import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Left-Door Passage',
  icon: 'gi/GiTwoShadows',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  at: [0, 0],
  notes: [
    [
      'The roughly one-hundred-metre descending passage behind the left-hand door of the ',
      refs.locations.serpent_eclipse_three_door_chamber,
      '. It magically suppresses sound and confronts entrants with personal shadows before reaching the ',
      refs.locations.serpent_eclipse_shadow_arena,
      '.',
    ],
  ],
})
