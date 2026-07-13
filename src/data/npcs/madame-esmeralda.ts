import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Madame Esmeralda',
  location: refs.locations.fairhaven,
  notes: [['A fortune teller.']],
})
