import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Sky Islands',
  icon: 'gi/GiIsland',
  type: 'region',
  parent: refs.locations.world,
  at: [0, 0],
  notes: [
    [
      'A group of three inhabited islands in the sky, lying along an aerial route toward ',
      refs.locations.feywild,
      '.',
    ],
  ],
})
