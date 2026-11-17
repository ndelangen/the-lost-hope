import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Ride the Lightning Main Deck',
  illustration: '/assets/locations/ride-the-lightning-main-deck-illustration.png',
  map: { url: '/assets/maps/ride-the-lightning-main-deck.jpg', width: 2172, height: 1448 },
  deck: {
    vessel: refs.items.ride_the_lightning,
    port: [
      [
        [60, 715],
        [615, 715],
        [615, 945],
        [300, 945],
        [150, 875],
      ],
      [
        [615, 715],
        [1115, 715],
        [1115, 945],
        [615, 945],
      ],
      [
        [1115, 715],
        [1608, 715],
        [1608, 945],
        [1115, 945],
      ],
      [
        [1608, 715],
        [2125, 715],
        [2125, 830],
        [2085, 900],
        [2000, 945],
        [1608, 945],
      ],
    ],
    starboard: [
      [
        [60, 715],
        [150, 575],
        [300, 462],
        [615, 462],
        [615, 715],
      ],
      [
        [615, 462],
        [1115, 462],
        [1115, 715],
        [615, 715],
      ],
      [
        [1115, 462],
        [1608, 462],
        [1608, 715],
        [1115, 715],
      ],
      [
        [1608, 462],
        [2000, 462],
        [2085, 510],
        [2125, 620],
        [2125, 715],
        [1608, 715],
      ],
    ],
  },
  notes: [['Aboard ', refs.items.ride_the_lightning, '.']],
})
