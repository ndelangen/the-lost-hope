import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Cassian’s Unidentified Curse',
  icon: 'gi/GiCursedStar',
  on: refs.pcs.cassian_veyl,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e105,
  ended: refs.events.n2_e131,
  rules: [
    [
      refs.pcs.cassian_veyl,
      ' gains +1 to spell attack rolls, but every opponent has ',
      refs.rules.advantage,
      ' on attack rolls against him.',
    ],
  ],
})
