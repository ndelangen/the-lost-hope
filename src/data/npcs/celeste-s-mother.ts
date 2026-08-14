import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Celeste’s Mother',
  notes: [['The unnamed mother of ', refs.npcs.celeste, '.']],
})
