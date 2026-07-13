import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Mortimer Mafioso',
  location: refs.locations.mortimer_s_shop,
  notes: [
    [
      'A famous and highly revered alchemist, reputed to make excellent potions and operate ',
      refs.locations.mortimer_s_shop,
      '.',
    ],
  ],
})
