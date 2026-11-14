import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Cage',
  icon: 'gi/GiCage',
  on: refs.pcs.jim,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e190,
  ended: refs.events.n2_e196,
  duration: { days: 30 },
  rules: [
    [
      refs.pcs.jim,
      ' is bound within 100 feet of where he drew the card. If he tries to leave, he is teleported back and takes ',
      { dice: '2d6', type: 'force' },
      ' damage.',
    ],
  ],
})
