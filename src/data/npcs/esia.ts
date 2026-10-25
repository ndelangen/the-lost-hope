import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Esia',
  notes: [
    [
      'A red-haired shipwright with leaves in her hair who oversees work at the shipyard on ',
      refs.locations.skynet,
      '. Her name is transcribed inconsistently.',
    ],
  ],
})
