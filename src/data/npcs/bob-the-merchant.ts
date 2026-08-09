import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bob the Merchant',
  location: refs.locations.bob_s_stall,
  species: 'unknown',
  notes: [
    [
      'The party usually sees Bob as a skeletal merchant with blue flames in his eye sockets, fine clothes, and an enormous stock of magical trinkets. He insists that he is alive and presents himself from inside the ',
      refs.beasts.mimic_chest,
      ' at ',
      refs.locations.bob_s_stall,
      '.',
    ],
    [
      'Other observers have perceived Bob as a normal, exceptionally handsome human man with black hair. His actual nature and the reason for these conflicting appearances remain unknown.',
    ],
  ],
})
