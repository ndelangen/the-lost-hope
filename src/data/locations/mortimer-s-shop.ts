import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Mortimer’s Shop',
  icon: 'gi/GiBubblingFlask',
  type: 'building',
  parent: refs.locations.fairhaven,
  at: [0, 0],
  notes: [
    [
      'An exceptionally high-end potion brewery and shop operated by ',
      refs.npcs.mortimer_mafioso,
      '.',
    ],
  ],
})
