import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Guardian',
  icon: 'gi/GiWingedShield',
  on: refs.npcs.sarogarth,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e194,
  rules: [
    [
      refs.npcs.sarogarth,
      ' gains +2 Armor Class, stacking with armour and shields, and has advantage on saving throws against being frightened.',
    ],
  ],
})
