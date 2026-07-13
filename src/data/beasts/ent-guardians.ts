import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Ent Guardians',
  location: refs.locations.verdant_haven_forest,
  species: 'Walking tree-like creatures',
  notes: [['Guardians that roam the forest around ', refs.locations.verdant_haven, ' at night.']],
})
