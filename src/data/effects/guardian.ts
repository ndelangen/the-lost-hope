import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Guardian',
  icon: 'gi/GiWingedShield',
  on: [refs.npcs.sarogarth],
  cause: refs.cards.the_guardian,
  began: refs.events.n2_e194,
  rules: [
    [
      refs.npcs.sarogarth,
      ' gains +2 ',
      refs.rules.armor_class,
      ', stacking with armour and shields, and has ',
      refs.rules.advantage,
      ' on saving throws against being ',
      refs.rules.frightened,
      '.',
    ],
  ],
})
