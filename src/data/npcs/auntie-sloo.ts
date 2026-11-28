import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Auntie Sloo',
  location: refs.locations.the_grand_hall,
  species: 'Human, changed by the aboleth',
  notes: [
    [
      'She runs the feast in the ',
      refs.locations.the_grand_hall,
      ' of ',
      refs.locations.the_caves_of_steel,
      ' and pays out for the stories told on its stage. She is also the one who buys visitors’ books.',
    ],
    ['She keeps a big book in which she writes down every story ever told there.'],
  ],
  motivations: [
    [
      'To keep every story. ',
      refs.npcs.old_murl,
      ' remembers them all wrong; her book remembers them as they were told.',
    ],
  ],
  stats: refs.creatures.commoner,
})
