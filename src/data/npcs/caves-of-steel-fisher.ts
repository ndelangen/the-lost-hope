import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Caves of Steel Fisher',
  location: refs.locations.the_caves_of_steel,
  species: 'Human, changed by the aboleth',
  notes: [
    [
      'One of the subship crews of ',
      refs.locations.the_caves_of_steel,
      ', who fish the surface of ',
      refs.locations.the_marshal_s_waters,
      '. Friendly to strangers, and hungry for news.',
    ],
  ],
  motivations: [
    [
      'They want to know everything about the world outside. They cannot imagine leaving, and when asked whether they would wish to, they fall silent.',
    ],
  ],
  background: [
    [
      'Bound from birth by the three laws of ',
      refs.npcs.the_11th_marshal,
      '. Besides their own food, they hunt sentient sea creatures for the Marshal’s table. They do not like it, and they cannot refuse an order.',
    ],
  ],
  stats: refs.creatures.tough,
})
