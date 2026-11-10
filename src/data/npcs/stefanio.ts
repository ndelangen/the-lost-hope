import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Stefanio',
  location: refs.locations.nimbus,
  notes: [
    [
      'A magic-item merchant with a spirit cannon powered by arcane energy. The name is transcribed provisionally.',
    ],
  ],
})
