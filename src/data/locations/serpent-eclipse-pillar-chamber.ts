import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Pillar Chamber',
  icon: 'gi/GiDjedPillar',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_maze,
  at: [775, 190],
  notes: [
    [
      'A rounded chamber containing three pillars marked with a sun, a rock, and a winding symbol, with a separate brazier. A curving passage leads toward the ',
      refs.locations.serpent_eclipse_waterfall_descent,
      '.',
    ],
  ],
})
