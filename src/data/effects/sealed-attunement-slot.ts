import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Sealed Attunement Slot',
  icon: 'gi/GiPadlock',
  on: refs.npcs.sarogarth,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e194,
  rules: [[refs.npcs.sarogarth, ' can attune to no more than two magic items.']],
  removal: [['Only a Wish.']],
})
