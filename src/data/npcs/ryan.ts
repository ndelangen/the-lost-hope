import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Ryan',
  location: refs.locations.badesh,
  notes: [['The guard captain of ', refs.locations.badesh, '.']],
})
