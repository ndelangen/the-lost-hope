import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Severed Bond with Jim',
  icon: 'fa/FaUsersSlash',
  on: [
    refs.pcs.swift_starblade,
    refs.pcs.fix,
    refs.npcs.abraham,
    refs.npcs.bessy,
    refs.npcs.bob_the_merchant,
    refs.npcs.sarogarth,
    refs.npcs.the_fiddler,
    refs.beasts.phoenix_chick,
    refs.beasts.wolfie,
  ],
  began: refs.events.n2_e207,
  rules: [
    [
      'The bearer remembers ',
      refs.pcs.jim,
      ' and their shared history, but no longer feels emotionally attached to him.',
    ],
  ],
})
