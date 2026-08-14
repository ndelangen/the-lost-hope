import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylvia’s Brother',
  notes: [['The as-yet unidentified brother of ', refs.npcs.sylvia, '.']],
})
