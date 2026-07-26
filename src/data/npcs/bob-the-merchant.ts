import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bob the Merchant',
  location: refs.locations.sylvias_flying_bazaar,
  species: 'Animated skeleton',
  notes: [
    [
      'A skeletal merchant with blue flames in his eye sockets, fine clothes, and an enormous stock of magical trinkets. He presents himself from inside the ',
      refs.beasts.mimic_chest,
      ' at his stall.',
    ],
  ],
})
