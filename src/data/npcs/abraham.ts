import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Abraham',
  avatar: '/assets/npcs/abraham.png',
  location: refs.locations.badesh_forest,
  role: "Victor's mount / pack animal",
  species: 'Donkey',
  summary: ['A donkey belonging to ', refs.pcs.victor_the_badesh_lumberjack, '.'],
  notes: ['Age, appearance, and temperament are all unestablished.'],
})
