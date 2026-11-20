import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Mask',
  icon: 'gi/GiDominoMask',
  on: [refs.pcs.swift_starblade],
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e191,
  rules: [[refs.pcs.swift_starblade, ' can change his appearance as with Alter Self.']],
  obligations: [
    {
      label: 'Wear another face for 4 hours, starting before 20:00',
      within: { days: 1 },
      otherwise: [
        { dice: '1d6', type: refs.rules.psychic },
        ' damage for each day in a row he has missed, as his true form tries to reassert itself. Refusing and forgetting count the same.',
      ],
    },
  ],
})
