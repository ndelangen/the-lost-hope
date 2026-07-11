import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Knukkles',
  location: refs.locations.the_sullen_monk,
  species: 'unknown',
  notes: [['A four-armed figure with a red face.']],
})
