import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Penelope',
  avatar: '/assets/npcs/penelope-portrait.png',
  location: refs.locations.fairhaven,
  notes: [['An alchemist who develops original potion formulae.']],
  stats: refs.creatures.alchemist,
})
