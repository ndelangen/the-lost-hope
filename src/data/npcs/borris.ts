import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Borris',
  location: refs.locations.the_sullen_monk,
  species: 'unknown',
  notes: [['A recurring crime boss and friend of ', refs.pcs.devan, '.']],
})
