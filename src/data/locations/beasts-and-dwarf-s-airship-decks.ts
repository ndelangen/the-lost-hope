import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Beasts and Dwarf’s Airship Decks',
  illustration: '/assets/locations/beasts-and-dwarf-s-airship-decks-illustration.png',
  map: { url: '/assets/maps/beasts-and-dwarf-s-airship.jpg', width: 1536, height: 1024 },
  notes: [['Aboard ', refs.items.beasts_and_dwarf_s_airship, '.']],
})
