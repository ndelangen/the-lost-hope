import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Ride the Lightning Gun Deck',
  map: { url: '/assets/maps/ride-the-lightning-gun-deck.jpg', width: 2172, height: 1448 },
  notes: [['Aboard ', refs.items.ride_the_lightning, '.']],
})
