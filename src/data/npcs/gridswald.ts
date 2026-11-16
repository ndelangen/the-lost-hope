import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Gridswald',
  avatar: '/assets/npcs/gridswald-portrait.png',
  location: refs.locations.verdant_haven,
  notes: [['The mayor of ', refs.locations.verdant_haven, '.']],
  stats: refs.creatures.noble,
})
