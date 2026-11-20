import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: "Fix's Severed Bond with Jim",
  icon: 'fa/FaUsersSlash',
  on: refs.pcs.fix,
  began: refs.events.n2_e207,
  rules: [
    [
      refs.pcs.fix,
      ' remembers ',
      refs.pcs.jim,
      ' but no longer feels emotionally attached to him.',
    ],
  ],
})
