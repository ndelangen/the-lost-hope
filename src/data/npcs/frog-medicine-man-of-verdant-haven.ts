import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Frog Medicine Man of Verdant Haven',
  location: refs.locations.verdant_haven,
  species: 'Frogfolk',
  notes: [['A pipe-smoking medicine man.']],
})
