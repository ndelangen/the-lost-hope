import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Voidwalker',
  icon: 'gi/GiFloatingGhost',
  on: [refs.pcs.jim],
  cause: refs.cards.the_void_walker,
  began: refs.events.n2_e190,
  duration: { days: 28 },
  rules: [
    [
      refs.pcs.jim,
      ' is ethereal. He can still be seen and heard, and his equipment changes with him, but he cannot touch or affect material objects or creatures.',
    ],
    [
      'He can speak, but cannot send Message to other creatures. How he interacts with other spells and physical barriers needs further rulings.',
    ],
  ],
  removal: [['A Wish or divine intervention can end it early.']],
})
