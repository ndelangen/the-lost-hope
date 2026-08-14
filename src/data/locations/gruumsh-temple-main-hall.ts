import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh Temple Main Hall',
  icon: 'gi/GiThroneKing',
  type: 'building',
  parent: refs.locations.gruumsh_war_temple,
  at: [0, 0],
  notes: [
    [
      'The initial gathering hall of the ',
      refs.locations.gruumsh_war_temple,
      ', used by the temple’s worshippers and high priest.',
    ],
  ],
})
