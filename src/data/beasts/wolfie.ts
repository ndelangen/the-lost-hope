import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Wolfie',
  avatar: '/assets/npcs/wolfie.png',
  location: refs.locations.the_blackstone,
  species: 'Dire wolf',
  notes: [
    [
      'One of two pups taken from the stables of ',
      refs.npcs.lord_malachar,
      ' by the party. A one-use obedience whip permanently enabled Wolfie to understand his handler’s intent and communicate his own wants while retaining free will.',
    ],
  ],
})
