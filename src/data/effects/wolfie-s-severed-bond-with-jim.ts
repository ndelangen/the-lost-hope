import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: "Wolfie's Severed Bond with Jim",
  icon: 'fa/FaUsersSlash',
  on: refs.beasts.wolfie,
  began: refs.events.n2_e207,
  rules: [
    [
      refs.beasts.wolfie,
      ' retains memories of ',
      refs.pcs.jim,
      ' and their shared history, but no longer feels emotionally attached to him.',
    ],
  ],
})
