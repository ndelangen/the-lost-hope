import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dragon Children',
  avatar: '/assets/npcs/dragon-children.png',
  location: refs.locations.mountain_top,
  species: 'Dragon',
  summary: [
    'The children of the ',
    refs.npcs.angel_of_the_mountain,
    ' and ',
    refs.npcs.dragon_of_the_mountain,
    '. All dragons — possibly hundreds. Their exact number, and any individual names, colors, or ages, are unestablished.',
  ],
})
