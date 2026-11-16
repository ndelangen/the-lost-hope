import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Esia',
  avatar: '/assets/npcs/esia-portrait.png',
  previousPortraits: [{ url: '/assets/npcs/esia.png', description: 'Previous character portrait' }],
  notes: [
    [
      'A red-haired shipwright with leaves in her hair who oversees work at the ',
      refs.locations.skynet_airship_shipyard,
      '. Her name is transcribed inconsistently.',
    ],
  ],
  stats: refs.creatures.commoner,
})
