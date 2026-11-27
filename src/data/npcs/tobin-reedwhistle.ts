import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Tobin Reedwhistle',
  notes: [['A kind, gentle travelling bard who smokes a foldable pipe.']],
  background: [['What he smokes in his pipe is Arcane Dust.']],
  stats: refs.creatures.commoner,
})
