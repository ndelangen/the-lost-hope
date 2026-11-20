import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Severed Bond with Jim',
  icon: 'fa/FaUsersSlash',
  on: refs.pcs.swift_starblade,
  began: refs.events.n2_e207,
  rules: [
    [
      refs.pcs.swift_starblade,
      ' remembers ',
      refs.pcs.jim,
      ' and their shared history, but no longer feels the emotional attachment he had to him.',
    ],
  ],
})
