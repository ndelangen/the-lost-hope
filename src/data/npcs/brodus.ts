import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Brodus',
  notes: [['A member of the gang led by the ', refs.npcs.skynet_gang_leader, '.']],
})
