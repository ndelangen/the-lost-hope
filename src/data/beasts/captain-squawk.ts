import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Captain Squawk',
  avatar: '/assets/beasts/captain-squawk.jpg',
  species: 'Parrot familiar',
  notes: [
    [
      'A rainbow-feathered familiar of ',
      refs.pcs.swift_starblade,
      ' that addresses him as captain.',
    ],
  ],
})
