import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bernard',
  location: refs.locations.verdant_haven,
  species: 'Talking goat',
})
