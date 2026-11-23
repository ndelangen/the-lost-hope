import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Flight',
  icon: 'gi/GiFairyWings',
  on: [refs.npcs.sarogarth],
  cause: refs.cards.the_wind,
  began: refs.events.n2_e189,
  duration: { years: 1 },
  rules: [[refs.npcs.sarogarth, ' has a flying speed equal to his walking speed.']],
})
