import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Rustmoor',
  icon: 'gi/GiWreckingBall',
  type: 'settlement',
  parent: refs.locations.world,
  at: [1085, 410],
  notes: [
    [
      'A city of scavengers at the edge of ',
      refs.locations.the_old_battlefield,
      '. Its people recycle the useful parts of the wrecks and trade them.',
    ],
  ],
  background: [['Its map position is a guess.']],
})
