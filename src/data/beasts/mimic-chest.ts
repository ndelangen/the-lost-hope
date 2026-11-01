import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Mimic Chest',
  location: refs.locations.the_flying_whale,
  species: 'Mimic',
  notes: [['A chest-shaped mimic used by ', refs.npcs.bob_the_merchant, ' at his stall.']],
})
