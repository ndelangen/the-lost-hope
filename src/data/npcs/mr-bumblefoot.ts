import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Mr. Bumblefoot',
  location: refs.locations.giggles_and_gadgets,
  notes: [
    [
      'A maker of mechanisms, including flying brooms, who runs ',
      refs.locations.giggles_and_gadgets,
      '.',
    ],
  ],
})
