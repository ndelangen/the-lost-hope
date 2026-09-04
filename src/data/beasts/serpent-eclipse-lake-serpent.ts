import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Serpent Eclipse Lake Serpent',
  avatar: '/assets/beasts/serpent-eclipse-lake-serpent.jpg',
  species: 'Giant serpent',
  location: refs.locations.serpent_eclipse_flooded_cavern,
  notes: [['An enormous dark-blue serpent that moves beneath the water and stone platforms.']],
})
