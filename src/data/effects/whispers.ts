import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Whispers',
  icon: 'gi/GiShadowFollower',
  on: refs.pcs.jim,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e189,
  rules: [[refs.pcs.jim, ' hears voices only he can hear and suffers penalties involving Wisdom.']],
  triggers: [
    {
      on: 'longRest',
      reminder: [
        [
          refs.pcs.jim,
          ' must succeed on a saving throw to benefit from the long rest. The exact roll is not recorded.',
        ],
      ],
    },
  ],
})
