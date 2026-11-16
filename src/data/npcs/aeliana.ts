import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Aeliana',
  notes: [['A wandering elf mage.']],
  stats: refs.creatures.mage,
})
