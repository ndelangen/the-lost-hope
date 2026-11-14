import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Donjon',
  icon: 'gi/GiPrisoner',
  on: refs.pcs.cassian_veyl,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e105,
  ended: refs.events.n2_e112,
  rules: [
    [
      refs.pcs.cassian_veyl,
      ' is imprisoned in a void sphere. His possessions stay where he drew the card.',
    ],
  ],
})
