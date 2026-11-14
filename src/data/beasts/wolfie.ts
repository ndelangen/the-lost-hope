import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Wolfie',
  avatar: '/assets/npcs/wolfie.png',
  location: refs.locations.skynet_s_second_best_inn,
  species: 'Dire wolf in a humanoid form',
  notes: [
    ['One of two pups taken from the stables of ', refs.npcs.lord_malachar, ' by the party.'],
  ],
})
