import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Blight',
  icon: 'gi/GiDeadWood',
  on: refs.npcs.sarogarth,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e194,
  rules: [
    [
      'Plants within one mile of ',
      refs.npcs.sarogarth,
      ' wither and die. Animals and beasts become hostile and attack him on sight.',
    ],
  ],
  removal: [['Nothing: the DM ruled that neither a Wish nor divine intervention can remove it.']],
})
