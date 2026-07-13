import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Penelope',
  location: refs.locations.fairhaven,
  notes: [['An alchemist who develops original potion formulae.']],
})
