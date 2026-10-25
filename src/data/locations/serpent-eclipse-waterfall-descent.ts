import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Waterfall Descent',
  icon: 'gi/GiWaterfall',
  illustration: '/assets/locations/serpent-eclipse-waterfall-descent-illustration.png',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_maze,
  at: [180, 440],
  notes: [
    [
      'A waterfall shaft with three hanging vines above the ',
      refs.locations.serpent_eclipse_flooded_cavern,
      '. The ledge at its top lies at the end of the curving passage.',
    ],
  ],
})
