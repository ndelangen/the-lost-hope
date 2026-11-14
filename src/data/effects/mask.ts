import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Mask',
  icon: 'gi/GiDominoMask',
  on: refs.pcs.swift_starblade,
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e191,
  rules: [[refs.pcs.swift_starblade, ' can change his appearance as with Alter Self.']],
  obligations: [
    {
      label: 'Change appearance',
      within: { days: 1 },
      otherwise: [
        'Psychic damage as his true form tries to reassert itself. The amount is not recorded.',
      ],
    },
  ],
})
