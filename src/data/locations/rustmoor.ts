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
    [
      'It lies very far from ',
      refs.locations.fajanet,
      ': so far around the globe that the small hours of the night in Rustmoor are afternoon in Fajanet.',
    ],
    ['Its map position is a guess.'],
    [
      'Arcane Dust use as a drug is high in Rustmoor. Users are easy to spot once you know the look, the same as the Dust-lost sailors on ',
      refs.items.ride_the_lightning,
      ': silver glitter sits in their glassy eyes, and those eyes never really look at another person. They are emotionally and intellectually absent, almost like zombies, but they are not dead.',
    ],
    [
      'Some of its people are ex-navy. They have always kept logbooks: nobody told them to, it is simply something they were already doing, and they found it helped them a great deal. They do not know why. The mates who did not write things down are the ones they lost, so they are survivors of a bias they cannot see.',
    ],
    [
      'They take Arcane Dust to dim the pain of all the people they have lost. Asked, they describe how their mates started to lose interest in shipping, drifted, and ended up here. It is a common fate in Rustmoor.',
    ],
    [
      'Getting out is hard. The merchants who visit need their hold space for salvage, which is what they come for, and they will not take on passengers who use Dust: too many addicts end up a problem.',
    ],
  ],
})
