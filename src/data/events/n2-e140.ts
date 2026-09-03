import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The trial disk closes the first door',
  day: 22,
  location: refs.locations.serpent_eclipse_three_door_chamber,
  mark: { type: 'icon', name: 'gi/GiMetalDisc' },
  notes: [
    [
      refs.pcs.jim,
      ' returned the ',
      refs.items.serpent_eclipse_trial_disk,
      ' to the altar. The door to the completed challenge closed, leaving two doors to choose from.',
    ],
    [
      refs.pcs.cassian_veyl,
      ' proposed going straight ahead. The party chose the middle door and entered the ',
      refs.locations.serpent_eclipse_maze,
      ', with the objective of finding a flag.',
    ],
  ],
})
