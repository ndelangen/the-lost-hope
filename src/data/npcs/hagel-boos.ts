import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Hagel Boos',
  location: refs.locations.rustmoor,
  species: 'Human',
  notes: [
    [
      'An ex-navy bosun in ',
      refs.locations.rustmoor,
      ', broad and quiet, who writes in his logbook every evening, even in the tavern. The other two call him Boos.',
    ],
  ],
  motivations: [
    ['A deck under his feet again, any deck. He wants out of ', refs.locations.rustmoor, '.'],
  ],
  background: [
    [
      'The leader of the three ex-navy men, with ',
      refs.npcs.flyn_etchersen,
      ' and ',
      refs.npcs.jake_kinner,
      '. He lost his whole watch, one by one, as they stopped caring about the sea and drifted to ',
      refs.locations.rustmoor,
      '. He has always kept a logbook and does not know that it is why he is still himself. He takes Arcane Dust to dim the loss.',
    ],
    ['He speaks in short, plain sentences, with a little ship’s slang.'],
  ],
  stats: refs.creatures.commoner,
})
