import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Skipper Gubb',
  location: refs.locations.the_caves_of_steel,
  species: 'Human, changed by the aboleth',
  notes: [
    [
      'Skipper of the ',
      refs.items.caves_of_steel_subship,
      ' that comes alongside the party. Loud, proud, and dying to show off the harpoons.',
    ],
  ],
  motivations: [
    [
      'To show his crew to anyone who will look. He is proud of them and of the bonds between them, not of the ship: every subship is the same.',
    ],
  ],
  stats: refs.creatures.tough,
})
