import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Sir Fabulous, Divine Steed',
  avatar: '/assets/npcs/sir-fabulous-divine-steed.png',
  location: refs.locations.the_blackstone,
  species: 'Dire wolf',
  notes: [
    [
      'The transformed form of ',
      refs.beasts.sir_fabulous,
      ', now an enlarged and divinely altered dire wolf bonded to ',
      refs.pcs.devan,
      ' as his magical steed.',
    ],
    ['His additional abilities and trained skill remain undecided.'],
  ],
})
