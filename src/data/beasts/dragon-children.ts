import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Dragon Children',
  avatar: '/assets/npcs/dragon-children.png',
  location: refs.locations.mountain_top,
  species: 'Dragon',
  notes: [
    [
      'The children of the ',
      refs.npcs.angel_of_the_mountain,
      ' and ',
      refs.npcs.dragon_of_the_mountain,
      '. All dragons — possibly hundreds. Their exact number, and any individual names, colors, or ages, are unestablished.',
    ],
  ],
})
