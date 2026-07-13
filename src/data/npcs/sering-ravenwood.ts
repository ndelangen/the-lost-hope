import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sering Ravenwood',
  location: refs.locations.fairhaven,
})
