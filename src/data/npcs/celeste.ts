import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Celeste',
  location: refs.locations.verdant_haven,
  notes: [
    [
      "A child with an unexplained connection to death or the undead. She has no connection to the party's personal histories.",
    ],
  ],
})
