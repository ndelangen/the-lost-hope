import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Dragon of the Mountain',
  avatar: '/assets/npcs/dragon-of-the-mountain.png',
  location: refs.locations.mountain_top,
  species: 'Dragon',
  languages: ['Common'],
  notes: [
    [
      'A dragon dwelling atop the ',
      refs.locations.mountain_top,
      ', married to the ',
      refs.npcs.angel_of_the_mountain,
      '. Its name, color, age, and draconic type (chromatic, metallic, gem, or other) are unknown, as is why it married an angel.',
    ],
  ],
})
