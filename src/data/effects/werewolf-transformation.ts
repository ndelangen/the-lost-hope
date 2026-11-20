import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Werewolf Transformation',
  icon: 'gi/GiWerewolf',
  on: [refs.pcs.cassian_veyl],
  cause: refs.items.wolfie_tracking_ring,
  began: refs.events.n2_e111,
  rules: [
    [
      refs.pcs.cassian_veyl,
      ' is insatiably hungry; four normal-sized portions were at first needed to feel satisfied.',
    ],
    [
      'The ring opened a two-way bond that placed part of ',
      refs.beasts.wolfie,
      '’s life in Cassian’s soul, and is gradually turning him into a werewolf-like hybrid. It shows as a craving for meat and a heightened animal sense of smell; claws, fangs, and more hair are expected further signs.',
    ],
    [
      'The full-moon effects, sensitivity to silver, degree of control, consequences for ',
      refs.beasts.wolfie,
      ', and the results of fighting or embracing the change are unknown.',
    ],
  ],
  removal: [['It is not a curse, so curse removal does not end it.']],
})
