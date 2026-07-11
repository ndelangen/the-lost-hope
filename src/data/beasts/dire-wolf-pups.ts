import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Dire Wolf Pups',
  location: refs.locations.the_blackstone,
  species: 'Dire wolf',
  notes: [
    [
      'Two pups taken from the stables of ',
      refs.npcs.lord_malachar,
      ' by ',
      refs.pcs.cassian_veyl,
      ' with enthusiastic support from ',
      refs.pcs.devan,
      '.',
    ],
  ],
})
