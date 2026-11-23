import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Storm',
  icon: 'gi/GiLightningStorm',
  on: [refs.pcs.jim],
  cause: refs.cards.the_storm,
  began: refs.events.n2_e105,
  ended: refs.events.n2_e196,
  duration: { days: 30 },
  rules: [
    [
      'A lightning storm follows ',
      refs.pcs.jim,
      ' and strikes him every morning or at random intervals.',
    ],
  ],
  triggers: [
    {
      on: 'newDay',
      reminder: [
        ['Lightning strikes ', refs.pcs.jim, '. The strike can set his surroundings on fire.'],
      ],
    },
  ],
})
