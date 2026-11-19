import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Ride the Lightning Main Deck',
  illustration: '/assets/locations/ride-the-lightning-main-deck-illustration.png',
  map: { url: '/assets/maps/ride-the-lightning-main-deck.jpg', width: 2172, height: 1448 },
  deck: { vessel: refs.items.ride_the_lightning },
  notes: [['Aboard ', refs.items.ride_the_lightning, '.']],
})
