import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Wolfie wants solid ground',
  location: refs.locations.skynet_s_second_best_inn,
  npcs: [refs.npcs.abraham],
  references: [refs.beasts.wolfie],
  setup: [
    [
      refs.beasts.wolfie,
      ' paces the stables, restless at the altitude. ',
      refs.npcs.abraham,
      ' refuses to leave the stall.',
    ],
  ],
  outcomes: [
    {
      when: [['They bring meat and a blanket.']],
      response: [['', refs.beasts.wolfie, ' opens up about the night the ring vanished.']],
    },
    {
      when: [['They try to take him off the island.']],
      response: [['', refs.beasts.wolfie, ' panics; a stable hand offers a cheaper ferry.']],
    },
  ],
})
