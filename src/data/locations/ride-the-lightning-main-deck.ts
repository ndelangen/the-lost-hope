import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  icon: 'gi/GiFigurehead',
  name: 'Ride the Lightning Main Deck',
  illustration: '/assets/locations/ride-the-lightning-main-deck-illustration.png',
  map: { url: '/assets/maps/ride-the-lightning-main-deck.jpg', width: 1536, height: 1024 },
  deck: { vessel: refs.items.ride_the_lightning },
  notes: [['Aboard ', refs.items.ride_the_lightning, '.']],
})
