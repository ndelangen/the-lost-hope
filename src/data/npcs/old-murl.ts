import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Old Murl',
  location: refs.locations.the_caves_of_steel,
  species: 'Human, changed by the aboleth',
  notes: [
    [
      'A story-twister of ',
      refs.locations.the_caves_of_steel,
      '. He has heard every visitor’s tale and remembers all of them wrong.',
    ],
  ],
  motivations: [
    [
      'To hear new stories and tell them again, twisted. The morning after the party tells their backgrounds, he is already retelling them wrong.',
    ],
  ],
  background: [
    [
      'A proven unreliable source, so his hints about Arcane Dust can be dropped without giving anything away for certain.',
    ],
  ],
  stats: refs.creatures.commoner,
})
