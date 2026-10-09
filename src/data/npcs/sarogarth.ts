import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sarogarth',
  notes: [
    [
      'An ancient wizard with slick grey hair, a grey beard, a star below his left eye, and a wooden staff. He is roughly two thousand years old.',
    ],
    [
      'Portrayed as the cowardly wizard in the holy texts of the ',
      refs.organizations.church_of_gruumsh,
      '. He disputes their account of him splitting a continent, saying experimental chaos magic blew part of a mountain into the sea.',
    ],
    [
      'His magic supports a pocket dimension with a pond for ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      '.',
    ],
    [
      'He says a Deck of Many Things game transformed his first wife into a creature that killed his family. He stopped gambling afterward. He is afraid of heights.',
    ],
  ],
})
