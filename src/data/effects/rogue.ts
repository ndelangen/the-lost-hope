import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Rogue',
  icon: 'gi/GiHoodedAssassin',
  on: [refs.pcs.swift_starblade],
  cause: refs.cards.the_rogue,
  began: refs.events.n2_e105,
  rules: [
    [
      'An NPC chosen by the DM is permanently hostile to ',
      refs.pcs.swift_starblade,
      '. Who it is, and how the hostility shows, is the open question of ',
      refs.quests.who_became_swift_starblade_s_enemy,
      '.',
    ],
  ],
})
