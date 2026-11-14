import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Wolfie after the ring',
  direction: [['What has ', refs.beasts.wolfie, ' become, and what does he want now?']],
  plots: [
    {
      name: 'What Wolfie has become',
      scene: refs.scenes.wolfie_wants_solid_ground,
      events: [refs.events.n2_e204],
    },
  ],
})
