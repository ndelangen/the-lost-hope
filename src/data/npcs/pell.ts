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
      ', and he knows it. Cocky and competitive.',
    ],
  ],
  motivations: [
    [
      'To win. He challenges every visitor to the harpoons and keeps score out loud. Beat him and he is your friend for life.',
    ],
  ],
  stats: refs.creatures.tough,
})
