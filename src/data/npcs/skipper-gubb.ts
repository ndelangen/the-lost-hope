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
      'To show off his ship and his crew. He is honoured to be next in line for the machine, and says so with a big grin.',
    ],
  ],
  background: [
    [
      'The machine is the subship’s mind cannon, which kills the skipper who fires it. His grin is dark comedy and a gentle clue to what it does; he never demonstrates it.',
    ],
  ],
  stats: refs.creatures.tough,
})
