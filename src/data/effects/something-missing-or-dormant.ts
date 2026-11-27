import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Something Missing or Dormant',
  icon: 'gi/GiComa',
  on: [refs.pcs.devan],
  cause: refs.cards.the_omen,
  began: refs.events.n2_e105,
  rules: [
    [
      refs.pcs.devan,
      ' feels that an unidentified part of himself has gone missing or fallen asleep. What changed and how to recover it is the open question of ',
      refs.quests.what_did_devan_lose_to_the_fiddler,
      '.',
    ],
  ],
})
