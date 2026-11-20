import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Hunger',
  icon: 'gi/GiPrettyFangs',
  on: [refs.pcs.cassian_veyl],
  cause: refs.items.deck_of_many_more_things,
  began: refs.events.n2_e189,
  rules: [
    [
      'Action: ',
      refs.pcs.cassian_veyl,
      ' drains a creature within 5 feet for ',
      { dice: '1d6', type: refs.rules.necrotic },
      ' damage and regains ',
      refs.rules.hit_points,
      ' equal to half the damage dealt.',
    ],
    ['This is separate from his ', refs.effects.werewolf_transformation, '.'],
  ],
  obligations: [
    {
      label: 'Use the drain',
      within: { days: 1 },
      otherwise: [{ dice: '2d6', type: refs.rules.necrotic }],
    },
  ],
})
