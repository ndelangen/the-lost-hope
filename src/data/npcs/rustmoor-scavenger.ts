import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Rustmoor Scavenger',
  notes: [
    [
      'One of the scavengers of ',
      refs.locations.rustmoor,
      ', who pick the useful parts out of the wrecks on ',
      refs.locations.the_old_battlefield,
      ' and trade them.',
    ],
  ],
  stats: refs.creatures.tough,
})
