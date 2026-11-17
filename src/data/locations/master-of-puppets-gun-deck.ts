import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Master of Puppets Gun Deck',
  illustration: '/assets/locations/master-of-puppets-gun-deck-illustration.png',
  map: { url: '/assets/maps/master-of-puppets-gun-deck.jpg', width: 2172, height: 1448 },
  notes: [['Aboard ', refs.items.master_of_puppets, '.']],
})
