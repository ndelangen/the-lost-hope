import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Abraham',
  avatar: '/assets/npcs/abraham.png',
  location: refs.locations.badesh_forest,
  species: 'Donkey',
  notes: [
    ['A donkey who now travels with ', refs.pcs.jim, '.'],
    ['Age, appearance, and temperament are all unestablished.'],
  ],
})
