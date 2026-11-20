import { refs } from '#/data/generated/refs.ts'
import { create as createEffect } from '#/definitions/effect.ts'

export default createEffect({
  name: 'Whip-Taught Understanding',
  icon: 'gi/GiWhiplash',
  on: [refs.beasts.wolfie],
  cause: refs.items.one_use_obedience_whip,
  began: refs.events.n2_e095,
  rules: [
    [
      refs.beasts.wolfie,
      ' understands his handler’s intentions and can communicate his own needs, while keeping his free will.',
    ],
  ],
})
