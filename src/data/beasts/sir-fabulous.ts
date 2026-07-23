import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Sir Fabulous',
  location: refs.locations.the_blackstone,
  species: 'Dire wolf',
  notes: [
    [
      'One of two pups taken from the stables of ',
      refs.npcs.lord_malachar,
      ' by the party. He is distinguished by a notably fuller coat than ',
      refs.beasts.wolfie,
      '.',
    ],
  ],
})
