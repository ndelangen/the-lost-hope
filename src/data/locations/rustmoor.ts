import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Rustmoor',
  icon: 'gi/GiWreckingBall',
  illustration: '/assets/locations/rustmoor-illustration.png',
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
  background: [
    ['Its map position is a guess.'],
    [
      'Arcane Dust use as a drug is high in Rustmoor. Users are easy to spot once you know the look, the same as the Dust-lost sailors on ',
      refs.items.ride_the_lightning,
      ': Silver glitter sits in their glassy eyes, and those eyes never really look at another person. They are emotionally and intellectually absent, almost like zombies, but they are not dead.',
    ],
  ],
})
