import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Mayor of Fairhaven',
  avatar: '/assets/npcs/mayor-of-fairhaven-portrait.png',
  location: refs.locations.fairhaven,
  notes: [['The civic leader of ', refs.locations.fairhaven, '.']],
  stats: refs.creatures.noble,
})
