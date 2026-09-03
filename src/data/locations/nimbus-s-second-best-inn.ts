import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Nimbus’s Second-Best Inn',
  icon: 'gi/GiBunkBeds',
  type: 'building',
  parent: refs.locations.nimbus,
  at: [825, 180],
  notes: [
    [
      'An upscale three-storey inn with private bathrooms, hammocks, a library, an alchemical shop, a massage parlour, a barbershop, dining, and dungeon insurance. Its proper name has not yet been established.',
    ],
  ],
})
