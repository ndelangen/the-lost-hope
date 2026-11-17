import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Ride the Lightning Gun Deck',
  illustration: '/assets/locations/ride-the-lightning-gun-deck-illustration.png',
  map: { url: '/assets/maps/ride-the-lightning-gun-deck.jpg', width: 2172, height: 1448 },
  deck: {
    vessel: refs.items.ride_the_lightning,
    port: [
      [
        [60, 715],
        [643, 715],
        [643, 945],
        [300, 945],
        [150, 875],
      ],
      [
        [643, 715],
        [1115, 715],
        [1115, 945],
        [643, 945],
      ],
      [
        [1115, 715],
        [1613, 715],
        [1613, 945],
        [1115, 945],
      ],
      [
        [1613, 715],
        [2125, 715],
        [2125, 830],
        [2085, 900],
        [2000, 945],
        [1613, 945],
      ],
    ],
    starboard: [
      [
        [60, 715],
        [150, 575],
        [300, 462],
        [643, 462],
        [643, 715],
      ],
      [
        [643, 462],
        [1115, 462],
        [1115, 715],
        [643, 715],
      ],
      [
        [1115, 462],
        [1613, 462],
        [1613, 715],
        [1115, 715],
      ],
      [
        [1613, 462],
        [2000, 462],
        [2085, 510],
        [2125, 620],
        [2125, 715],
        [1613, 715],
      ],
    ],
  },
  notes: [['Aboard ', refs.items.ride_the_lightning, '.']],
})
