import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dragon Children',
  avatar: '/assets/npcs/dragon-children.png',
  location: refs.locations.mountain_top,
  role: 'Children of the Angel and Dragon of the Mountain',
  species: 'Dragon',
  summary: [
    'The children of the ',
    refs.npcs.angel_of_the_mountain,
    ' and ',
    refs.npcs.dragon_of_the_mountain,
    '. All dragons — possibly hundreds.',
  ],
  notes: ['Their exact number, and any individual names, colors, or ages, are unestablished.'],
})
