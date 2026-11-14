import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Vessel',
  icon: 'gi/GiBottledBolt',
  on: refs.pcs.jim,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e190,
  rules: [
    [
      refs.pcs.jim,
      ' can store one spell of up to 5th level in his body and cast it later without a spell slot.',
    ],
  ],
  obligations: [
    {
      label: 'Store a spell',
      within: { hours: 24 },
      otherwise: [{ dice: '2d8', type: refs.rules.force }],
    },
    {
      label: 'Cast the stored spell',
      within: { days: 7 },
      otherwise: [{ dice: '3d8', type: refs.rules.force }],
    },
  ],
})
