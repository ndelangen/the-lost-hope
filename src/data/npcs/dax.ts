import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dax',
  species: 'Elemental spirit',
  notes: [
    [
      'A red-shelled tortoise who walks on two legs. ',
      refs.npcs.sarogarth,
      ' transformed him so he could explore underwater.',
    ],
    ['Married to ', refs.npcs.sylf, '. He has a shared contract with ', refs.npcs.sarogarth, '.'],
  ],
})
