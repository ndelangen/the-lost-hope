import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Three-Door Chamber',
  icon: 'gi/GiTripleGate',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  at: [500, 350],
  notes: [
    [
      'A chamber in the ',
      refs.locations.temple_of_the_serpent_eclipse,
      ' containing a blood-fed altar and three identical iron doors. Each door leads to a separate challenge; only the ',
      refs.locations.serpent_eclipse_left_door_passage,
      ' has been explored.',
    ],
  ],
})
