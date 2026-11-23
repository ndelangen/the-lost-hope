import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Excruciating Pain',
  icon: 'gi/GiHeartBeats',
  on: [refs.pcs.jim],
  cause: refs.cards.the_pain,
  began: refs.events.n2_e105,
  ended: refs.events.n2_e132,
  rules: [
    [refs.pcs.jim, ' is in excruciating pain and takes a permanent −1 penalty to everything.'],
  ],
  removal: [['A Wish or divine intervention.']],
})
