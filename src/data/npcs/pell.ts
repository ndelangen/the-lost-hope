import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Pell',
  location: refs.locations.the_caves_of_steel,
  species: 'Human, changed by the aboleth',
  notes: [
    [
      'The best harpoon shot in the fleet of ',
      refs.locations.the_caves_of_steel,
      ', and excited to show it off.',
    ],
  ],
  motivations: [
    [
      'To share it. He is happy to teach anyone the harpoons, cheers every visitor who has a go, and is delighted when someone hits.',
    ],
  ],
  stats: refs.creatures.tough,
})
