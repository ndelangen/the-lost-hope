import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bessy',
  location: refs.locations.verdant_haven,
  species: 'Minotaur',
  notes: [['A craftsperson capable of making permanent protective sheaths for dangerous weapons.']],
})
