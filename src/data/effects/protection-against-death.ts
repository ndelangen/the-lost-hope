import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Protection Against Death',
  icon: 'gi/GiHeartShield',
  on: refs.pcs.devan,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e105,
  rules: [[refs.pcs.devan, ' is protected against death. The protection is permanent.']],
  triggers: [
    { on: 'wouldDie', reminder: [['Check this protection before ', refs.pcs.devan, ' dies.']] },
  ],
})
