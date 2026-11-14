import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Bob’s Divine Contract',
  icon: 'gi/GiScrollQuill',
  on: refs.pcs.jim,
  cause: refs.npcs.bob_the_merchant,
  began: refs.events.n2_e095,
  rules: [
    [
      refs.npcs.bob_the_merchant,
      ' can locate ',
      refs.pcs.jim,
      '. ',
      refs.pcs.jim,
      ' owes the 220 GP balance for his commissioned disguise magic.',
    ],
  ],
  obligations: [
    {
      label: 'Pay Bob the 220 GP balance',
      within: { months: 7 },
      otherwise: [
        refs.pcs.jim,
        ' and ',
        refs.npcs.bob_the_merchant,
        ' must negotiate another form of payment.',
      ],
    },
  ],
})
