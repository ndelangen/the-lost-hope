import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Omen',
  icon: 'gi/GiHeartShield',
  on: [refs.pcs.devan],
  cause: refs.cards.the_omen,
  began: refs.events.n2_e105,
  rules: [
    [
      'The next three times ',
      refs.pcs.devan,
      ' would drop to 0 ',
      refs.rules.hit_points,
      ', he drops to 1 instead and gains one level of exhaustion. After the third time, the mark fades.',
    ],
  ],
  triggers: [
    {
      on: 'wouldDie',
      reminder: [
        [
          'If he has saves left, ',
          refs.pcs.devan,
          ' drops to 1 instead and gains one level of exhaustion.',
        ],
      ],
    },
  ],
})
